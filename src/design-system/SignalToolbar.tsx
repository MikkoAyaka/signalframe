import { type ReactNode } from "react";

interface SignalToolbarProps {
  children: ReactNode;
  label?: string;
  className?: string;
}

export function SignalToolbar({ children, label = "Toolbar", className = "" }: SignalToolbarProps) {
  return (
    <div role="toolbar" aria-label={label} className={`flex flex-wrap items-center gap-2 rounded-xl border border-white/[0.08] bg-neutral-950/65 p-1.5 backdrop-blur-xl ${className}`}>
      {children}
    </div>
  );
}
