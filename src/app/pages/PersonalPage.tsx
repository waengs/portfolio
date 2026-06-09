import { Navigate } from "react-router";

/** Personal projects live on /projects#personal */
export default function PersonalPage() {
  return <Navigate to="/projects#personal" replace />;
}
