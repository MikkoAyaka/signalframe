import { createBundledHighlighter } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import { useEffect, useState } from "react";

type CodeLanguage = "tsx" | "css" | "json";

const createHighlighter = createBundledHighlighter({
  langs: {
    tsx: () => import("@shikijs/langs/tsx"),
    css: () => import("@shikijs/langs/css"),
    json: () => import("@shikijs/langs/json"),
  },
  themes: {
    "github-dark-default": () => import("@shikijs/themes/github-dark-default"),
  },
  engine: () => createJavaScriptRegexEngine(),
});

let highlighterPromise: ReturnType<typeof createHighlighter> | undefined;

function getHighlighter() {
  highlighterPromise ??= createHighlighter({
    themes: ["github-dark-default"],
    langs: ["tsx", "css", "json"],
  });

  return highlighterPromise;
}

export function CodeBlock({ code, language = "tsx", label }: { code: string; language?: CodeLanguage; label?: string }) {
  const [html, setHtml] = useState<string>();

  useEffect(() => {
    let cancelled = false;

    getHighlighter()
      .then((highlighter) => highlighter.codeToHtml(code, { lang: language, theme: "github-dark-default" }))
      .then((result) => {
        if (!cancelled) setHtml(result);
      });

    return () => {
      cancelled = true;
    };
  }, [code, language]);

  return (
    <div className="sf-code-block">
      {label && <div className="border-b border-white/[0.07] px-5 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-500">{label}</div>}
      {html ? <div className="sf-shiki" dangerouslySetInnerHTML={{ __html: html }} /> : <pre className="overflow-x-auto px-5 py-4 font-mono text-xs leading-6 text-neutral-400"><code>{code}</code></pre>}
    </div>
  );
}
