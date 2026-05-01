// ─── Room IDs ────────────────────────────────────────────────────────────────
export type RoomId =
  | "ssc"
  | "railway"
  | "civil"
  | "banking"
  | "defence"
  | "current_affairs"
  | "ncert"
  | "other";

// ─── Data Models ─────────────────────────────────────────────────────────────
export interface Room {
  id: RoomId;
  name: string;
  icon: string;
  description: string;
  gradient: string;
  boxCount: number;
  pdfCount: number;
}

export interface Box {
  id: string;
  name: string;
  roomId: RoomId;
  pdfCount: number;
}

export interface PdfMeta {
  id: string;
  title: string;
  chapterName: string;
  roomId: RoomId;
  boxId: string;
  downloadUrl: string;
  fileSize: string;
}

export interface BookmarkEntry {
  pdfId: string;
  timestamp: number;
}

// Backend summary types (returned by actor queries)
export interface RoomSummary {
  id: string;
  name: string;
  boxCount: bigint;
  pdfCount: bigint;
}

export interface BoxSummary {
  id: string;
  name: string;
  roomId: string;
  pdfCount: bigint;
}

// ─── Room Configuration ───────────────────────────────────────────────────────
export interface RoomConfig {
  name: string;
  icon: string;
  gradient: string;
  description: string;
  accentVar: string;
}

export const roomConfig: Record<RoomId, RoomConfig> = {
  ssc: {
    name: "SSC Exams",
    icon: "📋",
    gradient: "room-gradient-ssc",
    description: "MTS, CHSL, CGL, GD, Steno, CPO, Delhi Police",
    accentVar: "--room-ssc",
  },
  railway: {
    name: "Railway Exams",
    icon: "🚂",
    gradient: "room-gradient-railway",
    description: "RRB Group D, NTPC, ALP, RPF Constable, RPF SI",
    accentVar: "--room-railway",
  },
  civil: {
    name: "Civil Services",
    icon: "🏛️",
    gradient: "room-gradient-civil",
    description: "UPSC, BPSC, UPPCS, MPPSC, JPSC, UKPSC",
    accentVar: "--room-civil",
  },
  banking: {
    name: "Banking Exams",
    icon: "🏦",
    gradient: "room-gradient-banking",
    description: "SBI PO, IBPS PO, SBI Clerk, IBPS Clerk",
    accentVar: "--room-banking",
  },
  defence: {
    name: "Defence Exams",
    icon: "⚔️",
    gradient: "room-gradient-defence",
    description: "NDA, CDS, Army",
    accentVar: "--room-defence",
  },
  current_affairs: {
    name: "Current Affairs",
    icon: "📰",
    gradient: "room-gradient-current-affairs",
    description: "Monthly + Year-wise PDFs",
    accentVar: "--room-current-affairs",
  },
  ncert: {
    name: "NCERT Books",
    icon: "📚",
    gradient: "room-gradient-ncert",
    description: "Class 6–12, subject-wise chapter PDFs",
    accentVar: "--room-ncert",
  },
  other: {
    name: "Other Books",
    icon: "📖",
    gradient: "room-gradient-other",
    description: "GK, Reasoning, Math, English",
    accentVar: "--room-other",
  },
};

/** CSS gradient class for a room card */
export const roomGradients: Record<RoomId, string> = {
  ssc: "room-gradient-ssc",
  railway: "room-gradient-railway",
  civil: "room-gradient-civil",
  banking: "room-gradient-banking",
  defence: "room-gradient-defence",
  current_affairs: "room-gradient-current-affairs",
  ncert: "room-gradient-ncert",
  other: "room-gradient-other",
};

// ─── Helper Functions ─────────────────────────────────────────────────────────
export function getRoomName(id: RoomId): string {
  return roomConfig[id]?.name ?? id;
}

export function getRoomIcon(id: RoomId): string {
  return roomConfig[id]?.icon ?? "📄";
}

export function getRoomGradient(id: RoomId): string {
  return roomGradients[id] ?? "room-gradient-other";
}

export function isValidRoomId(id: string): id is RoomId {
  return id in roomConfig;
}
