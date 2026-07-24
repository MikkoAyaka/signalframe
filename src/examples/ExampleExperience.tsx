import { ArrowLeft, ChevronLeft, ChevronRight, Languages, ScanLine } from "lucide-react";
import { lazy, Suspense, useEffect } from "react";
import { SparxIconButton, SparxToolbar } from "../sparx-ui";

const HeroLandingExample = lazy(() => import("./HeroLandingExample").then((module) => ({ default: module.HeroLandingExample })));
const ImmersiveConsoleExample = lazy(() => import("./ImmersiveConsoleExample").then((module) => ({ default: module.ImmersiveConsoleExample })));
const ToolboxMenuExample = lazy(() => import("./ToolboxMenuExample").then((module) => ({ default: module.ToolboxMenuExample })));

export type ExamplePageId = "landing" | "console" | "toolbox";
type Locale = "en" | "zh";

const pages = ["landing", "console", "toolbox"] as const;

const copy = {
  en: {
    back: "Back to documentation",
    previous: "Previous example",
    next: "Next example",
    switchLanguage: "Switch language to Chinese",
    controls: "Example experience controls",
    languageShort: "ZH",
    mode: "Standalone experience",
    loading: "Loading experience...",
    landing: "Landing page",
    console: "Immersive console",
    toolbox: "Toolbox menu",
  },
  zh: {
    back: "\u8fd4\u56de\u8bbe\u8ba1\u6587\u6863",
    previous: "\u4e0a\u4e00\u4e2a\u793a\u4f8b",
    next: "\u4e0b\u4e00\u4e2a\u793a\u4f8b",
    switchLanguage: "\u5207\u6362\u8bed\u8a00\u81f3\u82f1\u6587",
    controls: "\u793a\u4f8b\u4f53\u9a8c\u63a7\u4ef6",
    languageShort: "EN",
    mode: "\u72ec\u7acb\u6c89\u6d78\u5f0f\u4f53\u9a8c",
    loading: "\u6b63\u5728\u52a0\u8f7d\u793a\u4f8b...",
    landing: "\u843d\u5730\u9875",
    console: "\u6c89\u6d78\u5f0f\u63a7\u5236\u53f0",
    toolbox: "\u5de5\u5177\u7bb1\u83dc\u5355",
  },
} as const;

const demos = {
  landing: HeroLandingExample,
  console: ImmersiveConsoleExample,
  toolbox: ToolboxMenuExample,
} as const;

export function ExampleExperience({ page, locale, onToggleLocale }: { page: ExamplePageId; locale: Locale; onToggleLocale: () => void }) {
  const index = pages.indexOf(page);
  const previous = pages[(index - 1 + pages.length) % pages.length];
  const next = pages[(index + 1) % pages.length];
  const t = copy[locale];
  const Demo = demos[page];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.matches("input, textarea, select, [contenteditable='true']")) return;

      if (event.key === "ArrowLeft") window.location.hash = `examples/${previous}`;
      if (event.key === "ArrowRight") window.location.hash = `examples/${next}`;
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, previous]);

  return (
    <div className="sparx-experience-canvas relative isolate min-h-screen overflow-x-hidden px-3 py-3 text-neutral-200 sm:px-5 sm:py-5 lg:px-8 lg:py-8">
      <div aria-hidden="true" className="sparx-grid pointer-events-none absolute inset-0 -z-10 opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent_72%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-0 -z-10 h-[34rem] w-[34rem] rounded-full bg-red-500/[0.11] blur-[8rem]" />

      <header className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/[0.09] bg-neutral-950/75 px-3 py-2.5 shadow-[0_18px_55px_-36px_rgba(0,0,0,0.95)] backdrop-blur-xl sm:px-4">
        <a href="#examples" className="group inline-flex min-h-10 items-center gap-2 rounded-xl px-2 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/[0.045] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300/80">
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-red-500/25 bg-red-500/10 text-red-200"><ArrowLeft className="h-4 w-4" /></span>
          <span className="hidden sm:block">{t.back}</span>
        </a>

        <div className="order-3 flex w-full items-center justify-between border-t border-white/[0.07] pt-2.5 sm:order-none sm:w-auto sm:justify-center sm:border-0 sm:pt-0">
          <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-neutral-500">
            <ScanLine className="h-3.5 w-3.5 text-red-300" />
            <span className="hidden md:inline">Sparx UI /</span> {String(index + 1).padStart(2, "0")} / 03
          </span>
          <span className="mx-3 hidden h-4 w-px bg-white/[0.1] sm:block" />
          <span className="text-xs text-neutral-500 sm:text-sm">{t.mode}: <strong className="font-medium text-neutral-200">{t[page]}</strong></span>
        </div>

        <SparxToolbar label={t.controls} className="gap-1 bg-white/[0.025] p-1">
          <a href={`#examples/${previous}`} className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300/80" aria-label={t.previous}>
            <ChevronLeft className="h-4 w-4" />
          </a>
          <a href={`#examples/${next}`} className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300/80" aria-label={t.next}>
            <ChevronRight className="h-4 w-4" />
          </a>
          <span className="mx-0.5 h-5 w-px bg-white/[0.1]" />
          <SparxIconButton aria-label={t.switchLanguage} onClick={onToggleLocale} className="h-9 w-auto gap-1.5 rounded-lg px-2.5">
            <Languages className="h-3.5 w-3.5 text-red-300" />
            <span className="font-mono text-xs tracking-[0.12em]">{t.languageShort}</span>
          </SparxIconButton>
        </SparxToolbar>
      </header>

      <main className="mx-auto max-w-[1600px] py-4 sm:py-5 lg:py-7">
        <h1 className="sr-only">{t[page]}</h1>
        <Suspense fallback={<div className="grid min-h-[72vh] place-items-center rounded-[1.5rem] border border-white/[0.08] bg-white/[0.02] font-mono text-xs uppercase tracking-[0.16em] text-neutral-500" aria-live="polite">{t.loading}</div>}>
          <Demo locale={locale} />
        </Suspense>
      </main>
    </div>
  );
}
