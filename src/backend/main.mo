import List       "mo:core/List";
import Lib        "lib/pdf-books";
import Types      "types/pdf-books";
import PdfMixin   "mixins/pdf-books-api";
import Migration  "migration";

(with migration = Migration.run)
actor {
  // ---------------------------------------------------------------------------
  // State slices
  // ---------------------------------------------------------------------------
  let pdfs      : List.List<Types.PdfMeta>        = List.fromArray(Lib.seedPdfs());
  let bookmarks : List.List<Types.BookmarkEntry>   = List.empty();
  let recent    : List.List<Types.RecentlyViewed>  = List.empty();

  // ---------------------------------------------------------------------------
  // Composition
  // ---------------------------------------------------------------------------
  include PdfMixin(pdfs, bookmarks, recent);
};
