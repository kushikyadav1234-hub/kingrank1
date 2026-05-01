import { Link, useRouterState } from "@tanstack/react-router";
import { Bookmark, Clock, Home, Search } from "lucide-react";

interface NavItem {
  label: string;
  icon: React.ElementType;
  to: string;
  ocid: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", icon: Home, to: "/", ocid: "bottom_nav.home_tab" },
  {
    label: "Search",
    icon: Search,
    to: "/search",
    ocid: "bottom_nav.search_tab",
  },
  {
    label: "Bookmarks",
    icon: Bookmark,
    to: "/bookmarks",
    ocid: "bottom_nav.bookmarks_tab",
  },
  {
    label: "Recent",
    icon: Clock,
    to: "/recent",
    ocid: "bottom_nav.recent_tab",
  },
];

export function BottomNav() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <nav
      aria-label="Main navigation"
      className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border safe-area-pb max-w-lg mx-auto"
    >
      <div className="flex items-stretch">
        {NAV_ITEMS.map(({ to, label, icon: Icon, ocid }) => {
          const isActive =
            to === "/" ? currentPath === "/" : currentPath.startsWith(to);

          return (
            <Link
              key={to}
              to={to}
              data-ocid={ocid}
              aria-current={isActive ? "page" : undefined}
              aria-label={label}
              className={[
                "relative flex-1 flex flex-col items-center gap-1 py-2.5 px-1 min-h-[56px] justify-center transition-colors duration-200",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
            >
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 1.8} />
              <span className="text-[10px] font-medium font-body leading-none">
                {label}
              </span>
              {isActive && (
                <span className="absolute -top-px left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-b-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
