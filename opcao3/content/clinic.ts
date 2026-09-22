// ============================================================================
// FONTE ÚNICA DE DADOS DA MARKÉSY — tudo real, nada inventado.
// Campos que o cliente ainda não passou (CREFITO, horário, nota do Google)
// ficam de fora de propósito — não é esquecimento, é regra do projeto.
// ============================================================================

export const clinic = {
  name: "Markésy",
  fullName: "Markésy — Osteopatia & Fisioterapia",
  tagline: "O caminho de volta ao movimento sem dor.",
  city: "Macaé",
  state: "RJ",
  address: {
    street: "Rua Bariloche, nº 24",
    neighborhood: "Cavaleiros",
    city: "Macaé",
    state: "RJ",
    zip: "27920-160",
    full: "Rua Bariloche, nº 24 — Cavaleiros, Macaé/RJ, 27920-160",
    mapsEmbedUrl:
      "https://www.google.com/maps?q=Rua+Bariloche,+24,+Cavaleiros,+Maca%C3%A9+-+RJ,+27920-160&output=embed",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Rua+Bariloche,+24,+Cavaleiros,+Maca%C3%A9+-+RJ,+27920-160",
  },
  phone: {
    display: "(22) 3083-0089",
    href: "tel:+552230830089",
  },
  whatsapp: {
    number: "5522992781960",
    display: "(22) 99278-1960",
  },
  instagram: {
    handle: "@markesybr",
    url: "https://www.instagram.com/markesybr",
  },
  domain: "markesy.com.br",
} as const;

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${clinic.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export const defaultBookingMessage =
  "Olá, Markésy! Gostaria de agendar uma avaliação.";

// Horário de funcionamento ainda não confirmado pelo cliente — esta lista
// é ilustrativa (pro modal ter o que oferecer), não é o horário real da
// clínica. O modal deixa isso explícito: é um PEDIDO de horário, a equipe
// confirma pelo WhatsApp. Trocar assim que o cliente confirmar o horário
// real de funcionamento.
export const bookingTimeSlots = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
] as const;

export const bookingReasons = [
  "Primeira avaliação",
  "Dor na coluna",
  "Recuperação pós-cirúrgica",
  "Dor crônica",
  "Outro",
] as const;

// ---------------------------------------------------------------------------
// Diferenciais / o que fundamenta o método (copy real, já aprovada no site)
// ---------------------------------------------------------------------------
export const differentiators = [
  {
    number: "01",
    title: "Terapia manual & osteopatia",
    description:
      "Técnicas de manipulação e liberação miofascial para restaurar o movimento e aliviar a dor na origem.",
  },
  {
    number: "02",
    title: "Avaliação do Sistema Nervoso Autônomo",
    description:
      "Em casos indicados, usamos um exame de avaliação do SNA para enxergar o que os exames de imagem não mostram.",
  },
  {
    number: "03",
    title: "Anamnese detalhada",
    description:
      "Cada caso é único. O primeiro atendimento é uma conversa a fundo sobre seu histórico, antes de qualquer decisão.",
  },
] as const;

