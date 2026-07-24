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
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
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
    language: "Chinese", switchLanguage: "Switch language to",
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
    language: "English", switchLanguage: "切换语言至", languageShort: "EN", mobileLabel: "\u754C\u9762\u7CFB\u7EDF", eyebrow: "\u8BBE\u8BA1\u4E0E\u7EC4\u4EF6\u89C4\u8303", hero: "\u4E3A\u9AD8\u4EF7\u503C\u4FE1\u606F\u7559\u51FA\u5B89\u9759\u7684\u6846\u67B6\u3002", intro: "Signalframe \u662F\u4E00\u5957\u9762\u5411\u9AD8\u4FE1\u53F7\u4EA7\u54C1\u7684\u6DF1\u8272\u8BBE\u8BA1\u7CFB\u7EDF\u3002", read: "\u9605\u8BFB\u4F53\u7CFB", inspect: "\u67E5\u770B\u7EC4\u4EF6", footer: "\u57FA\u4E8E\u6E90\u4EE3\u7801\u7684\u8BBE\u8BA1\u6587\u6863",
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

const typeScale = [
  ["Display", "48-72px", "Reserve for page-level moments. It names the workspace; it does not carry instructions."],
  ["Section", "28-36px", "Use to divide a long page into meaningful decision areas."],
  ["Body", "16-18px", "Default for explanatory content and reading-oriented descriptions."],
  ["Compact UI", "14px", "Use for supporting controls, dense rows, and secondary context."],
  ["Metadata", "12px minimum", "The system floor. Use only for stable labels, provenance, timestamps, and compact status; never for body copy or primary actions."],
] as const;

const designLineage = [
  ["Linear", "Operational restraint", "Shared: a quiet chrome, high information density, earned motion, and state-led work. Divergence: Signalframe uses a stronger red signal and a more spatial data canvas."],
  ["Apple Human Interface Guidelines", "Clarity and deference", "Shared: content leads while the interface recedes. Signalframe translates that principle to dense dark workspaces rather than a platform-native visual language."],
  ["IBM Carbon", "Systematic trust", "Shared: reusable primitives, explicit states, and accessibility as part of the system contract. Signalframe keeps the system smaller and more editorial in tone."],
] as const;

