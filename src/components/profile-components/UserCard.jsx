// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useState } from "react";
// import { deleteUser } from "../../services";

import { NavLink } from "react-router-dom";
import Modal from "../Modal";

function UserCard({ el, user }) {
  // const [isOpen, setIsOpen] = useState(false);
  // const [targetDeletedUser, setTargetDeletedUser] = useState("");
  // const queryClient = useQueryClient();

  // Delete HTTP method delete user
  // const deleteMutation = useMutation({
  //   mutationFn: deleteUser,
  //   onMutate: (variables) => {
  //     // Optimistic update: odmah uklanjamo post sa UI
  //     const previousUsers = queryClient.getQueryData(["users"]);
  //     queryClient.setQueryData(["users"], (oldData) => {
  //       return oldData.filter((user) => user.id !== variables);
  //     });
  //     return { previousUsers };
  //   },
  //   onError: (err, variables, context) => {
  //     // Ako se nešto desi sa DELETE-om, vraćamo prethodno stanje
  //     queryClient.setQueryData(["users"], context.previousUsers);
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(["users"]); // refetch!
  //   },
  // });

  // // Open remove user modal
  // function handleOpenRemoveModal(user) {
  //   setIsOpen(true);
  //   setTargetDeletedUser(user);
  // }

  // // Delete user
  // function handleDeleteUser() {
  //   deleteMutation.mutate(targetDeletedUser.id);
  //   setIsOpen(false);
  // }

  return (
    <>
      <div key={el.id} className="user-card">
        {user.id === el.id ? (
          <h2 style={{ color: "green" }}>Your profile!</h2>
        ) : (
          ""
        )}
        <div>
          <strong>Username:</strong> {el.username}
        </div>
        <div>
          {" "}
          <strong>Email:</strong> {el.email}
        </div>
        <div>
          {" "}
          <strong>Role:</strong> {el.role}
        </div>

        <div>
          <NavLink to={`/profile/${el.id}`}>
            {" "}
            <button className="btn btn--cta">More</button>
          </NavLink>

          {/* Commented delete functionality */}
          {/* <button
            onClick={() => handleOpenRemoveModal(el)}
            className="btn btn--cta ml-4"
          >
            Remove profile
          </button> */}
        </div>
      </div>
      {/* Commented delete functionality */}
      {/* <div className={isOpen ? "d-block" : "d-none"}>
        <Modal>
          <p>Are you sure you want to remove this user?</p>
          <button onClick={handleDeleteUser} className="btn">
            Remove this user?
          </button>
          <button onClick={() => setIsOpen(false)} className="btn ml-4">
            Cancel
          </button>
        </Modal>
      </div> */}
    </>
  );
}

export default UserCard;

// Commented code on this page is for deleting user.
// After adding this functionality to admin pages you can delete this commented code
