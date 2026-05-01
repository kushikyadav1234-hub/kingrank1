import type { backendInterface, PdfMeta, RoomSummary, BoxSummary } from "../backend.d";

const SAMPLE_ROOMS: RoomSummary[] = [
  { id: "ssc", name: "SSC Exams", boxCount: BigInt(7), pdfCount: BigInt(0) },
  { id: "railway", name: "Railway Exams", boxCount: BigInt(5), pdfCount: BigInt(0) },
  { id: "civil", name: "Civil Services", boxCount: BigInt(6), pdfCount: BigInt(0) },
  { id: "banking", name: "Banking Exams", boxCount: BigInt(4), pdfCount: BigInt(0) },
  { id: "defence", name: "Defence Exams", boxCount: BigInt(3), pdfCount: BigInt(0) },
  { id: "current", name: "Current Affairs", boxCount: BigInt(2), pdfCount: BigInt(0) },
  { id: "ncert", name: "NCERT Books", boxCount: BigInt(7), pdfCount: BigInt(0) },
  { id: "other", name: "Other Books", boxCount: BigInt(4), pdfCount: BigInt(0) },
];

const SAMPLE_BOXES: Record<string, BoxSummary[]> = {
  ssc: [
    { id: "ssc-mts", name: "SSC MTS", pdfCount: BigInt(3) },
    { id: "ssc-chsl", name: "SSC CHSL", pdfCount: BigInt(3) },
    { id: "ssc-cgl", name: "SSC CGL", pdfCount: BigInt(3) },
    { id: "ssc-gd", name: "SSC GD", pdfCount: BigInt(2) },
    { id: "ssc-steno", name: "SSC Stenographer", pdfCount: BigInt(2) },
    { id: "ssc-cpo", name: "SSC CPO", pdfCount: BigInt(2) },
    { id: "delhi-police", name: "Delhi Police", pdfCount: BigInt(2) },
  ],
  railway: [
    { id: "rrb-group-d", name: "RRB Group D", pdfCount: BigInt(3) },
    { id: "rrb-ntpc", name: "RRB NTPC", pdfCount: BigInt(3) },
    { id: "rrb-alp", name: "RRB ALP", pdfCount: BigInt(2) },
    { id: "rpf-constable", name: "RPF Constable", pdfCount: BigInt(2) },
    { id: "rpf-si", name: "RPF SI", pdfCount: BigInt(2) },
  ],
  civil: [
    { id: "upsc", name: "UPSC Civil Services", pdfCount: BigInt(4) },
    { id: "bpsc", name: "BPSC", pdfCount: BigInt(2) },
    { id: "uppcs", name: "UPPCS", pdfCount: BigInt(2) },
    { id: "mppsc", name: "MPPSC", pdfCount: BigInt(2) },
    { id: "jpsc", name: "JPSC", pdfCount: BigInt(2) },
    { id: "ukpsc", name: "UKPSC", pdfCount: BigInt(2) },
  ],
  banking: [
    { id: "sbi-po", name: "SBI PO", pdfCount: BigInt(3) },
    { id: "ibps-po", name: "IBPS PO", pdfCount: BigInt(3) },
    { id: "sbi-clerk", name: "SBI Clerk", pdfCount: BigInt(3) },
    { id: "rrb-assistant", name: "RRB Assistant", pdfCount: BigInt(2) },
  ],
};

const SAMPLE_PDFS: PdfMeta[] = [
  { id: "pdf-1", title: "SSC CGL Previous Year Paper 2023", chapterName: "Full Paper", fileSize: "2.4 MB", downloadUrl: "#", boxId: "ssc-cgl", roomId: "ssc" },
  { id: "pdf-2", title: "SSC CHSL Tier I Practice Set", chapterName: "Chapter 1", fileSize: "1.8 MB", downloadUrl: "#", boxId: "ssc-chsl", roomId: "ssc" },
  { id: "pdf-3", title: "RRB NTPC CBT 1 Mock Test", chapterName: "Mock Test 1", fileSize: "3.1 MB", downloadUrl: "#", boxId: "rrb-ntpc", roomId: "railway" },
];

const bookmarks: Set<string> = new Set();
const viewed: string[] = [];

export const mockBackend: backendInterface = {
  getAllRooms: async () => SAMPLE_ROOMS,

  getBoxesByRoom: async (roomId) =>
    SAMPLE_BOXES[roomId] ?? [],

  getPdfsByRoom: async (roomId) =>
    SAMPLE_PDFS.filter((p) => p.roomId === roomId),

  getPdfsByBox: async (_roomId, boxId) =>
    SAMPLE_PDFS.filter((p) => p.boxId === boxId),

  searchPdfs: async (query) => {
    const q = query.toLowerCase();
    return SAMPLE_PDFS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.chapterName.toLowerCase().includes(q),
    );
  },

  addBookmark: async (pdfId) => {
    bookmarks.add(pdfId);
    return true;
  },

  removeBookmark: async (pdfId) => {
    bookmarks.delete(pdfId);
    return true;
  },

  getBookmarks: async () =>
    SAMPLE_PDFS.filter((p) => bookmarks.has(p.id)),

  markViewed: async (pdfId) => {
    const idx = viewed.indexOf(pdfId);
    if (idx !== -1) viewed.splice(idx, 1);
    viewed.unshift(pdfId);
    if (viewed.length > 20) viewed.length = 20;
  },

  getRecentlyViewed: async () =>
    viewed
      .map((id) => SAMPLE_PDFS.find((p) => p.id === id))
      .filter((p): p is PdfMeta => p !== undefined),
};
