import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BoxSummary {
    id: BoxId;
    name: string;
    pdfCount: bigint;
}
export interface RoomSummary {
    id: RoomId;
    name: string;
    boxCount: bigint;
    pdfCount: bigint;
}
export type RoomId = string;
export type BoxId = string;
export interface PdfMeta {
    id: PdfId;
    title: string;
    downloadUrl: string;
    fileSize: string;
    boxId: BoxId;
    roomId: RoomId;
    chapterName: string;
}
export type PdfId = string;
export interface backendInterface {
    addBookmark(pdfId: PdfId): Promise<boolean>;
    getAllRooms(): Promise<Array<RoomSummary>>;
    getBookmarks(): Promise<Array<PdfMeta>>;
    getBoxesByRoom(roomId: RoomId): Promise<Array<BoxSummary>>;
    getPdfsByBox(roomId: RoomId, boxId: BoxId): Promise<Array<PdfMeta>>;
    getPdfsByRoom(roomId: RoomId): Promise<Array<PdfMeta>>;
    getRecentlyViewed(): Promise<Array<PdfMeta>>;
    markViewed(pdfId: PdfId): Promise<void>;
    removeBookmark(pdfId: PdfId): Promise<boolean>;
    searchPdfs(searchQuery: string): Promise<Array<PdfMeta>>;
}
