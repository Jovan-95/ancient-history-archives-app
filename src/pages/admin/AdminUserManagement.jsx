import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import getUsers from "../../services";

/* eslint-disable no-unused-vars */
function AdminUserManagement() {
  const loggedUser = useSelector((state) => state.auth.loggedInUser);
  const queryClient = useQueryClient();

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
  if (usersIsLoading) return <p>Loading...</p>;
  if (usersError) return <p>Error loading data.</p>;
  return (
    <>
      <div className="admin-table">
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <span>{user.role}</span>
                </td>
                <td>
                  <button>Delete</button>
                  <button>Ban</button>
                  <button>Promote</button>
                  <button>Demote</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <button className="btn-reject">Clear all rejected</button> */}
      </div>
    </>
  );
}

export default AdminUserManagement;
