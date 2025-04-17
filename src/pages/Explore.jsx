/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  getArtifacts,
  getCollections,
  getEmpires,
  getFigures,
  getTimelines,
} from "../services";
import { useEffect, useState } from "react";

function Explore() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

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

  // Tabs changing
  function handleTab(e) {
    const tabName = e.target.textContent;
    setActiveTab(tabName.toLowerCase());
  }

  // Scroll to ID section
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

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
        <button
          onClick={(e) => handleTab(e)}
          className={`filter-btn ${activeTab === "all" ? "active" : ""}`}
        >
          All
        </button>
        <button
          onClick={(e) => handleTab(e)}
          className={`filter-btn ${activeTab === "empires" ? "active" : ""}`}
        >
          Empires
        </button>
        <button
          onClick={(e) => handleTab(e)}
          className={`filter-btn ${activeTab === "figures" ? "active" : ""}`}
        >
          Figures
        </button>
        <button
          onClick={(e) => handleTab(e)}
          className={`filter-btn ${activeTab === "artifacts" ? "active" : ""}`}
        >
          Artifacts
        </button>
        <button
          onClick={(e) => handleTab(e)}
          className={`filter-btn ${activeTab === "timelines" ? "active" : ""}`}
        >
          Timelines
        </button>
        <button
          onClick={(e) => handleTab(e)}
          className={`filter-btn ${
            activeTab === "collections" ? "active" : ""
          }`}
        >
          Collections
        </button>
      </div>

      {(activeTab === "artifacts" || activeTab === "all") && (
        <div id="artifacts">
          <h2>Artifacts</h2>
          <div className="explore__grid">
            {artifactsData.map((artifact) => (
              <div key={artifact.id} className="explore__card">
                <h3>{artifact.title}</h3>
                <p>{artifact.description}</p>
                <NavLink to={`/explore/artifact/${artifact.id}`}>
                  <button className="btn">Learn more</button>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      )}

      {(activeTab === "collections" || activeTab === "all") && (
        <div id="collections">
          <h2>Collections</h2>
          <div className="explore__grid">
            {collectionsData.map((collection) => (
              <div key={collection.id} className="explore__card">
                <h3>{collection.title}</h3>
                <p>{collection.description}</p>
                <NavLink to={`/explore/collections/${collection.id}`}>
                  <button className="btn">Learn more</button>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      )}

      {(activeTab === "timelines" || activeTab === "all") && (
        <div id="timelines">
          <h2>Timelines</h2>
          <div className="explore__grid">
            {timelinesData.map((timeline) => (
              <div key={timeline.id} className="explore__card">
                <h3>{timeline.title}</h3>
                <NavLink to={`/explore/timelines/${timeline.id}`}>
                  <button className="btn">Learn more</button>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      )}

      {(activeTab === "empires" || activeTab === "all") && (
        <div id="empires">
          <h2>Empires</h2>
          <div className="explore__grid">
            {empiresData.map((empire) => (
              <div key={empire.id} className="explore__card">
                <h3>{empire.title}</h3>
                <p>{empire.description}</p>
                <NavLink to={`/explore/empires/${empire.id}`}>
                  <button className="btn">Learn more</button>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      )}

      {(activeTab === "figures" || activeTab === "all") && (
        <div id="figures">
          <h2>Figures</h2>
          <div className="explore__grid">
            {figuresData.map((figure) => (
              <div key={figure.id} className="explore__card">
                <h3>{figure.name}</h3>
                <p>{figure.region}</p>
                <NavLink to={`/explore/figures/${figure.id}`}>
                  <button className="btn">Learn more</button>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Outlet se koristi samo ako se u APP.jsx nestuje ruta */}
      <div>
        <Outlet />
      </div>

      <button onClick={testHTTPdata}>TEST HTTP DATA</button>
    </section>
  );
}

export default Explore;
