import { Link, useParams } from "@tanstack/react-router";
import { BookOpen, ChevronRight } from "lucide-react";
import { Layout } from "../components/Layout";
import { isValidRoomId, roomConfig } from "../types";

export default function BoxPage() {
  const { roomId, boxId } = useParams({ from: "/room/$roomId/box/$boxId" });
  const room = isValidRoomId(roomId) ? roomConfig[roomId] : null;

  // Sample PDFs — will be replaced by backend data in subsequent page tasks
  const pdfs = [
    {
      id: "pdf-1",
      title: "Chapter 1 — Introduction & Overview",
      chapterName: "Chapter 1",
      fileSize: "2.4 MB",
    },
    {
      id: "pdf-2",
      title: "Chapter 2 — Core Concepts",
      chapterName: "Chapter 2",
      fileSize: "3.1 MB",
    },
    {
      id: "pdf-3",
      title: "Chapter 3 — Practice Questions",
      chapterName: "Chapter 3",
      fileSize: "1.8 MB",
    },
    {
      id: "pdf-4",
      title: "Chapter 4 — Previous Year Analysis",
      chapterName: "Chapter 4",
      fileSize: "4.2 MB",
    },
    {
      id: "pdf-5",
      title: "Chapter 5 — Quick Revision Notes",
      chapterName: "Chapter 5",
      fileSize: "1.2 MB",
    },
  ];

  const boxLabel = boxId
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <Layout title={room?.name ?? "Box"}>
      <div className="px-4 py-5">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-xs text-muted-foreground font-body mb-4 flex-wrap">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          {room && (
            <>
              <Link
                to="/room/$roomId"
                params={{ roomId }}
                className="hover:text-foreground transition-colors"
              >
                {room.name}
              </Link>
              <ChevronRight className="w-3 h-3" />
            </>
          )}
          <span className="text-foreground">{boxLabel}</span>
        </nav>

        <h1 className="text-lg font-bold font-display text-foreground mb-1">
          {boxLabel}
        </h1>
        <p className="text-sm text-muted-foreground font-body mb-5">
          {pdfs.length} chapters available
        </p>

        {/* PDF list */}
        <div className="flex flex-col gap-2">
          {pdfs.map((pdf, i) => (
            <Link
              key={pdf.id}
              to="/pdf/$pdfId"
              params={{ pdfId: pdf.id }}
              data-ocid={`box.pdf.${i + 1}`}
              className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-4 transition-smooth hover:border-primary/40 hover:bg-secondary active:scale-[0.99]"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground font-display truncate">
                  {pdf.title}
                </p>
                <p className="text-xs text-muted-foreground font-body mt-0.5">
                  {pdf.chapterName} · {pdf.fileSize}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
