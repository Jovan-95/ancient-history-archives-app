/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getFigures } from "../../services";

function SingleFigure() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Get figures
  const {
    data: figuresData,
    isLoading: figuresIsLoading,
    error: figuresError,
  } = useQuery({
    queryKey: ["figures"],
    queryFn: getFigures,
  });

  // HTTP loading and error
  if (figuresIsLoading) return <p>Loading...</p>;
  if (figuresError) return <p>Error loading data.</p>;

  const figure = figuresData.find((figure) => figure.id === id);
  console.log(figure);
  return (
    <div className="single-page">
      <div className="single-page__header">
        <h2 className="single-page__title">{figure.name}</h2>
      </div>
      <div className="single-page__content">
        <p className="single-page__text">{figure.knownFor}</p>
        <p className="single-page__text">
          <strong>Region:</strong> {figure.region}
        </p>
        <p className="single-page__text">
          <strong>Period:</strong> {figure.era}
        </p>
      </div>
      <button onClick={() => navigate("/explore")} className="btn">
        Back
      </button>
    </div>
  );
}

export default SingleFigure;
