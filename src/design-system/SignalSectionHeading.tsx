import { type ReactNode } from "react";

interface SignalSectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  action?: ReactNode;
}

export function SignalSectionHeading({ eyebrow, title, description, action }: SignalSectionHeadingProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-white/[0.08] pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-red-400">{eyebrow}</p>}
        <h2 className="text-2xl font-semibold tracking-tight text-white">{title}</h2>
        {description && <div className="mt-2 max-w-2xl text-sm leading-6 text-neutral-400">{description}</div>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