// ---------------------------------------------------------------------------
// Serviços — derivados dos diferenciais reais + das especialidades da
// equipe atual. Nada de "Pilates clínico" ou "Dry needling" inventado:
// só o que temos evidência (copy aprovada ou cargo real de alguém do time).
// ---------------------------------------------------------------------------
export const services = [
  {
    slug: "osteopatia-estrutural",
    category: "ESTRUTURA",
    name: "Osteopatia estrutural",
    short:
      "Manipulação e liberação miofascial pra restaurar o movimento e tratar a dor na origem, não só o sintoma.",
    whenIndicated: [
      "Dores na coluna (cervical, torácica ou lombar)",
      "Dores crônicas sem causa aparente nos exames",
      "Bursite no ombro e outras tendinopatias",
      "Recuperação pós-cirúrgica",
    ],
    howItWorks: [
      "Anamnese: conversa a fundo sobre seu histórico e sua rotina.",
      "Avaliação física detalhada do padrão de movimento.",
      "Sessões de terapia manual, acompanhadas até a alta.",
    ],
  },
  {
    slug: "avaliacao-sna",
    category: "DIAGNÓSTICO",
    name: "Avaliação do Sistema Nervoso Autônomo",
    short:
      "Exame de avaliação do SNA, usado em casos indicados pra enxergar o que os exames de imagem não mostram.",
    whenIndicated: [
      "Dores crônicas sem diagnóstico claro",
      "Fadiga crônica",
      "Casos em que o tratamento convencional não avançou",
    ],
    howItWorks: [
      "Anamnese detalhada do histórico do paciente.",
      "Exame de avaliação do SNA, quando clinicamente indicado.",
      "Plano de tratamento individual a partir do resultado.",
    ],
  },
  {
    slug: "fisioterapia",
    category: "REABILITAÇÃO",
    name: "Fisioterapia",
    short:
      "Reabilitação individual, incluindo recuperação pós-cirúrgica e fortalecimento muscular guiado.",
    whenIndicated: [
      "Recuperação antes ou depois de cirurgia",
      "Perda de movimento ou atrofia muscular",
      "Fadiga crônica e dores musculares",
    ],
    howItWorks: [
      "Avaliação física e definição de objetivos com o paciente.",
      "Sessões de reabilitação e fortalecimento progressivo.",
      "Acompanhamento até a alta, com manutenção quando necessário.",
    ],
  },
  {
    slug: "massoterapia",
    category: "TERAPIA MANUAL",
    name: "Massoterapia",
    short: "Liberação miofascial e técnicas de massagem terapêutica como parte do plano de tratamento individual.",
    whenIndicated: ["Tensão muscular", "Dores crônicas", "Complemento ao tratamento osteopático"],
    howItWorks: [
      "Avaliação da região de tensão junto ao restante da equipe.",
      "Sessões de massoterapia integradas ao plano de tratamento.",
    ],
  },
  {
    slug: "suporte-psicologico",
    category: "SAÚDE INTEGRAL",
    name: "Suporte psicológico",
    short:
      "Acompanhamento psicológico como parte do tratamento — recuperar o movimento também passa pela saúde mental.",
    whenIndicated: [
      "Pacientes em recuperação física prolongada",
      "Impacto emocional de uma dor crônica ou cirurgia",
    ],
    howItWorks: ["Escuta e acompanhamento psicológico junto à equipe multidisciplinar."],
  },
  {
    slug: "terapia-holistica",
    category: "SAÚDE INTEGRAL",
    name: "Terapia holística",
    short: "Abordagem complementar ao tratamento manual, olhando o paciente como um todo.",
    whenIndicated: ["Complemento ao plano de tratamento individual"],
    howItWorks: ["Integrada ao plano de tratamento definido na anamnese."],
  },
] as const;

// ---------------------------------------------------------------------------
// Método — os 3 passos reais (não são "4 etapas" como no prompt genérico;
// é o que a Markésy realmente usa, mantido igual às Opções 1 e 2)
// ---------------------------------------------------------------------------
export const method = [
  {
    number: "01",
    title: "Anamnese",
    duration: "conversa inicial",
    description: "Conversamos a fundo sobre seu histórico, sua rotina e onde a dor te limita hoje.",
    tags: ["HISTÓRICO", "ROTINA", "QUEIXA"],
  },
  {
    number: "02",
    title: "Avaliação",
    duration: "avaliação física",
    description: "Avaliação física detalhada e, quando indicado, exame do Sistema Nervoso Autônomo.",
    tags: ["EXAME FÍSICO", "SNA (quando indicado)"],
  },
  {
    number: "03",
    title: "Tratamento individual",
    duration: "acompanhado até a alta",
    description:
      "Plano de terapia manual e osteopatia feito pra sua causa específica — acompanhado até a alta.",
    tags: ["PLANO INDIVIDUAL", "ACOMPANHAMENTO"],
  },
] as const;

// ---------------------------------------------------------------------------
// Equipe — sem foto real (banco de iniciais) e sem CREFITO inventado.
// ---------------------------------------------------------------------------
export const team = [
  { initials: "AM", name: "Aline Fernandes Marchesi", role: "Osteopata", lead: true },
  { initials: "VS", name: "Vinicius Sabino", role: "Osteopata", lead: false },
  { initials: "DP", name: "Diego Pilat", role: "Fisioterapeuta", lead: false },
  { initials: "DA", name: "Dayana de Azevedo", role: "Massoterapeuta", lead: false },
  { initials: "DS", name: "Dariela Silva", role: "Psicóloga", lead: false },
  { initials: "KD", name: "Karina Duarte", role: "Terapeuta Holística", lead: false },
] as const;

// ---------------------------------------------------------------------------
// Condições que tratamos (mesma lista real das Opções 1 e 2)
// ---------------------------------------------------------------------------
export const conditions = [
  "Dores na coluna",
  "Dores crônicas",
  "Bursite no ombro",
  "Tendinopatias",
  "Fibromialgia",
  "Cefaleia",
  "Fadiga crônica",
  "Recuperação pós-cirúrgica",
] as const;

