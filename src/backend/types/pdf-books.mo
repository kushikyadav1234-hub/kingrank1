import Common "common";

module {
  public type UserId    = Common.UserId;
  public type Timestamp = Common.Timestamp;
  public type RoomId    = Common.RoomId;
  public type BoxId     = Common.BoxId;
  public type PdfId     = Common.PdfId;

  // ---------------------------------------------------------------------------
  // Core PDF metadata record stored in canister state
  // ---------------------------------------------------------------------------
  public type PdfMeta = {
    id          : PdfId;
    title       : Text;
    chapterName : Text;
    roomId      : RoomId;
    boxId       : BoxId;
    downloadUrl : Text;
    fileSize    : Text;
  };

  // ---------------------------------------------------------------------------
  // Bookmark entry per user
  // ---------------------------------------------------------------------------
  public type BookmarkEntry = {
    pdfId     : PdfId;
    userId    : UserId;
    timestamp : Timestamp;
  };

  // ---------------------------------------------------------------------------
  // Recently viewed entry per user
  // ---------------------------------------------------------------------------
  public type RecentlyViewed = {
    pdfId     : PdfId;
    userId    : UserId;
    timestamp : Timestamp;
  };

  // ---------------------------------------------------------------------------
  // Response shapes for room / box summaries
  // ---------------------------------------------------------------------------
  public type RoomSummary = {
    id       : RoomId;
    name     : Text;
    boxCount : Nat;
    pdfCount : Nat;
  };

  public type BoxSummary = {
    id       : BoxId;
    name     : Text;
    pdfCount : Nat;
  };
};
