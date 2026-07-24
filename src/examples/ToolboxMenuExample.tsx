import { useMemo, useState } from "react";
import {
  BookOpen,
  Calculator,
  Castle,
  ChevronRight,
  Command,
  Crosshair,
  Gamepad2,
  Map,
  Search,
  ShieldCheck,
  Swords,
  Trophy,
  WandSparkles,
  type LucideIcon,
} from "lucide-react";
import {
  SparxChip,
  SparxIconButton,
  SparxMetric,
  SparxPanel,
  SparxProgress,
  SparxToolbar,
} from "../sparx-ui";

type ToolCategory = "All" | "Play" | "Plan" | "Learn";
type ToolIcon = LucideIcon;
type ToolboxLocale = "en" | "zh";

interface Tool {
  id: string;
  category: Exclude<ToolCategory, "All">;
  title: string;
  description: string;
  shortcut: string;
  status: string;
  icon: ToolIcon;
  accent: "red" | "amber" | "emerald" | "blue";
}

const categories: ToolCategory[] = ["All", "Play", "Plan", "Learn"];

const tools: Tool[] = [
  {
    id: "match-center",
    category: "Play",
    title: "Match Center",
    description: "Read the live game state before committing the next move.",
    shortcut: "M",
    status: "Live ready",
    icon: Crosshair,
    accent: "red",
  },
  {
    id: "civ-desk",
    category: "Plan",
    title: "Civ Desk",
    description: "Compare openings, landmarks, and the first critical minutes.",
    shortcut: "C",
    status: "12 builds",
    icon: Castle,
    accent: "amber",
  },
  {
    id: "opening-lab",
    category: "Plan",
    title: "Opening Lab",
    description: "Shape a build order from a clear, editable timeline.",
    shortcut: "O",
    status: "Draft saved",
    icon: Swords,
    accent: "red",
  },
  {
    id: "map-intel",
    category: "Play",
    title: "Map Intel",
    description: "Turn spawn, resource, and scouting notes into one route.",
    shortcut: "I",
    status: "9 maps",
    icon: Map,
    accent: "emerald",
  },
  {
    id: "counterbook",
    category: "Learn",
    title: "Counterbook",
    description: "Find one confident answer to the unit in front of you.",
    shortcut: "K",
    status: "Reference",
    icon: ShieldCheck,
    accent: "blue",
  },
  {
    id: "economy-calc",
    category: "Plan",
    title: "Economy Calc",
    description: "Balance resources without turning a decision into a spreadsheet.",
    shortcut: "E",
    status: "Scenario",
    icon: Calculator,
    accent: "amber",
  },
  {
    id: "replay-notes",
    category: "Learn",
    title: "Replay Notes",
    description: "Keep lessons attached to moments worth returning to.",
    shortcut: "R",
    status: "18 clips",
    icon: BookOpen,
    accent: "blue",
  },
  {
    id: "rank-run",
    category: "Play",
    title: "Rank Run",
    description: "Set a small session intent, then keep the pressure visible.",
    shortcut: "G",
    status: "3 matches",
    icon: Trophy,
    accent: "emerald",
  },
];

const uiCopy = {
  en: {
    title: "Field Toolkit",
    sessionReady: "Session ready",
    subtitle: "Eight focused utilities. One quiet command surface.",
    controls: "Toolbox controls",
    commandPalette: "Open command palette",
    filters: "Filter tools",
    search: "Search utilities",
    noMatches: "No matching utilities",
    clearFilters: "Clear filters",
    selectedDetail: "Selected utility detail",
    selectedUtility: "Selected utility",
    confidence: "Toolkit confidence",
    context: "Context",
    pinnedItems: "Pinned items",
    shortcut: "Shortcut",
    quickOpen: "Quick open",
    open: "Open",
    categories: { All: "All", Play: "Play", Plan: "Plan", Learn: "Learn" },
  },
  zh: {
    title: "\u6218\u5730\u5DE5\u5177\u7BB1",
    sessionReady: "\u5BF9\u5C40\u5DF2\u5C31\u7EEA",
    subtitle: "\u516B\u4E2A\u805A\u7126\u5DE5\u5177\uFF0C\u4E00\u4E2A\u5B89\u9759\u7684\u547D\u4EE4\u8868\u9762\u3002",
    controls: "\u5DE5\u5177\u7BB1\u63A7\u4EF6",
    commandPalette: "\u6253\u5F00\u547D\u4EE4\u9762\u677F",
    filters: "\u7B5B\u9009\u5DE5\u5177",
    search: "\u641C\u7D22\u5DE5\u5177",
    noMatches: "\u6CA1\u6709\u5339\u914D\u7684\u5DE5\u5177",
    clearFilters: "\u6E05\u9664\u7B5B\u9009",
    selectedDetail: "\u5DF2\u9009\u5DE5\u5177\u8BE6\u60C5",
    selectedUtility: "\u5DF2\u9009\u5DE5\u5177",
    confidence: "\u5DE5\u5177\u7BB1\u7F6E\u4FE1\u5EA6",
    context: "\u4E0A\u4E0B\u6587",
    pinnedItems: "\u56FA\u5B9A\u9879\u76EE",
    shortcut: "\u5FEB\u6377\u952E",
    quickOpen: "\u5FEB\u901F\u6253\u5F00",
    open: "\u6253\u5F00",
    categories: { All: "\u5168\u90E8", Play: "\u5BF9\u5C40", Plan: "\u89C4\u5212", Learn: "\u5B66\u4E60" },
  },
} as const;

