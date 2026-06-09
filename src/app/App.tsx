import { lazy, Suspense, type ReactNode } from "react";
import { Navigate, Routes, Route } from "react-router";
import AppLayout from "./layouts/AppLayout";
import PageLoader from "./components/PageLoader";
import HomePage from "./pages/HomePage";

const AboutPage = lazy(() => import("./pages/AboutPage"));
const FandomsPage = lazy(() => import("./pages/FandomsPage"));
const ArchivePage = lazy(() => import("./pages/ArchivePage"));
const GuestbookPage = lazy(() => import("./pages/GuestbookPage"));
const GuestbookAdminPage = lazy(() => import("./pages/GuestbookAdminPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const MihoyoPage = lazy(() => import("./pages/MihoyoPage"));
const McytPage = lazy(() => import("./pages/McytPage"));
const CocPage = lazy(() => import("./pages/CocPage"));
const AnimePage = lazy(() => import("./pages/AnimePage"));
const BluelockPage = lazy(() => import("./pages/BluelockPage"));
const PersonalPage = lazy(() => import("./pages/PersonalPage"));

function LazyPage({ children }: { children: ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path="about"
          element={
            <LazyPage>
              <AboutPage />
            </LazyPage>
          }
        />
        <Route
          path="fandoms"
          element={
            <LazyPage>
              <FandomsPage />
            </LazyPage>
          }
        />
        <Route
          path="projects"
          element={
            <LazyPage>
              <ProjectsPage />
            </LazyPage>
          }
        />
        <Route
          path="projects/personal"
          element={
            <LazyPage>
              <PersonalPage />
            </LazyPage>
          }
        />
        <Route path="fandoms/personal" element={<Navigate to="/projects#personal" replace />} />
        <Route
          path="fandoms/mihoyo"
          element={
            <LazyPage>
              <MihoyoPage />
            </LazyPage>
          }
        />
        <Route
          path="fandoms/mcyt"
          element={
            <LazyPage>
              <McytPage />
            </LazyPage>
          }
        />
        <Route
          path="fandoms/coc"
          element={
            <LazyPage>
              <CocPage />
            </LazyPage>
          }
        />
        <Route
          path="fandoms/anime"
          element={
            <LazyPage>
              <AnimePage />
            </LazyPage>
          }
        />
        <Route
          path="fandoms/bluelock"
          element={
            <LazyPage>
              <BluelockPage />
            </LazyPage>
          }
        />
        <Route
          path="archive"
          element={
            <LazyPage>
              <ArchivePage />
            </LazyPage>
          }
        />
        <Route
          path="guestbook"
          element={
            <LazyPage>
              <GuestbookPage />
            </LazyPage>
          }
        />
        <Route
          path="guestbook/review"
          element={
            <LazyPage>
              <GuestbookAdminPage />
            </LazyPage>
          }
        />
      </Route>
    </Routes>
  );
}
