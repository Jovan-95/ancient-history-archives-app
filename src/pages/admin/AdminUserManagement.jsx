/* eslint-disable no-unused-vars */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import getUsers, {
  changeUserRole,
  changeUserStatus,
  deleteComment,
  deleteUser,
  getComments,
} from "../../services";
import { useState } from "react";
import Modal from "../../components/Modal";
import { showSuccessToast, showInfoToast } from "../../components/Toast";

/* eslint-disable no-unused-vars */
function AdminUserManagement() {
  const loggedUser = useSelector((state) => state.auth.loggedInUser);
  const queryClient = useQueryClient();
  const [role, setRole] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenBanModal, setIsOpenBanModal] = useState(false);
  const [isOpenApproveModal, setIsOpenApproveModal] = useState(false);
  const [user, setUser] = useState("");
  const [targetDeletedUser, setTargetDeletedUser] = useState("");
  const [isCommentsModal, setIsCommentsModal] = useState(false);
  const [comment, setComment] = useState("");

  // ReactQuery Get users
  const {
    data: usersData,
    isLoading: usersIsLoading,
    error: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  // ReactQuery Get users
  const {
    data: commentsData,
    isLoading: commentsIsLoading,
    error: commentsError,
  } = useQuery({
    queryKey: ["comments"],
    queryFn: getComments,
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

  // Delete HTTP method delete user
  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onMutate: (variables) => {
      // Optimistic update: odmah uklanjamo post sa UI
      const previousComments = queryClient.getQueryData(["comments"]);
      queryClient.setQueryData(["comments"], (oldData) => {
        return oldData.filter((comment) => comment.id !== variables);
      });
      return { previousComments };
    },
    onError: (err, variables, context) => {
      // Ako se nešto desi sa DELETE-om, vraćamo prethodno stanje
      queryClient.setQueryData(["comments"], context.previousComments);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]); // refetch!
    },
  });

  // HTTP loading and error
  if (usersIsLoading || commentsIsLoading) return <p></p>;
  if (usersError || commentsError) return <p>Error loading data.</p>;

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
      showInfoToast("You can't delete yourself.");
      return;
    }
    setIsOpenDeleteModal(true);
    setTargetDeletedUser(user);
  }

  // Delete user
  function handleUserDelete() {
    deleteMutation.mutate(targetDeletedUser.id);
    setIsOpenDeleteModal(false);
    showInfoToast("User deleted!");
  }

  // Ban modal
  function handleBanModal(user) {
    if (user.id === loggedUser.id) {
      showInfoToast("You can't ban yourself.");
      return;
    }
    setUser(user);
    setIsOpenBanModal((prev) => !prev);
  }

  // Ban user
  function handleUserStatus() {
    userStatusChangingMutation({
      id: user.id,
      status: "banned",
    });
    setIsOpenBanModal(false);
    // console.log(user);
    showInfoToast("User banned!");
  }

  // Unban user
  function handleUnbanUser() {
    userStatusChangingMutation({
      id: user.id,
      status: "active",
    });
    setIsOpenBanModal(false);
    showInfoToast("User unbanned!");
  }

  // Approve user modal
  function handleApproveModal(user) {
    setIsOpenApproveModal((prev) => !prev);

    setUser(user);
  }

  // Approve user
  function approveUser() {
    userStatusChangingMutation({
      id: user.id,
      status: "active",
    });
    setIsOpenApproveModal(false);
    showSuccessToast("User approved!");
  }

  // Delete comment modal
  function handleDeleteCommentModal(comment) {
    setComment(comment);
    setIsCommentsModal((prev) => !prev);
  }

  // Delete comment
  function handleDeleteComment() {
    deleteCommentMutation.mutate(comment.id);
    setIsCommentsModal(false);
  }
  return (
    <>
      <div className="admin-page">
        <div className="admin-page-content">
          <h2>Users</h2>

          <div className="table-wrapper">
            <table className="admin-table">
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
                        onClick={() => handleApproveModal(user)}
                        className="btn btn-approve"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleOpenRemoveModal(user)}
                        className="btn btn-reject ml-4"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleBanModal(user)}
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
          </div>

          <h2>Comments</h2>
          <div className="table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th># ID</th>
                  <th>User</th>
                  <th>Comment</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {commentsData.map((comment) => (
                  <tr key={comment.id}>
                    <td>{comment.id}</td>
                    <td>{comment.nickname}</td>
                    <td>{comment.text}</td>
                    <td>{new Date(comment.createdAt).toLocaleString()}</td>

                    <td>
                      <button
                        onClick={() => handleDeleteCommentModal(comment)}
                        className="btn btn-reject ml-4"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* change role */}
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

        {/* delete functionality */}
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

        {/* ban functionality */}
        <div className={isOpenBanModal ? "d-block" : "d-none"}>
          <Modal>
            <p>Are you sure you want to ban this user?</p>
            <button onClick={handleUserStatus} className="btn btn-reject">
              Ban this user?
            </button>
            {user.status === "banned" ? (
              <button onClick={handleUnbanUser} className="btn btn--cta ml-4">
                Unban user?
              </button>
            ) : (
              ""
            )}
            <button
              onClick={() => setIsOpenBanModal(false)}
              className="btn ml-4"
            >
              Cancel
            </button>
          </Modal>
        </div>

        {/* approve user registration */}
        <div className={isOpenApproveModal ? "d-block" : "d-none"}>
          <Modal>
            <p>Are you sure you want to approve this user?</p>
            <button onClick={approveUser} className="btn btn-approve">
              Approve this user?
            </button>
            <button
              onClick={() => setIsOpenApproveModal(false)}
              className="btn ml-4"
            >
              Cancel
            </button>
          </Modal>
        </div>

        {/* Delete comment modal */}
        <div className={isCommentsModal ? "d-block" : "d-none"}>
          <Modal>
            <p>Are you sure you want to delete this comment?</p>
            <button onClick={handleDeleteComment} className="btn btn-reject">
              Delete this comment
            </button>
            <button
              onClick={() => setIsCommentsModal(false)}
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
