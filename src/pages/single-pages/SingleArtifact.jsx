/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getArtifacts } from "../../services";

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

  // HTTP loading and error
  if (artifactsIsLoading) return <p>Loading...</p>;
  if (artifactsError) return <p>Error loading data.</p>;

  // After HTTP loads we determine correct ID
  const singleArtifact = artifactsData.find((artifact) => artifact.id === id);

  return (
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
      </div>
      <button onClick={() => navigate("/explore")} className="btn">
        Back
      </button>
    </div>
  );
}

export default SingleArtifact;
