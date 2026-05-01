import { N as reactExports, j as jsxRuntimeExports, L as Link } from "./index-C_8eLbsA.js";
import { L as Layout, C as Clock } from "./Layout-D7JdklgU.js";
const LS_RECENTLY_VIEWED = "recently_viewed";
function getRecentMeta() {
  try {
    return JSON.parse(
      localStorage.getItem(LS_RECENTLY_VIEWED) ?? "[]"
    );
  } catch {
    return [];
  }
}
function RecentPage() {
  const [recent, setRecent] = reactExports.useState([]);
  reactExports.useEffect(() => {
    setRecent(getRecentMeta());
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { title: "Recently Viewed", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold font-display text-foreground mb-1", children: "Recently Viewed" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body mb-5", children: "PDFs you've opened recently" }),
    recent.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "recent.empty_state",
        className: "flex flex-col items-center gap-4 py-20 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-8 h-8 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-semibold text-foreground font-display", children: "Nothing here yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body mt-1 max-w-xs", children: "PDFs you open will appear here so you can quickly find them again." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/",
              "data-ocid": "recent.browse_link",
              className: "text-sm text-primary font-semibold hover:underline font-body",
              children: "Browse PDFs →"
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: recent.map((pdf, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/pdf/$pdfId",
        params: { pdfId: pdf.id },
        "data-ocid": `recent.item.${i + 1}`,
        className: "flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-4 transition-smooth hover:border-primary/40 hover:bg-secondary",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl flex-shrink-0", children: "📄" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground font-display truncate", children: pdf.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-body mt-0.5", children: [
              pdf.chapterName,
              " · ",
              pdf.fileSize
            ] })
          ] })
        ]
      },
      pdf.id
    )) })
  ] }) });
}
export {
  RecentPage as default
};
