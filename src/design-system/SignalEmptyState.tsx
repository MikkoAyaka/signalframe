import { type ReactNode } from "react";

interface SignalEmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function SignalEmptyState({ icon, title, description, action, className = "" }: SignalEmptyStateProps) {
  return (
    <div className={`flex min-h-52 flex-col items-center justify-center px-6 py-10 text-center ${className}`}>
      {icon && <div className="grid h-11 w-11 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-neutral-400">{icon}</div>}
      <h3 className="mt-4 text-sm font-medium text-white">{title}</h3>
      {description && <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-500">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
