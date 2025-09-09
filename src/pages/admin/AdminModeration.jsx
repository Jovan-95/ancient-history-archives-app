/* eslint-disable no-unused-vars */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getUsers, {
  deleteArtifact,
  deleteCollection,
  deleteEmpire,
  deleteFigure,
  deleteTimeline,
  getArtifacts,
  getCollections,
  getEmpires,
  getFigures,
  getTimelines,
  updateEntityStatus,
} from "../../services";
import { useSelector } from "react-redux";
import {
  showSuccessToast,
  showErrorToast,
  showInfoToast,
} from "../../components/Toast";

/* eslint-disable no-unused-vars */
function AdminModeration() {
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

  // Get artifacts
  const {
    data: artifactsData,
    isLoading: artifactsIsLoading,
    error: artifactsError,
  } = useQuery({
    queryKey: ["artifacts"],
    queryFn: getArtifacts,
  });

  // Get collections
  const {
    data: collectionsData,
    isLoading: collectionsIsLoading,
    error: collectionsError,
  } = useQuery({
    queryKey: ["collections"],
    queryFn: getCollections,
  });

  // Get timelines
  const {
    data: timelinesData,
    isLoading: timelinesIsLoading,
    error: timelinesError,
  } = useQuery({
    queryKey: ["timelines"],
    queryFn: getTimelines,
  });

  // Get empires
  const {
    data: empiresData,
    isLoading: empiresIsLoading,
    error: empiresError,
  } = useQuery({
    queryKey: ["empires"],
    queryFn: getEmpires,
  });

  // Get figures
  const {
    data: figuresData,
    isLoading: figuresIsLoading,
    error: figuresError,
  } = useQuery({
    queryKey: ["figures"],
    queryFn: getFigures,
  });

  // Dynamic PATCH HTTP req for all data types
  function useApproveEntity(endpoint) {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ id, status }) => updateEntityStatus(endpoint, id, status),
      onSuccess: () => {
        queryClient.invalidateQueries([endpoint]);
      },
    });
  }
  const approveArtifact = useApproveEntity("artifacts");
  const approveTimeline = useApproveEntity("timelines");
  const approveCollection = useApproveEntity("collections");
  const approveEmpire = useApproveEntity("empires");
  const approveFigure = useApproveEntity("figures");

  function handleApprove(item, approveFn) {
    approveFn({ id: item.id, status: "approved" });
  }

  function handleReject(item, approveFn) {
    approveFn({ id: item.id, status: "rejected" });
  }

  // Dynamic Delete HTTP method ALL rejected
  function useDeleteRejectedEntities(endpoint, deleteFn) {
    return useMutation({
      mutationFn: async () => {
        const res = await fetch(`http://localhost:5000/${endpoint}`);
        const data = await res.json();
        const rejected = data.filter((item) => item.status === "rejected");

        await Promise.all(rejected.map((item) => deleteFn(item.id)));
      },
      onSuccess: () => {
        queryClient.invalidateQueries([endpoint]);
        showSuccessToast("All rejected items are deleted!");
      },
      onError: (err) => {
        console.error(`Failed to delete rejected ${endpoint}:`, err);
      },
    });
  }
  // Destructure
  const { mutate: deleteRejectedArtifacts } = useDeleteRejectedEntities(
    "artifacts",
    deleteArtifact
  );

  const { mutate: deleteRejectedCollections } = useDeleteRejectedEntities(
    "collections",
    deleteCollection
  );

  const { mutate: deleteRejectedTimelines } = useDeleteRejectedEntities(
    "timelines",
    deleteTimeline
  );

  const { mutate: deleteRejectedEmpires } = useDeleteRejectedEntities(
    "empires",
    deleteEmpire
  );

  const { mutate: deleteRejectedFigures } = useDeleteRejectedEntities(
    "figures",
    deleteFigure
  );

  // HTTP loading and error
  if (
    artifactsIsLoading ||
    collectionsIsLoading ||
    timelinesIsLoading ||
    figuresIsLoading ||
    empiresIsLoading ||
    usersIsLoading
  )
    return <p>Loading...</p>;
  if (
    artifactsError ||
    collectionsError ||
    timelinesError ||
    empiresError ||
    figuresError ||
    usersError
  )
    return <p>Error loading data.</p>;

  // Finding logged user on backend by comparing with logged user from redux
  const user = usersData.find((user) => user.id === loggedUser.id);

  // Approve artifact
  function handleApprovingArtifact(artifact) {
    handleApprove(artifact, approveArtifact.mutate);
    showSuccessToast("item approved!");
  }

  // Approve collection
  function handleApprovingCollection(collection) {
    handleApprove(collection, approveCollection.mutate);
    showSuccessToast("item approved!");
  }

  // Approve timeline
  function handleApprovingTimeline(timeline) {
    handleApprove(timeline, approveTimeline.mutate);
    showSuccessToast("item approved!");
  }

  // Approve empire
  function handleApprovingEmpire(empire) {
    handleApprove(empire, approveEmpire.mutate);
    showSuccessToast("item approved!");
  }

  // Approve figure
  function handleApprovingFigure(figure) {
    handleApprove(figure, approveFigure.mutate);
    showSuccessToast("item approved!");
  }

  // Reject artifact
  function handleRejectingArtifact(artifact) {
    handleReject(artifact, approveArtifact.mutate);
    showErrorToast("Item rejected!");
  }

  // Reject collection
  function handleRejectingCollection(collection) {
    handleReject(collection, approveCollection.mutate);
    showErrorToast("Item rejected!");
  }

  // Reject timeline
  function handleRejectingTimeline(timeline) {
    handleReject(timeline, approveTimeline.mutate);
    showErrorToast("Item rejected!");
  }

  // Reject figure
  function handleRejectingFigure(figure) {
    handleReject(figure, approveFigure.mutate);
    showErrorToast("Item rejected!");
  }

  // Reject empire
  function handleRejectingEmpire(empire) {
    handleReject(empire, approveEmpire.mutate);
    showErrorToast("Item rejected!");
  }
  return (
    <div>
      <div className="admin-table">
        <h1>Admin moderation</h1>

        <h2>Pending Artifacts Submissions</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                {/* <th>#</th> */}
                <th>Title</th>
                <th>Type</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* <!-- Example row - ti ćeš mapirati svoje podatke iz Reacta --> */}
              {artifactsData.map((artifact) => (
                <tr key={artifact.id}>
                  {/* <td>{artifact.id}</td> */}
                  <td>{artifact.title}</td>
                  <td>Artifact</td>
                  <td>
                    <span
                      className={
                        artifact.status === "pending"
                          ? "text-yellow"
                          : artifact.status === "approved"
                          ? "text-green"
                          : artifact.status === "rejected"
                          ? "text-red"
                          : ""
                      }
                    >
                      {artifact.status}
                    </span>
                  </td>
                  <td>{artifact.createdAt}</td>
                  <td>
                    <button
                      disabled={artifact.status === "approved" ? true : false}
                      onClick={() => handleApprovingArtifact(artifact)}
                      className={
                        artifact.status === "approved"
                          ? "btn-disabled"
                          : "btn-approve"
                      }
                    >
                      Approve
                    </button>{" "}
                    <button
                      onClick={() => handleRejectingArtifact(artifact)}
                      disabled={artifact.status === "rejected" ? true : false}
                      className={
                        artifact.status !== "rejected"
                          ? "btn-reject"
                          : "btn-disabled"
                      }
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button onClick={deleteRejectedArtifacts} className="btn-reject">
          Clear all rejected
        </button>
      </div>

      <div className="admin-table">
        <h2>Pending Collections Submissions</h2>
        <table>
          <thead>
            <tr>
              {/* <th>#</th> */}
              <th>Title</th>
              <th>Type</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- Example row - ti ćeš mapirati svoje podatke iz Reacta --> */}
            {collectionsData.map((collection) => (
              <tr key={collection.id}>
                {/* <td>{artifact.id}</td> */}
                <td>{collection.title}</td>
                <td>Collection</td>
                <td>
                  <span
                    className={
                      collection.status === "pending"
                        ? "text-yellow"
                        : collection.status === "approved"
                        ? "text-green"
                        : collection.status === "rejected"
                        ? "text-red"
                        : ""
                    }
                  >
                    {collection.status}
                  </span>
                </td>
                <td>{collection.createdAt}</td>
                <td>
                  <button
                    disabled={collection.status === "approved" ? true : false}
                    onClick={() => handleApprovingCollection(collection)}
                    className={
                      collection.status === "approved"
                        ? "btn-disabled"
                        : "btn-approve"
                    }
                  >
                    Approve
                  </button>{" "}
                  <button
                    onClick={() => handleRejectingCollection(collection)}
                    disabled={collection.status === "rejected" ? true : false}
                    className={
                      collection.status !== "rejected"
                        ? "btn-reject"
                        : "btn-disabled"
                    }
                  >
                    Reject
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={deleteRejectedCollections} className="btn-reject">
          Clear all rejected
        </button>
      </div>

      <div className="admin-table">
        <h2>Pending Timelines Submissions</h2>
        <table>
          <thead>
            <tr>
              {/* <th>#</th> */}
              <th>Title</th>
              <th>Type</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- Example row - ti ćeš mapirati svoje podatke iz Reacta --> */}
            {timelinesData.map((timeline) => (
              <tr key={timeline.id}>
                {/* <td>{artifact.id}</td> */}
                <td>{timeline.title}</td>
                <td>Timeline</td>
                <td>
                  <span
                    className={
                      timeline.status === "pending"
                        ? "text-yellow"
                        : timeline.status === "approved"
                        ? "text-green"
                        : timeline.status === "rejected"
                        ? "text-red"
                        : ""
                    }
                  >
                    {timeline.status}
                  </span>
                </td>
                <td>{timeline.createdAt}</td>
                <td>
                  <button
                    disabled={timeline.status === "approved" ? true : false}
                    onClick={() => handleApprovingTimeline(timeline)}
                    className={
                      timeline.status === "approved"
                        ? "btn-disabled"
                        : "btn-approve"
                    }
                  >
                    Approve
                  </button>{" "}
                  <button
                    onClick={() => handleRejectingTimeline(timeline)}
                    disabled={timeline.status === "rejected" ? true : false}
                    className={
                      timeline.status !== "rejected"
                        ? "btn-reject"
                        : "btn-disabled"
                    }
                  >
                    Reject
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={deleteRejectedTimelines} className="btn-reject">
          Clear all rejected
        </button>
      </div>

      <div className="admin-table">
        <h2>Pending Figures Submissions</h2>
        <table>
          <thead>
            <tr>
              {/* <th>#</th> */}
              <th>Title</th>
              <th>Type</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- Example row - ti ćeš mapirati svoje podatke iz Reacta --> */}
            {figuresData.map((figure) => (
              <tr key={figure.id}>
                {/* <td>{artifact.id}</td> */}
                <td>{figure.name}</td>
                <td>Figure</td>
                <td>
                  <span
                    className={
                      figure.status === "pending"
                        ? "text-yellow"
                        : figure.status === "approved"
                        ? "text-green"
                        : figure.status === "rejected"
                        ? "text-red"
                        : ""
                    }
                  >
                    {figure.status}
                  </span>
                </td>
                <td>{figure.createdAt}</td>
                <td>
                  <button
                    disabled={figure.status === "approved" ? true : false}
                    onClick={() => handleApprovingFigure(figure)}
                    className={
                      figure.status === "approved"
                        ? "btn-disabled"
                        : "btn-approve"
                    }
                  >
                    Approve
                  </button>{" "}
                  <button
                    onClick={() => handleRejectingFigure(figure)}
                    disabled={figure.status === "rejected" ? true : false}
                    className={
                      figure.status !== "rejected"
                        ? "btn-reject"
                        : "btn-disabled"
                    }
                  >
                    Reject
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={deleteRejectedFigures} className="btn-reject">
          Clear all rejected
        </button>
      </div>

      <div className="admin-table">
        <h2>Pending Empire Submissions</h2>
        <table>
          <thead>
            <tr>
              {/* <th>#</th> */}
              <th>Title</th>
              <th>Type</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- Example row - ti ćeš mapirati svoje podatke iz Reacta --> */}
            {empiresData.map((empire) => (
              <tr key={empire.id}>
                {/* <td>{artifact.id}</td> */}
                <td>{empire.name}</td>
                <td>Empire</td>
                <td>
                  <span
                    className={
                      empire.status === "pending"
                        ? "text-yellow"
                        : empire.status === "approved"
                        ? "text-green"
                        : empire.status === "rejected"
                        ? "text-red"
                        : ""
                    }
                  >
                    {empire.status}
                  </span>
                </td>
                <td>{empire.createdAt}</td>
                <td>
                  <button
                    disabled={empire.status === "approved" ? true : false}
                    onClick={() => handleApprovingEmpire(empire)}
                    className={
                      empire.status === "approved"
                        ? "btn-disabled"
                        : "btn-approve"
                    }
                  >
                    Approve
                  </button>{" "}
                  <button
                    onClick={() => handleRejectingEmpire(empire)}
                    disabled={empire.status === "rejected" ? true : false}
                    className={
                      empire.status !== "rejected"
                        ? "btn-reject"
                        : "btn-disabled"
                    }
                  >
                    Reject
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={deleteRejectedEmpires} className="btn-reject">
          Clear all rejected
        </button>
      </div>
    </div>
  );
}

export default AdminModeration;
