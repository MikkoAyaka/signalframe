import { useState } from "react";
import {
  Activity,
  ArrowUpRight,
  Boxes,
  ChevronRight,
  CircleDot,
  Command,
  Crosshair,
  Gauge,
  Radar,
  RotateCw,
  ShieldCheck,
  SlidersHorizontal,
  TerminalSquare,
  Waves,
} from "lucide-react";
import {
  SparxChip,
  SparxDataRow,
  SparxIconButton,
  SparxMetric,
  SparxPanel,
  SparxProgress,
  SparxToolbar,
} from "../sparx-ui";

type ConsoleLocale = "en" | "zh";

interface ImmersiveConsoleExampleProps {
  locale?: ConsoleLocale;
}

type Copy = {
  console: string;
  status: string;
  active: string;
  live: string;
  scan: string;
  scanning: string;
  tools: string;
  view: string;
  telemetry: string;
  selected: string;
  health: string;
  latency: string;
  throughput: string;
  coverage: string;
  route: string;
  events: string;
  eventDescription: string;
  integrity: string;
  commandLog: string;
  operational: string;
  detail: string;
  detailCopy: string;
  inspect: string;
  sweepComplete: string;
};

const copy: Record<ConsoleLocale, Copy> = {
  en: {
    console: "Command surface",
    status: "SYSTEM / NOMINAL",
    active: "Active sector",
    live: "Live",
    scan: "Run integrity sweep",
    scanning: "Scanning signal field",
    tools: "Console controls",
    view: "Tactical view",
    telemetry: "Telemetry",
    selected: "Selected relay",
    health: "Link health",
    latency: "Median latency",
    throughput: "Throughput",
    coverage: "Signal coverage",
    route: "Route stability",
    events: "Event stream",
    eventDescription: "A focused console keeps the decision surface visible while quiet context stays within reach.",
    integrity: "Integrity sweep",
    commandLog: "Command log",
    operational: "Operational",
    detail: "Relay detail",
    detailCopy: "Packet loss remains within the expected envelope. No intervention is required.",
    inspect: "Inspect relay",
    sweepComplete: "Sweep complete",
  },
  zh: {
    console: "指令界面",
    status: "系统 / 正常",
    active: "活动扇区",
    live: "实时",
    scan: "运行完整性扫描",
    scanning: "正在扫描信号场",
    tools: "控制台工具",
    view: "战术视图",
    telemetry: "遥测数据",
    selected: "已选中中继器",
    health: "链路健康度",
    latency: "中位延迟",
    throughput: "吞吐量",
    coverage: "信号覆盖率",
    route: "路径稳定性",
    events: "事件流",
    eventDescription: "聚焦的控制台让决策界面始终可见，同时将安静的上下文保留在触手可及的位置。",
    integrity: "完整性扫描",
    commandLog: "指令日志",
    operational: "运行正常",
    detail: "中继器详情",
    detailCopy: "丢包率仍处于预期范围内，无需人工干预。",
    inspect: "检查中继器",
    sweepComplete: "扫描完成",
  },
};

const relays = [
  { id: "R-09", name: "North relay", detail: "12 packets / min", position: "top-[17%] left-[59%]", status: "stable" },
  { id: "R-12", name: "Vector relay", detail: "24 packets / min", position: "top-[47%] left-[31%]", status: "selected" },
  { id: "R-16", name: "Delta relay", detail: "19 packets / min", position: "top-[69%] left-[71%]", status: "stable" },
];

