/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getTimelines } from "../../services";

function SingleTimelines() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Get timelines
  const {
    data: timelinesData,
    isLoading: timelinesIsLoading,
    error: timelinesError,
  } = useQuery({
    queryKey: ["timelines"],
    queryFn: getTimelines,
  });

  // HTTP loading and error
  if (timelinesIsLoading) return <p>Loading...</p>;
  if (timelinesError) return <p>Error loading data.</p>;

  const timeline = timelinesData.find((timeline) => timeline.id === id);

  return (
    <div className="single-page">
      <div className="single-page__header">
        <h2 className="single-page__title">{timeline.title}</h2>
      </div>
      <div className="single-page__content">
        <p className="single-page__text">
          {timeline.events.map((event) => (
            <div>
              Year: {event.year} {event.title}
            </div>
          ))}
        </p>
        <p className="single-page__text">
          <strong>Discovered:</strong> {timeline.createdBy}
        </p>
      </div>
      <button onClick={() => navigate("/explore")} className="btn">
        Back
      </button>
    </div>
  );
}

export default SingleTimelines;
