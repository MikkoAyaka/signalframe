import { type ReactNode } from "react";

export type SparxChipTone = "quiet" | "signal" | "success" | "warning";

interface SparxChipProps {
  children: ReactNode;
  className?: string;
  tone?: SparxChipTone;
}

const toneClass: Record<SparxChipTone, string> = {
  quiet: "border-white/10 bg-white/[0.04] text-neutral-400",
  signal: "border-red-500/30 bg-red-500/10 text-red-300",
  success: "border-emerald-500/25 bg-emerald-500/10 text-emerald-300",
  warning: "border-amber-500/25 bg-amber-500/10 text-amber-200",
};

export function SparxChip({ children, className = "", tone = "quiet" }: SparxChipProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 font-mono text-xs font-medium uppercase tracking-[0.12em] ${toneClass[tone]} ${className}`}>
      {children}
    </span>
  );
}