/** A compact, standalone command-surface pattern for the examples chapter. */
export function ImmersiveConsoleExample({ locale = "en" }: ImmersiveConsoleExampleProps) {
  const t = copy[locale];
  const [selectedRelay, setSelectedRelay] = useState("R-12");
  const [isScanning, setIsScanning] = useState(false);
  const [lastSweep, setLastSweep] = useState("02:14:08");

  const selected = relays.find((relay) => relay.id === selectedRelay) ?? relays[1];

  const runSweep = () => {
    if (isScanning) return;
    setIsScanning(true);
    window.setTimeout(() => {
      setLastSweep("02:16:42");
      setIsScanning(false);
    }, 850);
  };

  return (
    <SparxPanel interactive={false} tone="command" className="overflow-hidden p-3 shadow-[0_28px_80px_-38px_rgba(0,0,0,0.96)] sm:p-5">
      <div className="flex flex-col gap-4 border-b border-white/[0.08] pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-200 shadow-[0_0_24px_-10px_rgba(248,113,113,0.72)]">
            <Command className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-red-300">{t.status}</p>
            <h3 className="mt-1 truncate text-base font-semibold tracking-tight text-white sm:text-lg">{t.console}</h3>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 sm:justify-end">
          <SparxChip tone="success"><CircleDot className="h-3 w-3" /> {t.live}</SparxChip>
          <SparxToolbar label={t.tools} className="shrink-0">
            <SparxIconButton aria-label={t.view} active className="h-8 w-8 rounded-lg"><Crosshair className="h-3.5 w-3.5" /></SparxIconButton>
            <SparxIconButton aria-label={t.telemetry} className="h-8 w-8 rounded-lg"><Waves className="h-3.5 w-3.5" /></SparxIconButton>
            <SparxIconButton aria-label={t.tools} className="h-8 w-8 rounded-lg"><SlidersHorizontal className="h-3.5 w-3.5" /></SparxIconButton>
          </SparxToolbar>
        </div>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_minmax(230px,0.72fr)]">
        <section aria-label={t.view} className="relative min-h-[380px] overflow-hidden rounded-xl border border-white/[0.08] bg-[#09090b] sm:min-h-[430px]">
          <div className="absolute inset-0 opacity-90 [background-image:radial-gradient(circle_at_50%_42%,rgba(239,68,68,0.14),transparent_24%),linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:auto,34px_34px,34px_34px]" />
          <div className="absolute inset-x-7 top-7 flex items-start justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.15em] text-neutral-500">
            <span>{t.active} / M-07</span>
            <span className="hidden sm:block">02:16:42 UTC</span>
          </div>

          <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-400/20 sm:h-64 sm:w-64">
            <div className="absolute inset-[14%] rounded-full border border-red-400/20" />
            <div className="absolute inset-[29%] rounded-full border border-red-300/35" />
            <div className={`absolute inset-0 rounded-full border-t border-red-300/65 ${isScanning ? "animate-spin [animation-duration:850ms]" : ""}`} />
            <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-200 shadow-[0_0_24px_rgba(248,113,113,0.92)]" />
          </div>

          <div className="absolute left-1/2 top-[32%] h-px w-[52%] -translate-x-[65%] rotate-[24deg] bg-gradient-to-r from-transparent via-red-400/35 to-transparent" />
          <div className="absolute left-1/2 top-[58%] h-px w-[48%] -translate-x-[12%] -rotate-[26deg] bg-gradient-to-r from-transparent via-red-400/30 to-transparent" />

          {relays.map((relay) => {
            const active = relay.id === selectedRelay;
            return (
              <button
                key={relay.id}
                type="button"
                aria-label={`${t.inspect}: ${relay.name}`}
                aria-pressed={active}
                onClick={() => setSelectedRelay(relay.id)}
                className={`absolute ${relay.position} group -translate-x-1/2 -translate-y-1/2 rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300/80`}
              >
                <span className={`relative grid h-8 w-8 place-items-center rounded-full border transition-all duration-300 ${active ? "border-red-200/80 bg-red-400/20 text-red-100 shadow-[0_0_28px_rgba(248,113,113,0.55)]" : "border-white/20 bg-neutral-950/80 text-neutral-300 group-hover:border-red-300/60 group-hover:text-red-100"}`}>
                  <Radar className="h-3.5 w-3.5" />
                  {active && <span className="absolute -inset-2 rounded-full border border-red-400/25 animate-ping [animation-duration:2.4s]" />}
                </span>
                <span className={`absolute left-1/2 top-full mt-2 w-max -translate-x-1/2 rounded border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] transition-all duration-200 ${active ? "border-red-400/25 bg-red-500/10 text-red-100" : "border-white/10 bg-neutral-950/85 text-neutral-500 opacity-0 group-hover:opacity-100"}`}>{relay.id}</span>
              </button>
            );
          })}

          <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-3">
            <div className="rounded-lg border border-white/[0.08] bg-neutral-950/75 px-3 py-2 backdrop-blur-md">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-500">{t.selected}</p>
              <p className="mt-1 text-sm font-medium text-white">{selected.id} / {selected.name}</p>
            </div>
            <button
              type="button"
              onClick={runSweep}
              disabled={isScanning}
              className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-red-400/30 bg-red-500/10 px-3 text-xs font-medium text-red-100 transition-colors hover:bg-red-500/20 disabled:cursor-wait disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300/80"
            >
              <RotateCw className={`h-3.5 w-3.5 ${isScanning ? "animate-spin" : ""}`} />
              {isScanning ? t.scanning : t.scan}
            </button>
          </div>
        </section>

        <aside className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
          <SparxPanel interactive={false} tone="quiet" className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-500">{t.selected}</p>
                <h4 className="mt-2 text-lg font-semibold tracking-tight text-white">{selected.id}</h4>
                <p className="mt-1 text-xs text-neutral-500">{selected.detail}</p>
              </div>
              <span className="grid h-9 w-9 place-items-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-300"><ShieldCheck className="h-4 w-4" /></span>
            </div>
            <p className="mt-5 text-sm leading-6 text-neutral-400">{t.detailCopy}</p>
            <button type="button" className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-red-200 transition-colors hover:text-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300/80">
              {t.detail} <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </SparxPanel>

          <SparxPanel interactive={false} tone="quiet" className="p-4">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-500">{t.telemetry}</p>
            <div className="mt-5 grid grid-cols-2 gap-5">
              <SparxMetric label={t.health} value="99.98%" delta="+0.02" tone="success" />
              <SparxMetric label={t.latency} value="42 ms" delta="-6ms" tone="signal" />
            </div>
            <div className="mt-6 space-y-4">
              <SparxProgress label={t.coverage} value="84%" percent={84} tone="signal" />
              <SparxProgress label={t.route} value="96%" percent={96} tone="success" />
            </div>
          </SparxPanel>
        </aside>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.75fr)]">
        <SparxPanel interactive={false} tone="quiet" className="p-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-500">{t.events}</p>
              <p className="mt-2 text-sm leading-6 text-neutral-400">{t.eventDescription}</p>
            </div>
            <SparxChip tone="quiet"><Activity className="h-3 w-3" /> 03 {t.operational}</SparxChip>
          </div>
          <div className="mt-4">
            <SparxDataRow leading={<Boxes className="h-4 w-4" />} label="R-12 synchronized" description={selected.name} meta="02:16:42" trailing={<SparxChip tone="success">{t.operational}</SparxChip>} />
            <SparxDataRow leading={<Gauge className="h-4 w-4" />} label="Load envelope confirmed" description={t.throughput} meta="02:16:08" trailing={<ChevronRight className="h-4 w-4 text-neutral-600" />} />
          </div>
        </SparxPanel>

        <SparxPanel interactive={false} tone="quiet" className="p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-500">{t.commandLog}</p>
            <TerminalSquare className="h-4 w-4 text-neutral-500" />
          </div>
          <div className="mt-5 border-l border-red-500/30 pl-3 font-mono text-xs leading-6 text-neutral-400">
            <p><span className="text-red-300">&gt;</span> {t.integrity}</p>
            <p className="text-neutral-500">last complete / {lastSweep}</p>
            <p className={isScanning ? "text-amber-200" : "text-emerald-300"}>{isScanning ? t.scanning : t.sweepComplete}</p>
          </div>
        </SparxPanel>
      </div>
    </SparxPanel>
  );
}