const localizedToolCopy: Record<ToolboxLocale, Record<string, Partial<Pick<Tool, "description" | "status">>>> = {
  en: {},
  zh: {
    "match-center": { description: "\u5728\u63D0\u4EA4\u4E0B\u4E00\u6B65\u64CD\u4F5C\u524D\uFF0C\u5148\u8BFB\u53D6\u5B9E\u65F6\u5BF9\u5C40\u72B6\u6001\u3002", status: "\u5B9E\u65F6\u5C31\u7EEA" },
    "civ-desk": { description: "\u6BD4\u8F83\u5F00\u5C40\u3001\u5730\u6807\u548C\u6700\u5173\u952E\u7684\u524D\u51E0\u5206\u949F\u3002", status: "12 \u5957\u5EFA\u7B51" },
    "opening-lab": { description: "\u4ECE\u6E05\u6670\u3001\u53EF\u7F16\u8F91\u7684\u65F6\u95F4\u7EBF\u7F16\u6392\u5EFA\u9020\u987A\u5E8F\u3002", status: "\u8349\u7A3F\u5DF2\u4FDD\u5B58" },
    "map-intel": { description: "\u5C06\u51FA\u751F\u70B9\u3001\u8D44\u6E90\u548C\u4F83\u5BDF\u7B14\u8BB0\u7EC4\u5408\u6210\u4E00\u6761\u8DEF\u7EBF\u3002", status: "9 \u5F20\u5730\u56FE" },
    counterbook: { description: "\u4E3A\u9762\u524D\u7684\u5175\u79CD\u627E\u5230\u4E00\u4E2A\u53EF\u4FE1\u7684\u5E94\u5BF9\u65B9\u6848\u3002", status: "\u53C2\u8003" },
    "economy-calc": { description: "\u5E73\u8861\u8D44\u6E90\uFF0C\u800C\u4E0D\u8BA9\u51B3\u7B56\u53D8\u6210\u7535\u5B50\u8868\u683C\u3002", status: "\u60C5\u666F" },
    "replay-notes": { description: "\u8BA9\u7ECF\u9A8C\u4E0E\u503C\u5F97\u56DE\u770B\u7684\u7247\u6BB5\u59CB\u7EC8\u76F8\u8FDE\u3002", status: "18 \u4E2A\u7247\u6BB5" },
    "rank-run": { description: "\u8BBE\u5B9A\u4E00\u4E2A\u7B80\u6D01\u7684\u5BF9\u5C40\u76EE\u6807\uFF0C\u8BA9\u538B\u529B\u59CB\u7EC8\u53EF\u89C1\u3002", status: "3 \u5C40\u5BF9\u5C40" },
  },
};

const accentClass = {
  red: {
    icon: "border-red-400/25 bg-red-400/10 text-red-200",
    line: "bg-red-400",
    text: "text-red-300",
    wash: "from-red-400/12",
  },
  amber: {
    icon: "border-amber-300/25 bg-amber-300/10 text-amber-100",
    line: "bg-amber-300",
    text: "text-amber-200",
    wash: "from-amber-300/12",
  },
  emerald: {
    icon: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
    line: "bg-emerald-300",
    text: "text-emerald-200",
    wash: "from-emerald-300/12",
  },
  blue: {
    icon: "border-sky-300/25 bg-sky-300/10 text-sky-100",
    line: "bg-sky-300",
    text: "text-sky-200",
    wash: "from-sky-300/12",
  },
} as const;

