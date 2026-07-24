import { type ReactNode } from "react";

export type SignalMetricTone = "default" | "signal" | "success" | "warning";

interface SignalMetricProps {
  label: string;
  value: ReactNode;
  delta?: ReactNode;
  detail?: ReactNode;
  tone?: SignalMetricTone;
  className?: string;
}

const valueTone: Record<SignalMetricTone, string> = {
  default: "text-white",
  signal: "text-red-300",
  success: "text-emerald-300",
  warning: "text-amber-200",
};

export function SignalMetric({ label, value, delta, detail, tone = "default", className = "" }: SignalMetricProps) {
  return (
    <div className={`min-w-0 ${className}`}>
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-500">{label}</p>
      <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <strong className={`text-3xl font-semibold tracking-tight ${valueTone[tone]}`}>{value}</strong>
        {delta && <span className={`font-mono text-xs ${tone === "success" ? "text-emerald-400" : tone === "warning" ? "text-amber-300" : "text-neutral-500"}`}>{delta}</span>}
      </div>
      {detail && <div className="mt-2 text-xs leading-5 text-neutral-500">{detail}</div>}
    </div>
  );
}
