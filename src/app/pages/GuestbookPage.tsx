import { Navigate } from "react-router";

/** Guestbook lives on the about page */
export default function GuestbookPage() {
  return <Navigate to="/about#guestbook" replace />;
}
