import { type ReactNode } from "react";

interface SignalDataRowProps {
  label: ReactNode;
  description?: ReactNode;
  leading?: ReactNode;
  meta?: ReactNode;
  trailing?: ReactNode;
  className?: string;
}

export function SignalDataRow({ label, description, leading, meta, trailing, className = "" }: SignalDataRowProps) {
  return (
    <div className={`flex min-w-0 items-center gap-3 border-b border-white/[0.06] py-3 last:border-b-0 ${className}`}>
      {leading && <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-neutral-300">{leading}</div>}
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-neutral-200">{label}</div>
        {description && <div className="mt-0.5 truncate text-xs text-neutral-500">{description}</div>}
      </div>
      {meta && <div className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-500 sm:block">{meta}</div>}
      {trailing && <div className="shrink-0">{trailing}</div>}
    </div>
  );
}
