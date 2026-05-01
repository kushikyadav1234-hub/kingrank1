import { createActor } from "@/backend";
import type { PdfMeta } from "@/backend";
import { Button } from "@/components/ui/button";
import { useActor } from "@caffeineai/core-infrastructure";
import { useParams } from "@tanstack/react-router";
import {
  BookOpen,
  Bookmark,
  BookmarkCheck,
  Download,
  ExternalLink,
} from "lucide-react";
import { useEffect, useState } from "react";
import { AdInterstitial } from "../components/AdInterstitial";
import { Layout } from "../components/Layout";
import { useAdManager } from "../hooks/useAdManager";

// ── localStorage helpers ─────────────────────────────────────────────────────

const LS_BOOKMARKS = "bookmarks";
const LS_RECENTLY_VIEWED = "recently_viewed";
const MAX_RECENT = 20;

function getBookmarkedIds(): string[] {
  try {
    return JSON.parse(localStorage.getItem(LS_BOOKMARKS) ?? "[]") as string[];
  } catch {
    return [];
  }
}

function setBookmarkedIds(ids: string[]) {
  localStorage.setItem(LS_BOOKMARKS, JSON.stringify(ids));
}

function addToRecent(meta: PdfMeta) {
  try {
    const raw = localStorage.getItem(LS_RECENTLY_VIEWED) ?? "[]";
    const items: PdfMeta[] = JSON.parse(raw) as PdfMeta[];
    const filtered = items.filter((p) => p.id !== meta.id);
    const updated = [meta, ...filtered].slice(0, MAX_RECENT);
    localStorage.setItem(LS_RECENTLY_VIEWED, JSON.stringify(updated));
  } catch {
    // ignore storage errors
  }
}

// ── Download helpers ─────────────────────────────────────────────────────────

type DownloadState = "idle" | "downloading" | "done";

async function downloadWithProgress(
  url: string,
  filename: string,
  onProgress: (pct: number | null) => void,
  onDone: () => void,
) {
  try {
    const res = await fetch(url);
    const contentLength = res.headers.get("Content-Length");
    const total = contentLength ? Number.parseInt(contentLength, 10) : null;
    const reader = res.body?.getReader();
    if (!reader) throw new Error("no body");

    const chunks: Uint8Array<ArrayBuffer>[] = [];
    let received = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) {
        chunks.push(value);
        received += value.length;
        onProgress(total ? Math.round((received / total) * 100) : null);
      }
    }

    const blob = new Blob(chunks, { type: "application/pdf" });
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = objectUrl;
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(objectUrl), 10000);
    onDone();
  } catch {
    onDone();
  }
}

// ── Component ────────────────────────────────────────────────────────────────

const SAMPLE_PDF: PdfMeta = {
  id: "pdf-1",
  title: "Chapter 1 — Introduction & Overview",
  chapterName: "Chapter 1",
  fileSize: "2.4 MB",
  downloadUrl: "#",
  boxId: "",
  roomId: "",
};

