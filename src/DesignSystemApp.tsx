import {
  Activity,
  Archive,
  ArrowUpRight,
  BarChart3,
  Box,
  Check,
  CircleDot,
  Command,
  Copy,
  Gauge,
  Inbox,
  Layers3,
  LayoutDashboard,
  ListFilter,
  Languages,
  Menu,
  MonitorSmartphone,
  MoveUpRight,
  Rows3,
  ScanLine,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import {
  SignalChip,
  SignalDataRow,
  SignalEmptyState,
  SignalIconButton,
  SignalMetric,
  SignalPanel,
  SignalProgress,
  SignalSectionHeading,
  SignalToolbar,
} from "./design-system";
import { CodeBlock } from "./CodeBlock";

type Locale = "en" | "zh";

const localeCopy = {
  en: {
    nav: [["Foundations", [["Principles", "principles"], ["Color and depth", "foundations"], ["Typography", "typography"], ["Motion", "motion"], ["Product design", "product-design"], ["Accessibility", "accessibility"]]], ["Components", [["Core primitives", "components"], ["Data and states", "data-components"]]], ["Patterns", [["Command header", "patterns"], ["Data canvas", "patterns"], ["Inspector rail", "patterns"]]], ["Guidance", [["Content hierarchy", "guidance"], ["Do and avoid", "guidance"], ["Adoption", "guidance"]]]],
    language: "Chinese",
    languageShort: "ZH",
    mobileLabel: "Interface system",
    eyebrow: "Design and component specification",
    hero: "A calm frame for high-signal work.",
    intro: "Signalframe is MikkoAyaka's dark interface system for data-rich products, personal workspaces, and command surfaces.",
    read: "Read the system",
    inspect: "Inspect components",
    footer: "Source-based design documentation",
    typography: {
      eyebrow: "Foundations / 03",
      title: "Typography is the interface's pacing system.",
      description: "Signalframe uses a humanist sans for decisions and a compact mono face for provenance, state, and measurement.",
      ui: ["Interface text", "Manrope", "Use for headings, controls, and explanatory prose. Its open counters keep dense dark interfaces calm."],
      cjk: ["Chinese text", "Noto Sans SC", "Use for Simplified Chinese. It keeps stroke weight stable beside Manrope and avoids a mismatched system fallback."],
      mono: ["System text", "JetBrains Mono", "Use for labels, timestamps, shortcuts, code, and raw values. Do not use it for paragraph reading."],
      ruleTitle: "Pair roles, not fonts.",
      rule: "One display/sans family plus one mono family is sufficient. Set line length, leading, contrast, and hierarchy before adding another typeface.",
    },
    product: {
      eyebrow: "Product design / 01",
      title: "Design for the next decision, not the next screenshot.",
      description: "Signalframe turns visual restraint into a product behavior: make the state legible, expose the next useful action, and reveal detail only when it changes a decision.",
      layers: [["01", "Orient", "Name the context and the primary signal before asking the user to parse a control."], ["02", "Decide", "Put the comparison, risk, or action that changes the outcome on the active plane."], ["03", "Inspect", "Keep provenance, configuration, and exceptions nearby but quiet until they are requested."]],
      interactionTitle: "Interaction follows a closed loop.",
      interaction: [["Intent", "A click, keyboard command, or direct gesture expresses a specific goal."], ["Response", "The interface confirms the input immediately, without hiding the current state."], ["Commit", "The changed state settles visibly, with a recovery path when the action is reversible."]],
      avoidTitle: "The anti-pattern to avoid",
      avoid: "Do not make every available action equally loud. Equal emphasis transfers prioritisation work from the product to the user.",
    },
    motionLab: {
      eyebrow: "Motion practice",
      title: "Motion should preserve orientation under change.",
      description: "Use a source, a destination, and one clear spatial cue. This small lab illustrates the preferred sequence: intent, commit, settle.",
      trigger: "Replay transition",
      rest: "Rest",
      intent: "Intent",
      settle: "Settle",
    },
  },
  zh: {
    nav: [["\u57FA\u7840", [["\u8BBE\u8BA1\u539F\u5219", "principles"], ["\u8272\u5F69\u4E0E\u5C42\u6B21", "foundations"], ["\u5B57\u4F53\u6392\u5370", "typography"], ["\u52A8\u6548", "motion"], ["\u4EA7\u54C1\u8BBE\u8BA1", "product-design"], ["\u65E0\u969C\u788D", "accessibility"]]], ["\u7EC4\u4EF6", [["\u57FA\u7840\u539F\u8BED", "components"], ["\u6570\u636E\u4E0E\u72B6\u6001", "data-components"]]], ["\u6A21\u5F0F", [["\u547D\u4EE4\u5934\u90E8", "patterns"], ["\u6570\u636E\u753B\u5E03", "patterns"], ["\u68C0\u67E5\u5668\u680F", "patterns"]]], ["\u6307\u5357", [["\u4FE1\u606F\u5C42\u7EA7", "guidance"], ["\u63A8\u8350\u4E0E\u907F\u514D", "guidance"], ["\u63A5\u5165\u65B9\u5F0F", "guidance"]]]],
    language: "English", languageShort: "EN", mobileLabel: "\u754C\u9762\u7CFB\u7EDF", eyebrow: "\u8BBE\u8BA1\u4E0E\u7EC4\u4EF6\u89C4\u8303", hero: "\u4E3A\u9AD8\u4EF7\u503C\u4FE1\u606F\u7559\u51FA\u5B89\u9759\u7684\u6846\u67B6\u3002", intro: "Signalframe \u662F\u4E00\u5957\u9762\u5411\u9AD8\u4FE1\u53F7\u4EA7\u54C1\u7684\u6DF1\u8272\u8BBE\u8BA1\u7CFB\u7EDF\u3002", read: "\u9605\u8BFB\u4F53\u7CFB", inspect: "\u67E5\u770B\u7EC4\u4EF6", footer: "\u57FA\u4E8E\u6E90\u4EE3\u7801\u7684\u8BBE\u8BA1\u6587\u6863",
    typography: {
      eyebrow: "\u57FA\u7840 / 03", title: "\u5B57\u4F53\u662F\u754C\u9762\u8282\u594F\u7684\u5E95\u5C42\u7CFB\u7EDF\u3002", description: "\u7528\u4EBA\u6587\u65E0\u884C\u7EBF\u4F53\u9605\u8BFB\u4E0E\u51B3\u7B56\uFF0C\u7528\u7D27\u51D1\u7B49\u5BBD\u5B57\u4F53\u5448\u73B0\u6765\u6E90\u4E0E\u72B6\u6001\u3002",
      ui: ["\u754C\u9762\u6B63\u6587", "Manrope", "\u7528\u4E8E\u6807\u9898\u3001\u63A7\u4EF6\u548C\u8BF4\u660E\u6027\u6587\u5B57\u3002"], cjk: ["\u4E2D\u6587\u6B63\u6587", "Noto Sans SC", "\u7528\u4E8E\u7B80\u4F53\u4E2D\u6587\uFF0C\u4E0E Manrope \u7A33\u5B9A\u914D\u5BF9\u3002"], mono: ["\u7CFB\u7EDF\u6587\u5B57", "JetBrains Mono", "\u7528\u4E8E\u6807\u7B7E\u3001\u65F6\u95F4\u3001\u4EE3\u7801\u548C\u539F\u59CB\u503C\u3002"],
      ruleTitle: "\u6309\u89D2\u8272\u914D\u5BF9\uFF0C\u800C\u4E0D\u662F\u5806\u53E0\u5B57\u4F53\u3002", rule: "\u4E00\u7EC4\u65E0\u884C\u7EBF\u5B57\u4F53\u52A0\u4E00\u7EC4\u7B49\u5BBD\u5B57\u4F53\u5DF2\u8DB3\u591F\u3002\u5148\u5904\u7406\u884C\u957F\u3001\u884C\u9AD8\u3001\u5BF9\u6BD4\u5EA6\u548C\u5C42\u7EA7\u3002",
    },
    product: {
      eyebrow: "\u4EA7\u54C1\u8BBE\u8BA1 / 01", title: "\u4E3A\u4E0B\u4E00\u6B21\u51B3\u7B56\u8BBE\u8BA1\uFF0C\u800C\u4E0D\u662F\u4E3A\u4E0B\u4E00\u5F20\u622A\u56FE\u8BBE\u8BA1\u3002", description: "\u8BA9\u72B6\u6001\u6E05\u6670\u53EF\u8BFB\uFF0C\u9732\u51FA\u4E0B\u4E00\u6B65\u6709\u4EF7\u503C\u7684\u64CD\u4F5C\uFF0C\u53EA\u5728\u7EC6\u8282\u4F1A\u6539\u53D8\u51B3\u7B56\u65F6\u5C55\u5F00\u5B83\u3002",
      layers: [["01", "\u5B9A\u5411", "\u5148\u4EA4\u4EE3\u573A\u666F\u548C\u9996\u8981\u4FE1\u53F7\u3002"], ["02", "\u51B3\u7B56", "\u628A\u4F1A\u6539\u53D8\u7ED3\u679C\u7684\u884C\u52A8\u653E\u5728\u6D3B\u8DC3\u5C42\u3002"], ["03", "\u68C0\u67E5", "\u628A\u6765\u6E90\u3001\u914D\u7F6E\u548C\u4F8B\u5916\u653E\u5728\u9644\u8FD1\u3002"]],
      interactionTitle: "\u4EA4\u4E92\u5E94\u5F53\u6784\u6210\u4E00\u4E2A\u95ED\u73AF\u3002", interaction: [["\u610F\u56FE", "\u7528\u6237\u64CD\u4F5C\u8868\u8FBE\u4E00\u4E2A\u660E\u786E\u76EE\u6807\u3002"], ["\u54CD\u5E94", "\u754C\u9762\u7ACB\u5373\u786E\u8BA4\u8F93\u5165\uFF0C\u4E0D\u9690\u85CF\u5F53\u524D\u72B6\u6001\u3002"], ["\u63D0\u4EA4", "\u72B6\u6001\u6E05\u6670\u5730\u843D\u5B9A\uFF0C\u5E76\u4FDD\u7559\u6062\u590D\u8DEF\u5F84\u3002"]],
      avoidTitle: "\u9700\u8981\u907F\u514D\u7684\u53CD\u6A21\u5F0F", avoid: "\u4E0D\u8981\u8BA9\u6240\u6709\u53EF\u7528\u64CD\u4F5C\u62E5\u6709\u540C\u7B49\u97F3\u91CF\u3002",
    },
    motionLab: { eyebrow: "\u52A8\u6548\u5B9E\u8DF5", title: "\u52A8\u6548\u5E94\u5728\u53D8\u5316\u4E2D\u4FDD\u7559\u65B9\u5411\u611F\u3002", description: "\u4F7F\u7528\u4E00\u4E2A\u8D77\u70B9\u3001\u4E00\u4E2A\u7EC8\u70B9\u548C\u4E00\u4E2A\u660E\u786E\u7684\u7A7A\u95F4\u7EBF\u7D22\u3002", trigger: "\u91CD\u65B0\u64AD\u653E\u8FC7\u6E21", rest: "\u9759\u6B62", intent: "\u610F\u56FE", settle: "\u843D\u5B9A" },
  },
} as const;

const principles = [
  ["Signal before spectacle", "Use color, glow, and motion to reveal state or action. Decoration never competes with data."],
  ["Depth without weight", "Layer translucency, borders, and soft shadows into one surface. Avoid cards inside cards unless hierarchy changes."],
  ["Spatial, not ornamental", "Grid fields and restrained perspective make a workspace feel dimensional while content remains legible."],
  ["Progressive disclosure", "Keep the frame quiet. Reveal emphasis on intent: hover, selection, status change, or navigation."],
] as const;

const code = {
  panel: `<SignalPanel tone="default" className="p-6">
  <SignalSectionHeading
    eyebrow="System health"
    title="Operational signal"
    description="A calm surface with intent-led feedback."
  />
</SignalPanel>`,
  chip: `<SignalChip tone="signal">
  <CircleDot className="h-3 w-3" /> Live
</SignalChip>`,
  icon: `<SignalIconButton aria-label="Open command center">
  <Command className="h-4 w-4" />
</SignalIconButton>`,
  metric: `<SignalMetric
  label="Qualified sessions"
  value="18.4k"
  delta="+12.6%"
  tone="success"
/>`,
  progress: `<SignalProgress
  label="Verification coverage"
  value="76%"
  percent={76}
  tone="success"
/>`,
  row: `<SignalDataRow
  leading={<Archive className="h-4 w-4" />}
  label="Production release"
  description="Ready to publish"
  meta="2m ago"
  trailing={<SignalChip tone="success">Ready</SignalChip>}
/>`,
  motion: `import { motion } from "motion/react";
import { signalMotion } from "@/design-system";

<motion.div {...signalMotion.reveal}>
  <SignalPanel className="p-6">...</SignalPanel>
</motion.div>`,
  spatial: `import { AnimatePresence, motion } from "motion/react";
import { signalMotion } from "@/design-system";

<AnimatePresence initial={false} mode="popLayout">
  <motion.article
    key={activeId}
    layout="position"
    {...signalMotion.spatial}
  >
    <WorkspaceCard item={activeItem} />
  </motion.article>
</AnimatePresence>`,
  gesture: `const dragTransition = {
  ...signalMotion.emphasis,
  duration: 0.22,
};

<motion.button
  drag="x"
  dragConstraints={{ left: 0, right: 0 }}
  dragElastic={0.08}
  onDragEnd={(_, info) =>
    Math.abs(info.offset.x) > 72 ? changeCard(info.offset.x) : undefined
  }
  transition={dragTransition}
/>`,
};

function DocCode({ children }: { children: string }) {
  return <CodeBlock code={children} label="TSX" />;
}

function DocSection({ id, children }: { id: string; children: ReactNode }) {
  return <section id={id} className="scroll-mt-20 space-y-6 lg:scroll-mt-8">{children}</section>;
}

function ComponentSpec({ title, description, preview, children }: { title: string; description: string; preview: ReactNode; children: string }) {
  return (
    <SignalPanel interactive={false} tone="quiet" className="overflow-visible">
      <div className="grid min-h-72 min-w-0 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex min-h-48 min-w-0 items-center justify-center border-b border-white/[0.07] bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.11),transparent_64%)] p-8 lg:min-h-72 lg:border-b-0 lg:border-r">
          {preview}
        </div>
        <div className="flex min-w-0 flex-col justify-between">
          <div className="p-6">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-red-400">Component</p>
            <h3 className="text-xl font-semibold tracking-tight text-white">{title}</h3>
            <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-400">{description}</p>
          </div>
          <DocCode>{children}</DocCode>
        </div>
      </div>
    </SignalPanel>
  );
}

export function DesignSystemApp() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [locale, setLocale] = useState<Locale>(() => {
    const storedLocale = window.localStorage.getItem("signalframe-locale");
    return storedLocale === "zh" || (!storedLocale && navigator.language.toLowerCase().startsWith("zh")) ? "zh" : "en";
  });
  const copy = localeCopy[locale];

  useEffect(() => {
    const scrollToHash = () => {
      const id = window.location.hash.slice(1);
      if (!id) return;
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: "start" }));
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
    window.localStorage.setItem("signalframe-locale", locale);
  }, [locale]);

  return (
    <div className="sf-docs-canvas min-h-screen text-neutral-200">
      <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-neutral-950/78 px-5 py-3 backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="#top" className="flex items-center gap-2 font-mono text-xs tracking-[0.18em] text-white">
            <span className="grid h-7 w-7 place-items-center rounded-lg border border-red-500/30 bg-red-500/10 text-red-300"><ScanLine className="h-4 w-4" /></span>
            SIGNALFRAME
          </a>
          <div className="flex items-center gap-2">
            <button type="button" className="sf-lang-toggle inline-flex h-8 items-center gap-1 rounded-lg border border-white/[0.09] bg-white/[0.03] px-2 font-mono text-[10px] tracking-[0.12em] text-neutral-300 transition-colors hover:border-red-500/35 hover:text-white" onClick={() => setLocale((current) => current === "en" ? "zh" : "en")} aria-label={`Switch language to ${copy.language}`}>
              <Languages className="h-3.5 w-3.5 text-red-300" /> {copy.languageShort}
            </button>
            <SignalIconButton aria-label="Toggle documentation navigation" onClick={() => setMenuOpen((open) => !open)} active={menuOpen} className="h-8 w-8 rounded-lg">
            <Menu className="h-4 w-4" />
            </SignalIconButton>
          </div>
        </div>
        {menuOpen && <Navigation locale={locale} className="mt-4 border-t border-white/[0.07] pt-4" />}
      </header>

      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[264px_minmax(0,1fr)]">
        <aside className="sticky top-0 hidden h-screen flex-col border-r border-white/[0.07] px-6 py-8 lg:flex">
          <a href="#top" className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 shadow-[0_0_30px_-10px_rgba(239,68,68,0.65)]"><ScanLine className="h-5 w-5" /></span>
            <span><span className="block font-mono text-xs tracking-[0.18em] text-white">SIGNALFRAME</span><span className="mt-1 block text-[10px] uppercase tracking-[0.16em] text-neutral-600">{copy.mobileLabel}</span></span>
          </a>
          <Navigation locale={locale} className="sf-docs-nav-scroll mt-12 min-h-0 flex-1 overflow-y-auto pb-8" />
          <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-5"><span className="font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-600">v0.1 / portable core</span><button type="button" className="sf-lang-toggle inline-flex items-center gap-1 font-mono text-[10px] tracking-[0.12em] text-neutral-400 hover:text-white" onClick={() => setLocale((current) => current === "en" ? "zh" : "en")}><Languages className="h-3.5 w-3.5 text-red-300" /> {copy.languageShort}</button></div>
        </aside>

        <main id="top" className="min-w-0 px-5 py-10 sm:px-8 lg:px-14 lg:py-16">
          <div className="mx-auto max-w-5xl space-y-24">
            <section className="relative overflow-hidden border-b border-white/[0.08] pb-16">
              <div className="absolute -right-24 top-4 hidden h-64 w-64 rounded-full border border-red-500/10 bg-red-500/[0.03] blur-2xl md:block" />
              <SignalChip tone="signal"><CircleDot className="h-3 w-3" /> {copy.eyebrow}</SignalChip>
              <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.055em] text-white sm:text-7xl">{copy.hero}</h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-neutral-400 sm:text-lg">{copy.intro}</p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a href="#principles" className="inline-flex items-center gap-2 rounded-xl border border-red-500/35 bg-red-500/10 px-4 py-2.5 text-sm text-red-100 transition-colors hover:bg-red-500/20">{copy.read} <ArrowUpRight className="h-4 w-4" /></a>
                <a href="#components" className="sf-docs-link inline-flex items-center gap-2 px-2 py-2.5 text-sm">{copy.inspect} <MoveUpRight className="h-4 w-4" /></a>
              </div>
            </section>

            <DocSection id="principles">
              <SignalSectionHeading eyebrow="Foundations / 01" title="Principles" description="The rules that make the system recognizable across focused workspaces and data-rich interfaces." />
              <div className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] md:grid-cols-2">
                {principles.map(([title, description], index) => (
                  <div key={title} className="bg-neutral-950/75 p-6 transition-colors hover:bg-neutral-900/65">
                    <span className="font-mono text-[10px] tracking-[0.18em] text-red-400">0{index + 1}</span>
                    <h3 className="mt-5 text-lg font-medium text-white">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-neutral-400">{description}</p>
                  </div>
                ))}
              </div>
            </DocSection>

            <DocSection id="foundations">
              <SignalSectionHeading eyebrow="Foundations / 02" title="Color, depth, and type" description="Neutral surfaces keep attention available for one signal color. The mono face labels systems; the sans face carries content." />
              <div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
                <SignalPanel interactive={false} tone="quiet" className="p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">Signal scale</p>
                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[["Canvas", "#09090b", "bg-neutral-950"], ["Surface", "58% neutral", "bg-neutral-900/55"], ["Line", "8% white", "bg-white/10"], ["Signal", "#ef4444", "bg-red-500"]].map(([label, value, color]) => <div key={label} className="space-y-3"><div className={`h-16 rounded-xl border border-white/10 ${color}`} /><div><p className="text-sm text-white">{label}</p><p className="font-mono text-[10px] text-neutral-500">{value}</p></div></div>)}
                  </div>
                </SignalPanel>
                <SignalPanel interactive={false} tone="quiet" className="p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">Spacing rhythm</p>
                  <div className="mt-7 space-y-4 font-mono text-xs text-neutral-400">
                    {[["04", "4px", "w-4"], ["12", "12px", "w-12"], ["24", "24px", "w-24"], ["48", "48px", "w-48"]].map(([token, value, width]) => <div key={token} className="flex items-center gap-3"><span className="w-5 text-red-400">{token}</span><div className={`h-px ${width} bg-red-400/80`} /><span>{value}</span></div>)}
                  </div>
                </SignalPanel>
              </div>
            </DocSection>

            <DocSection id="typography">
              <SignalSectionHeading eyebrow={copy.typography.eyebrow} title={copy.typography.title} description={copy.typography.description} />
              <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
                <SignalPanel interactive={false} tone="quiet" className="p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-red-400">Type roles</p>
                  <div className="mt-6 space-y-5"><FontSpec item={copy.typography.ui} /><FontSpec item={copy.typography.cjk} /><FontSpec item={copy.typography.mono} /></div>
                </SignalPanel>
                <SignalPanel interactive={false} tone="quiet" className="overflow-hidden">
                  <div className="p-6"><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-red-400">{copy.typography.ruleTitle}</p><p className="mt-4 max-w-xl text-sm leading-7 text-neutral-300">{copy.typography.rule}</p><div className="mt-7 border-l border-red-400/60 pl-5"><p className="text-3xl font-semibold tracking-[-0.045em] text-white">Operational clarity</p><p className="mt-3 text-base leading-7 text-neutral-400">{"\u5C06\u590D\u6742\u72B6\u6001\u8F6C\u5316\u4E3A\u53EF\u5224\u65AD\u7684\u4FE1\u606F\u3002"}</p><p className="mt-5 font-mono text-[11px] tracking-[0.14em] text-red-300">SYNC / 09:42 / HEALTHY</p></div></div>
                  <CodeBlock language="css" label="CSS" code={`@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Noto+Sans+SC:wght@400;500;600;700&display=swap");\n\n:root {\n  --sf-font-sans: "Manrope", "Noto Sans SC", sans-serif;\n  --sf-font-mono: "JetBrains Mono", "Cascadia Code", monospace;\n}`} />
                </SignalPanel>
              </div>
            </DocSection>

            <DocSection id="motion">
              <SignalSectionHeading eyebrow="Foundations / 03" title="Motion and spatial depth" description="Signalframe treats motion as a state transition. It should clarify origin, hierarchy, or completion, never decorate an idle screen." />
              <div className="grid gap-4 md:grid-cols-3">
                <RuleCard index="01" title="Rest before motion" body="The default state must be complete and useful. Hover and focus may add a 180-300ms emphasis layer, not move core content." />
                <RuleCard index="02" title="One depth plane" body="A page can use a quiet canvas, one raised surface plane, and content lifted inside it. Do not stack multiple blur cards to fake hierarchy." />
                <RuleCard index="03" title="Respect reduced motion" body="Animation must yield to reduced-motion preferences. Keep color, focus, and information hierarchy intact when transforms disappear." />
              </div>
              <SignalPanel interactive={false} tone="quiet" className="p-6">
                <div className="grid gap-6 md:grid-cols-[0.75fr_1.25fr] md:items-center">
                  <div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-red-400">Timing ladder</p><p className="mt-3 text-lg font-medium text-white">Short for feedback. Longer for spatial change.</p></div>
                  <div className="space-y-4">
                    <MotionRule duration="120-180ms" label="Color, border, icon feedback" width="w-1/3" />
                    <MotionRule duration="220-320ms" label="Surface emphasis, toolbar state, disclosure" width="w-1/2" />
                    <MotionRule duration="360-500ms" label="Route, card stack, or large layout transition" width="w-3/4" />
                  </div>
                </div>
              </SignalPanel>
              <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                <SignalPanel interactive={false} tone="quiet" className="p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-red-400">Motion grammar</p>
                  <div className="mt-5 divide-y divide-white/[0.07]">
                    <MotionRecipe trigger="Pointer intent" preset="feedback" duration="180ms" output="Border, signal field, icon emphasis. No layout shift." />
                    <MotionRecipe trigger="New content" preset="reveal" duration="320ms" output="Opacity plus a 12px vertical settle. Stagger only siblings." />
                    <MotionRecipe trigger="Context switch" preset="spatial" duration="420ms" output="A single outgoing and incoming plane; keep the destination opaque." />
                    <MotionRecipe trigger="Reorder / carousel" preset="spatial" duration="420ms" output="Animate between measured resting positions, never toward guessed offsets." />
                  </div>
                </SignalPanel>
                <SignalPanel interactive={false} tone="quiet" className="p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-red-400">Lifecycle</p>
                  <div className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-500"><MotionStep label="Rest" /><span className="h-px flex-1 bg-red-500/30" /><MotionStep label="Intent" active /><span className="h-px flex-1 bg-red-500/30" /><MotionStep label="Commit" /><span className="h-px flex-1 bg-red-500/30" /><MotionStep label="Settle" /></div>
                  <p className="mt-7 text-sm leading-6 text-neutral-400">The visual response starts from a user action or a meaningful state change. Motion must resolve into a stable rest state; a loop is reserved for an active process that needs ongoing attention.</p>
                  <div className="mt-5 rounded-xl border border-red-500/15 bg-red-500/[0.04] p-4 text-xs leading-5 text-neutral-300"><span className="font-mono text-[10px] uppercase tracking-[0.14em] text-red-300">Guardrail</span><p className="mt-2">Do not combine a scale, blur, large translation, and opacity transition on the same content layer. Choose one spatial cue and let hierarchy do the rest.</p></div>
                </SignalPanel>
              </div>
              <SignalPanel interactive={false} tone="command" className="overflow-visible">
                <div className="grid min-w-0 lg:grid-cols-[0.85fr_1.15fr]">
                  <div className="p-6"><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-red-400">Portable presets</p><h3 className="mt-3 text-lg font-medium text-white">Use a named preset before designing a one-off transition.</h3><p className="mt-3 text-sm leading-6 text-neutral-400">The exported presets keep timing and easing coherent across Motion components while leaving the component responsible for its own layout and state.</p><div className="mt-5 flex flex-wrap gap-2"><SignalChip tone="signal">feedback</SignalChip><SignalChip>emphasis</SignalChip><SignalChip>reveal</SignalChip><SignalChip>spatial</SignalChip></div></div>
                  <DocCode>{code.motion}</DocCode>
                </div>
              </SignalPanel>
              <div className="grid min-w-0 gap-4 xl:grid-cols-[1.1fr_0.9fr]">
                <SignalPanel interactive={false} tone="quiet" className="min-w-0">
                  <div className="min-w-0 p-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-red-400">Spatial handoff</p>
                    <h3 className="mt-3 text-lg font-medium text-white">Animate from real geometry, then settle into the same geometry.</h3>
                    <p className="mt-3 text-sm leading-6 text-neutral-400">For carousels, reordering, and stacked surfaces, let layout measurement describe the resting position. The next surface should already have its final background, depth, and content before it moves into view. Never use a temporary animation-only card style.</p>
                    <ol className="mt-5 grid gap-3 text-sm leading-6 text-neutral-300 sm:grid-cols-3"><MotionGuideline index="01" title="Stage" body="Render the destination at its final visual fidelity." /><MotionGuideline index="02" title="Exchange" body="Move only the surfaces changing hierarchy." /><MotionGuideline index="03" title="Settle" body="Remove transition state without a second layout jump." /></ol>
                  </div>
                  <DocCode>{code.spatial}</DocCode>
                </SignalPanel>
                <SignalPanel interactive={false} tone="quiet" className="min-w-0">
                  <div className="min-w-0 p-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-red-400">Direct manipulation</p>
                    <h3 className="mt-3 text-lg font-medium text-white">Pointer input leads; the interface follows.</h3>
                    <p className="mt-3 text-sm leading-6 text-neutral-400">A dragged layer tracks the pointer directly. On release, use one short commit or return motion. Hover can fan a card stack from its hinge, but it must never leave the resting state changed after pointer exit.</p>
                    <ul className="mt-5 space-y-2 text-sm leading-6 text-neutral-300"><li>Set a visible threshold before committing a directional change.</li><li>Disable a second navigation action until the current commit resolves.</li><li>Keep keyboard and button navigation equivalent to the gesture.</li></ul>
                  </div>
                  <DocCode>{code.gesture}</DocCode>
                </SignalPanel>
              </div>
              <SignalPanel interactive={false} tone="quiet" className="p-6">
                <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                  <div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-red-400">Interruption policy</p><h3 className="mt-3 text-lg font-medium text-white">A new intent replaces an unfinished one.</h3><p className="mt-3 text-sm leading-6 text-neutral-400">Animation is not a queue. If the user reverses direction, calculate from the current rendered position and commit in the new direction immediately; do not replay a stale first frame.</p></div>
                  <div className="grid gap-3 sm:grid-cols-3"><GuidanceState tone="signal" title="Navigation" body="Use the latest direction. Preserve the in-flight surface only long enough to bridge geometry." /><GuidanceState tone="warning" title="Async state" body="Keep the last confirmed value visible; reserve looping motion for an active request with a label." /><GuidanceState tone="quiet" title="Text and metrics" body="Prefer an instant update or a single highlighted delta. Never make scan-critical content chase its position." /></div>
                </div>
              </SignalPanel>
              <div className="grid gap-4 md:grid-cols-2">
                <SignalPanel interactive={false} tone="quiet" className="p-6"><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-300">Use motion when</p><ul className="mt-5 space-y-2 text-sm leading-6 text-neutral-300"><li>It connects a trigger to a changed state.</li><li>It shows where content came from or where it went.</li><li>It explains progress, completion, or replacement.</li><li>The static state still communicates the full result.</li></ul></SignalPanel>
                <SignalPanel interactive={false} tone="quiet" className="p-6"><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-red-300">Do not animate</p><ul className="mt-5 space-y-2 text-sm leading-6 text-neutral-300"><li>Text that is frequently scanned for updates.</li><li>Every card on route entry or every list item on filter change.</li><li>Values whose stable alignment matters more than novelty.</li><li>Hidden content merely because it can be made to move.</li></ul></SignalPanel>
              </div>
              <SignalPanel interactive={false} tone="quiet" className="p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-red-400">Reduced-motion contract</p>
                <div className="mt-4 grid gap-5 md:grid-cols-[0.85fr_1.15fr] md:items-start"><p className="text-sm leading-6 text-neutral-400">When a user requests reduced motion, remove transforms, large opacity fades, autonomous loops, and depth effects. Preserve instant state changes, focus treatment, status color, and all content ordering.</p><DocCode>{`@media (prefers-reduced-motion: reduce) {\n  *, *::before, *::after {\n    animation-duration: 1ms !important;\n    transition-duration: 1ms !important;\n    scroll-behavior: auto !important;\n  }\n}`}</DocCode></div>
              </SignalPanel>
              <MotionLab copy={copy.motionLab} />
            </DocSection>

            <DocSection id="product-design">
              <SignalSectionHeading eyebrow={copy.product.eyebrow} title={copy.product.title} description={copy.product.description} />
              <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
                <SignalPanel interactive={false} tone="quiet" className="p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-red-400">Decision architecture</p>
                  <div className="mt-6 space-y-1 border-l border-white/[0.09] pl-5">{copy.product.layers.map(([index, title, body]) => <div key={title} className="relative py-4"><span className="absolute -left-[29px] top-6 h-2 w-2 rounded-full border border-red-400/70 bg-neutral-950" /><span className="font-mono text-[10px] tracking-[0.14em] text-red-400">{index}</span><h3 className="mt-2 text-base font-medium text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-neutral-400">{body}</p></div>)}</div>
                </SignalPanel>
                <SignalPanel interactive={false} tone="quiet" className="p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-red-400">{copy.product.interactionTitle}</p>
                  <div className="mt-6 grid gap-3">{copy.product.interaction.map(([title, body], index) => <div key={title} className="grid grid-cols-[44px_minmax(0,1fr)] gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4"><span className="font-mono text-xs text-red-400">0{index + 1}</span><div><h3 className="text-sm font-medium text-white">{title}</h3><p className="mt-1 text-xs leading-5 text-neutral-400">{body}</p></div></div>)}</div>
                  <div className="mt-5 rounded-xl border border-red-500/15 bg-red-500/[0.04] p-4"><p className="font-mono text-[10px] uppercase tracking-[0.14em] text-red-300">{copy.product.avoidTitle}</p><p className="mt-2 text-sm leading-6 text-neutral-300">{copy.product.avoid}</p></div>
                </SignalPanel>
              </div>
            </DocSection>

            <DocSection id="accessibility">
              <SignalSectionHeading eyebrow="Foundations / 04" title="Accessible by default" description="A dark system gains quality from clarity, not from low contrast. Every signal needs a non-color equivalent." />
              <div className="grid gap-4 md:grid-cols-2">
                <SignalPanel interactive={false} tone="quiet" className="p-6"><div className="flex items-start gap-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-300"><ShieldCheck className="h-5 w-5" /></span><div><h3 className="text-sm font-medium text-white">Required behavior</h3><ul className="mt-3 space-y-2 text-sm leading-6 text-neutral-400"><li>Every icon-only action has an accessible label.</li><li>Focus rings remain visible on transparent controls.</li><li>Status combines color with label, icon, or position.</li><li>Progress has a programmatic value and name.</li></ul></div></div></SignalPanel>
                <SignalPanel interactive={false} tone="quiet" className="p-6"><div className="flex items-start gap-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-200"><MonitorSmartphone className="h-5 w-5" /></span><div><h3 className="text-sm font-medium text-white">Responsive baseline</h3><ul className="mt-3 space-y-2 text-sm leading-6 text-neutral-400"><li>Keep an action's touch target at least 40px square.</li><li>Collapse rails before shrinking readable content.</li><li>Allow code blocks to scroll locally, never the page.</li><li>Preserve reading order when grids reflow.</li></ul></div></div></SignalPanel>
              </div>
            </DocSection>

            <DocSection id="components">
              <SignalSectionHeading eyebrow="Components / 03" title="Portable primitives" description="All components are source-owned under src/design-system and rendered by this documentation site directly." />
              <div className="space-y-5">
                <ComponentSpec title="SignalPanel" description="The primary surface. It combines a translucent neutral base, hairline border, input-led radial signal, and a single depth layer." preview={<SignalPanel className="w-full max-w-sm p-5"><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-red-400">Realtime</p><p className="mt-4 text-2xl font-semibold tracking-tight text-white">Noisy data. Quiet frame.</p><p className="mt-2 text-sm leading-6 text-neutral-400">Hover to reveal the signal field.</p></SignalPanel>}>{code.panel}</ComponentSpec>
                <ComponentSpec title="SignalChip" description="A compact status label. Use a semantic tone for live state, risk, success, or a quiet metadata label. Do not use it as primary navigation." preview={<div className="flex flex-wrap justify-center gap-2"><SignalChip tone="signal"><CircleDot className="h-3 w-3" /> Live</SignalChip><SignalChip tone="success"><Check className="h-3 w-3" /> Ready</SignalChip><SignalChip tone="warning">Review</SignalChip><SignalChip>Draft</SignalChip></div>}>{code.chip}</ComponentSpec>
                <ComponentSpec title="SignalIconButton" description="A single-action control for dense toolbars. The icon must have an accessible label; an active state means the tool is currently selected, not merely hovered." preview={<div className="flex gap-3"><SignalIconButton aria-label="Open command center" active><Command className="h-4 w-4" /></SignalIconButton><SignalIconButton aria-label="Copy component code"><Copy className="h-4 w-4" /></SignalIconButton><SignalIconButton aria-label="Open layers"><Layers3 className="h-4 w-4" /></SignalIconButton></div>}>{code.icon}</ComponentSpec>
                <ComponentSpec title="SignalSectionHeading" description="A divider that establishes scanning hierarchy without enclosing a new card. Prefer it over nested panels when content is already inside a surface." preview={<div className="w-full max-w-sm"><SignalSectionHeading eyebrow="System / active" title="Command history" description="A title, a quiet explanation, and optional actions share one line of hierarchy." action={<SignalChip tone="signal">04 events</SignalChip>} /></div>}>{`<SignalSectionHeading\n  eyebrow="System / active"\n  title="Command history"\n  description="A title, a quiet explanation, and optional actions."\n/>`}</ComponentSpec>
              </div>
            </DocSection>

            <DocSection id="data-components">
              <SignalSectionHeading eyebrow="Components / 04" title="Data and operational states" description="These primitives express the pieces most often repeated in dashboards, portfolios, and review tools without forcing a product-specific layout." />
              <div className="space-y-5">
                <ComponentSpec title="SignalMetric" description="A metric is a primary data point, not a decorative number. Pair it with a stable label; use a color tone only when the value itself carries semantic state." preview={<div className="grid w-full max-w-sm grid-cols-2 gap-7"><SignalMetric label="Qualified sessions" value="18.4k" delta="+12.6%" tone="success" detail="Compared with last week" /><SignalMetric label="Median latency" value="164ms" delta="-21ms" tone="signal" detail="p95 response time" /></div>}>{code.metric}</ComponentSpec>
                <ComponentSpec title="SignalProgress" description="Progress is for bounded completion, coverage, or capacity. Do not use it to imply a percentage when a task has no measurable end state." preview={<div className="w-full max-w-sm space-y-5"><SignalProgress label="Verification coverage" value="76%" percent={76} tone="success" /><SignalProgress label="Migration readiness" value="42%" percent={42} tone="warning" /><SignalProgress label="Active runtime" value="98%" percent={98} /></div>}>{code.progress}</ComponentSpec>
                <ComponentSpec title="SignalDataRow" description="A dense row preserves scan order: identity first, descriptive context second, quiet metadata third, and actionable or semantic state at the edge." preview={<div className="w-full max-w-sm"><SignalDataRow leading={<Archive className="h-4 w-4" />} label="Production release" description="Ready to publish" meta="2m ago" trailing={<SignalChip tone="success">Ready</SignalChip>} /><SignalDataRow leading={<Activity className="h-4 w-4" />} label="Quality gate" description="Awaiting review" meta="14m ago" trailing={<SignalChip tone="warning">Review</SignalChip>} /></div>}>{code.row}</ComponentSpec>
                <ComponentSpec title="SignalEmptyState" description="An empty state explains what is absent, why it matters, and the single next action when one exists. It occupies one quiet surface rather than creating a modal interruption." preview={<SignalPanel interactive={false} tone="quiet" className="w-full max-w-sm"><SignalEmptyState icon={<Inbox className="h-5 w-5" />} title="No deployments yet" description="Connect a project or publish a first release to populate this stream." action={<button type="button" className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-100">Connect project</button>} /></SignalPanel>}>{`<SignalEmptyState\n  icon={<Inbox className="h-5 w-5" />}\n  title="No deployments yet"\n  description="Connect a project to populate this stream."\n/>`}</ComponentSpec>
                <ComponentSpec title="SignalToolbar" description="Toolbars group adjacent controls, not every page action. A toolbar should be compact, keyboard reachable, and visually subordinate to the content it manipulates." preview={<SignalToolbar label="Canvas tools"><SignalIconButton aria-label="Open filters" active><ListFilter className="h-4 w-4" /></SignalIconButton><SignalIconButton aria-label="Open display settings"><SlidersHorizontal className="h-4 w-4" /></SignalIconButton><span className="mx-1 h-5 w-px bg-white/10" /><SignalChip>Compact</SignalChip></SignalToolbar>}>{`<SignalToolbar label="Canvas tools">\n  <SignalIconButton aria-label="Open filters">...</SignalIconButton>\n  <SignalIconButton aria-label="Open display settings">...</SignalIconButton>\n</SignalToolbar>`}</ComponentSpec>
              </div>
            </DocSection>

            <DocSection id="patterns">
              <SignalSectionHeading eyebrow="Patterns / 04" title="Composition rules" description="These patterns preserve the system's character when primitives become a product interface." />
              <div className="grid gap-4 md:grid-cols-3">
                <Pattern icon={<Command />} title="Command header" body="Place identity and context on one axis. Keep tools compact and visually secondary." />
                <Pattern icon={<Box />} title="Data canvas" body="Use one wide grid with uneven spans. Let content density, not decoration, create rhythm." />
                <Pattern icon={<Sparkles />} title="Earned motion" body="Use 180-500ms transitions for feedback. Reserve spring and depth shifts for navigation or spatial change." />
              </div>
              <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
                <SignalPanel interactive={false} tone="quiet" className="p-5 sm:p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-red-400">Layout / command header</p>
                  <div className="mt-5 flex flex-col gap-5 border-b border-white/[0.07] pb-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-center gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-red-500/25 bg-red-500/10 text-red-300"><LayoutDashboard className="h-5 w-5" /></span><div className="min-w-0"><h3 className="truncate text-lg font-medium text-white">Revenue operations</h3><p className="truncate text-xs text-neutral-500">April 2026 / production workspace</p></div></div>
                    <SignalToolbar label="Revenue workspace actions"><SignalIconButton aria-label="Open workspace filters"><ListFilter className="h-4 w-4" /></SignalIconButton><SignalIconButton aria-label="Open workspace settings"><SlidersHorizontal className="h-4 w-4" /></SignalIconButton></SignalToolbar>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-neutral-400">Identity, context, and tools share one horizontal plane. On small screens, tools wrap below rather than compressing the title.</p>
                </SignalPanel>
                <SignalPanel interactive={false} tone="quiet" className="p-5 sm:p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-red-400">Layout / inspector rail</p>
                  <div className="mt-5 grid min-h-36 grid-cols-[1fr_104px] gap-3">
                    <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4"><div className="h-2 w-24 rounded bg-white/10" /><div className="mt-4 grid grid-cols-3 gap-2"><span className="h-12 rounded-lg bg-red-500/10" /><span className="h-12 rounded-lg bg-white/[0.04]" /><span className="h-12 rounded-lg bg-white/[0.04]" /></div></div>
                    <div className="rounded-xl border border-red-500/15 bg-red-500/[0.04] p-3"><div className="h-2 w-12 rounded bg-red-400/50" /><div className="mt-4 space-y-2"><div className="h-2 rounded bg-white/10" /><div className="h-2 w-4/5 rounded bg-white/10" /><div className="h-2 w-3/5 rounded bg-white/10" /></div></div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-neutral-400">Use a rail for persistent comparison or inspection. It is a sibling layout region, never another floating card inside the canvas.</p>
                </SignalPanel>
              </div>
              <SignalPanel interactive={false} tone="quiet" className="p-5 sm:p-6">
                <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-red-400">Layout / adaptive data canvas</p><h3 className="mt-3 text-lg font-medium text-white">Span by information density, not visual symmetry.</h3></div><SignalChip tone="quiet"><Rows3 className="h-3 w-3" /> 12-column desktop / single-column mobile</SignalChip></div>
                <div className="mt-6 grid gap-3 md:grid-cols-6"><div className="md:col-span-4"><SignalPanel interactive={false} tone="default" className="p-4"><div className="flex items-center justify-between"><SignalMetric label="Qualified pipeline" value="$482k" delta="+8.4%" tone="success" /><BarChart3 className="h-8 w-8 text-red-400/60" /></div><div className="mt-5 grid grid-cols-3 gap-2"><span className="h-10 rounded-lg bg-red-500/15" /><span className="h-10 rounded-lg bg-red-500/10" /><span className="h-10 rounded-lg bg-red-500/5" /></div></SignalPanel></div><div className="md:col-span-2"><SignalPanel interactive={false} tone="quiet" className="p-4"><Gauge className="h-5 w-5 text-amber-200" /><p className="mt-5 text-sm font-medium text-white">Review queue</p><p className="mt-1 text-xs text-neutral-500">14 items waiting</p></SignalPanel></div></div>
              </SignalPanel>
            </DocSection>

            <DocSection id="guidance">
              <SignalSectionHeading eyebrow="Guidance / 05" title="Write and compose with intent" description="The system is portable because it defines decisions, not because every screen looks the same. Use these rules before introducing a new primitive." />
              <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
                <SignalPanel interactive={false} tone="quiet" className="p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-red-400">Content hierarchy</p>
                  <div className="mt-5 space-y-5"><HierarchyRow level="Primary" style="text-xl font-semibold tracking-tight text-white" use="Names, current value, or decision-driving status." /><HierarchyRow level="Supporting" style="text-sm text-neutral-300" use="Context that changes interpretation of the primary signal." /><HierarchyRow level="Quiet" style="font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-500" use="Timestamps, identifiers, stable labels, and provenance." /></div>
                </SignalPanel>
                <SignalPanel interactive={false} tone="quiet" className="p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-red-400">State and feedback</p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2"><GuidanceState tone="signal" title="Signal" body="A live condition, key action, or state requiring attention." /><GuidanceState tone="success" title="Success" body="A completed or healthy condition; retain a label, not color alone." /><GuidanceState tone="warning" title="Warning" body="A recoverable risk or review point; describe the next action." /><GuidanceState tone="quiet" title="Quiet" body="Metadata with no need to compete for attention." /></div>
                </SignalPanel>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <SignalPanel interactive={false} tone="quiet" className="p-6"><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-300">Do</p><ul className="mt-5 space-y-3 text-sm leading-6 text-neutral-300"><li>Give the page one obvious data or identity anchor.</li><li>Use a border or tonal shift before introducing a shadow.</li><li>Let nearby controls share a toolbar; keep global actions outside it.</li><li>Use the grid to align information, not to decorate empty space.</li></ul></SignalPanel>
                <SignalPanel interactive={false} tone="quiet" className="p-6"><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-red-300">Avoid</p><ul className="mt-5 space-y-3 text-sm leading-6 text-neutral-300"><li>Nested translucent cards that create no new hierarchy.</li><li>Permanent red glow across every surface or metric.</li><li>Entrance motion for content users are repeatedly scanning.</li><li>Forcing desktop card density onto a narrow viewport.</li></ul></SignalPanel>
              </div>
              <SignalPanel interactive={false} tone="command" className="p-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"><div><SignalChip tone="signal">Adoption checklist</SignalChip><p className="mt-4 text-xl font-medium tracking-tight text-white">Copy tokens, then primitives, then patterns.</p><p className="mt-2 max-w-xl text-sm leading-6 text-neutral-400">Do not start by copying a finished dashboard. First establish the color, type, spacing, focus, and state contracts that make components interoperable.</p></div><ol className="space-y-2 font-mono text-xs leading-6 text-neutral-400"><li><span className="mr-3 text-red-400">01</span>Import tokens.css into the application stylesheet.</li><li><span className="mr-3 text-red-400">02</span>Move only the primitives required by the product.</li><li><span className="mr-3 text-red-400">03</span>Validate keyboard, reduced-motion, and small-screen behavior.</li><li><span className="mr-3 text-red-400">04</span>Compose a new pattern only when hierarchy changes.</li></ol></div>
              </SignalPanel>
            </DocSection>

            <footer className="flex flex-col gap-3 border-t border-white/[0.08] py-10 font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-600 sm:flex-row sm:items-center sm:justify-between"><span>Signalframe / MikkoAyaka</span><span>{copy.footer}</span></footer>
          </div>
        </main>
      </div>
    </div>
  );
}

function Navigation({ locale, className = "" }: { locale: Locale; className?: string }) {
  const navigation = localeCopy[locale].nav;

  return (
    <nav className={`space-y-7 ${className}`} aria-label="Signalframe documentation">
      {navigation.map(([label, items]) => (
        <div key={label}>
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-600">{label}</p>
          <div className="space-y-2">{items.map(([item, anchor]) => <a key={item} href={`#${anchor}`} className="sf-docs-link block text-sm">{item}</a>)}</div>
        </div>
      ))}
    </nav>
  );
}

function Pattern({ icon, title, body }: { icon: ReactNode; title: string; body: string }) {
  return <SignalPanel interactive={false} tone="quiet" className="p-6"><span className="grid h-9 w-9 place-items-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-300">{icon}</span><h3 className="mt-7 text-base font-medium text-white">{title}</h3><p className="mt-3 text-sm leading-6 text-neutral-400">{body}</p></SignalPanel>;
}

function RuleCard({ index, title, body }: { index: string; title: string; body: string }) {
  return <SignalPanel interactive={false} tone="quiet" className="p-6"><span className="font-mono text-[10px] tracking-[0.18em] text-red-400">{index}</span><h3 className="mt-5 text-base font-medium text-white">{title}</h3><p className="mt-3 text-sm leading-6 text-neutral-400">{body}</p></SignalPanel>;
}

function MotionRule({ duration, label, width }: { duration: string; label: string; width: string }) {
  return <div className="grid grid-cols-[78px_minmax(0,1fr)] items-center gap-4 font-mono text-[10px] uppercase tracking-[0.13em]"><span className="text-neutral-500">{duration}</span><div><div className={`h-1 ${width} rounded-full bg-red-400/80 shadow-[0_0_12px_rgba(248,113,113,0.35)]`} /><p className="mt-2 normal-case tracking-normal text-neutral-400">{label}</p></div></div>;
}

function MotionRecipe({ trigger, preset, duration, output }: { trigger: string; preset: string; duration: string; output: string }) {
  return <div className="grid gap-2 py-4 sm:grid-cols-[0.8fr_0.45fr_0.45fr_1.4fr] sm:items-center"><span className="text-sm text-white">{trigger}</span><SignalChip tone={preset === "spatial" ? "signal" : "quiet"}>{preset}</SignalChip><span className="font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-500">{duration}</span><span className="text-xs leading-5 text-neutral-400">{output}</span></div>;
}

function MotionStep({ label, active = false }: { label: string; active?: boolean }) {
  return <span className={`grid h-14 w-14 place-items-center rounded-xl border text-center leading-4 ${active ? "border-red-500/35 bg-red-500/10 text-red-200 shadow-[0_0_20px_-8px_rgba(239,68,68,0.7)]" : "border-white/[0.08] bg-white/[0.02] text-neutral-500"}`}>{label}</span>;
}

function MotionGuideline({ index, title, body }: { index: string; title: string; body: string }) {
  return <li className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4"><span className="font-mono text-[10px] tracking-[0.16em] text-red-400">{index}</span><p className="mt-3 font-medium text-white">{title}</p><p className="mt-2 text-xs leading-5 text-neutral-400">{body}</p></li>;
}

function FontSpec({ item }: { item: readonly [string, string, string] }) {
  const [role, family, description] = item;
  return <div className="grid grid-cols-[104px_minmax(0,1fr)] gap-4 border-b border-white/[0.07] pb-5 last:border-0 last:pb-0"><span className="font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-500">{role}</span><div><p className="text-lg font-semibold tracking-tight text-white">{family}</p><p className="mt-1 text-xs leading-5 text-neutral-400">{description}</p></div></div>;
}

function MotionLab({ copy }: { copy: { eyebrow: string; title: string; description: string; trigger: string; rest: string; intent: string; settle: string } }) {
  const [run, setRun] = useState(0);
  const [settled, setSettled] = useState(false);

  const replay = () => {
    setSettled(false);
    setRun((current) => current + 1);
  };

  return <SignalPanel interactive={false} tone="command" className="overflow-hidden p-6"><div className="grid gap-7 lg:grid-cols-[0.75fr_1.25fr] lg:items-center"><div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-red-400">{copy.eyebrow}</p><h3 className="mt-3 text-lg font-medium text-white">{copy.title}</h3><p className="mt-3 text-sm leading-6 text-neutral-400">{copy.description}</p><button type="button" onClick={replay} className="mt-5 inline-flex items-center gap-2 rounded-lg border border-red-500/35 bg-red-500/10 px-3 py-2 text-xs text-red-100 transition-colors hover:bg-red-500/20"><Sparkles className="h-3.5 w-3.5" /> {copy.trigger}</button></div><div className="relative min-h-48 overflow-hidden rounded-xl border border-white/[0.08] bg-black/20"><div className="absolute left-6 right-6 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-white/[0.06] via-red-500/45 to-white/[0.06]" /><div className="absolute left-6 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-neutral-500" /><div className="absolute right-6 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-red-300 shadow-[0_0_16px_rgba(248,113,113,0.7)]" /><div key={run} data-motion-card onAnimationEnd={() => setSettled(true)} className={`sf-motion-card ${run > 0 ? "sf-motion-card--moving" : ""}`}>{settled ? copy.settle : copy.intent}</div><div className="absolute bottom-4 left-6 right-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-600"><span>{copy.rest}</span><span>{copy.settle}</span></div></div></div></SignalPanel>;
}

function HierarchyRow({ level, style, use }: { level: string; style: string; use: string }) {
  return <div className="grid grid-cols-[78px_minmax(0,1fr)] gap-4"><span className="pt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-red-400">{level}</span><div><p className={style}>Example signal</p><p className="mt-1 text-xs leading-5 text-neutral-500">{use}</p></div></div>;
}

function GuidanceState({ tone, title, body }: { tone: "signal" | "success" | "warning" | "quiet"; title: string; body: string }) {
  return <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4"><SignalChip tone={tone}>{title}</SignalChip><p className="mt-3 text-xs leading-5 text-neutral-400">{body}</p></div>;
}
