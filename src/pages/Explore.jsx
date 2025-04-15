/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  getArtifacts,
  getCollections,
  getEmpires,
  getFigures,
  getTimelines,
} from "../services";

function Explore() {
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

  function testHTTPdata() {
    console.log("artifacts", artifactsData);
    console.log("collections", collectionsData);
    console.log("timelines", timelinesData);
    console.log("empires", empiresData);
    console.log("figures", figuresData);
  }

  // HTTP loading and error
  if (
    artifactsIsLoading ||
    collectionsIsLoading ||
    timelinesIsLoading ||
    figuresIsLoading ||
    empiresIsLoading
  )
    return <p>Loading...</p>;
  if (
    artifactsError ||
    collectionsError ||
    timelinesError ||
    empiresError ||
    figuresError
  )
    return <p>Error loading data.</p>;
  return (
    <section className="explore">
      <div className="explore__header">
        <h1>Explore the Archive</h1>
        <p>
          Browse through ancient empires, significant historical figures,
          timeless artifacts, and detailed timelines.
        </p>
      </div>

      <div className="explore__filters">
        <button className="filter-btn active">All</button>
        <button className="filter-btn">Empires</button>
        <button className="filter-btn">Figures</button>
        <button className="filter-btn">Artifacts</button>
        <button className="filter-btn">Timelines</button>
        <button className="filter-btn">Collections</button>
      </div>

      <h2>Artifacts</h2>
      <div className="explore__grid">
        {artifactsData.map((artifact) => (
          <div key={artifact.id} className="explore__card">
            <h3>{artifact.title}</h3>
            <p>{artifact.description}</p>
            <button className="btn">Learn more</button>
          </div>
        ))}
      </div>

      <h2>Collections</h2>
      <div className="explore__grid">
        {collectionsData.map((collection) => (
          <div key={collection.id} className="explore__card">
            <h3>{collection.title}</h3>
            <p>{collection.description}</p>
            <button className="btn">Learn more</button>
          </div>
        ))}
      </div>

      <h2>Timelines</h2>
      <div className="explore__grid">
        {timelinesData.map((timeline) => (
          <div key={timeline.id} className="explore__card">
            <h3>{timeline.title}</h3>
            <button className="btn">Learn more</button>
          </div>
        ))}
      </div>

      <h2>Empires</h2>
      <div className="explore__grid">
        {empiresData.map((empire) => (
          <div key={empire.id} className="explore__card">
            <h3>{empire.title}</h3>
            <p>{empire.description}</p>

            <button className="btn">Learn more</button>
          </div>
        ))}
      </div>

      <h2>Figures</h2>
      <div className="explore__grid">
        {figuresData.map((figure) => (
          <div key={figure.id} className="explore__card">
            <h3>{figure.name}</h3>
            <p>{figure.region}</p>

            <button className="btn">Learn more</button>
          </div>
        ))}
      </div>

      <button onClick={testHTTPdata}>TEST HTTP DATA</button>
    </section>
  );
}

export default Explore;
