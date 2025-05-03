import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getUsers, {
  approveArtifact,
  approveCollection,
  approveEmpire,
  approveFigure,
  approveTimeline,
  getArtifacts,
  getCollections,
  getEmpires,
  getFigures,
  getTimelines,
} from "../../services";
import { useSelector } from "react-redux";

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

  // Patch HTTP method calling
  const { mutate: approvePendingArtifact } = useMutation({
    mutationFn: ({ id, status }) => approveArtifact(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries(["artifacts"]); // osvežava users podatke
    },
  });

  // Patch HTTP method calling
  const { mutate: approvePendingCollection } = useMutation({
    mutationFn: ({ id, status }) => approveCollection(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries(["collections"]); // osvežava users podatke
    },
  });

  // Patch HTTP method calling
  const { mutate: approvePendingTimeline } = useMutation({
    mutationFn: ({ id, status }) => approveTimeline(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries(["timelines"]); // osvežava users podatke
    },
  });

  // Patch HTTP method calling
  const { mutate: approvePendingEmpire } = useMutation({
    mutationFn: ({ id, status }) => approveEmpire(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries(["empires"]); // osvežava users podatke
    },
  });

  // Patch HTTP method calling
  const { mutate: approvePendingFigure } = useMutation({
    mutationFn: ({ id, status }) => approveFigure(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries(["figures"]); // osvežava users podatke
    },
  });

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
    approvePendingArtifact({
      id: artifact.id,
      status: "approved",
    });
  }

  // Approve collection
  function handleApprovingCollection(collection) {
    approvePendingCollection({
      id: collection.id,
      status: "approved",
    });
  }

  // Approve timeline
  function handleApprovingTimeline(timeline) {
    approvePendingTimeline({
      id: timeline.id,
      status: "approved",
    });
  }

  // Approve empire
  function handleApprovingEmpire(empire) {
    approvePendingEmpire({
      id: empire.id,
      status: "approved",
    });
  }

  // Approve figure
  function handleApprovingFigure(figure) {
    console.log(figure);
    approvePendingFigure({
      id: figure.id,
      status: "approved",
    });
  }

  return (
    <div>
      <h1>Admin moderation</h1>

      <div className="admin-table">
        <h2>Pending Artifacts Submissions</h2>
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
                  <button className="btn-reject">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
                  <button className="btn-reject">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
                  <button className="btn-reject">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
                  <button className="btn-reject">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
                  <button className="btn-reject">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminModeration;
