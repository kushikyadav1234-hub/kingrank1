module {
  public type UserId    = Principal;
  public type Timestamp = Int; // nanoseconds from Time.now()
  public type RoomId    = Text; // "ssc" | "railway" | "civil" | "banking" | "defence" | "current_affairs" | "ncert" | "other"
  public type BoxId     = Text; // sub-category within a room, e.g. "mts", "cgl", "ntpc"
  public type PdfId     = Text;
};
