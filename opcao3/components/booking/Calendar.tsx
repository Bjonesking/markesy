"use client";

import { useState } from "react";

const WEEKDAYS = ["D", "S", "T", "Q", "Q", "S", "S"];
const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

function startOfDay(d: Date) {
  const copy = new Date(d);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function isSameDay(a: Date, b: Date) {
  return a.toDateString() === b.toDateString();
}

export function Calendar({
  selected,
  onSelect,
}: {
  selected: Date | null;
  onSelect: (date: Date) => void;
}) {
  const today = startOfDay(new Date());
  const [viewDate, setViewDate] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  function isDisabled(date: Date) {
    return date < today || date.getDay() === 0; // passado ou domingo
  }

  function changeMonth(delta: number) {
    setViewDate(new Date(year, month + delta, 1));
  }

  const canGoBack = new Date(year, month, 1) > new Date(today.getFullYear(), today.getMonth(), 1);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => changeMonth(-1)}
          disabled={!canGoBack}
          aria-label="Mês anterior"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-ink-muted transition hover:border-navy hover:text-navy disabled:opacity-30"
        >
          ‹
        </button>
        <p className="font-mono-label text-xs uppercase text-ink-muted">
          {MONTHS[month]} {year}
        </p>
        <button
          type="button"
          onClick={() => changeMonth(1)}
          aria-label="Próximo mês"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-ink-muted transition hover:border-navy hover:text-navy"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((w, i) => (
          <div key={i} className="py-1 text-[11px] font-medium text-ink-muted">
            {w}
          </div>
        ))}
        {cells.map((date, i) => {
          if (!date) return <div key={i} />;
          const disabled = isDisabled(date);
          const isSelected = selected && isSameDay(date, selected);
          return (
            <button
              key={i}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(date)}
              className={`aspect-square rounded-lg text-sm transition-colors ${
                disabled
                  ? "text-border cursor-not-allowed"
                  : isSelected
                    ? "bg-navy font-bold text-white"
                    : "text-ink hover:bg-amber-soft"
              }`}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-ink-muted">Domingos e datas passadas não ficam disponíveis.</p>
    </div>
  );
}
