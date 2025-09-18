/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { NavLink, useNavigate } from "react-router-dom";
import { getArtifacts, getCollections, getTimelines } from "../services";

function Home() {
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

  function goToExplore() {
    navigate("/explore");
  }

  // HTTP loading and error
  if (artifactsIsLoading || collectionsIsLoading || timelinesIsLoading)
    return <p>Loading...</p>;
  if (artifactsError || collectionsError || timelinesError)
    return <p>Error loading data.</p>;

  // Limiting array to only two members
  const artifactsList = Object.values(artifactsData).slice(0, 2);
  const collectionsList = Object.values(collectionsData).slice(0, 2);
  const timelinesList = Object.values(timelinesData).slice(0, 2);

  return (
    <div>
      <section className="home">
        <div className="intro">
          <h1>Welcome to Ancient History</h1>
          <p>
            Step into the world of forgotten empires, legendary figures, and
            timeless artifacts that shaped the course of human civilization. Our
            digital archive is dedicated to preserving and presenting the most
            captivating moments, individuals, and creations from the ancient
            world — from mighty empires that ruled continents, to humble relics
            that reveal the lives of everyday people across the ages. This is
            more than just a collection of data — it's an immersive experience
            designed to spark curiosity, foster learning, and connect you with
            the stories of the past. Each artifact, figure, timeline, and
            collection has been thoughtfully curated to offer a rich and
            engaging journey through time.
          </p>
          <button onClick={goToExplore} className="btn btn--cta">
            Explore Now
          </button>
        </div>

        <div className="featured">
          <h2>Featured Artifacts</h2>
          <div className="cards">
            {artifactsList.map((artifact) => (
              <article key={artifact.id} className="card">
                <h3>{artifact.title}</h3>
                <p>{artifact.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="featured">
          <h2>Featured Colections</h2>
          <div className="cards">
            {collectionsList.map((collection) => (
              <article key={collection.id} className="card">
                <h3>{collection.title}</h3>
                <p>{collection.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="featured">
          <h2>Featured Timelines</h2>
          <div className="cards">
            {timelinesList.map((timeline) => (
              <article key={timeline.id} className="card">
                <h3>{timeline.title}</h3>
                <div>
                  {timeline.events.map((el) => (
                    <div key={el.year}>
                      <div>
                        <span
                          style={{ width: "100px", display: "inline-block" }}
                        >
                          Year: {el.year}
                          {el.year < 0 ? "BC" : "AC"}
                        </span>
                        <span>Event: {el.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="categories">
          <h2>Browse Categories</h2>
          <div className="category-links">
            <NavLink to="/explore#empires" className="cat">
              Empires
            </NavLink>
            <NavLink to="/explore#figures" className="cat">
              Figures
            </NavLink>
            <NavLink to="/explore#artifacts" className="cat">
              Artifacts
            </NavLink>
            <NavLink to="/explore#timelines" className="cat">
              Timelines
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
