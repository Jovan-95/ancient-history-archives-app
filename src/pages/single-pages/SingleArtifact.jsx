/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getArtifacts, getComments } from "../../services";

function SingleArtifact() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Get artifacts
  const {
    data: artifactsData,
    isLoading: artifactsIsLoading,
    error: artifactsError,
  } = useQuery({
    queryKey: ["artifacts"],
    queryFn: getArtifacts,
  });

  // Get comments
  const {
    data: commentsData,
    isLoading: commentsIsLoading,
    error: commentsError,
  } = useQuery({
    queryKey: ["comments"],
    queryFn: getComments,
  });

  // HTTP loading and error
  if (artifactsIsLoading || commentsIsLoading) return <p>Loading...</p>;
  if (artifactsError || commentsError) return <p>Error loading data.</p>;

  // After HTTP loads we determine correct ID
  const singleArtifact = artifactsData.find((artifact) => artifact.id === id);

  // Finding comment for this specific artifact with ID comparation
  const artifactComments = commentsData.filter(
    (comment) => comment.artifactId === Number(singleArtifact.id)
  );

  return (
    <>
      <div className="single-page">
        <div className="single-page__header">
          <h2 className="single-page__title">{singleArtifact.title}</h2>
        </div>
        <div className="single-page__content">
          <p className="single-page__text">{singleArtifact.description}</p>
          <p className="single-page__text">
            <strong>Period:</strong> {singleArtifact.period}
          </p>
          <p className="single-page__text">
            <strong>Region:</strong> {singleArtifact.region}
          </p>
          <p className="single-page__text">
            <strong>Discovered:</strong> {singleArtifact.createdAt}
          </p>
          <p>
            <strong>Type ID : {singleArtifact.id}</strong>{" "}
          </p>
        </div>
        <button onClick={() => navigate("/explore")} className="btn">
          Back
        </button>
      </div>
      <div className="single-page">
        <p className="single-page__text">
          <strong>Comments:</strong>
        </p>
        <div>
          {artifactComments.map((comment) => (
            <div className="comment-wrapper" key={comment.id}>
              <div className="type-id">
                <strong>Artifact (type) ID : {comment.artifactId}</strong>{" "}
              </div>
              <div className="comment-id">
                <strong>Comment ID : {comment.id}</strong>
              </div>
              <div className="user-id">
                <strong>User ID : {comment.userId}</strong>
              </div>
              <div className="comment-text">{comment.text}</div>
              <div className="comment-id">
                <strong>{comment.createdAt}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default SingleArtifact;
