import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { LoadingSpinner } from "./components/LoadingSpinner";

// ─── Lazy-loaded pages ────────────────────────────────────────────────────────
const HomePage = lazy(() => import("./pages/Home"));
const RoomPage = lazy(() => import("./pages/Room"));
const BoxPage = lazy(() => import("./pages/BoxPage"));
const PdfViewPage = lazy(() => import("./pages/PdfView"));
const SearchPage = lazy(() => import("./pages/Search"));
const BookmarksPage = lazy(() => import("./pages/Bookmarks"));
const RecentPage = lazy(() => import("./pages/Recent"));

// ─── Root layout (no auth guard — public PDF browsing app) ────────────────────
function RootLayout() {
  return (
    <Suspense
      fallback={<LoadingSpinner fullScreen label="Loading KingRank1..." />}
    >
      <Outlet />
    </Suspense>
  );
}

// ─── Routes ───────────────────────────────────────────────────────────────────
const rootRoute = createRootRoute({ component: RootLayout });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const roomRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/room/$roomId",
  component: RoomPage,
});

const boxRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/room/$roomId/box/$boxId",
  component: BoxPage,
});

const pdfViewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pdf/$pdfId",
  component: PdfViewPage,
});

const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/search",
  component: SearchPage,
});

const bookmarksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/bookmarks",
  component: BookmarksPage,
});

const recentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/recent",
  component: RecentPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  roomRoute,
  boxRoute,
  pdfViewRoute,
  searchRoute,
  bookmarksRoute,
  recentRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// ─── React Query client ───────────────────────────────────────────────────────
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 2,
    },
  },
});

// ─── App root ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
