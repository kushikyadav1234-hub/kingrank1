import { Link, useRouterState } from "@tanstack/react-router";
import { Search } from "lucide-react";
import type { ReactNode } from "react";
import { BannerAd } from "./BannerAd";
import { BottomNav } from "./BottomNav";

interface LayoutProps {
  children: ReactNode;
  /** Override header title */
  title?: string;
  /** Hide bottom nav (e.g. full-screen PDF view) */
  hideNav?: boolean;
}

export function Layout({ children, title, hideNav = false }: LayoutProps) {
  const routerState = useRouterState();
  const isPdfView = routerState.location.pathname.startsWith("/pdf/");

  return (
    <div className="min-h-screen flex flex-col bg-background max-w-lg mx-auto relative">
      {/* ── Sticky Header ───────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-card border-b border-border shadow-sm">
        <div className="flex items-center justify-between px-4 h-14">
          {/* Brand / back title */}
          <Link
            to="/"
            data-ocid="header.home_link"
            className="flex items-center gap-2 min-w-0"
          >
            <div className="w-8 h-8 rounded-lg brand-gradient flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-primary-foreground font-display">
                K
              </span>
            </div>
            <span className="text-base font-bold text-foreground font-display truncate">
              {title ?? "KingRank1"}
            </span>
          </Link>

          {/* Search icon */}
          <Link
            to="/search"
            data-ocid="header.search_link"
            aria-label="Search PDFs"
            className="w-9 h-9 rounded-full bg-muted flex items-center justify-center transition-smooth hover:bg-secondary flex-shrink-0"
          >
            <Search className="w-4 h-4 text-muted-foreground" />
          </Link>
        </div>
      </header>

      {/* ── Main Content ─────────────────────────────────────────────── */}
      <main
        className={`flex-1 bg-background ${hideNav || isPdfView ? "" : "pb-20"}`}
      >
        {children}
      </main>

      {/* ── Bottom Zone (nav + ad) ───────────────────────────────────── */}
      {!isPdfView && !hideNav && (
        <>
          <BottomNav />
          {/* TODO: Replace with real AdMob Banner ID: ca-app-pub-xxxxxxxx/banner */}
          <BannerAd />
        </>
      )}

      {/* Branding footer (shown only when nav hidden) */}
      {(hideNav || isPdfView) && (
        <footer className="bg-card border-t border-border px-4 py-3 text-center">
          <p className="text-[11px] text-muted-foreground font-body">
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      )}
    </div>
  );
}