export default function PdfViewPage() {
  const { pdfId } = useParams({ from: "/pdf/$pdfId" });
  const pdf = { ...SAMPLE_PDF, id: pdfId };

  const { actor } = useActor(createActor);
  const { isAdVisible, adType, showInterstitial, showRewarded, dismissAd } =
    useAdManager();

  // ── Bookmark state ──────────────────────────────────────────────────────
  const [isBookmarked, setIsBookmarked] = useState(() =>
    getBookmarkedIds().includes(pdfId),
  );

  // ── Download state ──────────────────────────────────────────────────────
  const [downloadState, setDownloadState] = useState<DownloadState>("idle");
  const [downloadPct, setDownloadPct] = useState<number | null>(null);

  // ── Mark viewed on mount ────────────────────────────────────────────────
  const markViewedRef = actor?.markViewed.bind(actor);
  useEffect(() => {
    const currentPdf = { ...SAMPLE_PDF, id: pdfId };
    addToRecent(currentPdf);
    markViewedRef?.(pdfId).catch(() => {
      /* best-effort */
    });
  }, [pdfId, markViewedRef]);

  // ── Handlers ────────────────────────────────────────────────────────────

  function toggleBookmark() {
    const ids = getBookmarkedIds();
    if (isBookmarked) {
      setBookmarkedIds(ids.filter((id) => id !== pdfId));
      actor?.removeBookmark(pdfId).catch(() => {
        /* best-effort */
      });
      setIsBookmarked(false);
    } else {
      setBookmarkedIds([pdfId, ...ids]);
      actor?.addBookmark(pdfId).catch(() => {
        /* best-effort */
      });
      setIsBookmarked(true);
    }
  }

  function openPdf() {
    if (pdf.downloadUrl && pdf.downloadUrl !== "#") {
      window.open(pdf.downloadUrl, "_blank", "noopener,noreferrer");
    }
  }

  function handleView() {
    showInterstitial(openPdf);
  }

  function startDownload() {
    if (!pdf.downloadUrl || pdf.downloadUrl === "#") return;
    setDownloadState("downloading");
    setDownloadPct(null);
    downloadWithProgress(
      pdf.downloadUrl,
      `${pdf.title}.pdf`,
      (pct) => setDownloadPct(pct),
      () => {
        setDownloadState("done");
        setTimeout(() => setDownloadState("idle"), 3000);
      },
    );
  }

  function handleDownload() {
    showRewarded(startDownload);
  }

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <Layout title="PDF Viewer" hideNav>
      {/* Ad overlay */}
      <AdInterstitial
        isVisible={isAdVisible}
        adType={adType ?? "interstitial"}
        onClose={dismissAd}
      />

      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-10 gap-6">
        {/* Preview icon + bookmark */}
        <div className="relative">
          <div className="w-24 h-24 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-primary" />
          </div>
          <button
            type="button"
            data-ocid="pdf_view.bookmark_toggle"
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
            onClick={toggleBookmark}
            className="absolute -top-2 -right-2 w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center shadow-sm transition-smooth hover:border-primary/60 hover:bg-secondary"
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-5 h-5 text-primary" />
            ) : (
              <Bookmark className="w-5 h-5 text-muted-foreground" />
            )}
          </button>
        </div>

        <div className="text-center max-w-xs">
          <h1 className="text-lg font-bold font-display text-foreground">
            {pdf.title}
          </h1>
          <p className="text-sm text-muted-foreground font-body mt-1">
            {pdf.chapterName} · {pdf.fileSize}
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full max-w-xs">
          <Button
            data-ocid="pdf_view.open_button"
            onClick={handleView}
            className="w-full gap-2"
            size="lg"
          >
            <ExternalLink className="w-4 h-4" />
            View PDF
          </Button>

          {/* Download button with progress states */}
          {downloadState === "idle" && (
            <Button
              data-ocid="pdf_view.download_button"
              variant="outline"
              onClick={handleDownload}
              className="w-full gap-2"
              size="lg"
            >
              <Download className="w-4 h-4" />
              Download
            </Button>
          )}

          {downloadState === "downloading" && (
            <div
              data-ocid="pdf_view.loading_state"
              className="w-full rounded-xl border border-border bg-card px-4 py-3"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground font-body">
                  Downloading…
                </span>
                <span className="text-sm font-semibold text-primary font-mono">
                  {downloadPct !== null ? `${downloadPct}%` : ""}
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                {downloadPct !== null ? (
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${downloadPct}%` }}
                  />
                ) : (
                  <div className="h-full bg-primary/60 rounded-full animate-pulse w-full" />
                )}
              </div>
            </div>
          )}

          {downloadState === "done" && (
            <div
              data-ocid="pdf_view.success_state"
              className="w-full rounded-xl border border-[oklch(var(--correct)/0.4)] bg-[oklch(var(--correct)/0.1)] px-4 py-3 text-center"
            >
              <span className="text-sm font-semibold text-[oklch(var(--correct)/1)] font-body">
                ✓ Download Complete!
              </span>
            </div>
          )}
        </div>

        <p className="text-xs text-muted-foreground font-body text-center max-w-xs">
          Upload PDFs to Firebase Storage and update download URLs in the
          database.
        </p>
      </div>
    </Layout>
  );
}