// ---------------------------------------------------------------------------
// Depoimentos reais — os únicos 3 que temos, tirados da matéria de revista.
// Não criar "casos clínicos" novos sem autorização real do paciente.
// ---------------------------------------------------------------------------
export const testimonials = [
  {
    name: "Cristiane Rodrigues",
    context: "tratamento pós-cirurgia na lombar",
    quote:
      "Depois que a Aline entrou na minha vida, nunca mais fui a mesma. Fizemos liberação miofacial e descompressão lombar por conta da artrodese. Já estou de alta, mas vou iniciar o fortalecimento muscular.",
  },
  {
    name: "Gisele de Araújo",
    context: "tratamento de bursite no ombro",
    quote:
      "Eu não queria ficar tanto tempo me medicando com anti-inflamatórios ou corticoides, então fui em busca de um tratamento mais natural. Hoje faço a manutenção do meu tratamento, que foi longo.",
  },
  {
    name: "Jheniffer Ribeiro Ozório",
    context: "tratamento antes/depois de cirurgia no fêmur",
    quote:
      "Eu já tinha perdido os movimentos da minha perna, meus músculos estavam atrofiados e a equipe recuperou não só a parte física, mas também minha saúde psicológica.",
  },
] as const;

// ---------------------------------------------------------------------------
// FAQ — respostas fundamentadas só no que sabemos de verdade. Perguntas
// sobre convênio/plano de saúde ficam de fora: não temos essa política
// confirmada e não vamos afirmar nada sobre isso.
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// Mapa corporal interativo — versão 2D/SVG (o prompt original pedia um
// modelo humano 3D low-poly; cortado por escopo, ver plano). Cada região
// aponta só pra condições/serviços que já estão na lista real acima.
// ---------------------------------------------------------------------------
export const bodyRegions = [
  {
    id: "cabeca",
    label: "Cabeça & pescoço",
    cx: 50,
    cy: 9,
    r: 5.5,
    complaints: ["Cefaleia", "Dores na coluna (cervical)"],
    serviceSlug: "osteopatia-estrutural",
  },
  {
    id: "ombro",
    label: "Ombro",
    cx: 32,
    cy: 24,
    r: 5,
    complaints: ["Bursite no ombro", "Tendinopatias"],
    serviceSlug: "osteopatia-estrutural",
  },
  {
    id: "coluna",
    label: "Coluna",
    cx: 50,
    cy: 34,
    r: 5.5,
    complaints: ["Dores na coluna", "Recuperação pós-cirúrgica"],
    serviceSlug: "osteopatia-estrutural",
  },
  {
    id: "quadril",
    label: "Quadril & abdômen",
    cx: 50,
    cy: 52,
    r: 5.5,
    complaints: ["Dores crônicas", "Fadiga crônica"],
    serviceSlug: "avaliacao-sna",
  },
  {
    id: "joelho",
    label: "Joelho",
    cx: 42,
    cy: 74,
    r: 5,
    complaints: ["Recuperação pós-cirúrgica", "Tendinopatias"],
    serviceSlug: "fisioterapia",
  },
  {
    id: "pe",
    label: "Pé & tornozelo",
    cx: 42,
    cy: 94,
    r: 5,
    complaints: ["Fibromialgia", "Fadiga crônica"],
    serviceSlug: "fisioterapia",
  },
] as const;

export const faq = [
  {
    question: `Onde fica a clínica de osteopatia e fisioterapia em ${clinic.city}?`,
    answer: `A Markésy fica na ${clinic.address.full}. O atendimento é feito presencialmente, com avaliação individual.`,
  },
  {
    question: "O que é osteopatia e qual a diferença para a fisioterapia?",
    answer:
      "A osteopatia trata o corpo como um todo, usando terapia manual pra reequilibrar o que está por trás da dor, não só aliviar o sintoma. A fisioterapia trabalha a reabilitação e o fortalecimento — na Markésy, os dois andam juntos dentro do mesmo plano de tratamento.",
  },
  {
    question: "Osteopatia dói?",
    answer:
      "As técnicas são de terapia manual e liberação miofascial, ajustadas ao que cada paciente tolera. Qualquer desconforto é conversado durante a sessão — isso faz parte da anamnese e do acompanhamento contínuo.",
  },
  {
    question: "Quantas sessões são necessárias?",
    answer:
      "Varia por caso — é justamente o que a avaliação inicial define. O acompanhamento vai da anamnese até a alta, com um plano individual pra sua causa específica.",
  },
  {
    question: "Vocês tratam hérnia de disco, ciática, dor lombar e cervical?",
    answer:
      "Tratamos dores na coluna (cervical, torácica e lombar), dores crônicas, bursite, tendinopatias, fibromialgia, cefaleia, fadiga crônica e recuperação pós-cirúrgica. Pra casos específicos, o melhor caminho é conversar na anamnese.",
  },
  {
    question: "Fazem reabilitação pós-cirúrgica?",
    answer:
      "Sim — é uma das áreas com mais depoimentos reais de pacientes da Markésy, incluindo recuperação de cirurgia na lombar e no fêmur.",
  },
  {
    question: "Como faço pra agendar uma avaliação?",
    answer:
      "Pelo botão de agendamento neste site (que já monta a mensagem pra você) ou direto pelo WhatsApp " +
      clinic.whatsapp.display +
      ".",
  },
] as const;
