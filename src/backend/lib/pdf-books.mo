import List  "mo:core/List";
import Map   "mo:core/Map";
import Time  "mo:core/Time";
import Types "../types/pdf-books";

module {

  // ---------------------------------------------------------------------------
  // Room metadata table  (id → display name)
  // ---------------------------------------------------------------------------

  let roomNames : [(Types.RoomId, Text)] = [
    ("ssc",            "SSC Exams"),
    ("railway",        "Railway Exams"),
    ("civil",          "Civil Services"),
    ("banking",        "Banking Exams"),
    ("defence",        "Defence Exams"),
    ("current_affairs","Current Affairs"),
    ("ncert",          "NCERT Books"),
    ("other",          "Other Books"),
  ];

  // Box metadata: (roomId, boxId, displayName)
  let boxNames : [(Types.RoomId, Types.BoxId, Text)] = [
    // SSC
    ("ssc", "mts",          "SSC MTS"),
    ("ssc", "chsl",         "SSC CHSL"),
    ("ssc", "cgl",          "SSC CGL"),
    ("ssc", "gd",           "SSC GD"),
    ("ssc", "steno",        "SSC Stenographer"),
    ("ssc", "cpo",          "SSC CPO"),
    ("ssc", "delhi_police", "Delhi Police"),
    // Railway
    ("railway", "group_d",       "RRB Group D"),
    ("railway", "ntpc",          "RRB NTPC"),
    ("railway", "alp",           "RRB ALP"),
    ("railway", "rpf_constable", "RPF Constable"),
    ("railway", "rpf_si",        "RPF SI"),
    // Civil
    ("civil", "upsc",   "UPSC"),
    ("civil", "bpsc",   "BPSC"),
    ("civil", "uppcs",  "UPPCS"),
    ("civil", "mppcs",  "MPPCS"),
    ("civil", "jpsc",   "JPSC"),
    ("civil", "ukpsc",  "UKPSC"),
    // Banking
    ("banking", "sbi_po",        "SBI PO"),
    ("banking", "ibps_po",       "IBPS PO"),
    ("banking", "clerk",         "Clerk"),
    ("banking", "rrb_assistant", "RRB Assistant"),
    // Defence
    ("defence", "nda",  "NDA"),
    ("defence", "cds",  "CDS"),
    ("defence", "army", "Army GD"),
    // Current Affairs
    ("current_affairs", "monthly", "Monthly PDFs"),
    ("current_affairs", "yearly",  "Year-wise PDFs"),
    // NCERT
    ("ncert", "class6",  "Class 6"),
    ("ncert", "class7",  "Class 7"),
    ("ncert", "class8",  "Class 8"),
    ("ncert", "class9",  "Class 9"),
    ("ncert", "class10", "Class 10"),
    ("ncert", "class11", "Class 11"),
    ("ncert", "class12", "Class 12"),
    // Other
    ("other", "gk",        "General Knowledge"),
    ("other", "reasoning", "Reasoning"),
    ("other", "math",      "Mathematics"),
    ("other", "english",   "English"),
  ];

  // ---------------------------------------------------------------------------
  // Query helpers
  // ---------------------------------------------------------------------------

  public func getPdfsByBox(
    pdfs   : List.List<Types.PdfMeta>,
    roomId : Types.RoomId,
    boxId  : Types.BoxId
  ) : [Types.PdfMeta] {
    pdfs.filter(func(p) { p.roomId == roomId and p.boxId == boxId }).toArray()
  };

  public func getPdfsByRoom(
    pdfs   : List.List<Types.PdfMeta>,
    roomId : Types.RoomId
  ) : [Types.PdfMeta] {
    pdfs.filter(func(p) { p.roomId == roomId }).toArray()
  };

  public func searchPdfs(
    pdfs       : List.List<Types.PdfMeta>,
    searchTerm : Text
  ) : [Types.PdfMeta] {
    let lower = searchTerm.toLower();
    pdfs.filter(func(p) {
      p.title.toLower().contains(#text lower) or
      p.chapterName.toLower().contains(#text lower) or
      p.roomId.toLower().contains(#text lower) or
      p.boxId.toLower().contains(#text lower)
    }).toArray()
  };

  // ---------------------------------------------------------------------------
  // Bookmark helpers
  // ---------------------------------------------------------------------------

  public func getBookmarks(
    pdfs      : List.List<Types.PdfMeta>,
    bookmarks : List.List<Types.BookmarkEntry>,
    userId    : Types.UserId
  ) : [Types.PdfMeta] {
    let userBookmarks = bookmarks.filter(func(b) { b.userId == userId });
    let result = List.empty<Types.PdfMeta>();
    userBookmarks.forEach(func(b) {
      switch (pdfs.find(func(p) { p.id == b.pdfId })) {
        case (?pdf) { result.add(pdf) };
        case null   {};
      }
    });
    result.toArray()
  };

  public func addBookmark(
    bookmarks : List.List<Types.BookmarkEntry>,
    userId    : Types.UserId,
    pdfId     : Types.PdfId
  ) : Bool {
    // Idempotent — only add if not already bookmarked
    switch (bookmarks.find(func(b) { b.userId == userId and b.pdfId == pdfId })) {
      case (?_) { false };
      case null {
        bookmarks.add({ pdfId; userId; timestamp = Time.now() });
        true
      };
    }
  };

  public func removeBookmark(
    bookmarks : List.List<Types.BookmarkEntry>,
    userId    : Types.UserId,
    pdfId     : Types.PdfId
  ) : Bool {
    let sizeBefore = bookmarks.size();
    let filtered = bookmarks.filter(func(b) { not (b.userId == userId and b.pdfId == pdfId) });
    bookmarks.clear();
    bookmarks.append(filtered);
    bookmarks.size() < sizeBefore
  };

  // ---------------------------------------------------------------------------
  // Recently viewed helpers
  // ---------------------------------------------------------------------------

  public func getRecentlyViewed(
    pdfs   : List.List<Types.PdfMeta>,
    recent : List.List<Types.RecentlyViewed>,
    userId : Types.UserId
  ) : [Types.PdfMeta] {
    // Collect user entries sorted descending by timestamp (most recent first)
    let userRecent = recent.filter(func(r) { r.userId == userId });
    let sorted = userRecent.toArray().sort(
      func(a, b) {
        if (a.timestamp > b.timestamp) #less
        else if (a.timestamp < b.timestamp) #greater
        else #equal
      }
    );
    let result = List.empty<Types.PdfMeta>();
    sorted.forEach(func(r) {
      switch (pdfs.find(func(p) { p.id == r.pdfId })) {
        case (?pdf) { result.add(pdf) };
        case null   {};
      }
    });
    result.toArray()
  };

  public func markViewed(
    recent : List.List<Types.RecentlyViewed>,
    userId : Types.UserId,
    pdfId  : Types.PdfId
  ) {
    // Remove old entry for same (user, pdf) pair, then push new one
    let filtered = recent.filter(func(r) { not (r.userId == userId and r.pdfId == pdfId) });
    recent.clear();
    recent.append(filtered);
    recent.add({ pdfId; userId; timestamp = Time.now() });
    // Trim overall list to 500 most recent entries to bound memory growth
    let total = recent.size();
    if (total > 500) {
      let start : Int = total.toInt() - 500;
      let trimmed = recent.sliceToArray(start, total.toInt());
      recent.clear();
      recent.addAll(trimmed.values())
    }
  };

  // ---------------------------------------------------------------------------
  // Room / box summary helpers
  // ---------------------------------------------------------------------------

  public func getAllRooms(pdfs : List.List<Types.PdfMeta>) : [Types.RoomSummary] {
    roomNames.map<(Types.RoomId, Text), Types.RoomSummary>(func(entry) {
      let rid  = entry.0;
      let name = entry.1;
      let roomPdfs = pdfs.filter(func(p) { p.roomId == rid });
      let boxSet   = Map.empty<Types.BoxId, Bool>();
      roomPdfs.forEach(func(p) { boxSet.add(p.boxId, true) });
      { id = rid; name; boxCount = boxSet.size(); pdfCount = roomPdfs.size() }
    })
  };

  public func getBoxesByRoom(
    pdfs   : List.List<Types.PdfMeta>,
    roomId : Types.RoomId
  ) : [Types.BoxSummary] {
    boxNames
      .filter(func(entry) { entry.0 == roomId })
      .map<(Types.RoomId, Types.BoxId, Text), Types.BoxSummary>(func(entry) {
        let bid  = entry.1;
        let name = entry.2;
        let count = pdfs.filter(func(p) { p.roomId == roomId and p.boxId == bid }).size();
        { id = bid; name; pdfCount = count }
      })
  };

  // ---------------------------------------------------------------------------
  // Seed data — placeholder PDFs for all rooms/boxes
  // ---------------------------------------------------------------------------

  public func seedPdfs() : [Types.PdfMeta] {
    let url = "https://example.com/placeholder.pdf";

    // SSC
    let ssc : [Types.PdfMeta] = [
      { id = "ssc-mts-1";   title = "SSC MTS Previous Year Paper 2023";   chapterName = "Full Paper";          roomId = "ssc"; boxId = "mts";          downloadUrl = url; fileSize = "2.1 MB" },
      { id = "ssc-mts-2";   title = "SSC MTS Study Material GK";          chapterName = "General Knowledge";   roomId = "ssc"; boxId = "mts";          downloadUrl = url; fileSize = "1.8 MB" },
      { id = "ssc-chsl-1";  title = "SSC CHSL Tier-1 Practice Set";       chapterName = "Quantitative Apt.";   roomId = "ssc"; boxId = "chsl";         downloadUrl = url; fileSize = "3.0 MB" },
      { id = "ssc-chsl-2";  title = "SSC CHSL English Notes";             chapterName = "English Grammar";     roomId = "ssc"; boxId = "chsl";         downloadUrl = url; fileSize = "1.5 MB" },
      { id = "ssc-cgl-1";   title = "SSC CGL Tier-1 Mock Test 2024";      chapterName = "Full Paper";          roomId = "ssc"; boxId = "cgl";          downloadUrl = url; fileSize = "2.5 MB" },
      { id = "ssc-cgl-2";   title = "SSC CGL Maths Shortcut Tricks";      chapterName = "Mathematics";         roomId = "ssc"; boxId = "cgl";          downloadUrl = url; fileSize = "1.9 MB" },
      { id = "ssc-cgl-3";   title = "SSC CGL Reasoning Practice Book";    chapterName = "Reasoning";           roomId = "ssc"; boxId = "cgl";          downloadUrl = url; fileSize = "2.2 MB" },
      { id = "ssc-gd-1";    title = "SSC GD Constable GK Notes";          chapterName = "General Knowledge";   roomId = "ssc"; boxId = "gd";           downloadUrl = url; fileSize = "1.7 MB" },
      { id = "ssc-gd-2";    title = "SSC GD Physical Exam Guide";         chapterName = "Physical Standards";  roomId = "ssc"; boxId = "gd";           downloadUrl = url; fileSize = "0.9 MB" },
      { id = "ssc-steno-1"; title = "SSC Stenographer English Notes";     chapterName = "English";             roomId = "ssc"; boxId = "steno";        downloadUrl = url; fileSize = "2.0 MB" },
      { id = "ssc-steno-2"; title = "SSC Stenographer GK Capsule";        chapterName = "General Awareness";   roomId = "ssc"; boxId = "steno";        downloadUrl = url; fileSize = "1.4 MB" },
      { id = "ssc-cpo-1";   title = "SSC CPO Sub-Inspector Paper 2023";   chapterName = "Full Paper";          roomId = "ssc"; boxId = "cpo";          downloadUrl = url; fileSize = "2.8 MB" },
      { id = "ssc-cpo-2";   title = "SSC CPO Reasoning Notes";            chapterName = "Reasoning";           roomId = "ssc"; boxId = "cpo";          downloadUrl = url; fileSize = "1.6 MB" },
      { id = "ssc-dp-1";    title = "Delhi Police Constable GK Notes";    chapterName = "General Knowledge";   roomId = "ssc"; boxId = "delhi_police"; downloadUrl = url; fileSize = "2.3 MB" },
      { id = "ssc-dp-2";    title = "Delhi Police Previous Year Paper";   chapterName = "Full Paper";          roomId = "ssc"; boxId = "delhi_police"; downloadUrl = url; fileSize = "3.1 MB" },
    ];

    // Railway
    let railway : [Types.PdfMeta] = [
      { id = "rly-gd-1";   title = "RRB Group D Exam Guide 2024";       chapterName = "Full Syllabus";        roomId = "railway"; boxId = "group_d";       downloadUrl = url; fileSize = "3.5 MB" },
      { id = "rly-gd-2";   title = "RRB Group D Science Notes";         chapterName = "General Science";      roomId = "railway"; boxId = "group_d";       downloadUrl = url; fileSize = "1.8 MB" },
      { id = "rly-gd-3";   title = "RRB Group D Maths Practice";        chapterName = "Mathematics";          roomId = "railway"; boxId = "group_d";       downloadUrl = url; fileSize = "2.0 MB" },
      { id = "rly-ntpc-1"; title = "RRB NTPC CBT-1 Mock Paper";         chapterName = "Full Paper";           roomId = "railway"; boxId = "ntpc";          downloadUrl = url; fileSize = "2.6 MB" },
      { id = "rly-ntpc-2"; title = "RRB NTPC General Awareness Notes";  chapterName = "General Awareness";    roomId = "railway"; boxId = "ntpc";          downloadUrl = url; fileSize = "1.5 MB" },
      { id = "rly-alp-1";  title = "RRB ALP Technical Guide";           chapterName = "Technical Section";    roomId = "railway"; boxId = "alp";           downloadUrl = url; fileSize = "4.0 MB" },
      { id = "rly-alp-2";  title = "RRB ALP Maths & Reasoning";         chapterName = "Aptitude";             roomId = "railway"; boxId = "alp";           downloadUrl = url; fileSize = "2.1 MB" },
      { id = "rly-rpfc-1"; title = "RPF Constable Study Material";      chapterName = "Full Syllabus";        roomId = "railway"; boxId = "rpf_constable"; downloadUrl = url; fileSize = "2.9 MB" },
      { id = "rly-rpfc-2"; title = "RPF Constable GK Capsule";          chapterName = "General Knowledge";    roomId = "railway"; boxId = "rpf_constable"; downloadUrl = url; fileSize = "1.3 MB" },
      { id = "rly-rpfs-1"; title = "RPF SI Previous Year Paper";        chapterName = "Full Paper";           roomId = "railway"; boxId = "rpf_si";        downloadUrl = url; fileSize = "2.7 MB" },
      { id = "rly-rpfs-2"; title = "RPF SI Reasoning Notes";            chapterName = "Reasoning";            roomId = "railway"; boxId = "rpf_si";        downloadUrl = url; fileSize = "1.6 MB" },
    ];

    // Civil Services
    let civil : [Types.PdfMeta] = [
      { id = "cv-upsc-1";  title = "UPSC Prelims GS Paper-I Notes";      chapterName = "General Studies";     roomId = "civil"; boxId = "upsc";  downloadUrl = url; fileSize = "5.2 MB" },
      { id = "cv-upsc-2";  title = "UPSC Indian Polity Notes";           chapterName = "Polity";              roomId = "civil"; boxId = "upsc";  downloadUrl = url; fileSize = "3.8 MB" },
      { id = "cv-upsc-3";  title = "UPSC Indian History Notes";          chapterName = "History";             roomId = "civil"; boxId = "upsc";  downloadUrl = url; fileSize = "4.1 MB" },
      { id = "cv-bpsc-1";  title = "BPSC Prelims Practice Paper";        chapterName = "Full Paper";          roomId = "civil"; boxId = "bpsc";  downloadUrl = url; fileSize = "2.4 MB" },
      { id = "cv-bpsc-2";  title = "BPSC Bihar GK Notes";               chapterName = "Bihar GK";            roomId = "civil"; boxId = "bpsc";  downloadUrl = url; fileSize = "1.9 MB" },
      { id = "cv-uppcs-1"; title = "UPPCS Prelims Study Material";       chapterName = "Full Syllabus";       roomId = "civil"; boxId = "uppcs"; downloadUrl = url; fileSize = "4.5 MB" },
      { id = "cv-uppcs-2"; title = "UPPCS UP Current Affairs 2024";      chapterName = "Current Affairs";     roomId = "civil"; boxId = "uppcs"; downloadUrl = url; fileSize = "1.7 MB" },
      { id = "cv-mppcs-1"; title = "MPPSC Prelims Notes";                chapterName = "Full Syllabus";       roomId = "civil"; boxId = "mppcs"; downloadUrl = url; fileSize = "3.2 MB" },
      { id = "cv-mppcs-2"; title = "MPPSC MP GK Notes";                  chapterName = "MP General Knowledge";roomId = "civil"; boxId = "mppcs"; downloadUrl = url; fileSize = "2.0 MB" },
      { id = "cv-jpsc-1";  title = "JPSC Prelims Guide";                 chapterName = "Full Syllabus";       roomId = "civil"; boxId = "jpsc";  downloadUrl = url; fileSize = "2.6 MB" },
      { id = "cv-jpsc-2";  title = "JPSC Jharkhand GK Notes";            chapterName = "Jharkhand GK";        roomId = "civil"; boxId = "jpsc";  downloadUrl = url; fileSize = "1.5 MB" },
      { id = "cv-ukpsc-1"; title = "UKPSC Prelims Practice Set";         chapterName = "Full Paper";          roomId = "civil"; boxId = "ukpsc"; downloadUrl = url; fileSize = "2.3 MB" },
      { id = "cv-ukpsc-2"; title = "UKPSC Uttarakhand GK Notes";         chapterName = "Uttarakhand GK";      roomId = "civil"; boxId = "ukpsc"; downloadUrl = url; fileSize = "1.4 MB" },
    ];

    // Banking
    let banking : [Types.PdfMeta] = [
      { id = "bk-sbipo-1";  title = "SBI PO Prelims Full Mock Paper";    chapterName = "Full Paper";          roomId = "banking"; boxId = "sbi_po";        downloadUrl = url; fileSize = "2.8 MB" },
      { id = "bk-sbipo-2";  title = "SBI PO Data Interpretation Notes";  chapterName = "Data Interpretation"; roomId = "banking"; boxId = "sbi_po";        downloadUrl = url; fileSize = "2.0 MB" },
      { id = "bk-ibpspo-1"; title = "IBPS PO Prelims Mock Paper";        chapterName = "Full Paper";          roomId = "banking"; boxId = "ibps_po";       downloadUrl = url; fileSize = "2.7 MB" },
      { id = "bk-ibpspo-2"; title = "IBPS PO Banking Awareness Notes";   chapterName = "Banking Awareness";   roomId = "banking"; boxId = "ibps_po";       downloadUrl = url; fileSize = "1.8 MB" },
      { id = "bk-clerk-1";  title = "Bank Clerk Prelims Practice Set";   chapterName = "Full Paper";          roomId = "banking"; boxId = "clerk";         downloadUrl = url; fileSize = "2.2 MB" },
      { id = "bk-clerk-2";  title = "Bank Clerk English Notes";          chapterName = "English";             roomId = "banking"; boxId = "clerk";         downloadUrl = url; fileSize = "1.5 MB" },
      { id = "bk-clerk-3";  title = "Bank Clerk Quantitative Aptitude";  chapterName = "Mathematics";         roomId = "banking"; boxId = "clerk";         downloadUrl = url; fileSize = "1.9 MB" },
      { id = "bk-rrb-1";    title = "RRB Office Assistant Mock Paper";   chapterName = "Full Paper";          roomId = "banking"; boxId = "rrb_assistant"; downloadUrl = url; fileSize = "2.1 MB" },
      { id = "bk-rrb-2";    title = "RRB Assistant Reasoning Notes";     chapterName = "Reasoning";           roomId = "banking"; boxId = "rrb_assistant"; downloadUrl = url; fileSize = "1.6 MB" },
    ];

    // Defence
    let defence : [Types.PdfMeta] = [
      { id = "def-nda-1";  title = "NDA Mathematics Practice Paper";     chapterName = "Mathematics";         roomId = "defence"; boxId = "nda";  downloadUrl = url; fileSize = "3.0 MB" },
      { id = "def-nda-2";  title = "NDA General Ability Notes";          chapterName = "General Ability";     roomId = "defence"; boxId = "nda";  downloadUrl = url; fileSize = "2.5 MB" },
      { id = "def-nda-3";  title = "NDA Previous Year Paper 2023";       chapterName = "Full Paper";          roomId = "defence"; boxId = "nda";  downloadUrl = url; fileSize = "3.8 MB" },
      { id = "def-cds-1";  title = "CDS English Study Material";         chapterName = "English";             roomId = "defence"; boxId = "cds";  downloadUrl = url; fileSize = "2.2 MB" },
      { id = "def-cds-2";  title = "CDS General Knowledge Notes";        chapterName = "General Knowledge";   roomId = "defence"; boxId = "cds";  downloadUrl = url; fileSize = "2.8 MB" },
      { id = "def-army-1"; title = "Army GD Agnipath Study Guide";       chapterName = "Full Syllabus";       roomId = "defence"; boxId = "army"; downloadUrl = url; fileSize = "2.0 MB" },
      { id = "def-army-2"; title = "Army GD GK & Science Notes";         chapterName = "GK & Science";        roomId = "defence"; boxId = "army"; downloadUrl = url; fileSize = "1.7 MB" },
    ];

    // Current Affairs
    let currentAffairs : [Types.PdfMeta] = [
      { id = "ca-jan24";   title = "January 2024 Current Affairs";       chapterName = "January 2024";        roomId = "current_affairs"; boxId = "monthly"; downloadUrl = url; fileSize = "1.2 MB" },
      { id = "ca-feb24";   title = "February 2024 Current Affairs";      chapterName = "February 2024";       roomId = "current_affairs"; boxId = "monthly"; downloadUrl = url; fileSize = "1.1 MB" },
      { id = "ca-mar24";   title = "March 2024 Current Affairs";         chapterName = "March 2024";          roomId = "current_affairs"; boxId = "monthly"; downloadUrl = url; fileSize = "1.3 MB" },
      { id = "ca-2023";    title = "Current Affairs Yearly 2023";        chapterName = "Year 2023";           roomId = "current_affairs"; boxId = "yearly";  downloadUrl = url; fileSize = "5.5 MB" },
      { id = "ca-2022";    title = "Current Affairs Yearly 2022";        chapterName = "Year 2022";           roomId = "current_affairs"; boxId = "yearly";  downloadUrl = url; fileSize = "5.2 MB" },
    ];

    // NCERT Books
    let ncert : [Types.PdfMeta] = [
      { id = "nc-6-sci";   title = "NCERT Class 6 Science";              chapterName = "Full Book";           roomId = "ncert"; boxId = "class6";  downloadUrl = url; fileSize = "4.0 MB" },
      { id = "nc-6-mat";   title = "NCERT Class 6 Mathematics";          chapterName = "Full Book";           roomId = "ncert"; boxId = "class6";  downloadUrl = url; fileSize = "3.5 MB" },
      { id = "nc-7-sci";   title = "NCERT Class 7 Science";              chapterName = "Full Book";           roomId = "ncert"; boxId = "class7";  downloadUrl = url; fileSize = "4.1 MB" },
      { id = "nc-7-mat";   title = "NCERT Class 7 Mathematics";          chapterName = "Full Book";           roomId = "ncert"; boxId = "class7";  downloadUrl = url; fileSize = "3.6 MB" },
      { id = "nc-8-sci";   title = "NCERT Class 8 Science";              chapterName = "Full Book";           roomId = "ncert"; boxId = "class8";  downloadUrl = url; fileSize = "4.3 MB" },
      { id = "nc-8-mat";   title = "NCERT Class 8 Mathematics";          chapterName = "Full Book";           roomId = "ncert"; boxId = "class8";  downloadUrl = url; fileSize = "3.8 MB" },
      { id = "nc-9-sci";   title = "NCERT Class 9 Science";              chapterName = "Full Book";           roomId = "ncert"; boxId = "class9";  downloadUrl = url; fileSize = "5.0 MB" },
      { id = "nc-9-mat";   title = "NCERT Class 9 Mathematics";          chapterName = "Full Book";           roomId = "ncert"; boxId = "class9";  downloadUrl = url; fileSize = "4.5 MB" },
      { id = "nc-9-sst";   title = "NCERT Class 9 Social Science";       chapterName = "Full Book";           roomId = "ncert"; boxId = "class9";  downloadUrl = url; fileSize = "4.8 MB" },
      { id = "nc-10-sci";  title = "NCERT Class 10 Science";             chapterName = "Full Book";           roomId = "ncert"; boxId = "class10"; downloadUrl = url; fileSize = "5.2 MB" },
      { id = "nc-10-mat";  title = "NCERT Class 10 Mathematics";         chapterName = "Full Book";           roomId = "ncert"; boxId = "class10"; downloadUrl = url; fileSize = "4.7 MB" },
      { id = "nc-10-sst";  title = "NCERT Class 10 Social Science";      chapterName = "Full Book";           roomId = "ncert"; boxId = "class10"; downloadUrl = url; fileSize = "5.0 MB" },
      { id = "nc-11-phy";  title = "NCERT Class 11 Physics Part 1";      chapterName = "Part 1";              roomId = "ncert"; boxId = "class11"; downloadUrl = url; fileSize = "6.0 MB" },
      { id = "nc-11-chem"; title = "NCERT Class 11 Chemistry";           chapterName = "Full Book";           roomId = "ncert"; boxId = "class11"; downloadUrl = url; fileSize = "5.8 MB" },
      { id = "nc-11-bio";  title = "NCERT Class 11 Biology";             chapterName = "Full Book";           roomId = "ncert"; boxId = "class11"; downloadUrl = url; fileSize = "5.5 MB" },
      { id = "nc-12-phy";  title = "NCERT Class 12 Physics Part 2";      chapterName = "Part 2";              roomId = "ncert"; boxId = "class12"; downloadUrl = url; fileSize = "6.2 MB" },
      { id = "nc-12-chem"; title = "NCERT Class 12 Chemistry";           chapterName = "Full Book";           roomId = "ncert"; boxId = "class12"; downloadUrl = url; fileSize = "6.0 MB" },
      { id = "nc-12-bio";  title = "NCERT Class 12 Biology";             chapterName = "Full Book";           roomId = "ncert"; boxId = "class12"; downloadUrl = url; fileSize = "5.7 MB" },
    ];

    // Other Books
    let other : [Types.PdfMeta] = [
      { id = "oth-gk-1";    title = "Lucent General Knowledge 2024";     chapterName = "Full Book";           roomId = "other"; boxId = "gk";        downloadUrl = url; fileSize = "7.0 MB" },
      { id = "oth-gk-2";    title = "GK Digest Monthly Capsule";         chapterName = "Monthly Summary";     roomId = "other"; boxId = "gk";        downloadUrl = url; fileSize = "1.5 MB" },
      { id = "oth-rsn-1";   title = "Reasoning by RS Aggarwal Notes";    chapterName = "Verbal Reasoning";    roomId = "other"; boxId = "reasoning"; downloadUrl = url; fileSize = "4.5 MB" },
      { id = "oth-rsn-2";   title = "Non-Verbal Reasoning Practice";     chapterName = "Non-Verbal";          roomId = "other"; boxId = "reasoning"; downloadUrl = url; fileSize = "3.2 MB" },
      { id = "oth-mat-1";   title = "Quantitative Aptitude Shortcuts";   chapterName = "Shortcuts & Tricks";  roomId = "other"; boxId = "math";      downloadUrl = url; fileSize = "3.8 MB" },
      { id = "oth-mat-2";   title = "Maths Formulae Handbook";           chapterName = "Formulae";            roomId = "other"; boxId = "math";      downloadUrl = url; fileSize = "1.2 MB" },
      { id = "oth-eng-1";   title = "English Grammar by Wren and Martin";chapterName = "Grammar Rules";       roomId = "other"; boxId = "english";   downloadUrl = url; fileSize = "5.0 MB" },
      { id = "oth-eng-2";   title = "English Vocabulary 1000 Words";     chapterName = "Vocabulary";          roomId = "other"; boxId = "english";   downloadUrl = url; fileSize = "1.8 MB" },
      { id = "oth-eng-3";   title = "English Reading Comprehension Tips";chapterName = "Reading Skills";      roomId = "other"; boxId = "english";   downloadUrl = url; fileSize = "1.4 MB" },
    ];

    ssc
      .concat(railway)
      .concat(civil)
      .concat(banking)
      .concat(defence)
      .concat(currentAffairs)
      .concat(ncert)
      .concat(other)
  };
};
