import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import getUsers from "../services";
import { useQuery } from "@tanstack/react-query";

function ProtectedRoute({ allowedRoles, children }) {
  const loggedUser = useSelector((state) => state.auth.loggedInUser);

  // ReactQuery Get users
  const {
    data: usersData,
    isLoading: usersIsLoading,
    error: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  // HTTP loading and error
  if (usersIsLoading) return <p></p>;
  if (usersError) return <p>Error loading data.</p>;

  // Finding logged user on backend by comparing with logged user from redux
  const user = usersData.find((user) => user.id === loggedUser.id);

  // Ako korisnik nije ulogovan ili nema odgovarajuću rolu
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default ProtectedRoute;
