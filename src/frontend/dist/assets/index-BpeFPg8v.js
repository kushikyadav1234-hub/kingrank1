const roomConfig = {
  ssc: {
    name: "SSC Exams",
    icon: "📋",
    gradient: "room-gradient-ssc",
    description: "MTS, CHSL, CGL, GD, Steno, CPO, Delhi Police",
    accentVar: "--room-ssc"
  },
  railway: {
    name: "Railway Exams",
    icon: "🚂",
    gradient: "room-gradient-railway",
    description: "RRB Group D, NTPC, ALP, RPF Constable, RPF SI",
    accentVar: "--room-railway"
  },
  civil: {
    name: "Civil Services",
    icon: "🏛️",
    gradient: "room-gradient-civil",
    description: "UPSC, BPSC, UPPCS, MPPSC, JPSC, UKPSC",
    accentVar: "--room-civil"
  },
  banking: {
    name: "Banking Exams",
    icon: "🏦",
    gradient: "room-gradient-banking",
    description: "SBI PO, IBPS PO, SBI Clerk, IBPS Clerk",
    accentVar: "--room-banking"
  },
  defence: {
    name: "Defence Exams",
    icon: "⚔️",
    gradient: "room-gradient-defence",
    description: "NDA, CDS, Army",
    accentVar: "--room-defence"
  },
  current_affairs: {
    name: "Current Affairs",
    icon: "📰",
    gradient: "room-gradient-current-affairs",
    description: "Monthly + Year-wise PDFs",
    accentVar: "--room-current-affairs"
  },
  ncert: {
    name: "NCERT Books",
    icon: "📚",
    gradient: "room-gradient-ncert",
    description: "Class 6–12, subject-wise chapter PDFs",
    accentVar: "--room-ncert"
  },
  other: {
    name: "Other Books",
    icon: "📖",
    gradient: "room-gradient-other",
    description: "GK, Reasoning, Math, English",
    accentVar: "--room-other"
  }
};
function isValidRoomId(id) {
  return id in roomConfig;
}
export {
  isValidRoomId as i,
  roomConfig as r
};
