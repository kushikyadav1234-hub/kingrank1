import { Link, useParams } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { Layout } from "../components/Layout";
import { isValidRoomId, roomConfig } from "../types";

export default function RoomPage() {
  const { roomId } = useParams({ from: "/room/$roomId" });
  const room = isValidRoomId(roomId) ? roomConfig[roomId] : null;

  if (!room) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <span className="text-4xl">🔍</span>
          <p className="text-muted-foreground font-body">Room not found</p>
          <Link to="/" className="text-primary text-sm hover:underline">
            Go Home
          </Link>
        </div>
      </Layout>
    );
  }

  // Sample boxes — will be replaced by backend data in subsequent page tasks
  const boxes = [
    { id: "box-1", name: "Complete Study Material", pdfCount: 12 },
    { id: "box-2", name: "Previous Year Papers", pdfCount: 8 },
    { id: "box-3", name: "Practice Sets", pdfCount: 15 },
    { id: "box-4", name: "Short Notes", pdfCount: 6 },
  ];

  return (
    <Layout title={room.name}>
      <div className="px-4 py-5">
        {/* Room header card */}
        <div
          className={`${room.gradient} rounded-2xl p-5 mb-6 border border-border`}
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{room.icon}</span>
            <div>
              <h1 className="text-xl font-bold font-display text-foreground">
                {room.name}
              </h1>
              <p className="text-sm text-muted-foreground font-body">
                {room.description}
              </p>
            </div>
          </div>
        </div>

        {/* Box list */}
        <h2 className="text-sm font-semibold text-muted-foreground font-body uppercase tracking-wide mb-3">
          Select a Box
        </h2>
        <div className="flex flex-col gap-2">
          {boxes.map((box, i) => (
            <Link
              key={box.id}
              to="/room/$roomId/box/$boxId"
              params={{ roomId, boxId: box.id }}
              data-ocid={`room.box.${i + 1}`}
              className="flex items-center justify-between bg-card border border-border rounded-xl px-4 py-4 transition-smooth hover:border-primary/40 hover:bg-secondary active:scale-[0.99]"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground font-display truncate">
                  {box.name}
                </p>
                <p className="text-xs text-muted-foreground font-body mt-0.5">
                  {box.pdfCount} PDFs
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 ml-3" />
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
