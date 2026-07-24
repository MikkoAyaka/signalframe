import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Bell,
  Bot,
  Check,
  ChevronRight,
  Command,
  Globe2,
  Layers3,
  Play,
  Radio,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Workflow,
} from "lucide-react";
import { useState } from "react";
import {
  SparxChip,
  SparxDataRow,
  SparxIconButton,
  SparxMetric,
  SparxPanel,
  SparxProgress,
  SparxToolbar,
} from "../sparx-ui";

export type SparxExampleLocale = "en" | "zh";

interface HeroLandingExampleProps {
  locale?: SparxExampleLocale;
}

const copy = {
  en: {
    ariaLabel: "Aperture landing page example",
    product: "Aperture",
    productType: "Release intelligence",
    status: "All systems verified",
    nav: ["System", "Signals", "Playbooks"],
    login: "Command center",
    eyebrow: "Release intelligence for teams that ship in public",
    headlineLead: "Make every",
    headlineSignal: "release",
    headlineTail: "legible.",
    description:
      "Aperture gives product teams a shared field view of what is changing, what is safe, and the one decision that should happen next.",
    primaryAction: "Run launch brief",
    primaryActionActive: "Brief is running",
    secondaryAction: "View field notes",
    proof: "No credit card. One workspace, ready in 90 seconds.",
    live: "Live field view",
    connection: "18 sources connected",
    response: "Response surface",
    sceneTitle: "The launch is quiet. The signal is not.",
    sceneDescription:
      "One spatial view aligns production health, customer impact, and the team response without turning the work into a dashboard maze.",
    sceneAction: "Open the brief",
    northstar: "Northstar release",
    ready: "Ready",
    verified: "Verified",
    deploying: "Deploying",
    now: "now",
    minutes: "2m ago",
    sources: "Sources",
    sourcesValue: "18 / 18",
    coverage: "Launch coverage",
    coverageValue: "94%",
    healthy: "Healthy",
    customerSignal: "Customer signal",
    customerValue: "Clear",
    customerDetail: "No audience regressions",
    responseTime: "Response loop",
    responseValue: "3m 18s",
    responseDetail: "From alert to owner",
    activityTitle: "Release pulse",
    activityDescription: "The few events that change the launch decision.",
    eventOne: "Production gate cleared",
    eventOneDescription: "Checkout and API journeys passed the final probe.",
    eventTwo: "Owner loop acknowledged",
    eventTwoDescription: "Support, product, and engineering are watching one brief.",
    eventThree: "Audience cohort steady",
    eventThreeDescription: "Activation and error budgets remain within range.",
    footer: "A composed landing page, not a component catalogue.",
  },
  zh: {
    ariaLabel: "Aperture 落地页示例",
    product: "Aperture",
    productType: "发布智能",
    status: "所有系统已验证",
    nav: ["系统", "信号", "预案"],
    login: "指挥中心",
    eyebrow: "为公开发布的团队提供发布智能",
    headlineLead: "让每一次",
    headlineSignal: "发布",
    headlineTail: "都清晰可见。",
    description:
      "Aperture 让产品团队在同一个视野中看到正在发生的变化、可以确信的状态，以及此刻最值得作出的决策。",
    primaryAction: "启动发布简报",
    primaryActionActive: "简报正在运行",
    secondaryAction: "查看现场笔记",
    proof: "无需信用卡。一个工作区，90 秒即可就绪。",
    live: "实时现场视图",
    connection: "已连接 18 个信息源",
    response: "响应平面",
    sceneTitle: "发布很安静，信号不会。",
    sceneDescription:
      "一个空间化的视图，将生产健康度、客户影响与团队响应对齐，不让工作落入仪表盘迷宫。",
    sceneAction: "打开简报",
    northstar: "Northstar 发布",
    ready: "就绪",
    verified: "已验证",
    deploying: "正在发布",
    now: "现在",
    minutes: "2 分钟前",
    sources: "信息源",
    sourcesValue: "18 / 18",
    coverage: "发布覆盖度",
    coverageValue: "94%",
    healthy: "健康",
    customerSignal: "客户信号",
    customerValue: "清晰",
    customerDetail: "未发现用户群回归问题",
    responseTime: "响应闭环",
    responseValue: "3 分 18 秒",
    responseDetail: "从告警到负责人响应",
    activityTitle: "发布脉冲",
    activityDescription: "只保留会改变发布决策的事件。",
    eventOne: "生产准入已通过",
    eventOneDescription: "结账与 API 流程已通过最终检查。",
    eventTwo: "负责人闭环已确认",
    eventTwoDescription: "支持、产品和工程团队正在关注同一份简报。",
    eventThree: "用户群体保持稳定",
    eventThreeDescription: "激活率与错误预算均处于安全区间。",
    footer: "这是一个完整的落地页，而不是组件目录。",
  },
} as const;

