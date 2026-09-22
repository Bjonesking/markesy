import type { MDXComponents } from "mdx/types";
import { slugify } from "./slugify";

export const mdxComponents: MDXComponents = {
  h2: ({ children, ...props }) => (
    <h2 id={slugify(String(children))} className="mt-12 mb-4 font-display text-2xl font-bold text-navy scroll-mt-28" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 id={slugify(String(children))} className="mt-8 mb-3 font-display text-xl font-bold text-navy scroll-mt-28" {...props}>
      {children}
    </h3>
  ),
  p: (props) => <p className="mb-5 leading-relaxed text-ink" {...props} />,
  ul: (props) => <ul className="mb-5 list-disc space-y-2 pl-6 text-ink" {...props} />,
  ol: (props) => <ol className="mb-5 list-decimal space-y-2 pl-6 text-ink" {...props} />,
  li: (props) => <li className="leading-relaxed" {...props} />,
  strong: (props) => <strong className="font-semibold text-navy" {...props} />,
  a: (props) => <a className="text-navy underline decoration-amber decoration-2 underline-offset-2" {...props} />,
  blockquote: (props) => (
    <blockquote className="my-6 border-l-4 border-amber bg-amber-soft/40 px-5 py-4 italic text-ink" {...props} />
  ),
};
