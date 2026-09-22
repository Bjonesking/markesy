export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/** Extrai os títulos ## e ### de um MDX cru, na ordem em que aparecem. */
export function extractHeadings(source: string) {
  const lines = source.split("\n");
  const headings: { text: string; level: 2 | 3; id: string }[] = [];
  for (const line of lines) {
    const match = /^(##|###)\s+(.*)$/.exec(line.trim());
    if (!match) continue;
    const level = match[1].length === 2 ? 2 : 3;
    const text = match[2].trim();
    headings.push({ text, level, id: slugify(text) });
  }
  return headings;
}
