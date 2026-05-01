import { N as reactExports, j as jsxRuntimeExports, L as Link } from "./index-C_8eLbsA.js";
import { L as Layout, B as Bookmark } from "./Layout-D7JdklgU.js";
const LS_BOOKMARKS = "bookmarks";
function getBookmarkedMeta() {
  try {
    const raw = localStorage.getItem("bookmarks_meta") ?? "[]";
    return JSON.parse(raw);
  } catch {
    return [];
  }
}
function getBookmarkedIds() {
  try {
    return JSON.parse(localStorage.getItem(LS_BOOKMARKS) ?? "[]");
  } catch {
    return [];
  }
}
function BookmarksPage() {
  const [bookmarks, setBookmarks] = reactExports.useState([]);
  reactExports.useEffect(() => {
    const metaItems = getBookmarkedMeta();
    if (metaItems.length > 0) {
      const ids2 = new Set(getBookmarkedIds());
      setBookmarks(metaItems.filter((p) => ids2.has(p.id)));
      return;
    }
    const ids = getBookmarkedIds();
    setBookmarks(
      ids.map((id) => ({
        id,
        title: `PDF ${id}`,
        chapterName: "—",
        fileSize: "—",
        downloadUrl: "#",
        boxId: "",
        roomId: ""
      }))
    );
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { title: "Bookmarks", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold font-display text-foreground mb-1", children: "Bookmarks" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body mb-5", children: "PDFs you've saved for later" }),
    bookmarks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "bookmarks.empty_state",
        className: "flex flex-col items-center gap-4 py-20 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "w-8 h-8 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-semibold text-foreground font-display", children: "No bookmarks yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body mt-1 max-w-xs", children: "Tap the bookmark icon on any PDF to save it here for quick access." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/",
              "data-ocid": "bookmarks.browse_link",
              className: "text-sm text-primary font-semibold hover:underline font-body",
              children: "Browse PDFs →"
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: bookmarks.map((pdf, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/pdf/$pdfId",
        params: { pdfId: pdf.id },
        "data-ocid": `bookmarks.item.${i + 1}`,
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
  BookmarksPage as default
};
