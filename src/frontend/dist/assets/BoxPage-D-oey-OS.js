import { u as useParams, j as jsxRuntimeExports, L as Link } from "./index-C_8eLbsA.js";
import { L as Layout } from "./Layout-D7JdklgU.js";
import { r as roomConfig, i as isValidRoomId } from "./index-BpeFPg8v.js";
import { C as ChevronRight } from "./chevron-right-CXvOVqTm.js";
import { B as BookOpen } from "./book-open-BcpGsi77.js";
function BoxPage() {
  const { roomId, boxId } = useParams({ from: "/room/$roomId/box/$boxId" });
  const room = isValidRoomId(roomId) ? roomConfig[roomId] : null;
  const pdfs = [
    {
      id: "pdf-1",
      title: "Chapter 1 — Introduction & Overview",
      chapterName: "Chapter 1",
      fileSize: "2.4 MB"
    },
    {
      id: "pdf-2",
      title: "Chapter 2 — Core Concepts",
      chapterName: "Chapter 2",
      fileSize: "3.1 MB"
    },
    {
      id: "pdf-3",
      title: "Chapter 3 — Practice Questions",
      chapterName: "Chapter 3",
      fileSize: "1.8 MB"
    },
    {
      id: "pdf-4",
      title: "Chapter 4 — Previous Year Analysis",
      chapterName: "Chapter 4",
      fileSize: "4.2 MB"
    },
    {
      id: "pdf-5",
      title: "Chapter 5 — Quick Revision Notes",
      chapterName: "Chapter 5",
      fileSize: "1.2 MB"
    }
  ];
  const boxLabel = boxId.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { title: (room == null ? void 0 : room.name) ?? "Box", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex items-center gap-1 text-xs text-muted-foreground font-body mb-4 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-foreground transition-colors", children: "Home" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
      room && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/room/$roomId",
            params: { roomId },
            className: "hover:text-foreground transition-colors",
            children: room.name
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: boxLabel })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold font-display text-foreground mb-1", children: boxLabel }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground font-body mb-5", children: [
      pdfs.length,
      " chapters available"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: pdfs.map((pdf, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/pdf/$pdfId",
        params: { pdfId: pdf.id },
        "data-ocid": `box.pdf.${i + 1}`,
        className: "flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-4 transition-smooth hover:border-primary/40 hover:bg-secondary active:scale-[0.99]",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground font-display truncate", children: pdf.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-body mt-0.5", children: [
              pdf.chapterName,
              " · ",
              pdf.fileSize
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground flex-shrink-0" })
        ]
      },
      pdf.id
    )) })
  ] }) });
}
export {
  BoxPage as default
};