const zhText: Record<string, string> = {
  "Foundations / 01": "基础 / 01", "Principles": "设计原则", "The rules that make the system recognizable across focused workspaces and data-rich interfaces.": "让系统在专注工作台与数据密集界面中保持一致辨识度的规则。",
  "Signal before spectacle": "信号优先于装饰", "Use color, glow, and motion to reveal state or action. Decoration never competes with data.": "用色彩、光晕和动效揭示状态或操作；装饰绝不与数据争夺注意力。",
  "Depth without weight": "有层次，不沉重", "Layer translucency, borders, and soft shadows into one surface. Avoid cards inside cards unless hierarchy changes.": "用半透明、边框和柔和阴影构成一个表面；除非层级改变，否则避免卡片套卡片。",
  "Spatial, not ornamental": "空间感，而非装饰感", "Grid fields and restrained perspective make a workspace feel dimensional while content remains legible.": "网格与克制的透视赋予工作台空间感，同时保持内容可读。",
  "Progressive disclosure": "渐进式披露", "Keep the frame quiet. Reveal emphasis on intent: hover, selection, status change, or navigation.": "保持框架安静；只在悬浮、选择、状态变化或导航时释放强调。",
  "Foundations / 02": "基础 / 02", "Color, depth, and type": "色彩、层次与排印", "Neutral surfaces keep attention available for one signal color. The mono face labels systems; the sans face carries content.": "中性色表面为唯一的信号色留出注意力；等宽字体标记系统，无衬线字体承载内容。",
  "Signal scale": "信号尺度", "Canvas": "画布", "Surface": "表面", "Line": "分割线", "Signal": "信号", "Spacing rhythm": "间距节奏", "Type roles": "字体角色",
  "Foundations / 03": "基础 / 03", "Motion and spatial depth": "动效与空间层次", "Signalframe treats motion as a state transition. It should clarify origin, hierarchy, or completion, never decorate an idle screen.": "Signalframe 将动效视为状态过渡：它应解释来源、层级或完成，而不是装饰静止页面。",
  "Rest before motion": "先有静态，再有动效", "One depth plane": "单一深度平面", "Respect reduced motion": "尊重减少动态效果", "Timing ladder": "时长阶梯", "Short for feedback. Longer for spatial change.": "反馈要短，空间变化可以更长。",
  "Motion grammar": "动效语法", "Lifecycle": "生命周期", "Guardrail": "约束", "Portable presets": "可复用预设", "Use a named preset before designing a one-off transition.": "先使用命名预设，再设计一次性过渡。",
  "Spatial handoff": "空间交接", "Direct manipulation": "直接操控", "Interruption policy": "中断策略", "Use motion when": "适合使用动效", "Do not animate": "不应使用动效", "Reduced-motion contract": "减少动态效果约定",
  "Foundations / 04": "基础 / 04", "Accessible by default": "默认无障碍", "A dark system gains quality from clarity, not from low contrast. Every signal needs a non-color equivalent.": "深色系统的品质来自清晰，而不是低对比度；每个信号都需要非色彩的等价表达。", "Required behavior": "必要行为", "Responsive baseline": "响应式基线",
  "Components / 03": "组件 / 03", "Portable primitives": "可移植原语", "All components are source-owned under src/design-system and rendered by this documentation site directly.": "所有组件均由 src/design-system 源码维护，并由本站直接渲染。", "Component": "组件",
  "Components / 04": "组件 / 04", "Data and operational states": "数据与运行状态", "Patterns / 04": "模式 / 04", "Composition rules": "组合规则", "Guidance / 05": "指南 / 05", "Write and compose with intent": "以明确意图编写与组合", "Content hierarchy": "内容层级", "State and feedback": "状态与反馈", "Do": "推荐", "Avoid": "避免", "Adoption checklist": "接入检查清单",
  "Operational clarity": "可判断的清晰度", "The default state must be complete and useful. Hover and focus may add a 180-300ms emphasis layer, not move core content.": "默认状态必须完整且有用。悬浮和聚焦可以增加 180-300ms 的强调层，但不应移动核心内容。",
  "A page can use a quiet canvas, one raised surface plane, and content lifted inside it. Do not stack multiple blur cards to fake hierarchy.": "页面可以使用安静的画布、一个抬升的表面层，以及其中被轻微托起的内容。不要用多层模糊卡片伪造层级。",
  "Animation must yield to reduced-motion preferences. Keep color, focus, and information hierarchy intact when transforms disappear.": "动画必须尊重减少动态效果偏好。移除位移后，仍应保留色彩、焦点与信息层级。",
  "Color, border, icon feedback": "色彩、边框与图标反馈", "Surface emphasis, toolbar state, disclosure": "表面强调、工具栏状态与内容展开", "Route, card stack, or large layout transition": "路由、卡片栈或大型布局过渡",
  "Pointer intent": "指针意图", "Border, signal field, icon emphasis. No layout shift.": "强调边框、信号场与图标；不改变布局。", "New content": "新内容", "Opacity plus a 12px vertical settle. Stagger only siblings.": "透明度配合 12px 的垂直落定；只对同级元素错峰。", "Context switch": "上下文切换", "A single outgoing and incoming plane; keep the destination opaque.": "只保留一个离场平面与一个入场平面；目标面始终保持不透明。", "Reorder / carousel": "重排 / 轮播", "Animate between measured resting positions, never toward guessed offsets.": "在实测的静止位置之间动画，绝不朝猜测出的偏移量移动。",
  "Rest": "静止", "Intent": "意图", "Commit": "提交", "Settle": "落定", "The visual response starts from a user action or a meaningful state change. Motion must resolve into a stable rest state; a loop is reserved for an active process that needs ongoing attention.": "视觉反馈应由用户操作或有意义的状态变化触发。动效必须回到稳定的静止状态；循环只服务于需要持续关注的进行中过程。",
  "Do not combine a scale, blur, large translation, and opacity transition on the same content layer. Choose one spatial cue and let hierarchy do the rest.": "不要在同一内容层叠加缩放、模糊、大幅位移与透明度过渡。选择一个空间线索，其余交给层级。",
  "The exported presets keep timing and easing coherent across Motion components while leaving the component responsible for its own layout and state.": "导出的预设让各个 Motion 组件保持一致的时长和缓动，同时仍由组件自己负责布局与状态。",
  "Animate from real geometry, then settle into the same geometry.": "从真实几何位置开始动画，并落定到同一几何位置。", "For carousels, reordering, and stacked surfaces, let layout measurement describe the resting position. The next surface should already have its final background, depth, and content before it moves into view. Never use a temporary animation-only card style.": "对于轮播、重排和堆叠表面，让布局测量描述静止位置。下一张表面进入视图前，就应具备最终的背景、层次与内容；不要使用仅供动画的临时卡片样式。", "Stage": "预置", "Render the destination at its final visual fidelity.": "以最终视觉保真度渲染目标内容。", "Exchange": "交接", "Move only the surfaces changing hierarchy.": "只移动发生层级变化的表面。", "Remove transition state without a second layout jump.": "移除过渡状态时不产生第二次布局跳变。",
  "Pointer input leads; the interface follows.": "指针输入主导，界面随之响应。", "A dragged layer tracks the pointer directly. On release, use one short commit or return motion. Hover can fan a card stack from its hinge, but it must never leave the resting state changed after pointer exit.": "被拖拽的层应直接跟随指针。释放后只进行一次短暂的提交或回弹。悬浮可以从铰点扇开卡片栈，但指针离开后绝不能改变其静止状态。", "Set a visible threshold before committing a directional change.": "在提交方向变化前设置可见阈值。", "Disable a second navigation action until the current commit resolves.": "当前提交完成前禁用第二次导航操作。", "Keep keyboard and button navigation equivalent to the gesture.": "保持键盘、按钮导航与手势操作等价。",
  "A new intent replaces an unfinished one.": "新的意图应替代未完成的旧意图。", "Animation is not a queue. If the user reverses direction, calculate from the current rendered position and commit in the new direction immediately; do not replay a stale first frame.": "动画不是队列。用户反向操作时，应从当前渲染位置计算并立即向新方向提交；不要重放陈旧的第一帧。", "Navigation": "导航", "Use the latest direction. Preserve the in-flight surface only long enough to bridge geometry.": "使用最新方向。仅在衔接几何位置所需的时间内保留运动中的表面。", "Async state": "异步状态", "Keep the last confirmed value visible; reserve looping motion for an active request with a label.": "保持最近一次已确认的值可见；循环动效只用于带有标签的活动请求。", "Text and metrics": "文本与指标", "Prefer an instant update or a single highlighted delta. Never make scan-critical content chase its position.": "优先即时更新或一次高亮的差值提示。不要让扫描关键内容追逐自己的位置。",
  "It connects a trigger to a changed state.": "它连接触发动作与变化后的状态。", "It shows where content came from or where it went.": "它说明内容从哪里来、到哪里去。", "It explains progress, completion, or replacement.": "它解释进度、完成或替换。", "The static state still communicates the full result.": "静态状态仍能传达完整结果。", "Text that is frequently scanned for updates.": "需要频繁扫描更新的文本。", "Every card on route entry or every list item on filter change.": "路由进入时的每张卡片，或筛选变化时的每个列表项。", "Values whose stable alignment matters more than novelty.": "稳定对齐比新鲜感更重要的数值。", "Hidden content merely because it can be made to move.": "仅仅因为可以移动就被隐藏的内容。", "When a user requests reduced motion, remove transforms, large opacity fades, autonomous loops, and depth effects. Preserve instant state changes, focus treatment, status color, and all content ordering.": "当用户请求减少动态效果时，移除变换、大幅淡入淡出、自主循环与深度效果；保留即时状态变化、焦点样式、状态色彩和全部内容顺序。",
  "Decision architecture": "决策架构", "Every icon-only action has an accessible label.": "每个仅图标操作都具有可访问标签。", "Focus rings remain visible on transparent controls.": "透明控件上的焦点环始终可见。", "Status combines color with label, icon, or position.": "状态应将色彩与标签、图标或位置结合。", "Progress has a programmatic value and name.": "进度应具有可被程序读取的数值和名称。", "Keep an action's touch target at least 40px square.": "将操作的触控目标保持在至少 40px 见方。", "Collapse rails before shrinking readable content.": "应先折叠侧栏，再压缩可读内容。", "Allow code blocks to scroll locally, never the page.": "允许代码块局部滚动，而不是让页面横向滚动。", "Preserve reading order when grids reflow.": "网格重排时保留阅读顺序。",
  "The primary surface. It combines a translucent neutral base, hairline border, input-led radial signal, and a single depth layer.": "主要表面。它结合半透明中性底色、细边框、由输入驱动的径向信号场，以及单一深度层。", "Realtime": "实时", "Noisy data. Quiet frame.": "嘈杂数据，安静框架。", "Hover to reveal the signal field.": "悬浮以显示信号场。", "A compact status label. Use a semantic tone for live state, risk, success, or a quiet metadata label. Do not use it as primary navigation.": "紧凑的状态标签。为实时状态、风险、成功或安静的元数据标签使用语义色；不要把它作为主导航。", "Live": "实时", "Ready": "就绪", "Review": "待审核", "Draft": "草稿", "A single-action control for dense toolbars. The icon must have an accessible label; an active state means the tool is currently selected, not merely hovered.": "用于密集工具栏的单操作控件。图标必须具有可访问标签；激活状态意味着工具已被选中，而非只是悬浮。", "Open command center": "打开命令中心", "Copy component code": "复制组件代码", "Open layers": "打开图层", "A divider that establishes scanning hierarchy without enclosing a new card. Prefer it over nested panels when content is already inside a surface.": "不创建新卡片、但能建立扫描层级的分隔标题。当内容已在一个表面内时，优先使用它而不是嵌套面板。", "System / active": "系统 / 活动", "Command history": "命令历史", "A title, a quiet explanation, and optional actions share one line of hierarchy.": "标题、安静的说明与可选操作共享同一条层级线。", "04 events": "04 个事件",
  "These primitives express the pieces most often repeated in dashboards, portfolios, and review tools without forcing a product-specific layout.": "这些原语表达仪表盘、作品集和审核工具中最常重复的部分，同时不强制绑定某种产品布局。", "A metric is a primary data point, not a decorative number. Pair it with a stable label; use a color tone only when the value itself carries semantic state.": "指标是主要数据点，而非装饰数字。为它配备稳定标签；仅当数值本身承载语义状态时使用颜色。", "Qualified sessions": "合格会话", "Compared with last week": "相比上周", "Median latency": "中位延迟", "p95 response time": "P95 响应时间", "Progress is for bounded completion, coverage, or capacity. Do not use it to imply a percentage when a task has no measurable end state.": "进度适用于有边界的完成度、覆盖率或容量。任务没有可量化的终点时，不要用它暗示百分比。", "Verification coverage": "验证覆盖率", "Migration readiness": "迁移就绪度", "Active runtime": "运行时活跃度", "A dense row preserves scan order: identity first, descriptive context second, quiet metadata third, and actionable or semantic state at the edge.": "紧凑行应保留扫描顺序：身份优先，描述性上下文其次，安静的元数据再次，可操作或语义状态置于边缘。", "Production release": "生产发布", "Ready to publish": "已准备发布", "Quality gate": "质量关卡", "Awaiting review": "等待审核", "An empty state explains what is absent, why it matters, and the single next action when one exists. It occupies one quiet surface rather than creating a modal interruption.": "空状态应说明缺少什么、为什么重要，以及存在时唯一的下一步操作。它占据一个安静表面，而不是制造模态打断。", "No deployments yet": "尚无部署", "Connect a project or publish a first release to populate this stream.": "连接项目或发布首个版本以填充此信息流。", "Connect project": "连接项目", "Toolbars group adjacent controls, not every page action. A toolbar should be compact, keyboard reachable, and visually subordinate to the content it manipulates.": "工具栏应组合相邻控件，而不是收纳所有页面操作。它需要紧凑、可通过键盘访问，并在视觉上从属于所操控的内容。", "Canvas tools": "画布工具", "Open filters": "打开筛选", "Open display settings": "打开显示设置", "Compact": "紧凑",
  "These patterns preserve the system's character when primitives become a product interface.": "当原语组成产品界面时，这些模式用于保持系统特征。", "Command header": "命令头部", "Place identity and context on one axis. Keep tools compact and visually secondary.": "将身份和上下文放在同一轴线上；工具保持紧凑并在视觉上退后。", "Data canvas": "数据画布", "Use one wide grid with uneven spans. Let content density, not decoration, create rhythm.": "使用一个宽阔且跨度不均的网格。让内容密度而非装饰创造节奏。", "Earned motion": "有意义的动效", "Use 180-500ms transitions for feedback. Reserve spring and depth shifts for navigation or spatial change.": "用 180-500ms 过渡提供反馈；把弹簧和深度变化留给导航或空间变化。", "Layout / command header": "布局 / 命令头部", "Revenue operations": "营收运营", "April 2026 / production workspace": "2026 年 4 月 / 生产工作台", "Revenue workspace actions": "营收工作台操作", "Open workspace filters": "打开工作台筛选", "Open workspace settings": "打开工作台设置", "Identity, context, and tools share one horizontal plane. On small screens, tools wrap below rather than compressing the title.": "身份、上下文和工具共享一个水平平面。小屏幕上工具应换行到下方，而不是压缩标题。", "Layout / inspector rail": "布局 / 检查器栏", "Use a rail for persistent comparison or inspection. It is a sibling layout region, never another floating card inside the canvas.": "使用侧栏承载持续的比较或检查。它是同级布局区域，而不是画布内另一张浮动卡片。", "Layout / adaptive data canvas": "布局 / 自适应数据画布", "Span by information density, not visual symmetry.": "按信息密度分配跨度，而非追求视觉对称。", "12-column desktop / single-column mobile": "桌面端 12 列 / 移动端单列", "Qualified pipeline": "合格管道", "Review queue": "审核队列", "14 items waiting": "14 个项目等待处理",
  "The system is portable because it defines decisions, not because every screen looks the same. Use these rules before introducing a new primitive.": "系统的可移植性来自它定义了决策，而不是让每个页面看起来都一样。在引入新原语前先使用这些规则。", "Primary": "主要", "Names, current value, or decision-driving status.": "名称、当前数值或驱动决策的状态。", "Supporting": "辅助", "Context that changes interpretation of the primary signal.": "会改变主要信号解释的上下文。", "Quiet": "安静", "Timestamps, identifiers, stable labels, and provenance.": "时间戳、标识符、稳定标签与来源。", "Example signal": "示例信号", "A live condition, key action, or state requiring attention.": "需要关注的实时情况、关键操作或状态。", "Success": "成功", "A completed or healthy condition; retain a label, not color alone.": "已完成或健康的情况；保留文字标签，而非只依赖颜色。", "Warning": "警告", "A recoverable risk or review point; describe the next action.": "可恢复的风险或审核点；说明下一步操作。", "Metadata with no need to compete for attention.": "不需要争夺注意力的元数据。", "Give the page one obvious data or identity anchor.": "为页面提供一个清晰的数据或身份锚点。", "Use a border or tonal shift before introducing a shadow.": "引入阴影前先尝试边框或色调变化。", "Let nearby controls share a toolbar; keep global actions outside it.": "让相邻控件共享工具栏；全局操作应置于其外。", "Use the grid to align information, not to decorate empty space.": "使用网格对齐信息，而非装饰留白。", "Nested translucent cards that create no new hierarchy.": "不会形成新层级的嵌套半透明卡片。", "Permanent red glow across every surface or metric.": "覆盖每个表面或指标的永久红色光晕。", "Entrance motion for content users are repeatedly scanning.": "为用户反复扫描的内容添加入场动效。", "Forcing desktop card density onto a narrow viewport.": "将桌面端卡片密度强行塞进窄视口。", "Copy tokens, then primitives, then patterns.": "先复制令牌，再复制原语，最后复制模式。", "Do not start by copying a finished dashboard. First establish the color, type, spacing, focus, and state contracts that make components interoperable.": "不要从复制一个完成的仪表盘开始。先建立色彩、字体、间距、焦点和状态约定，使组件能够互操作。", "Import tokens.css into the application stylesheet.": "将 tokens.css 导入应用样式表。", "Move only the primitives required by the product.": "只迁移产品真正需要的原语。", "Validate keyboard, reduced-motion, and small-screen behavior.": "验证键盘、减少动态效果和小屏幕行为。", "Compose a new pattern only when hierarchy changes.": "仅在层级变化时组合新的模式。",
  "Toggle documentation navigation": "切换文档导航", "Signalframe documentation": "Signalframe 文档", "v0.1 / portable core": "v0.1 / 可移植核心", "2m ago": "2 分钟前", "14m ago": "14 分钟前",
  "Type scale and minimum size": "字号层级与最小尺寸", "A readable system starts with a floor: no user-facing text below 12px.": "可读的系统先要有下限：所有面向用户的文字均不得小于 12px。", "Display": "展示", "Reserve for page-level moments. It names the workspace; it does not carry instructions.": "用于页面级重点时刻：它命名工作台，但不承载操作说明。", "Section": "章节", "Use to divide a long page into meaningful decision areas.": "用于将长页面划分为有意义的决策区域。", "Body": "正文", "Default for explanatory content and reading-oriented descriptions.": "说明性内容和阅读导向描述的默认字号。", "Compact UI": "紧凑界面", "Use for supporting controls, dense rows, and secondary context.": "用于辅助控件、紧凑行和次要上下文。", "Metadata": "元数据", "The system floor. Use only for stable labels, provenance, timestamps, and compact status; never for body copy or primary actions.": "系统下限。仅用于稳定标签、来源、时间戳和紧凑状态；绝不用于正文或主要操作。",
  "Design references and boundaries": "设计参照与边界", "Signalframe shares a modern product-workspace grammar with respected systems, while keeping its own visual and operational constraints.": "Signalframe 与成熟系统共享现代产品工作台的设计语法，同时保留自身的视觉与操作约束。", "Operational restraint": "克制的运行界面", "Shared: a quiet chrome, high information density, earned motion, and state-led work. Divergence: Signalframe uses a stronger red signal and a more spatial data canvas.": "共性：安静的框架、高信息密度、有意义的动效和由状态引导的工作流。差异：Signalframe 使用更鲜明的红色信号与更具空间感的数据画布。", "Clarity and deference": "清晰与退让", "Shared: content leads while the interface recedes. Signalframe translates that principle to dense dark workspaces rather than a platform-native visual language.": "共性：内容主导，界面退让。Signalframe 将这一原则用于数据密集的深色工作台，而非平台原生的视觉语言。", "Systematic trust": "系统化的可信度", "Shared: reusable primitives, explicit states, and accessibility as part of the system contract. Signalframe keeps the system smaller and more editorial in tone.": "共性：可复用原语、明确状态，以及无障碍作为系统约定的一部分。Signalframe 保持更小的系统规模与更具编辑感的语气。",
};

