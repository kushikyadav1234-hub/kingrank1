import { j as jsxRuntimeExports, N as reactExports, L as Link } from "./index-C_8eLbsA.js";
import { a as cn } from "./utils-DdB4LPY_.js";
import { L as Layout, S as Search } from "./Layout-D7JdklgU.js";
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
const SAMPLE_RESULTS = [
  {
    id: "pdf-1",
    title: "SSC CGL General Awareness 2024",
    chapterName: "Chapter 1",
    roomId: "ssc",
    fileSize: "2.4 MB"
  },
  {
    id: "pdf-2",
    title: "Railway NTPC Previous Year Papers",
    chapterName: "Practice Set 3",
    roomId: "railway",
    fileSize: "3.1 MB"
  },
  {
    id: "pdf-3",
    title: "UPSC Prelims Economy Notes",
    chapterName: "Economy",
    roomId: "civil",
    fileSize: "1.8 MB"
  },
  {
    id: "pdf-4",
    title: "NCERT History Class 10",
    chapterName: "Chapter 5",
    roomId: "ncert",
    fileSize: "2.2 MB"
  },
  {
    id: "pdf-5",
    title: "Banking Awareness SBI PO",
    chapterName: "Chapter 2",
    roomId: "banking",
    fileSize: "1.5 MB"
  }
];
function SearchPage() {
  const [query, setQuery] = reactExports.useState("");
  const results = query.trim().length > 1 ? SAMPLE_RESULTS.filter(
    (r) => r.title.toLowerCase().includes(query.toLowerCase()) || r.chapterName.toLowerCase().includes(query.toLowerCase())
  ) : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { title: "Search PDFs", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          "data-ocid": "search.search_input",
          type: "search",
          placeholder: "Search PDFs, chapters, topics…",
          value: query,
          onChange: (e) => setQuery(e.target.value),
          className: "pl-9 bg-card border-border text-foreground placeholder:text-muted-foreground",
          autoFocus: true
        }
      )
    ] }),
    query.trim().length > 1 && results.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "search.empty_state",
        className: "flex flex-col items-center gap-3 py-16 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", children: "📭" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-semibold text-foreground font-display", children: "No PDFs found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body max-w-xs", children: "Try a different search term or browse rooms from the home screen." })
        ]
      }
    ),
    results.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: results.map((pdf, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/pdf/$pdfId",
        params: { pdfId: pdf.id },
        "data-ocid": `search.result.${i + 1}`,
        className: "flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3 transition-smooth hover:border-primary/40 hover:bg-secondary",
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
    )) }),
    query.trim().length <= 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", children: "🔍" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-semibold text-foreground font-display", children: "Find your PDF" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body max-w-xs", children: "Type at least 2 characters to search across all rooms, boxes, and chapters." })
    ] })
  ] }) });
}
export {
  SearchPage as default
};
