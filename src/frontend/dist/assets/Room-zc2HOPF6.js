import { u as useParams, j as jsxRuntimeExports, L as Link } from "./index-C_8eLbsA.js";
import { L as Layout } from "./Layout-D7JdklgU.js";
import { r as roomConfig, i as isValidRoomId } from "./index-BpeFPg8v.js";
import { C as ChevronRight } from "./chevron-right-CXvOVqTm.js";
function RoomPage() {
  const { roomId } = useParams({ from: "/room/$roomId" });
  const room = isValidRoomId(roomId) ? roomConfig[roomId] : null;
  if (!room) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-20 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", children: "🔍" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body", children: "Room not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "text-primary text-sm hover:underline", children: "Go Home" })
    ] }) });
  }
  const boxes = [
    { id: "box-1", name: "Complete Study Material", pdfCount: 12 },
    { id: "box-2", name: "Previous Year Papers", pdfCount: 8 },
    { id: "box-3", name: "Practice Sets", pdfCount: 15 },
    { id: "box-4", name: "Short Notes", pdfCount: 6 }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { title: room.name, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `${room.gradient} rounded-2xl p-5 mb-6 border border-border`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", children: room.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold font-display text-foreground", children: room.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body", children: room.description })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-muted-foreground font-body uppercase tracking-wide mb-3", children: "Select a Box" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: boxes.map((box, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/room/$roomId/box/$boxId",
        params: { roomId, boxId: box.id },
        "data-ocid": `room.box.${i + 1}`,
        className: "flex items-center justify-between bg-card border border-border rounded-xl px-4 py-4 transition-smooth hover:border-primary/40 hover:bg-secondary active:scale-[0.99]",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground font-display truncate", children: box.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-body mt-0.5", children: [
              box.pdfCount,
              " PDFs"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground flex-shrink-0 ml-3" })
        ]
      },
      box.id
    )) })
  ] }) });
}
export {
  RoomPage as default
};
