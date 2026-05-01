import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";
import { Layout } from "../components/Layout";

const SAMPLE_RESULTS = [
  {
    id: "pdf-1",
    title: "SSC CGL General Awareness 2024",
    chapterName: "Chapter 1",
    roomId: "ssc",
    fileSize: "2.4 MB",
  },
  {
    id: "pdf-2",
    title: "Railway NTPC Previous Year Papers",
    chapterName: "Practice Set 3",
    roomId: "railway",
    fileSize: "3.1 MB",
  },
  {
    id: "pdf-3",
    title: "UPSC Prelims Economy Notes",
    chapterName: "Economy",
    roomId: "civil",
    fileSize: "1.8 MB",
  },
  {
    id: "pdf-4",
    title: "NCERT History Class 10",
    chapterName: "Chapter 5",
    roomId: "ncert",
    fileSize: "2.2 MB",
  },
  {
    id: "pdf-5",
    title: "Banking Awareness SBI PO",
    chapterName: "Chapter 2",
    roomId: "banking",
    fileSize: "1.5 MB",
  },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const results =
    query.trim().length > 1
      ? SAMPLE_RESULTS.filter(
          (r) =>
            r.title.toLowerCase().includes(query.toLowerCase()) ||
            r.chapterName.toLowerCase().includes(query.toLowerCase()),
        )
      : [];

  return (
    <Layout title="Search PDFs">
      <div className="px-4 py-5">
        {/* Search input */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            data-ocid="search.search_input"
            type="search"
            placeholder="Search PDFs, chapters, topics…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 bg-card border-border text-foreground placeholder:text-muted-foreground"
            autoFocus
          />
        </div>

        {/* Results / empty state */}
        {query.trim().length > 1 && results.length === 0 && (
          <div
            data-ocid="search.empty_state"
            className="flex flex-col items-center gap-3 py-16 text-center"
          >
            <span className="text-4xl">📭</span>
            <p className="text-base font-semibold text-foreground font-display">
              No PDFs found
            </p>
            <p className="text-sm text-muted-foreground font-body max-w-xs">
              Try a different search term or browse rooms from the home screen.
            </p>
          </div>
        )}

        {results.length > 0 && (
          <div className="flex flex-col gap-2">
            {results.map((pdf, i) => (
              <Link
                key={pdf.id}
                to="/pdf/$pdfId"
                params={{ pdfId: pdf.id }}
                data-ocid={`search.result.${i + 1}`}
                className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3 transition-smooth hover:border-primary/40 hover:bg-secondary"
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

        {query.trim().length <= 1 && (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <span className="text-4xl">🔍</span>
            <p className="text-base font-semibold text-foreground font-display">
              Find your PDF
            </p>
            <p className="text-sm text-muted-foreground font-body max-w-xs">
              Type at least 2 characters to search across all rooms, boxes, and
              chapters.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
