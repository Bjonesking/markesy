import type { Metadata } from "next";
import { clinic } from "@/content/clinic";

export const metadata: Metadata = { title: "Política de Privacidade" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 pb-24 pt-32 md:px-8 md:pt-40">
      <h1 className="font-display text-4xl font-bold text-navy">Política de Privacidade</h1>
      <p className="mt-2 text-sm text-ink-muted">Última atualização: setembro de 2026</p>

      <div className="prose-content mt-10 space-y-5 text-ink">
        <p>
          Este site pertence à {clinic.fullName}, clínica localizada em {clinic.address.full}. Esta
          página explica, de forma simples, como tratamos as informações de quem visita o site.
        </p>

        <h2 className="font-display text-xl font-bold text-navy">Quais dados coletamos</h2>
        <p>
          O formulário de agendamento deste site não envia dados para nenhum servidor — ele monta uma
          mensagem e abre o WhatsApp, onde a conversa acontece diretamente entre você e a equipe da
          Markésy. Os únicos dados armazenados no seu navegador são a sua escolha sobre cookies (veja
          abaixo).
        </p>

        <h2 className="font-display text-xl font-bold text-navy">Cookies</h2>
        <p>
          Usamos cookies essenciais para o funcionamento do site. Caso ferramentas de análise (como
          Google Analytics) ou de anúncios sejam adicionadas no futuro, elas só serão carregadas depois
          do seu consentimento explícito no banner de cookies.
        </p>

        <h2 className="font-display text-xl font-bold text-navy">WhatsApp</h2>
        <p>
          Ao clicar em qualquer botão de agendamento, você será redirecionado para o WhatsApp da
          Markésy ({clinic.whatsapp.display}), fora deste site. A conversa e os dados trocados por lá
          seguem os termos do próprio WhatsApp.
        </p>

        <h2 className="font-display text-xl font-bold text-navy">Contato</h2>
        <p>
          Dúvidas sobre esta política podem ser enviadas para a Markésy pelo telefone{" "}
          {clinic.phone.display} ou pelo Instagram {clinic.instagram.handle}.
        </p>
      </div>
    </div>
  );
}