function ConstellationNode({
  className,
  label,
  active = false,
}: {
  className: string;
  label: string;
  active?: boolean;
}) {
  return (
    <div className={`absolute ${className}`}>
      <div className={`relative grid h-9 w-9 place-items-center rounded-full border ${active ? "border-red-300/75 bg-red-500/20 text-red-100 shadow-[0_0_28px_-8px_rgba(248,113,113,0.95)]" : "border-white/15 bg-neutral-950/70 text-neutral-400"}`}>
        {active ? <Radio className="h-4 w-4" /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}
        {active && <span className="absolute -inset-2 rounded-full border border-red-400/30" />}
      </div>
      <span className="absolute left-1/2 top-11 -translate-x-1/2 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.16em] text-neutral-500">{label}</span>
    </div>
  );
}

export function HeroLandingExample({ locale = "en" }: HeroLandingExampleProps) {
  const t = copy[locale];
  const [briefRunning, setBriefRunning] = useState(false);

  return (
    <section aria-label={t.ariaLabel} className="relative isolate overflow-hidden rounded-[1.5rem] border border-[color:var(--sparx-line)] bg-[var(--sparx-canvas)] text-[var(--sparx-text)] shadow-[var(--sparx-shadow-panel)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(239,68,68,0.18),transparent_22rem),radial-gradient(circle_at_8%_92%,rgba(127,29,29,0.18),transparent_26rem)]" />
      <div className="pointer-events-none absolute inset-0 opacity-70 sparx-grid [mask-image:linear-gradient(to_bottom,black,transparent_76%)]" />

      <div className="relative mx-auto max-w-7xl px-5 pb-5 pt-5 sm:px-8 sm:pb-8 sm:pt-8 lg:px-10 lg:pb-10">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl border border-red-400/30 bg-red-500/10 text-red-200 shadow-[0_0_22px_-10px_rgba(248,113,113,0.95)]">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-tight text-white">{t.product}</p>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-neutral-500">{t.productType}</p>
            </div>
          </div>

          <nav aria-label="Example page navigation" className="order-3 flex w-full items-center gap-4 overflow-x-auto pb-1 text-sm text-neutral-500 sm:order-none sm:w-auto sm:pb-0">
            {t.nav.map((item, index) => (
              <a key={item} className={`shrink-0 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 ${index === 0 ? "text-neutral-200" : ""}`} href={`#aperture-${index}`}>
                {item}
              </a>
            ))}
          </nav>

          <SparxToolbar label="Aperture header actions" className="shrink-0">
            <SparxIconButton aria-label="Open notifications">
              <Bell className="h-4 w-4" />
            </SparxIconButton>
            <button type="button" className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-3.5 text-sm font-medium text-neutral-200 transition-colors hover:border-red-400/35 hover:bg-red-500/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/70">
              {t.login}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </SparxToolbar>
        </header>

        <div className="grid gap-10 py-10 lg:grid-cols-[minmax(0,0.93fr)_minmax(27rem,1.07fr)] lg:items-center lg:gap-12 lg:py-16">
          <div className="max-w-2xl">
            <SparxChip tone="signal" className="mb-6">
              <Radio className="h-3 w-3" aria-hidden="true" />
              {t.eyebrow}
            </SparxChip>
            <h1 className="max-w-xl text-4xl font-semibold leading-[1.03] tracking-[-0.055em] text-white sm:text-5xl lg:text-6xl">
              {t.headlineLead} <span className="text-red-300">{t.headlineSignal}</span> {t.headlineTail}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-neutral-400 sm:text-lg">{t.description}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                aria-pressed={briefRunning}
                onClick={() => setBriefRunning((running) => !running)}
                className={`inline-flex min-h-11 items-center gap-2 rounded-xl border px-4 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300/80 ${briefRunning ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-100" : "border-red-300/40 bg-red-500/15 text-red-50 hover:border-red-200/65 hover:bg-red-500/25"}`}
              >
                {briefRunning ? <Check className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
                {briefRunning ? t.primaryActionActive : t.primaryAction}
              </button>
              <a href="#aperture-2" className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-medium text-neutral-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/70">
                {t.secondaryAction}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <p className="mt-5 font-mono text-xs leading-5 text-neutral-500">{t.proof}</p>
          </div>

          <SparxPanel tone="default" glowColor="rgba(239, 68, 68, 0.13)" className="relative min-h-[31rem] p-4 sm:p-5" interactive>
            <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-white">{t.live}</p>
                  <SparxChip tone={briefRunning ? "success" : "signal"} className="px-2 py-0.5 text-[10px]">
                    <span className={`h-1.5 w-1.5 rounded-full ${briefRunning ? "bg-emerald-300" : "bg-red-300"}`} />
                    {briefRunning ? t.verified : t.ready}
                  </SparxChip>
                </div>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-neutral-500">{t.connection}</p>
              </div>
              <SparxIconButton aria-label="Open field configuration">
                <Command className="h-4 w-4" />
              </SparxIconButton>
            </div>

            <div className="relative mt-5 h-48 overflow-hidden rounded-xl border border-white/[0.08] bg-black/20 sm:h-56">
              <div className="absolute inset-0 opacity-75 sparx-grid" />
              <div className="absolute left-[11%] top-[56%] h-px w-[29%] rotate-[-24deg] bg-gradient-to-r from-transparent via-red-300/50 to-transparent" />
              <div className="absolute left-[35%] top-[37%] h-px w-[31%] rotate-[13deg] bg-gradient-to-r from-transparent via-red-300/55 to-transparent" />
              <div className="absolute left-[56%] top-[50%] h-px w-[28%] rotate-[-31deg] bg-gradient-to-r from-transparent via-red-300/45 to-transparent" />
              <ConstellationNode className="left-[8%] top-[47%]" label="API" />
              <ConstellationNode className="left-[32%] top-[25%]" label="Web" />
              <ConstellationNode className="left-[58%] top-[42%]" label="Core" active />
              <ConstellationNode className="right-[8%] top-[18%]" label="Edge" />
              <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg border border-white/[0.08] bg-neutral-950/80 px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-neutral-400 backdrop-blur">
                <Workflow className="h-3.5 w-3.5 text-red-300" aria-hidden="true" />
                {t.response}
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 border-b border-white/[0.08] pb-5 sm:grid-cols-3">
              <SparxMetric label={t.sources} value={t.sourcesValue} detail={t.healthy} tone="success" />
              <SparxMetric label={t.customerSignal} value={t.customerValue} detail={t.customerDetail} tone="signal" className="sm:col-span-1" />
              <SparxMetric label={t.responseTime} value={t.responseValue} detail={t.responseDetail} className="col-span-2 sm:col-span-1" />
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_10rem] sm:items-end">
              <SparxProgress label={t.coverage} value={t.coverageValue} percent={briefRunning ? 100 : 94} tone={briefRunning ? "success" : "signal"} />
              <button type="button" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 text-sm font-medium text-neutral-300 transition-colors hover:border-red-400/35 hover:bg-red-500/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/70">
                {t.sceneAction}
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </SparxPanel>
        </div>

        <div id="aperture-2" className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="border-y border-white/[0.08] py-6 lg:border-b-0 lg:py-8">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-red-300">{t.activityTitle}</p>
            <h2 className="mt-3 max-w-sm text-2xl font-semibold tracking-tight text-white">{t.sceneTitle}</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-neutral-400">{t.sceneDescription}</p>
            <p className="mt-6 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-neutral-500">
              <Globe2 className="h-3.5 w-3.5" aria-hidden="true" />
              {t.status}
            </p>
          </div>

          <div className="border-y border-white/[0.08] py-3 lg:border-b-0 lg:py-5">
            <p className="px-1 pb-1 text-sm text-neutral-500">{t.activityDescription}</p>
            <SparxDataRow
              leading={<ShieldCheck className="h-4 w-4 text-emerald-300" />}
              label={t.eventOne}
              description={t.eventOneDescription}
              meta={t.now}
              trailing={<SparxChip tone="success">{t.verified}</SparxChip>}
            />
            <SparxDataRow
              leading={<Bot className="h-4 w-4 text-red-200" />}
              label={t.eventTwo}
              description={t.eventTwoDescription}
              meta={t.minutes}
              trailing={<SparxChip tone="signal">{t.ready}</SparxChip>}
            />
            <SparxDataRow
              leading={<Activity className="h-4 w-4 text-neutral-300" />}
              label={t.eventThree}
              description={t.eventThreeDescription}
              meta={t.now}
              trailing={<SparxChip tone="quiet">{t.deploying}</SparxChip>}
            />
          </div>
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-3 pt-6 font-mono text-xs uppercase tracking-[0.14em] text-neutral-600">
          <span>{t.footer}</span>
          <span className="inline-flex items-center gap-2 text-neutral-500">
            <TerminalSquare className="h-3.5 w-3.5" aria-hidden="true" />
            APERTURE / 01
          </span>
        </footer>
      </div>
    </section>
  );
}
