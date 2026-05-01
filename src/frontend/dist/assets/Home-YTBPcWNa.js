import { j as jsxRuntimeExports, L as Link } from "./index-C_8eLbsA.js";
import { L as Layout } from "./Layout-D7JdklgU.js";
import { r as roomConfig } from "./index-BpeFPg8v.js";
const ROOM_PDF_COUNTS = {
  ssc: 7,
  railway: 5,
  civil: 6,
  banking: 6,
  defence: 3,
  current_affairs: 12,
  ncert: 28,
  other: 8
};
function RoomCard({ roomId, index }) {
  const room = roomConfig[roomId];
  const pdfCount = ROOM_PDF_COUNTS[roomId];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/room/$roomId",
      params: { roomId },
      "data-ocid": `home.room.${index}`,
      className: [
        "relative flex flex-col justify-between p-4 rounded-2xl border border-border/60 min-h-[130px]",
        "transition-smooth hover:scale-[1.02] active:scale-[0.98]",
        room.gradient
      ].join(" "),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl leading-none mb-2 block", children: room.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-bold font-display text-foreground leading-tight", children: room.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-sm text-[11px] font-semibold text-foreground/90 font-body", children: [
          pdfCount,
          " Boxes"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute bottom-0 right-0 w-16 h-16 rounded-tl-full opacity-20 pointer-events-none",
            style: { background: `oklch(var(${room.accentVar})/0.5)` }
          }
        )
      ]
    }
  );
}
const ROOM_ORDER = [
  "ssc",
  "railway",
  "civil",
  "banking",
  "defence",
  "current_affairs",
  "ncert",
  "other"
];
function HomePage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-5 pb-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold font-display text-foreground", children: "📚 PDF Books" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body mt-0.5", children: "Select an exam room to browse study materials" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "home.rooms_list", className: "grid grid-cols-2 gap-3", children: ROOM_ORDER.map((roomId, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(RoomCard, { roomId, index: i + 1 }, roomId)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "mt-8 pt-4 border-t border-border/50 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground font-body", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      ". Built with love using",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
            typeof window !== "undefined" ? window.location.hostname : ""
          )}`,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-primary hover:underline",
          children: "caffeine.ai"
        }
      )
    ] }) })
  ] }) });
}
export {
  HomePage as default
};
