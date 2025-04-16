/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getCollections } from "../../services";

function SingleCollection() {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data: collectionsData,
    isLoading: collectionsIsLoading,
    error: collectionsError,
  } = useQuery({
    queryKey: ["collections"],
    queryFn: getCollections,
  });

  // HTTP loading and error
  if (collectionsIsLoading) return <p>Loading...</p>;
  if (collectionsError) return <p>Error loading data.</p>;

  // After HTTP loads we determine correct ID
  const collection = collectionsData.find((collection) => collection.id === id);

  return (
    <div className="single-page">
      <div className="single-page__header">
        <h2 className="single-page__title">{collection.title}</h2>
      </div>
      <div className="single-page__content">
        <p className="single-page__text">{collection.description}</p>
      </div>
      <button onClick={() => navigate("/explore")} className="btn">
        Back
      </button>
    </div>
  );
}

export default SingleCollection;