const I18nContext = createContext<(value: string) => string>((value) => value);

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
  const t = useContext(I18nContext);

  return (
    <SignalPanel interactive={false} tone="quiet" className="overflow-visible">
      <div className="grid min-h-72 min-w-0 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex min-h-48 min-w-0 items-center justify-center border-b border-white/[0.07] bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.11),transparent_64%)] p-8 lg:min-h-72 lg:border-b-0 lg:border-r">
          {preview}
        </div>
        <div className="flex min-w-0 flex-col justify-between">
          <div className="p-6">
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.22em] text-red-400">{t("Component")}</p>
            <h3 className="text-xl font-semibold tracking-tight text-white">{title}</h3>
            <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-400">{t(description)}</p>
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
  const t = (value: string) => locale === "zh" ? zhText[value] ?? value : value;

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
    document.title = locale === "zh" ? "Signalframe - 界面系统" : "Signalframe - Interface System";
    window.localStorage.setItem("signalframe-locale", locale);
  }, [locale]);

  return (
    <I18nContext.Provider value={t}>
    <div className="sf-docs-canvas min-h-screen text-neutral-200">
      <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-neutral-950/78 px-5 py-3 backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="#top" className="flex items-center gap-2 font-mono text-xs tracking-[0.18em] text-white">
            <span className="grid h-7 w-7 place-items-center rounded-lg border border-red-500/30 bg-red-500/10 text-red-300"><ScanLine className="h-4 w-4" /></span>
            SIGNALFRAME
          </a>
          <div className="flex items-center gap-2">
            <button type="button" className="sf-lang-toggle inline-flex h-8 items-center gap-1 rounded-lg border border-white/[0.09] bg-white/[0.03] px-2 font-mono text-xs tracking-[0.12em] text-neutral-300 transition-colors hover:border-red-500/35 hover:text-white" onClick={() => setLocale((current) => current === "en" ? "zh" : "en")} aria-label={`${copy.switchLanguage} ${copy.language}`}>
              <Languages className="h-3.5 w-3.5 text-red-300" /> {copy.languageShort}
            </button>
            <SignalIconButton aria-label={t("Toggle documentation navigation")} onClick={() => setMenuOpen((open) => !open)} active={menuOpen} className="h-8 w-8 rounded-lg">
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
            <span><span className="block font-mono text-xs tracking-[0.18em] text-white">SIGNALFRAME</span><span className="mt-1 block text-xs uppercase tracking-[0.16em] text-neutral-600">{copy.mobileLabel}</span></span>
          </a>
          <Navigation locale={locale} className="sf-docs-nav-scroll mt-12 min-h-0 flex-1 overflow-y-auto pb-8" />
          <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-5"><span className="font-mono text-xs uppercase tracking-[0.15em] text-neutral-600">{t("v0.1 / portable core")}</span><button type="button" className="sf-lang-toggle inline-flex items-center gap-1 font-mono text-xs tracking-[0.12em] text-neutral-400 hover:text-white" onClick={() => setLocale((current) => current === "en" ? "zh" : "en")} aria-label={`${copy.switchLanguage} ${copy.language}`}><Languages className="h-3.5 w-3.5 text-red-300" /> {copy.languageShort}</button></div>
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
              <SignalSectionHeading eyebrow={t("Foundations / 01")} title={t("Principles")} description={t("The rules that make the system recognizable across focused workspaces and data-rich interfaces.")} />
              <div className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] md:grid-cols-2">
                {principles.map(([title, description], index) => (
                  <div key={title} className="bg-neutral-950/75 p-6 transition-colors hover:bg-neutral-900/65">
                    <span className="font-mono text-xs tracking-[0.18em] text-red-400">0{index + 1}</span>
                    <h3 className="mt-5 text-lg font-medium text-white">{t(title)}</h3>
                    <p className="mt-3 text-sm leading-6 text-neutral-400">{t(description)}</p>
                  </div>
                ))}
              </div>
            </DocSection>

            <DocSection id="foundations">
              <SignalSectionHeading eyebrow={t("Foundations / 02")} title={t("Color, depth, and type")} description={t("Neutral surfaces keep attention available for one signal color. The mono face labels systems; the sans face carries content.")} />
              <div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
                <SignalPanel interactive={false} tone="quiet" className="p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-neutral-500">{t("Signal scale")}</p>
                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[["Canvas", "#09090b", "bg-neutral-950"], ["Surface", "58% neutral", "bg-neutral-900/55"], ["Line", "8% white", "bg-white/10"], ["Signal", "#ef4444", "bg-red-500"]].map(([label, value, color]) => <div key={label} className="space-y-3"><div className={`h-16 rounded-xl border border-white/10 ${color}`} /><div><p className="text-sm text-white">{t(label)}</p><p className="font-mono text-xs text-neutral-500">{value}</p></div></div>)}
                  </div>
                </SignalPanel>
                <SignalPanel interactive={false} tone="quiet" className="p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-neutral-500">{t("Spacing rhythm")}</p>
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
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-red-400">{t("Type roles")}</p>
                  <div className="mt-6 space-y-5"><FontSpec item={copy.typography.ui} /><FontSpec item={copy.typography.cjk} /><FontSpec item={copy.typography.mono} /></div>
                </SignalPanel>
                <SignalPanel interactive={false} tone="quiet" className="overflow-hidden">
                  <div className="p-6"><p className="font-mono text-xs uppercase tracking-[0.18em] text-red-400">{copy.typography.ruleTitle}</p><p className="mt-4 max-w-xl text-sm leading-7 text-neutral-300">{copy.typography.rule}</p><div className="mt-7 border-l border-red-400/60 pl-5"><p className="text-3xl font-semibold tracking-[-0.045em] text-white">{t("Operational clarity")}</p><p className="mt-3 text-base leading-7 text-neutral-400">{"\u5C06\u590D\u6742\u72B6\u6001\u8F6C\u5316\u4E3A\u53EF\u5224\u65AD\u7684\u4FE1\u606F\u3002"}</p><p className="mt-5 font-mono text-xs tracking-[0.14em] text-red-300">SYNC / 09:42 / HEALTHY</p></div></div>
                  <CodeBlock language="css" label="CSS" code={`@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Noto+Sans+SC:wght@400;500;600;700&display=swap");\n\n:root {\n  --sf-font-sans: "Manrope", "Noto Sans SC", sans-serif;\n  --sf-font-mono: "JetBrains Mono", "Cascadia Code", monospace;\n}`} />
                </SignalPanel>
              </div>
              <SignalPanel interactive={false} tone="quiet" className="p-6">
                <div className="max-w-2xl">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-red-400">{t("Type scale and minimum size")}</p>
                  <p className="mt-3 text-sm leading-6 text-neutral-400">{t("A readable system starts with a floor: no user-facing text below 12px.")}</p>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                  {typeScale.map(([role, size, description]) => (
                    <div key={role} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                      <p className="font-mono text-xs tracking-[0.14em] text-red-300">{size}</p>
                      <h3 className="mt-4 text-sm font-medium text-white">{t(role)}</h3>
                      <p className="mt-2 text-xs leading-5 text-neutral-400">{t(description)}</p>
                    </div>
                  ))}
                </div>
              </SignalPanel>
            </DocSection>

            <DocSection id="motion">
              <SignalSectionHeading eyebrow={t("Foundations / 03")} title={t("Motion and spatial depth")} description={t("Signalframe treats motion as a state transition. It should clarify origin, hierarchy, or completion, never decorate an idle screen.")} />
              <div className="grid gap-4 md:grid-cols-3">
                <RuleCard index="01" title="Rest before motion" body="The default state must be complete and useful. Hover and focus may add a 180-300ms emphasis layer, not move core content." />
                <RuleCard index="02" title="One depth plane" body="A page can use a quiet canvas, one raised surface plane, and content lifted inside it. Do not stack multiple blur cards to fake hierarchy." />
                <RuleCard index="03" title="Respect reduced motion" body="Animation must yield to reduced-motion preferences. Keep color, focus, and information hierarchy intact when transforms disappear." />
              </div>
              <SignalPanel interactive={false} tone="quiet" className="p-6">
                <div className="grid gap-6 md:grid-cols-[0.75fr_1.25fr] md:items-center">
                  <div><p className="font-mono text-xs uppercase tracking-[0.18em] text-red-400">{t("Timing ladder")}</p><p className="mt-3 text-lg font-medium text-white">{t("Short for feedback. Longer for spatial change.")}</p></div>
                  <div className="space-y-4">
                    <MotionRule duration="120-180ms" label="Color, border, icon feedback" width="w-1/3" />
                    <MotionRule duration="220-320ms" label="Surface emphasis, toolbar state, disclosure" width="w-1/2" />
                    <MotionRule duration="360-500ms" label="Route, card stack, or large layout transition" width="w-3/4" />
                  </div>
                </div>
              </SignalPanel>
              <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                <SignalPanel interactive={false} tone="quiet" className="p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-red-400">{t("Motion grammar")}</p>
                  <div className="mt-5 divide-y divide-white/[0.07]">
                    <MotionRecipe trigger="Pointer intent" preset="feedback" duration="180ms" output="Border, signal field, icon emphasis. No layout shift." />
                    <MotionRecipe trigger="New content" preset="reveal" duration="320ms" output="Opacity plus a 12px vertical settle. Stagger only siblings." />
                    <MotionRecipe trigger="Context switch" preset="spatial" duration="420ms" output="A single outgoing and incoming plane; keep the destination opaque." />
                    <MotionRecipe trigger="Reorder / carousel" preset="spatial" duration="420ms" output="Animate between measured resting positions, never toward guessed offsets." />
                  </div>
                </SignalPanel>
                <SignalPanel interactive={false} tone="quiet" className="p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-red-400">{t("Lifecycle")}</p>
                  <div className="mt-6 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-neutral-500"><MotionStep label="Rest" /><span className="h-px flex-1 bg-red-500/30" /><MotionStep label="Intent" active /><span className="h-px flex-1 bg-red-500/30" /><MotionStep label="Commit" /><span className="h-px flex-1 bg-red-500/30" /><MotionStep label="Settle" /></div>
                  <p className="mt-7 text-sm leading-6 text-neutral-400">{t("The visual response starts from a user action or a meaningful state change. Motion must resolve into a stable rest state; a loop is reserved for an active process that needs ongoing attention.")}</p>
                  <div className="mt-5 rounded-xl border border-red-500/15 bg-red-500/[0.04] p-4 text-xs leading-5 text-neutral-300"><span className="font-mono text-xs uppercase tracking-[0.14em] text-red-300">{t("Guardrail")}</span><p className="mt-2">{t("Do not combine a scale, blur, large translation, and opacity transition on the same content layer. Choose one spatial cue and let hierarchy do the rest.")}</p></div>
                </SignalPanel>
              </div>
              <SignalPanel interactive={false} tone="command" className="overflow-visible">
                <div className="grid min-w-0 lg:grid-cols-[0.85fr_1.15fr]">
                  <div className="p-6"><p className="font-mono text-xs uppercase tracking-[0.18em] text-red-400">{t("Portable presets")}</p><h3 className="mt-3 text-lg font-medium text-white">{t("Use a named preset before designing a one-off transition.")}</h3><p className="mt-3 text-sm leading-6 text-neutral-400">{t("The exported presets keep timing and easing coherent across Motion components while leaving the component responsible for its own layout and state.")}</p><div className="mt-5 flex flex-wrap gap-2"><SignalChip tone="signal">feedback</SignalChip><SignalChip>emphasis</SignalChip><SignalChip>reveal</SignalChip><SignalChip>spatial</SignalChip></div></div>
                  <DocCode>{code.motion}</DocCode>
                </div>
              </SignalPanel>
              <div className="grid min-w-0 gap-4 xl:grid-cols-[1.1fr_0.9fr]">
                <SignalPanel interactive={false} tone="quiet" className="min-w-0">
                  <div className="min-w-0 p-6">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-red-400">{t("Spatial handoff")}</p>
                    <h3 className="mt-3 text-lg font-medium text-white">{t("Animate from real geometry, then settle into the same geometry.")}</h3>
                    <p className="mt-3 text-sm leading-6 text-neutral-400">{t("For carousels, reordering, and stacked surfaces, let layout measurement describe the resting position. The next surface should already have its final background, depth, and content before it moves into view. Never use a temporary animation-only card style.")}</p>
                    <ol className="mt-5 grid gap-3 text-sm leading-6 text-neutral-300 sm:grid-cols-3"><MotionGuideline index="01" title="Stage" body="Render the destination at its final visual fidelity." /><MotionGuideline index="02" title="Exchange" body="Move only the surfaces changing hierarchy." /><MotionGuideline index="03" title="Settle" body="Remove transition state without a second layout jump." /></ol>
                  </div>
                  <DocCode>{code.spatial}</DocCode>
                </SignalPanel>
                <SignalPanel interactive={false} tone="quiet" className="min-w-0">
                  <div className="min-w-0 p-6">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-red-400">{t("Direct manipulation")}</p>
                    <h3 className="mt-3 text-lg font-medium text-white">{t("Pointer input leads; the interface follows.")}</h3>
                    <p className="mt-3 text-sm leading-6 text-neutral-400">{t("A dragged layer tracks the pointer directly. On release, use one short commit or return motion. Hover can fan a card stack from its hinge, but it must never leave the resting state changed after pointer exit.")}</p>
                    <ul className="mt-5 space-y-2 text-sm leading-6 text-neutral-300"><li>{t("Set a visible threshold before committing a directional change.")}</li><li>{t("Disable a second navigation action until the current commit resolves.")}</li><li>{t("Keep keyboard and button navigation equivalent to the gesture.")}</li></ul>
                  </div>
                  <DocCode>{code.gesture}</DocCode>
                </SignalPanel>
              </div>
              <SignalPanel interactive={false} tone="quiet" className="p-6">
                <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                  <div><p className="font-mono text-xs uppercase tracking-[0.18em] text-red-400">{t("Interruption policy")}</p><h3 className="mt-3 text-lg font-medium text-white">{t("A new intent replaces an unfinished one.")}</h3><p className="mt-3 text-sm leading-6 text-neutral-400">{t("Animation is not a queue. If the user reverses direction, calculate from the current rendered position and commit in the new direction immediately; do not replay a stale first frame.")}</p></div>
                  <div className="grid gap-3 sm:grid-cols-3"><GuidanceState tone="signal" title="Navigation" body="Use the latest direction. Preserve the in-flight surface only long enough to bridge geometry." /><GuidanceState tone="warning" title="Async state" body="Keep the last confirmed value visible; reserve looping motion for an active request with a label." /><GuidanceState tone="quiet" title="Text and metrics" body="Prefer an instant update or a single highlighted delta. Never make scan-critical content chase its position." /></div>
                </div>
              </SignalPanel>
              <div className="grid gap-4 md:grid-cols-2">
                <SignalPanel interactive={false} tone="quiet" className="p-6"><p className="font-mono text-xs uppercase tracking-[0.18em] text-emerald-300">{t("Use motion when")}</p><ul className="mt-5 space-y-2 text-sm leading-6 text-neutral-300"><li>{t("It connects a trigger to a changed state.")}</li><li>{t("It shows where content came from or where it went.")}</li><li>{t("It explains progress, completion, or replacement.")}</li><li>{t("The static state still communicates the full result.")}</li></ul></SignalPanel>
                <SignalPanel interactive={false} tone="quiet" className="p-6"><p className="font-mono text-xs uppercase tracking-[0.18em] text-red-300">{t("Do not animate")}</p><ul className="mt-5 space-y-2 text-sm leading-6 text-neutral-300"><li>{t("Text that is frequently scanned for updates.")}</li><li>{t("Every card on route entry or every list item on filter change.")}</li><li>{t("Values whose stable alignment matters more than novelty.")}</li><li>{t("Hidden content merely because it can be made to move.")}</li></ul></SignalPanel>
              </div>
              <SignalPanel interactive={false} tone="quiet" className="p-6">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-red-400">{t("Reduced-motion contract")}</p>
                <div className="mt-4 grid gap-5 md:grid-cols-[0.85fr_1.15fr] md:items-start"><p className="text-sm leading-6 text-neutral-400">{t("When a user requests reduced motion, remove transforms, large opacity fades, autonomous loops, and depth effects. Preserve instant state changes, focus treatment, status color, and all content ordering.")}</p><DocCode>{`@media (prefers-reduced-motion: reduce) {\n  *, *::before, *::after {\n    animation-duration: 1ms !important;\n    transition-duration: 1ms !important;\n    scroll-behavior: auto !important;\n  }\n}`}</DocCode></div>
              </SignalPanel>
              <MotionLab copy={copy.motionLab} />
            </DocSection>

            <DocSection id="product-design">
              <SignalSectionHeading eyebrow={copy.product.eyebrow} title={copy.product.title} description={copy.product.description} />
              <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
                <SignalPanel interactive={false} tone="quiet" className="p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-red-400">{t("Decision architecture")}</p>
                  <div className="mt-6 space-y-1 border-l border-white/[0.09] pl-5">{copy.product.layers.map(([index, title, body]) => <div key={title} className="relative py-4"><span className="absolute -left-[29px] top-6 h-2 w-2 rounded-full border border-red-400/70 bg-neutral-950" /><span className="font-mono text-xs tracking-[0.14em] text-red-400">{index}</span><h3 className="mt-2 text-base font-medium text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-neutral-400">{body}</p></div>)}</div>
                </SignalPanel>
                <SignalPanel interactive={false} tone="quiet" className="p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-red-400">{copy.product.interactionTitle}</p>
                  <div className="mt-6 grid gap-3">{copy.product.interaction.map(([title, body], index) => <div key={title} className="grid grid-cols-[44px_minmax(0,1fr)] gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4"><span className="font-mono text-xs text-red-400">0{index + 1}</span><div><h3 className="text-sm font-medium text-white">{title}</h3><p className="mt-1 text-xs leading-5 text-neutral-400">{body}</p></div></div>)}</div>
                  <div className="mt-5 rounded-xl border border-red-500/15 bg-red-500/[0.04] p-4"><p className="font-mono text-xs uppercase tracking-[0.14em] text-red-300">{copy.product.avoidTitle}</p><p className="mt-2 text-sm leading-6 text-neutral-300">{copy.product.avoid}</p></div>
                </SignalPanel>
              </div>
              <SignalPanel interactive={false} tone="command" className="p-6">
                <div className="max-w-3xl">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-red-400">{t("Design references and boundaries")}</p>
                  <p className="mt-3 text-lg font-medium tracking-tight text-white">{t("Signalframe shares a modern product-workspace grammar with respected systems, while keeping its own visual and operational constraints.")}</p>
                </div>
                <div className="mt-6 grid gap-3 lg:grid-cols-3">
                  {designLineage.map(([system, title, body]) => (
                    <div key={system} className="rounded-xl border border-white/[0.07] bg-black/20 p-4">
                      <p className="font-mono text-xs tracking-[0.14em] text-red-300">{system}</p>
                      <h3 className="mt-4 text-sm font-medium text-white">{t(title)}</h3>
                      <p className="mt-2 text-xs leading-5 text-neutral-400">{t(body)}</p>
                    </div>
                  ))}
                </div>
              </SignalPanel>
            </DocSection>

            <DocSection id="accessibility">
              <SignalSectionHeading eyebrow={t("Foundations / 04")} title={t("Accessible by default")} description={t("A dark system gains quality from clarity, not from low contrast. Every signal needs a non-color equivalent.")} />
              <div className="grid gap-4 md:grid-cols-2">
                <SignalPanel interactive={false} tone="quiet" className="p-6"><div className="flex items-start gap-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-300"><ShieldCheck className="h-5 w-5" /></span><div><h3 className="text-sm font-medium text-white">{t("Required behavior")}</h3><ul className="mt-3 space-y-2 text-sm leading-6 text-neutral-400"><li>{t("Every icon-only action has an accessible label.")}</li><li>{t("Focus rings remain visible on transparent controls.")}</li><li>{t("Status combines color with label, icon, or position.")}</li><li>{t("Progress has a programmatic value and name.")}</li></ul></div></div></SignalPanel>
                <SignalPanel interactive={false} tone="quiet" className="p-6"><div className="flex items-start gap-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-200"><MonitorSmartphone className="h-5 w-5" /></span><div><h3 className="text-sm font-medium text-white">{t("Responsive baseline")}</h3><ul className="mt-3 space-y-2 text-sm leading-6 text-neutral-400"><li>{t("Keep an action's touch target at least 40px square.")}</li><li>{t("Collapse rails before shrinking readable content.")}</li><li>{t("Allow code blocks to scroll locally, never the page.")}</li><li>{t("Preserve reading order when grids reflow.")}</li></ul></div></div></SignalPanel>
              </div>
            </DocSection>

            <DocSection id="components">
              <SignalSectionHeading eyebrow={t("Components / 03")} title={t("Portable primitives")} description={t("All components are source-owned under src/design-system and rendered by this documentation site directly.")} />
              <div className="space-y-5">
                <ComponentSpec title="SignalPanel" description="The primary surface. It combines a translucent neutral base, hairline border, input-led radial signal, and a single depth layer." preview={<SignalPanel className="w-full max-w-sm p-5"><p className="font-mono text-xs uppercase tracking-[0.18em] text-red-400">{t("Realtime")}</p><p className="mt-4 text-2xl font-semibold tracking-tight text-white">{t("Noisy data. Quiet frame.")}</p><p className="mt-2 text-sm leading-6 text-neutral-400">{t("Hover to reveal the signal field.")}</p></SignalPanel>}>{code.panel}</ComponentSpec>
                <ComponentSpec title="SignalChip" description="A compact status label. Use a semantic tone for live state, risk, success, or a quiet metadata label. Do not use it as primary navigation." preview={<div className="flex flex-wrap justify-center gap-2"><SignalChip tone="signal"><CircleDot className="h-3 w-3" /> {t("Live")}</SignalChip><SignalChip tone="success"><Check className="h-3 w-3" /> {t("Ready")}</SignalChip><SignalChip tone="warning">{t("Review")}</SignalChip><SignalChip>{t("Draft")}</SignalChip></div>}>{code.chip}</ComponentSpec>
                <ComponentSpec title="SignalIconButton" description="A single-action control for dense toolbars. The icon must have an accessible label; an active state means the tool is currently selected, not merely hovered." preview={<div className="flex gap-3"><SignalIconButton aria-label={t("Open command center")} active><Command className="h-4 w-4" /></SignalIconButton><SignalIconButton aria-label={t("Copy component code")}><Copy className="h-4 w-4" /></SignalIconButton><SignalIconButton aria-label={t("Open layers")}><Layers3 className="h-4 w-4" /></SignalIconButton></div>}>{code.icon}</ComponentSpec>
                <ComponentSpec title="SignalSectionHeading" description="A divider that establishes scanning hierarchy without enclosing a new card. Prefer it over nested panels when content is already inside a surface." preview={<div className="w-full max-w-sm"><SignalSectionHeading eyebrow={t("System / active")} title={t("Command history")} description={t("A title, a quiet explanation, and optional actions share one line of hierarchy.")} action={<SignalChip tone="signal">{t("04 events")}</SignalChip>} /></div>}>{`<SignalSectionHeading\n  eyebrow="System / active"\n  title="Command history"\n  description="A title, a quiet explanation, and optional actions."\n/>`}</ComponentSpec>
              </div>
            </DocSection>

            <DocSection id="data-components">
              <SignalSectionHeading eyebrow={t("Components / 04")} title={t("Data and operational states")} description={t("These primitives express the pieces most often repeated in dashboards, portfolios, and review tools without forcing a product-specific layout.")} />
              <div className="space-y-5">
                <ComponentSpec title="SignalMetric" description="A metric is a primary data point, not a decorative number. Pair it with a stable label; use a color tone only when the value itself carries semantic state." preview={<div className="grid w-full max-w-sm grid-cols-2 gap-7"><SignalMetric label={t("Qualified sessions")} value="18.4k" delta="+12.6%" tone="success" detail={t("Compared with last week")} /><SignalMetric label={t("Median latency")} value="164ms" delta="-21ms" tone="signal" detail={t("p95 response time")} /></div>}>{code.metric}</ComponentSpec>
                <ComponentSpec title="SignalProgress" description="Progress is for bounded completion, coverage, or capacity. Do not use it to imply a percentage when a task has no measurable end state." preview={<div className="w-full max-w-sm space-y-5"><SignalProgress label={t("Verification coverage")} value="76%" percent={76} tone="success" /><SignalProgress label={t("Migration readiness")} value="42%" percent={42} tone="warning" /><SignalProgress label={t("Active runtime")} value="98%" percent={98} /></div>}>{code.progress}</ComponentSpec>
                <ComponentSpec title="SignalDataRow" description="A dense row preserves scan order: identity first, descriptive context second, quiet metadata third, and actionable or semantic state at the edge." preview={<div className="w-full max-w-sm"><SignalDataRow leading={<Archive className="h-4 w-4" />} label={t("Production release")} description={t("Ready to publish")} meta={t("2m ago")} trailing={<SignalChip tone="success">{t("Ready")}</SignalChip>} /><SignalDataRow leading={<Activity className="h-4 w-4" />} label={t("Quality gate")} description={t("Awaiting review")} meta={t("14m ago")} trailing={<SignalChip tone="warning">{t("Review")}</SignalChip>} /></div>}>{code.row}</ComponentSpec>
                <ComponentSpec title="SignalEmptyState" description="An empty state explains what is absent, why it matters, and the single next action when one exists. It occupies one quiet surface rather than creating a modal interruption." preview={<SignalPanel interactive={false} tone="quiet" className="w-full max-w-sm"><SignalEmptyState icon={<Inbox className="h-5 w-5" />} title={t("No deployments yet")} description={t("Connect a project or publish a first release to populate this stream.")} action={<button type="button" className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-100">{t("Connect project")}</button>} /></SignalPanel>}>{`<SignalEmptyState\n  icon={<Inbox className="h-5 w-5" />}\n  title="No deployments yet"\n  description="Connect a project to populate this stream."\n/>`}</ComponentSpec>
                <ComponentSpec title="SignalToolbar" description="Toolbars group adjacent controls, not every page action. A toolbar should be compact, keyboard reachable, and visually subordinate to the content it manipulates." preview={<SignalToolbar label={t("Canvas tools")}><SignalIconButton aria-label={t("Open filters")} active><ListFilter className="h-4 w-4" /></SignalIconButton><SignalIconButton aria-label={t("Open display settings")}><SlidersHorizontal className="h-4 w-4" /></SignalIconButton><span className="mx-1 h-5 w-px bg-white/10" /><SignalChip>{t("Compact")}</SignalChip></SignalToolbar>}>{`<SignalToolbar label="Canvas tools">\n  <SignalIconButton aria-label="Open filters">...</SignalIconButton>\n  <SignalIconButton aria-label="Open display settings">...</SignalIconButton>\n</SignalToolbar>`}</ComponentSpec>
              </div>
            </DocSection>

            <DocSection id="patterns">
              <SignalSectionHeading eyebrow={t("Patterns / 04")} title={t("Composition rules")} description={t("These patterns preserve the system's character when primitives become a product interface.")} />
              <div className="grid gap-4 md:grid-cols-3">
                <Pattern icon={<Command />} title="Command header" body="Place identity and context on one axis. Keep tools compact and visually secondary." />
                <Pattern icon={<Box />} title="Data canvas" body="Use one wide grid with uneven spans. Let content density, not decoration, create rhythm." />
                <Pattern icon={<Sparkles />} title="Earned motion" body="Use 180-500ms transitions for feedback. Reserve spring and depth shifts for navigation or spatial change." />
              </div>
              <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
                <SignalPanel interactive={false} tone="quiet" className="p-5 sm:p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-red-400">{t("Layout / command header")}</p>
                  <div className="mt-5 flex flex-col gap-5 border-b border-white/[0.07] pb-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-center gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-red-500/25 bg-red-500/10 text-red-300"><LayoutDashboard className="h-5 w-5" /></span><div className="min-w-0"><h3 className="truncate text-lg font-medium text-white">{t("Revenue operations")}</h3><p className="truncate text-xs text-neutral-500">{t("April 2026 / production workspace")}</p></div></div>
                    <SignalToolbar label={t("Revenue workspace actions")}><SignalIconButton aria-label={t("Open workspace filters")}><ListFilter className="h-4 w-4" /></SignalIconButton><SignalIconButton aria-label={t("Open workspace settings")}><SlidersHorizontal className="h-4 w-4" /></SignalIconButton></SignalToolbar>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-neutral-400">{t("Identity, context, and tools share one horizontal plane. On small screens, tools wrap below rather than compressing the title.")}</p>
                </SignalPanel>
                <SignalPanel interactive={false} tone="quiet" className="p-5 sm:p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-red-400">{t("Layout / inspector rail")}</p>
                  <div className="mt-5 grid min-h-36 grid-cols-[1fr_104px] gap-3">
                    <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4"><div className="h-2 w-24 rounded bg-white/10" /><div className="mt-4 grid grid-cols-3 gap-2"><span className="h-12 rounded-lg bg-red-500/10" /><span className="h-12 rounded-lg bg-white/[0.04]" /><span className="h-12 rounded-lg bg-white/[0.04]" /></div></div>
                    <div className="rounded-xl border border-red-500/15 bg-red-500/[0.04] p-3"><div className="h-2 w-12 rounded bg-red-400/50" /><div className="mt-4 space-y-2"><div className="h-2 rounded bg-white/10" /><div className="h-2 w-4/5 rounded bg-white/10" /><div className="h-2 w-3/5 rounded bg-white/10" /></div></div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-neutral-400">{t("Use a rail for persistent comparison or inspection. It is a sibling layout region, never another floating card inside the canvas.")}</p>
                </SignalPanel>
              </div>
              <SignalPanel interactive={false} tone="quiet" className="p-5 sm:p-6">
                <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><div><p className="font-mono text-xs uppercase tracking-[0.18em] text-red-400">{t("Layout / adaptive data canvas")}</p><h3 className="mt-3 text-lg font-medium text-white">{t("Span by information density, not visual symmetry.")}</h3></div><SignalChip tone="quiet"><Rows3 className="h-3 w-3" /> {t("12-column desktop / single-column mobile")}</SignalChip></div>
                <div className="mt-6 grid gap-3 md:grid-cols-6"><div className="md:col-span-4"><SignalPanel interactive={false} tone="default" className="p-4"><div className="flex items-center justify-between"><SignalMetric label={t("Qualified pipeline")} value="$482k" delta="+8.4%" tone="success" /><BarChart3 className="h-8 w-8 text-red-400/60" /></div><div className="mt-5 grid grid-cols-3 gap-2"><span className="h-10 rounded-lg bg-red-500/15" /><span className="h-10 rounded-lg bg-red-500/10" /><span className="h-10 rounded-lg bg-red-500/5" /></div></SignalPanel></div><div className="md:col-span-2"><SignalPanel interactive={false} tone="quiet" className="p-4"><Gauge className="h-5 w-5 text-amber-200" /><p className="mt-5 text-sm font-medium text-white">{t("Review queue")}</p><p className="mt-1 text-xs text-neutral-500">{t("14 items waiting")}</p></SignalPanel></div></div>
              </SignalPanel>
            </DocSection>

            <DocSection id="guidance">
              <SignalSectionHeading eyebrow={t("Guidance / 05")} title={t("Write and compose with intent")} description={t("The system is portable because it defines decisions, not because every screen looks the same. Use these rules before introducing a new primitive.")} />
              <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
                <SignalPanel interactive={false} tone="quiet" className="p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-red-400">{t("Content hierarchy")}</p>
                  <div className="mt-5 space-y-5"><HierarchyRow level="Primary" style="text-xl font-semibold tracking-tight text-white" use="Names, current value, or decision-driving status." /><HierarchyRow level="Supporting" style="text-sm text-neutral-300" use="Context that changes interpretation of the primary signal." /><HierarchyRow level="Quiet" style="font-mono text-xs uppercase tracking-[0.14em] text-neutral-500" use="Timestamps, identifiers, stable labels, and provenance." /></div>
                </SignalPanel>
                <SignalPanel interactive={false} tone="quiet" className="p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-red-400">{t("State and feedback")}</p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2"><GuidanceState tone="signal" title="Signal" body="A live condition, key action, or state requiring attention." /><GuidanceState tone="success" title="Success" body="A completed or healthy condition; retain a label, not color alone." /><GuidanceState tone="warning" title="Warning" body="A recoverable risk or review point; describe the next action." /><GuidanceState tone="quiet" title="Quiet" body="Metadata with no need to compete for attention." /></div>
                </SignalPanel>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <SignalPanel interactive={false} tone="quiet" className="p-6"><p className="font-mono text-xs uppercase tracking-[0.18em] text-emerald-300">{t("Do")}</p><ul className="mt-5 space-y-3 text-sm leading-6 text-neutral-300"><li>{t("Give the page one obvious data or identity anchor.")}</li><li>{t("Use a border or tonal shift before introducing a shadow.")}</li><li>{t("Let nearby controls share a toolbar; keep global actions outside it.")}</li><li>{t("Use the grid to align information, not to decorate empty space.")}</li></ul></SignalPanel>
                <SignalPanel interactive={false} tone="quiet" className="p-6"><p className="font-mono text-xs uppercase tracking-[0.18em] text-red-300">{t("Avoid")}</p><ul className="mt-5 space-y-3 text-sm leading-6 text-neutral-300"><li>{t("Nested translucent cards that create no new hierarchy.")}</li><li>{t("Permanent red glow across every surface or metric.")}</li><li>{t("Entrance motion for content users are repeatedly scanning.")}</li><li>{t("Forcing desktop card density onto a narrow viewport.")}</li></ul></SignalPanel>
              </div>
              <SignalPanel interactive={false} tone="command" className="p-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"><div><SignalChip tone="signal">{t("Adoption checklist")}</SignalChip><p className="mt-4 text-xl font-medium tracking-tight text-white">{t("Copy tokens, then primitives, then patterns.")}</p><p className="mt-2 max-w-xl text-sm leading-6 text-neutral-400">{t("Do not start by copying a finished dashboard. First establish the color, type, spacing, focus, and state contracts that make components interoperable.")}</p></div><ol className="space-y-2 font-mono text-xs leading-6 text-neutral-400"><li><span className="mr-3 text-red-400">01</span>{t("Import tokens.css into the application stylesheet.")}</li><li><span className="mr-3 text-red-400">02</span>{t("Move only the primitives required by the product.")}</li><li><span className="mr-3 text-red-400">03</span>{t("Validate keyboard, reduced-motion, and small-screen behavior.")}</li><li><span className="mr-3 text-red-400">04</span>{t("Compose a new pattern only when hierarchy changes.")}</li></ol></div>
              </SignalPanel>
            </DocSection>

            <footer className="flex flex-col gap-3 border-t border-white/[0.08] py-10 font-mono text-xs uppercase tracking-[0.16em] text-neutral-600 sm:flex-row sm:items-center sm:justify-between"><span>Signalframe / MikkoAyaka</span><span>{copy.footer}</span></footer>
          </div>
        </main>
      </div>
    </div>
    </I18nContext.Provider>
  );
}

