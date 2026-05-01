import type { PdfMeta } from "@/backend";
import { Link } from "@tanstack/react-router";
import { Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";

const LS_BOOKMARKS = "bookmarks";

function getBookmarkedMeta(): PdfMeta[] {
  try {
    // Try reading full PdfMeta objects stored by PdfView
    const raw = localStorage.getItem("bookmarks_meta") ?? "[]";
    return JSON.parse(raw) as PdfMeta[];
  } catch {
    return [];
  }
}

function getBookmarkedIds(): string[] {
  try {
    return JSON.parse(localStorage.getItem(LS_BOOKMARKS) ?? "[]") as string[];
  } catch {
    return [];
  }
}

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<PdfMeta[]>([]);

  useEffect(() => {
    // Primary: full PdfMeta array cached by PdfView
    const metaItems = getBookmarkedMeta();
    if (metaItems.length > 0) {
      const ids = new Set(getBookmarkedIds());
      setBookmarks(metaItems.filter((p) => ids.has(p.id)));
      return;
    }
    // Fallback: only IDs stored — show minimal stub rows
    const ids = getBookmarkedIds();
    setBookmarks(
      ids.map((id) => ({
        id,
        title: `PDF ${id}`,
        chapterName: "—",
        fileSize: "—",
        downloadUrl: "#",
        boxId: "",
        roomId: "",
      })),
    );
  }, []);

  return (
    <Layout title="Bookmarks">
      <div className="px-4 py-5">
        <h1 className="text-lg font-bold font-display text-foreground mb-1">
          Bookmarks
        </h1>
        <p className="text-sm text-muted-foreground font-body mb-5">
          PDFs you've saved for later
        </p>

        {bookmarks.length === 0 ? (
          <div
            data-ocid="bookmarks.empty_state"
            className="flex flex-col items-center gap-4 py-20 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
              <Bookmark className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <p className="text-base font-semibold text-foreground font-display">
                No bookmarks yet
              </p>
              <p className="text-sm text-muted-foreground font-body mt-1 max-w-xs">
                Tap the bookmark icon on any PDF to save it here for quick
                access.
              </p>
            </div>
            <Link
              to="/"
              data-ocid="bookmarks.browse_link"
              className="text-sm text-primary font-semibold hover:underline font-body"
            >
              Browse PDFs →
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {bookmarks.map((pdf, i) => (
              <Link
                key={pdf.id}
                to="/pdf/$pdfId"
                params={{ pdfId: pdf.id }}
                data-ocid={`bookmarks.item.${i + 1}`}
                className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-4 transition-smooth hover:border-primary/40 hover:bg-secondary"
              >
                <span className="text-xl flex-shrink-0">📄</span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground font-display truncate">
                    {pdf.title}
                  </p>
                  <p className="text-xs text-muted-foreground font-body mt-0.5">
                    {pdf.chapterName} · {pdf.fileSize}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
