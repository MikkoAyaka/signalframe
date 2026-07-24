export type SparxProgressTone = "signal" | "success" | "warning" | "quiet";

interface SparxProgressProps {
  label: string;
  value: string;
  percent: number;
  tone?: SparxProgressTone;
  className?: string;
}

const barTone: Record<SparxProgressTone, string> = {
  signal: "bg-red-400 shadow-[0_0_14px_rgba(248,113,113,0.45)]",
  success: "bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.35)]",
  warning: "bg-amber-300 shadow-[0_0_14px_rgba(252,211,77,0.35)]",
  quiet: "bg-neutral-500",
};

export function SparxProgress({ label, value, percent, tone = "signal", className = "" }: SparxProgressProps) {
  const safePercent = Math.min(100, Math.max(0, percent));

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.14em]">
        <span className="truncate text-neutral-500">{label}</span>
        <span className="shrink-0 text-neutral-300">{value}</span>
      </div>
      <div className="h-1 overflow-hidden rounded-full bg-white/[0.07]" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={safePercent}>
        <div className={`h-full rounded-full transition-[width] duration-500 ease-out ${barTone[tone]}`} style={{ width: `${safePercent}%` }} />
      </div>
    </div>
  );
}