function Navigation({ locale, className = "" }: { locale: Locale; className?: string }) {
  const navigation = localeCopy[locale].nav;

  return (
    <nav className={`space-y-7 ${className}`} aria-label={locale === "zh" ? zhText["Signalframe documentation"] : "Signalframe documentation"}>
      {navigation.map(([label, items]) => (
        <div key={label}>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-neutral-600">{label}</p>
          <div className="space-y-2">{items.map(([item, anchor]) => <a key={item} href={`#${anchor}`} className="sf-docs-link block text-sm">{item}</a>)}</div>
        </div>
      ))}
    </nav>
  );
}

function Pattern({ icon, title, body }: { icon: ReactNode; title: string; body: string }) {
  const t = useContext(I18nContext);
  return <SignalPanel interactive={false} tone="quiet" className="p-6"><span className="grid h-9 w-9 place-items-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-300">{icon}</span><h3 className="mt-7 text-base font-medium text-white">{t(title)}</h3><p className="mt-3 text-sm leading-6 text-neutral-400">{t(body)}</p></SignalPanel>;
}

function RuleCard({ index, title, body }: { index: string; title: string; body: string }) {
  const t = useContext(I18nContext);
  return <SignalPanel interactive={false} tone="quiet" className="p-6"><span className="font-mono text-xs tracking-[0.18em] text-red-400">{index}</span><h3 className="mt-5 text-base font-medium text-white">{t(title)}</h3><p className="mt-3 text-sm leading-6 text-neutral-400">{t(body)}</p></SignalPanel>;
}

