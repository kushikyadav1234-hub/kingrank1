# Design Brief — KingRank1 PDF Books

## Direction

KingRank1 — PDF Books library for competitive exam preparation with "House with Rooms" home screen metaphor. Dark-mode interface designed for focus and intuitive PDF category navigation across 8 rooms.

## Tone

Refined, editorial card-based aesthetic (inspired by Linear, Testbook) — restraint over decoration, information density balanced with breathing room. Each room has a signature accent color for visual recognition.

## Differentiation

Home screen as expandable "rooms" (8 PDF categories: SSC, Railway, Civil Services, Banking, Defence, Current Affairs, NCERT Books, Other Books), each with chapter/sub-category boxes. PDF view with download, bookmark, and read-progress tracking.

## Color Palette

| Token              | OKLCH            | Role                           |
| ------------------ | ---------------- | ------------------------------ |
| background         | 0.145 0.012 265  | Deep charcoal, content area    |
| foreground         | 0.96 0.008 260   | Near-white text on dark        |
| card               | 0.185 0.014 265  | Slightly elevated surface      |
| primary            | 0.62 0.2 255     | Vivid blue (engagement, CTA)   |
| destructive        | 0.56 0.22 25     | Red error state                |
| success            | 0.6 0.19 150     | Green accent                   |
| warning            | 0.74 0.16 88     | Yellow alert                   |
| border             | 0.26 0.018 265   | Subtle dividers                |
| room-ssc           | 0.62 0.2 255     | Blue — SSC Exams               |
| room-railway       | 0.68 0.18 45     | Orange — Railway Exams         |
| room-civil         | 0.55 0.18 290    | Purple — Civil Services        |
| room-banking       | 0.6 0.17 185     | Teal — Banking Exams           |
| room-defence       | 0.56 0.22 25     | Red — Defence Exams            |
| room-current-affairs | 0.65 0.2 200   | Cyan — Current Affairs         |
| room-ncert         | 0.65 0.18 135    | Green — NCERT Books            |
| room-other         | 0.65 0.15 75     | Amber — Other Books            |

## Typography

- Display: Space Grotesk — modern geometric sans for headings, room titles
- Body: DM Sans — clean, readable sans for chapters, labels, descriptions
- Scale: `text-3xl md:text-5xl font-bold` (headers), `text-lg` (room titles), `text-base` (body)

## Elevation & Depth

Minimal shadow hierarchy: card surfaces at +0.03L from background. Room cards and chapter boxes use subtle borders + accent gradients. Elevated state on hover uses `shadow-elevated` only.

## Structural Zones

| Zone            | Background       | Border/Accent                   | Notes                     |
| --------------- | ---------------- | ------------------------------- | ------------------------- |
| Header/Nav      | `bg-card`        | `border-b border-border`        | Brand + menu              |
| Room grid       | `bg-background`  | —                               | 2-col responsive grid     |
| Room card       | `room-gradient-*` | `room-border-*` (left accent)   | Expandable, chapters in   |
| Chapter box     | `bg-card`        | `border border-border`          | Icon + label, accent text |
| PDF viewer      | `bg-card`        | `border border-border`          | Toolbar, PDF content      |
| Bottom nav      | `bg-card`        | `border-t border-border`        | Sticky footer             |

## Spacing & Rhythm

Mobile-first: room card padding 20px, section gaps 24px, chapter boxes 12px gap. 2-column room grid on mobile, expandable on tablet+. Chapter grid 2–3 columns per room. 12px border-radius on room cards, 8px on chapter boxes.

## Component Patterns

- Room cards: gradient background, left accent border, icon + title + chapter count badge, expand on tap
- Chapter boxes: icon, label, accent text color matching room, tap to open PDF viewer
- Buttons: Primary (vivid blue bg, white text), secondary (muted bg, text-foreground)
- PDF toolbar: download, bookmark, page counter, reading progress bar

## Motion

- Entrance: Room cards fade in 300ms ease-out on mount
- Expand: Chapter boxes fade + scale in 300ms on room tap
- Hover: Subtle `shadow-elevated` lift on room cards, accent highlight on chapter tap
- PDF page transitions: smooth fade 200ms

## Constraints

- No generic purple/pink gradients; use room-specific 8-color palette
- No bounce or playful animations; maintain platform professionalism
- Result badges and PDF status must meet WCAG AA+ on dark background
- All text readable on dark surfaces; minimum L difference 0.7 foreground-on-background

## Signature Detail

House with Rooms metaphor + 8 distinct room accent colors (blue/orange/purple/teal/red/cyan/green/amber) enable intuitive visual PDF category recognition and deep exploration without home-screen cognitive overload.


