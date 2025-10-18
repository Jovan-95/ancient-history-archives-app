/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getEmpires } from "../../services";

function SingleEmpire() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Get empires
  const {
    data: empiresData,
    isLoading: empiresIsLoading,
    error: empiresError,
  } = useQuery({
    queryKey: ["empires"],
    queryFn: getEmpires,
  });

  // HTTP loading and error
  if (empiresIsLoading) return <p></p>;
  if (empiresError) return <p>Error loading data.</p>;

  const empire = empiresData.find((empire) => empire.id === id);

  return (
    <div className="single-page">
      <div className="single-page__header">
        <h2 className="single-page__title">{empire.name}</h2>
      </div>
      <div className="single-page__content">
        <p className="single-page__text">{empire.description}</p>
        <p className="single-page__text">
          <strong>Period:</strong> {empire.era}
        </p>
        <p className="single-page__text">
          <strong>Region:</strong> {empire.region}
        </p>
      </div>
      <button onClick={() => navigate("/explore")} className="btn">
        Back
      </button>
    </div>
  );
}

export default SingleEmpire;