function MotionRule({ duration, label, width }: { duration: string; label: string; width: string }) {
  const t = useContext(I18nContext);
  return <div className="grid grid-cols-[78px_minmax(0,1fr)] items-center gap-4 font-mono text-xs uppercase tracking-[0.13em]"><span className="text-neutral-500">{duration}</span><div><div className={`h-1 ${width} rounded-full bg-red-400/80 shadow-[0_0_12px_rgba(248,113,113,0.35)]`} /><p className="mt-2 normal-case tracking-normal text-neutral-400">{t(label)}</p></div></div>;
}

function MotionRecipe({ trigger, preset, duration, output }: { trigger: string; preset: string; duration: string; output: string }) {
  const t = useContext(I18nContext);
  return <div className="grid gap-2 py-4 sm:grid-cols-[0.8fr_0.45fr_0.45fr_1.4fr] sm:items-center"><span className="text-sm text-white">{t(trigger)}</span><SignalChip tone={preset === "spatial" ? "signal" : "quiet"}>{preset}</SignalChip><span className="font-mono text-xs uppercase tracking-[0.12em] text-neutral-500">{duration}</span><span className="text-xs leading-5 text-neutral-400">{t(output)}</span></div>;
}

function MotionStep({ label, active = false }: { label: string; active?: boolean }) {
  const t = useContext(I18nContext);
  return <span className={`grid h-14 w-14 place-items-center rounded-xl border text-center leading-4 ${active ? "border-red-500/35 bg-red-500/10 text-red-200 shadow-[0_0_20px_-8px_rgba(239,68,68,0.7)]" : "border-white/[0.08] bg-white/[0.02] text-neutral-500"}`}>{t(label)}</span>;
}

