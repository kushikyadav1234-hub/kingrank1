import type { PdfMeta } from "@/backend";
import { Link } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";

const LS_RECENTLY_VIEWED = "recently_viewed";

function getRecentMeta(): PdfMeta[] {
  try {
    return JSON.parse(
      localStorage.getItem(LS_RECENTLY_VIEWED) ?? "[]",
    ) as PdfMeta[];
  } catch {
    return [];
  }
}

export default function RecentPage() {
  const [recent, setRecent] = useState<PdfMeta[]>([]);

  useEffect(() => {
    setRecent(getRecentMeta());
  }, []);

  return (
    <Layout title="Recently Viewed">
      <div className="px-4 py-5">
        <h1 className="text-lg font-bold font-display text-foreground mb-1">
          Recently Viewed
        </h1>
        <p className="text-sm text-muted-foreground font-body mb-5">
          PDFs you've opened recently
        </p>

        {recent.length === 0 ? (
          <div
            data-ocid="recent.empty_state"
            className="flex flex-col items-center gap-4 py-20 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
              <Clock className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <p className="text-base font-semibold text-foreground font-display">
                Nothing here yet
              </p>
              <p className="text-sm text-muted-foreground font-body mt-1 max-w-xs">
                PDFs you open will appear here so you can quickly find them
                again.
              </p>
            </div>
            <Link
              to="/"
              data-ocid="recent.browse_link"
              className="text-sm text-primary font-semibold hover:underline font-body"
            >
              Browse PDFs →
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {recent.map((pdf, i) => (
              <Link
                key={pdf.id}
                to="/pdf/$pdfId"
                params={{ pdfId: pdf.id }}
                data-ocid={`recent.item.${i + 1}`}
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
