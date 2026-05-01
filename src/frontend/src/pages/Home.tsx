import { Link } from "@tanstack/react-router";
import { Layout } from "../components/Layout";
import { type RoomId, roomConfig } from "../types";

// ─── Room grid card ───────────────────────────────────────────────────────────

interface RoomCardProps {
  roomId: RoomId;
  index: number;
}

const ROOM_PDF_COUNTS: Record<RoomId, number> = {
  ssc: 7,
  railway: 5,
  civil: 6,
  banking: 6,
  defence: 3,
  current_affairs: 12,
  ncert: 28,
  other: 8,
};

function RoomCard({ roomId, index }: RoomCardProps) {
  const room = roomConfig[roomId];
  const pdfCount = ROOM_PDF_COUNTS[roomId];

  return (
    <Link
      to="/room/$roomId"
      params={{ roomId }}
      data-ocid={`home.room.${index}`}
      className={[
        "relative flex flex-col justify-between p-4 rounded-2xl border border-border/60 min-h-[130px]",
        "transition-smooth hover:scale-[1.02] active:scale-[0.98]",
        room.gradient,
      ].join(" ")}
    >
      {/* Room name */}
      <div>
        <span className="text-2xl leading-none mb-2 block">{room.icon}</span>
        <h2 className="text-base font-bold font-display text-foreground leading-tight">
          {room.name}
        </h2>
      </div>

      {/* Count badge */}
      <div className="mt-3">
        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-sm text-[11px] font-semibold text-foreground/90 font-body">
          {pdfCount} Boxes
        </span>
      </div>

      {/* Subtle corner accent glow */}
      <div
        className="absolute bottom-0 right-0 w-16 h-16 rounded-tl-full opacity-20 pointer-events-none"
        style={{ background: `oklch(var(${room.accentVar})/0.5)` }}
      />
    </Link>
  );
}

// ─── Main Home page ───────────────────────────────────────────────────────────

const ROOM_ORDER: RoomId[] = [
  "ssc",
  "railway",
  "civil",
  "banking",
  "defence",
  "current_affairs",
  "ncert",
  "other",
];

export default function HomePage() {
  return (
    <Layout>
      <div className="px-4 pt-5 pb-6">
        {/* Page heading */}
        <div className="mb-5">
          <h1 className="text-xl font-bold font-display text-foreground">
            📚 PDF Books
          </h1>
          <p className="text-sm text-muted-foreground font-body mt-0.5">
            Select an exam room to browse study materials
          </p>
        </div>

        {/* 2-column room grid */}
        <div data-ocid="home.rooms_list" className="grid grid-cols-2 gap-3">
          {ROOM_ORDER.map((roomId, i) => (
            <RoomCard key={roomId} roomId={roomId} index={i + 1} />
          ))}
        </div>

        {/* Branding footer */}
        <footer className="mt-8 pt-4 border-t border-border/50 text-center">
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
      </div>
    </Layout>
  );
}
