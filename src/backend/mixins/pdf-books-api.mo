import List  "mo:core/List";
import Lib   "../lib/pdf-books";
import Types "../types/pdf-books";

// Mixin receives all state slices it needs via parameters.
mixin (
  pdfs      : List.List<Types.PdfMeta>,
  bookmarks : List.List<Types.BookmarkEntry>,
  recent    : List.List<Types.RecentlyViewed>
) {

  // ---------------------------------------------------------------------------
  // Query: Browse PDFs
  // ---------------------------------------------------------------------------

  public query func getPdfsByBox(roomId : Types.RoomId, boxId : Types.BoxId) : async [Types.PdfMeta] {
    Lib.getPdfsByBox(pdfs, roomId, boxId)
  };

  public query func getPdfsByRoom(roomId : Types.RoomId) : async [Types.PdfMeta] {
    Lib.getPdfsByRoom(pdfs, roomId)
  };

  public query func searchPdfs(searchQuery : Text) : async [Types.PdfMeta] {
    Lib.searchPdfs(pdfs, searchQuery)
  };

  // ---------------------------------------------------------------------------
  // Query: Room & Box summaries
  // ---------------------------------------------------------------------------

  public query func getAllRooms() : async [Types.RoomSummary] {
    Lib.getAllRooms(pdfs)
  };

  public query func getBoxesByRoom(roomId : Types.RoomId) : async [Types.BoxSummary] {
    Lib.getBoxesByRoom(pdfs, roomId)
  };

  // ---------------------------------------------------------------------------
  // Query: Bookmarks (caller-scoped)
  // ---------------------------------------------------------------------------

  public query ({ caller }) func getBookmarks() : async [Types.PdfMeta] {
    Lib.getBookmarks(pdfs, bookmarks, caller)
  };

  // ---------------------------------------------------------------------------
  // Update: Bookmarks
  // ---------------------------------------------------------------------------

  public shared ({ caller }) func addBookmark(pdfId : Types.PdfId) : async Bool {
    Lib.addBookmark(bookmarks, caller, pdfId)
  };

  public shared ({ caller }) func removeBookmark(pdfId : Types.PdfId) : async Bool {
    Lib.removeBookmark(bookmarks, caller, pdfId)
  };

  // ---------------------------------------------------------------------------
  // Query: Recently Viewed (caller-scoped)
  // ---------------------------------------------------------------------------

  public query ({ caller }) func getRecentlyViewed() : async [Types.PdfMeta] {
    Lib.getRecentlyViewed(pdfs, recent, caller)
  };

  // ---------------------------------------------------------------------------
  // Update: Mark PDF as viewed
  // ---------------------------------------------------------------------------

  public shared ({ caller }) func markViewed(pdfId : Types.PdfId) : async () {
    Lib.markViewed(recent, caller, pdfId)
  };
};
