import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import getUsers, {
  changeUserRole,
  changeUserStatus,
  deleteUser,
} from "../../services";
import { useState } from "react";
import Modal from "../../components/Modal";

/* eslint-disable no-unused-vars */
function AdminUserManagement() {
  const loggedUser = useSelector((state) => state.auth.loggedInUser);
  const queryClient = useQueryClient();
  const [role, setRole] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [user, setUser] = useState("");
  const [targetDeletedUser, setTargetDeletedUser] = useState("");

  // ReactQuery Get users
  const {
    data: usersData,
    isLoading: usersIsLoading,
    error: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  // Patch HTTP method calling
  const { mutate: changeRole } = useMutation({
    mutationFn: ({ id, role }) => changeUserRole(id, role),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]); // osvežava users podatke
    },
  });

  // Patch HTTP method calling
  const { mutate: userStatusChangingMutation } = useMutation({
    mutationFn: ({ id, status }) => changeUserStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]); // osvežava users podatke
    },
  });

  // Delete HTTP method delete user
  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onMutate: (variables) => {
      // Optimistic update: odmah uklanjamo post sa UI
      const previousUsers = queryClient.getQueryData(["users"]);
      queryClient.setQueryData(["users"], (oldData) => {
        return oldData.filter((user) => user.id !== variables);
      });
      return { previousUsers };
    },
    onError: (err, variables, context) => {
      // Ako se nešto desi sa DELETE-om, vraćamo prethodno stanje
      queryClient.setQueryData(["users"], context.previousUsers);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]); // refetch!
    },
  });

  // HTTP loading and error
  if (usersIsLoading) return <p>Loading...</p>;
  if (usersError) return <p>Error loading data.</p>;

  // Finding logged user on backend by comparing with logged user from redux
  // const user = usersData.find((user) => user.id === loggedUser.id);

  function handleModal(user) {
    setUser(user);
    setIsOpen((prev) => !prev);
  }

  // Role changing
  function handleChangeRole() {
    changeRole({
      id: user.id,
      role: role,
    });

    setUser("");
    setIsOpen(false);
  }

  // Open remove user modal
  function handleOpenRemoveModal(user) {
    if (user.id === loggedUser.id) {
      alert("You can't delete yourself.");
      return;
    }
    setIsOpenDeleteModal(true);
    setTargetDeletedUser(user);
  }

  // Delete user
  function handleUserDelete() {
    deleteMutation.mutate(targetDeletedUser.id);
    setIsOpenDeleteModal(false);
  }

  // Ban/unban user
  function handleUserStatus(user) {
    userStatusChangingMutation({
      id: user.id,
      status: "banned",
    });
  }

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
              <th>Status</th>
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
                <td>{user.status}</td>
                <td>
                  <span>{user.role}</span>
                </td>
                <td>
                  <button
                    onClick={() => handleOpenRemoveModal(user)}
                    className="btn btn-reject"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleUserStatus(user)}
                    className="btn btn--cta ml-4"
                  >
                    Ban
                  </button>
                  <button
                    onClick={() => handleModal(user)}
                    className="btn btn--auth ml-4"
                  >
                    Change role?
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={isOpen ? "d-block" : "d-none"}>
          <Modal>
            <p>Are you sure you want to change role for this user?</p>
            <div>
              <select onChange={(e) => setRole(e.target.value)}>
                <option>Choose role</option>
                <option>Admin</option>
                <option>Researcher</option>
                <option>Reader</option>
              </select>
            </div>

            <div style={{ marginTop: "16px" }}>
              {role ? (
                <button className="btn" onClick={handleChangeRole}>
                  Save role
                </button>
              ) : (
                ""
              )}

              <button onClick={() => setIsOpen(false)} className="btn ml-4">
                Cancel
              </button>
            </div>
          </Modal>
        </div>

        {/* Commented delete functionality */}
        <div className={isOpenDeleteModal ? "d-block" : "d-none"}>
          <Modal>
            <p>Are you sure you want to remove this user?</p>
            <button onClick={handleUserDelete} className="btn">
              Remove this user?
            </button>
            <button
              onClick={() => setIsOpenDeleteModal(false)}
              className="btn ml-4"
            >
              Cancel
            </button>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default AdminUserManagement;
