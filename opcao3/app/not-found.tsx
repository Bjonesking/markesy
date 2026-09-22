import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-5 pt-24 text-center">
      <p className="font-mono-label text-xs uppercase text-amber-dark">Erro 404</p>
      <h1 className="mt-4 font-display text-6xl font-bold text-navy sm:text-8xl">
        Fora do <span className="text-amber-dark">eixo</span>.
      </h1>
      <p className="mt-4 max-w-md text-ink-muted">
        Essa página não existe — mas seu movimento não precisa parar por isso.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-navy px-6 py-3 text-sm font-bold text-white hover:bg-navy-soft"
      >
        Voltar ao início
      </Link>
    </div>
  );
}