function ToolCard({ tool, active, onSelect }: { tool: Tool; active: boolean; onSelect: () => void }) {
  const Icon = tool.icon;
  const accent = accentClass[tool.accent];

  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onSelect}
      className={`group relative min-w-0 overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 ${active ? "border-white/20 bg-neutral-800/90 shadow-[0_18px_45px_-32px_rgba(0,0,0,0.95)]" : "border-white/[0.07] bg-white/[0.025] hover:-translate-y-0.5 hover:border-white/[0.15] hover:bg-white/[0.055]"}`}
    >
      <span className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r ${accent.wash} via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${active ? "opacity-100" : ""}`} />
      <span className="flex items-start justify-between gap-3">
        <span className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${accent.icon}`}>
          <Icon size={19} strokeWidth={1.8} />
        </span>
        <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${accent.line} ${active ? "shadow-[0_0_13px_currentColor]" : "opacity-60"}`} />
      </span>
      <span className="mt-5 block">
        <span className="flex items-center justify-between gap-3">
          <span className="truncate text-sm font-semibold tracking-tight text-white">{tool.title}</span>
          <kbd className="hidden rounded-md border border-white/[0.08] bg-black/20 px-1.5 py-0.5 font-mono text-[10px] text-neutral-500 sm:inline">{tool.shortcut}</kbd>
        </span>
        <span className="mt-2 line-clamp-2 block text-xs leading-5 text-neutral-500">{tool.description}</span>
      </span>
      <span className={`mt-4 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.13em] ${active ? accent.text : "text-neutral-600"}`}>
        <span className={`h-1 w-1 rounded-full ${accent.line}`} />
        {tool.status}
      </span>
    </button>
  );
}

/** A responsive, interactive game-utility menu that demonstrates a Sparx workspace. */
export function ToolboxMenuExample({ locale = "en" }: { locale?: ToolboxLocale }) {
  const t = uiCopy[locale];
  const [category, setCategory] = useState<ToolCategory>("All");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("opening-lab");
  const localizedTools = useMemo(() => tools.map((tool) => ({ ...tool, ...localizedToolCopy[locale][tool.id] })), [locale]);

  const filteredTools = useMemo(() => {
    const search = query.trim().toLowerCase();
    return localizedTools.filter((tool) => {
      const inCategory = category === "All" || tool.category === category;
      const matchesSearch = !search || `${tool.title} ${tool.description} ${tool.category}`.toLowerCase().includes(search);
      return inCategory && matchesSearch;
    });
  }, [category, localizedTools, query]);

  const selectedTool = localizedTools.find((tool) => tool.id === selectedId) ?? localizedTools[0];
  const SelectedIcon = selectedTool.icon;
  const selectedAccent = accentClass[selectedTool.accent];

  const selectCategory = (nextCategory: ToolCategory) => {
    setCategory(nextCategory);
    const nextTool = localizedTools.find((tool) => nextCategory === "All" || tool.category === nextCategory);
    if (nextTool) setSelectedId(nextTool.id);
  };

  return (
    <section aria-labelledby="toolbox-menu-title" className="overflow-hidden rounded-[1.75rem] border border-white/[0.09] bg-neutral-950 p-3 shadow-[0_30px_90px_-46px_rgba(0,0,0,1)] sm:p-5">
      <div className="relative isolate overflow-hidden rounded-[1.25rem] border border-white/[0.08] bg-neutral-950 px-4 py-5 sm:px-6 sm:py-7">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_86%_7%,rgba(239,68,68,0.18),transparent_24rem),radial-gradient(circle_at_7%_100%,rgba(245,158,11,0.1),transparent_23rem)]" />
        <div aria-hidden="true" className="sparx-grid pointer-events-none absolute inset-0 -z-10 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />

        <header className="flex flex-col gap-5 border-b border-white/[0.08] pb-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-red-400/25 bg-red-400/10 text-red-200 shadow-[0_0_28px_-12px_rgba(248,113,113,0.8)]">
              <Gamepad2 size={21} strokeWidth={1.8} />
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 id="toolbox-menu-title" className="text-lg font-semibold tracking-tight text-white">{t.title}</h3>
                <SparxChip tone="signal" className="text-[10px]">{t.sessionReady}</SparxChip>
              </div>
              <p className="mt-1 text-xs text-neutral-500">{t.subtitle}</p>
            </div>
          </div>
          <SparxToolbar label={t.controls} className="w-full justify-between bg-neutral-950/75 lg:w-auto">
            <span className="flex items-center gap-2 px-2 font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-500">
              <Command size={13} />
              Shift + K
            </span>
            <SparxIconButton aria-label={t.commandPalette} className="h-8 w-8 rounded-lg">
              <WandSparkles size={15} />
            </SparxIconButton>
          </SparxToolbar>
        </header>

        <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="min-w-0">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div role="group" aria-label={t.filters} className="flex items-center gap-1 rounded-xl border border-white/[0.08] bg-white/[0.025] p-1">
                {categories.map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={category === item}
                    onClick={() => selectCategory(item)}
                    className={`rounded-lg px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.13em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300/70 ${category === item ? "bg-white/[0.1] text-white" : "text-neutral-500 hover:text-neutral-200"}`}
                  >
                    {t.categories[item]}
                  </button>
                ))}
              </div>
              <label className="relative block sm:w-56">
                <span className="sr-only">{t.search}</span>
                <Search aria-hidden="true" size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={t.search}
                  className="h-9 w-full rounded-xl border border-white/[0.08] bg-black/20 pl-9 pr-3 text-xs text-neutral-200 outline-none placeholder:text-neutral-600 transition-colors focus:border-red-400/45 focus:bg-black/30"
                />
              </label>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 2xl:grid-cols-3">
              {filteredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} active={selectedId === tool.id} onSelect={() => setSelectedId(tool.id)} />
              ))}
              {filteredTools.length === 0 && (
                <div className="col-span-full flex min-h-52 flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.12] bg-white/[0.02] px-6 text-center">
                  <Search size={20} className="text-neutral-600" />
                  <p className="mt-3 text-sm font-medium text-neutral-300">{t.noMatches}</p>
                  <button type="button" onClick={() => { setQuery(""); setCategory("All"); }} className="mt-2 text-xs text-red-300 underline decoration-red-400/40 underline-offset-4 hover:text-red-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300/70">
                    {t.clearFilters}
                  </button>
                </div>
              )}
            </div>
          </div>

          <aside aria-label={t.selectedDetail} className="min-w-0">
            <SparxPanel interactive={false} tone="quiet" className="h-full min-h-72 p-5">
              <div className="flex items-start justify-between gap-4">
                <span className={`grid h-12 w-12 place-items-center rounded-2xl border ${selectedAccent.icon}`}>
                  <SelectedIcon size={22} strokeWidth={1.75} />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-600">{t.selectedUtility}</span>
              </div>
              <div className="mt-8">
                <p className={`font-mono text-[10px] uppercase tracking-[0.15em] ${selectedAccent.text}`}>{t.categories[selectedTool.category]} / {selectedTool.status}</p>
                <h4 className="mt-2 text-2xl font-semibold tracking-tight text-white">{selectedTool.title}</h4>
                <p className="mt-3 text-sm leading-6 text-neutral-400">{selectedTool.description}</p>
              </div>
              <div className="mt-7 space-y-5 border-t border-white/[0.07] pt-5">
                <SparxProgress label={t.confidence} value="84%" percent={84} tone={selectedTool.accent === "red" ? "signal" : selectedTool.accent === "amber" ? "warning" : selectedTool.accent === "emerald" ? "success" : "quiet"} />
                <div className="grid grid-cols-2 gap-4">
                  <SparxMetric label={t.context} value="03" detail={t.pinnedItems} className="[&_strong]:text-xl" />
                  <SparxMetric label={t.shortcut} value={selectedTool.shortcut} tone="signal" detail={t.quickOpen} className="[&_strong]:text-xl" />
                </div>
              </div>
              <button type="button" className="mt-7 flex w-full items-center justify-between rounded-xl border border-white/[0.1] bg-white/[0.04] px-3.5 py-3 text-sm font-medium text-white transition-colors hover:border-red-400/35 hover:bg-red-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300/70">
                {t.open} {selectedTool.title}
                <ChevronRight size={17} className="text-red-300" />
              </button>
            </SparxPanel>
          </aside>
        </div>
      </div>
    </section>
  );
}
