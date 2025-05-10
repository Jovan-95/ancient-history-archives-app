import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PublicRoute({ children }) {
  const user = useSelector((state) => state.auth.loggedInUser);

  // Ako je korisnik logovan, preusmeri ga na home ili neku drugu stranicu
  if (user) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

export default PublicRoute;
