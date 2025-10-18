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
import Tabs from "../components/Tabs";
import { NewtonsCradle } from "ldrs/react";
import "ldrs/react/NewtonsCradle.css";

function Explore() {
  const [activeTab, setActiveTab] = useState("all");

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
    return (
      <div className="loading-wrapper">
        <NewtonsCradle size="100" speed="1" color="#8b7355" />
      </div>
    );
  if (
    artifactsError ||
    collectionsError ||
    timelinesError ||
    empiresError ||
    figuresError
  )
    return <p>Error loading data.</p>;

  // Create artifacts array with approved status only
  const approvedArtifactsData = artifactsData.filter(
    (artifact) => artifact.status === "approved"
  );

  // Create collections array with approved status only
  const approvedCollectionsData = collectionsData.filter(
    (collection) => collection.status === "approved"
  );

  // Create timelines array with approved status only
  const approvedTimelinesData = timelinesData.filter(
    (timeline) => timeline.status === "approved"
  );

  // Create empires array with approved status only
  const approvedEmpiresData = empiresData.filter(
    (empire) => empire.status === "approved"
  );

  // Create figures array with approved status only
  const approvedFiguresData = figuresData.filter(
    (figure) => figure.status === "approved"
  );
  return (
    <section className="explore">
      <div className="explore__header">
        <h1>Explore the Archive</h1>
        <p>
          Browse through ancient empires, significant historical figures,
          timeless artifacts, and detailed timelines.
        </p>
      </div>
      <Tabs setActiveTab={setActiveTab} activeTab={activeTab} />

      {(activeTab === "artifacts" || activeTab === "all") && (
        <div id="artifacts">
          <h2>Artifacts</h2>
          <div className="explore__grid">
            {approvedArtifactsData.map((artifact) => (
              <div key={artifact.id} className="explore__card">
                <h3>{artifact.title}</h3>
                <p>{artifact.description}</p>
                <NavLink to={`/explore/artifact/${artifact.id}`}>
                  <button className="btn">Learn more</button>
                </NavLink>
                <p>
                  Status:{" "}
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
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {(activeTab === "collections" || activeTab === "all") && (
        <div id="collections">
          <h2>Collections</h2>
          <div className="explore__grid">
            {approvedCollectionsData.map((collection) => (
              <div key={collection.id} className="explore__card">
                <h3>{collection.title}</h3>
                <p>{collection.description}</p>
                <NavLink to={`/explore/collections/${collection.id}`}>
                  <button className="btn">Learn more</button>
                </NavLink>
                <p>
                  Status:{" "}
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
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {(activeTab === "timelines" || activeTab === "all") && (
        <div id="timelines">
          <h2>Timelines</h2>
          <div className="explore__grid">
            {approvedTimelinesData.map((timeline) => (
              <div key={timeline.id} className="explore__card">
                <h3>{timeline.title}</h3>
                <NavLink to={`/explore/timelines/${timeline.id}`}>
                  <button className="btn">Learn more</button>
                </NavLink>
                <p>
                  Status:{" "}
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
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {(activeTab === "empires" || activeTab === "all") && (
        <div id="empires">
          <h2>Empires</h2>
          <div className="explore__grid">
            {approvedEmpiresData.map((empire) => (
              <div key={empire.id} className="explore__card">
                <h3>{empire.name}</h3>

                <p>{empire.description}</p>
                <NavLink to={`/explore/empires/${empire.id}`}>
                  <button className="btn">Learn more</button>
                </NavLink>
                <p>
                  Status:{" "}
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
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {(activeTab === "figures" || activeTab === "all") && (
        <div id="figures">
          <h2>Figures</h2>
          <div className="explore__grid">
            {approvedFiguresData.map((figure) => (
              <div key={figure.id} className="explore__card">
                <h3>{figure.name}</h3>
                <p>{figure.region}</p>
                <NavLink to={`/explore/figures/${figure.id}`}>
                  <button className="btn">Learn more</button>
                </NavLink>
                <p>
                  Status:{" "}
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
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Outlet se koristi samo ako se u APP.jsx nestuje ruta */}
      <div>
        <Outlet />
      </div>
    </section>
  );
}

export default Explore;
