import { type ReactNode } from "react";

interface SignalIconButtonProps {
  children: ReactNode;
  active?: boolean;
  className?: string;
  disabled?: boolean;
  "aria-label": string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export function SignalIconButton({ children, active = false, className = "", type = "button", ...props }: SignalIconButtonProps) {
  return (
    <button
      disabled={props.disabled}
      aria-label={props["aria-label"]}
      onClick={props.onClick}
      type={type}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/70 ${active ? "border-red-500/35 bg-red-500/15 text-red-200" : "border-white/10 bg-neutral-900/65 text-neutral-400 hover:border-red-500/35 hover:bg-red-500/10 hover:text-white"} ${className}`}
    >
      {children}
    </button>
  );
}