function MotionGuideline({ index, title, body }: { index: string; title: string; body: string }) {
  const t = useContext(I18nContext);
  return <li className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4"><span className="font-mono text-xs tracking-[0.16em] text-red-400">{index}</span><p className="mt-3 font-medium text-white">{t(title)}</p><p className="mt-2 text-xs leading-5 text-neutral-400">{t(body)}</p></li>;
}

function FontSpec({ item }: { item: readonly [string, string, string] }) {
  const [role, family, description] = item;
  return <div className="grid grid-cols-[104px_minmax(0,1fr)] gap-4 border-b border-white/[0.07] pb-5 last:border-0 last:pb-0"><span className="font-mono text-xs uppercase tracking-[0.14em] text-neutral-500">{role}</span><div><p className="text-lg font-semibold tracking-tight text-white">{family}</p><p className="mt-1 text-xs leading-5 text-neutral-400">{description}</p></div></div>;
}

function MotionLab({ copy }: { copy: { eyebrow: string; title: string; description: string; trigger: string; rest: string; intent: string; settle: string } }) {
  const [run, setRun] = useState(0);
  const [settled, setSettled] = useState(false);

  const replay = () => {
    setSettled(false);
    setRun((current) => current + 1);
  };

  return <SignalPanel interactive={false} tone="command" className="overflow-hidden p-6"><div className="grid gap-7 lg:grid-cols-[0.75fr_1.25fr] lg:items-center"><div><p className="font-mono text-xs uppercase tracking-[0.18em] text-red-400">{copy.eyebrow}</p><h3 className="mt-3 text-lg font-medium text-white">{copy.title}</h3><p className="mt-3 text-sm leading-6 text-neutral-400">{copy.description}</p><button type="button" onClick={replay} className="mt-5 inline-flex items-center gap-2 rounded-lg border border-red-500/35 bg-red-500/10 px-3 py-2 text-xs text-red-100 transition-colors hover:bg-red-500/20"><Sparkles className="h-3.5 w-3.5" /> {copy.trigger}</button></div><div className="relative min-h-48 overflow-hidden rounded-xl border border-white/[0.08] bg-black/20"><div className="absolute left-6 right-6 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-white/[0.06] via-red-500/45 to-white/[0.06]" /><div className="absolute left-6 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-neutral-500" /><div className="absolute right-6 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-red-300 shadow-[0_0_16px_rgba(248,113,113,0.7)]" /><div key={run} data-motion-card onAnimationEnd={() => setSettled(true)} className={`sf-motion-card ${run > 0 ? "sf-motion-card--moving" : ""}`}>{settled ? copy.settle : copy.intent}</div><div className="absolute bottom-4 left-6 right-6 flex items-center justify-between font-mono text-xs uppercase tracking-[0.14em] text-neutral-600"><span>{copy.rest}</span><span>{copy.settle}</span></div></div></div></SignalPanel>;
}

function HierarchyRow({ level, style, use }: { level: string; style: string; use: string }) {
  const t = useContext(I18nContext);
  return <div className="grid grid-cols-[78px_minmax(0,1fr)] gap-4"><span className="pt-0.5 font-mono text-xs uppercase tracking-[0.14em] text-red-400">{t(level)}</span><div><p className={style}>{t("Example signal")}</p><p className="mt-1 text-xs leading-5 text-neutral-500">{t(use)}</p></div></div>;
}

function GuidanceState({ tone, title, body }: { tone: "signal" | "success" | "warning" | "quiet"; title: string; body: string }) {
  const t = useContext(I18nContext);
  return <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4"><SignalChip tone={tone}>{t(title)}</SignalChip><p className="mt-3 text-xs leading-5 text-neutral-400">{t(body)}</p></div>;
}
