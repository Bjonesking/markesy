"use client";

import { useEffect, useRef, useState } from "react";
import { useBooking } from "@/lib/booking-context";
import { buildWhatsAppUrl, bookingTimeSlots, bookingReasons, team, clinic } from "@/content/clinic";
import { Calendar } from "./Calendar";

const STEPS = ["Data", "Horário", "Profissional", "Confirmar"];

function formatDate(d: Date) {
  return d.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" });
}

export function BookingModal() {
  const { isOpen, close } = useBooking();
  const dialogRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState(0);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [professional, setProfessional] = useState<string>("Sem preferência");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState<string>(bookingReasons[0]);
  const [sent, setSent] = useState(false);

  // ESC fecha, foco preso dentro do modal
  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialogRef.current?.querySelector<HTMLElement>("button, input, select")?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  function reset() {
    setStep(0);
    setDate(null);
    setTime(null);
    setProfessional("Sem preferência");
    setName("");
    setPhone("");
    setReason(bookingReasons[0]);
    setSent(false);
  }

  function handleClose() {
    close();
    if (sent) reset();
  }

  function canAdvance() {
    if (step === 0) return !!date;
    if (step === 1) return !!time;
    if (step === 2) return !!professional;
    return true;
  }

  function handleConfirm() {
    const message = [
      `Olá, Markésy! Gostaria de agendar uma avaliação.`,
      `📅 Data: ${date ? formatDate(date) : "-"}`,
      `🕐 Horário: ${time ?? "-"}`,
      `👤 Profissional: ${professional}`,
      name ? `Nome: ${name}` : null,
      reason ? `Queixa: ${reason}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(buildWhatsAppUrl(message), "_blank", "noopener");
    setSent(true);
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-navy-deep/70 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Agendar avaliação"
        className="flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-3xl bg-white sm:max-w-3xl sm:flex-row sm:rounded-3xl"
      >
        {/* Coluna do formulário */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <p className="font-mono-label text-xs uppercase text-amber-dark">Agendar avaliação</p>
              <h3 className="font-display text-2xl font-bold text-navy">Vamos marcar seu horário</h3>
            </div>
            <button
              onClick={handleClose}
              aria-label="Fechar"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-ink-muted hover:border-navy hover:text-navy"
            >
              ✕
            </button>
          </div>

          {!sent && (
            <>
              {/* Stepper */}
              <div className="mb-6 flex items-center gap-2 font-mono-label text-[10px] uppercase text-ink-muted">
                {STEPS.map((s, i) => (
                  <div key={s} className="flex items-center gap-2">
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full ${
                        i <= step ? "bg-navy text-white" : "bg-border text-ink-muted"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className={i === step ? "text-navy" : ""}>{s}</span>
                    {i < STEPS.length - 1 && <span className="mx-1 text-border">—</span>}
                  </div>
                ))}
              </div>

              {step === 0 && <Calendar selected={date} onSelect={(d) => setDate(d)} />}

              {step === 1 && (
                <div className="grid grid-cols-3 gap-2">
                  {bookingTimeSlots.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTime(t)}
                      className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${
                        time === t
                          ? "border-navy bg-navy text-white"
                          : "border-border text-ink hover:border-navy"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}

              {step === 2 && (
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setProfessional("Sem preferência")}
                    className={`rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors ${
                      professional === "Sem preferência"
                        ? "border-navy bg-navy text-white"
                        : "border-border text-ink hover:border-navy"
                    }`}
                  >
                    Sem preferência
                  </button>
                  {team.map((p) => (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() => setProfessional(p.name)}
                      className={`rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors ${
                        professional === p.name
                          ? "border-navy bg-navy text-white"
                          : "border-border text-ink hover:border-navy"
                      }`}
                    >
                      {p.name}
                      <span className="block text-xs font-normal opacity-70">{p.role}</span>
                    </button>
                  ))}
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <label className="block">
                    <span className="mb-1 block text-sm font-medium text-ink">Seu nome</span>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-lg border border-border px-4 py-2.5 text-sm outline-none focus:border-navy"
                      placeholder="Nome completo"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-sm font-medium text-ink">Telefone (opcional)</span>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-lg border border-border px-4 py-2.5 text-sm outline-none focus:border-navy"
                      placeholder="(22) 90000-0000"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-sm font-medium text-ink">Motivo / queixa</span>
                    <select
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full rounded-lg border border-border px-4 py-2.5 text-sm outline-none focus:border-navy"
                    >
                      {bookingReasons.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </label>
                  <p className="text-xs text-ink-muted">
                    Isso monta um pedido de horário — a equipe da Markésy confirma pelo WhatsApp.
                  </p>
                </div>
              )}

              {/* Navegação */}
              <div className="mt-8 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  className={`text-sm font-medium text-ink-muted hover:text-navy ${step === 0 ? "invisible" : ""}`}
                >
                  ← Voltar
                </button>
                {step < 3 ? (
                  <button
                    type="button"
                    disabled={!canAdvance()}
                    onClick={() => setStep((s) => s + 1)}
                    className="rounded-full bg-navy px-6 py-3 text-sm font-bold text-white transition disabled:opacity-30"
                  >
                    Continuar →
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleConfirm}
                    className="rounded-full bg-amber px-6 py-3 text-sm font-bold text-navy transition hover:bg-amber-dark"
                  >
                    Confirmar no WhatsApp →
                  </button>
                )}
              </div>
            </>
          )}

          {sent && (
            <div className="py-6 text-center">
              <p className="text-4xl">✅</p>
              <p className="mt-4 font-display text-xl font-bold text-navy">Pedido enviado!</p>
              <p className="mt-2 text-sm text-ink-muted">
                Abrimos o WhatsApp com sua mensagem pronta. A equipe da Markésy confirma seu horário por lá.
              </p>
              <button
                onClick={handleClose}
                className="mt-6 rounded-full border border-border px-6 py-3 text-sm font-medium text-navy hover:border-navy"
              >
                Fechar
              </button>
            </div>
          )}
        </div>

        {/* Resumo lateral */}
        <aside className="w-full shrink-0 bg-navy p-6 text-white sm:w-64 sm:p-8">
          <p className="font-mono-label mb-4 text-xs uppercase text-amber">Resumo</p>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <span aria-hidden="true">📅</span>
              <span className="text-white/80">{date ? formatDate(date) : "Escolha a data"}</span>
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden="true">🕐</span>
              <span className="text-white/80">{time ?? "Escolha o horário"}</span>
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden="true">👤</span>
              <span className="text-white/80">{professional}</span>
            </li>
          </ul>

          <div className="mt-8 space-y-2 border-t border-white/10 pt-6 text-xs text-white/60">
            <p>✓ Atendimento individual</p>
            <p>✓ Confirmação pelo WhatsApp</p>
            <p>✓ Sem compromisso até a equipe confirmar</p>
          </div>

          <a
            href={`https://wa.me/${clinic.whatsapp.number}`}
            target="_blank"
            rel="noopener"
            className="mt-8 block text-xs text-white/50 underline hover:text-white"
          >
            Prefere falar com a equipe agora?
          </a>
        </aside>
      </div>
    </div>
  );
}
