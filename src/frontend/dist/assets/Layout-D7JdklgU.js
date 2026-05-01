import { N as reactExports, j as jsxRuntimeExports, a4 as useRouterState, L as Link } from "./index-C_8eLbsA.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
};
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Icon = reactExports.forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => reactExports.createElement(
    "svg",
    {
      ref,
      ...defaultAttributes,
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: mergeClasses("lucide", className),
      ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => reactExports.createElement(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const createLucideIcon = (iconName, iconNode) => {
  const Component = reactExports.forwardRef(
    ({ className, ...props }, ref) => reactExports.createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = toPascalCase(iconName);
  return Component;
};
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z", key: "1fy3hk" }]
];
const Bookmark = createLucideIcon("bookmark", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "1d0kgt"
    }
  ]
];
const House = createLucideIcon("house", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
function BannerAd({
  adUnitId = "ca-app-pub-xxxxxxxx/banner",
  // TODO: Replace with real ID
  className = ""
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-ocid": "ad.banner",
      "aria-label": "Advertisement",
      className: `w-full h-[50px] bg-muted/40 border-t border-border flex items-center justify-center ${className}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-4 w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50 font-body whitespace-nowrap", children: "Advertisement" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border/40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground/30 font-mono whitespace-nowrap truncate max-w-[140px]", children: adUnitId })
      ] })
    }
  );
}
const NAV_ITEMS = [
  { label: "Home", icon: House, to: "/", ocid: "bottom_nav.home_tab" },
  {
    label: "Search",
    icon: Search,
    to: "/search",
    ocid: "bottom_nav.search_tab"
  },
  {
    label: "Bookmarks",
    icon: Bookmark,
    to: "/bookmarks",
    ocid: "bottom_nav.bookmarks_tab"
  },
  {
    label: "Recent",
    icon: Clock,
    to: "/recent",
    ocid: "bottom_nav.recent_tab"
  }
];
function BottomNav() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "nav",
    {
      "aria-label": "Main navigation",
      className: "fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border safe-area-pb max-w-lg mx-auto",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-stretch", children: NAV_ITEMS.map(({ to, label, icon: Icon2, ocid }) => {
        const isActive = to === "/" ? currentPath === "/" : currentPath.startsWith(to);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to,
            "data-ocid": ocid,
            "aria-current": isActive ? "page" : void 0,
            "aria-label": label,
            className: [
              "relative flex-1 flex flex-col items-center gap-1 py-2.5 px-1 min-h-[56px] justify-center transition-colors duration-200",
              isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
            ].join(" "),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon2, { className: "w-5 h-5", strokeWidth: isActive ? 2.5 : 1.8 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium font-body leading-none", children: label }),
              isActive && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-px left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-b-full" })
            ]
          },
          to
        );
      }) })
    }
  );
}
function Layout({ children, title, hideNav = false }) {
  const routerState = useRouterState();
  const isPdfView = routerState.location.pathname.startsWith("/pdf/");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col bg-background max-w-lg mx-auto relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-40 bg-card border-b border-border shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 h-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/",
          "data-ocid": "header.home_link",
          className: "flex items-center gap-2 min-w-0",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg brand-gradient flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-primary-foreground font-display", children: "K" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-bold text-foreground font-display truncate", children: title ?? "KingRank1" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/search",
          "data-ocid": "header.search_link",
          "aria-label": "Search PDFs",
          className: "w-9 h-9 rounded-full bg-muted flex items-center justify-center transition-smooth hover:bg-secondary flex-shrink-0",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4 text-muted-foreground" })
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "main",
      {
        className: `flex-1 bg-background ${hideNav || isPdfView ? "" : "pb-20"}`,
        children
      }
    ),
    !isPdfView && !hideNav && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BottomNav, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(BannerAd, {})
    ] }),
    (hideNav || isPdfView) && /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "bg-card border-t border-border px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground font-body", children: [
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
  ] });
}
export {
  Bookmark as B,
  Clock as C,
  Layout as L,
  Search as S,
  createLucideIcon as c
};
