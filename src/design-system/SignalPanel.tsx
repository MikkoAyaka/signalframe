import { useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from "react";

export type SignalPanelTone = "quiet" | "default" | "command";

export interface SignalPanelProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  tone?: SignalPanelTone;
  interactive?: boolean;
}

const toneClass: Record<SignalPanelTone, string> = {
  quiet: "bg-neutral-950/45 border-white/[0.06]",
  default: "bg-neutral-900/55 border-white/[0.08]",
  command: "bg-neutral-900/70 border-red-500/25",
};

export function SignalPanel({
  children,
  className = "",
  glowColor = "rgba(239, 68, 68, 0.16)",
  tone = "default",
  interactive = true,
}: SignalPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!panelRef.current || !interactive) return;
    const bounds = panelRef.current.getBoundingClientRect();
    setPointer({ x: event.clientX - bounds.left, y: event.clientY - bounds.top });
  };

  const style = {
    background: `radial-gradient(520px circle at ${pointer.x}px ${pointer.y}px, ${glowColor}, transparent 44%)`,
    opacity: active ? 1 : 0,
  } satisfies CSSProperties;

  return (
    <div
      ref={panelRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => interactive && setActive(true)}
      onPointerLeave={() => setActive(false)}
      className={`relative isolate overflow-hidden rounded-2xl border backdrop-blur-xl transition-colors duration-500 ${toneClass[tone]} ${interactive ? "hover:border-red-500/30" : ""} ${className}`}
    >
      <div className="pointer-events-none absolute -inset-px z-0 transition-opacity duration-300" style={style} />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
