/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";
import getUsers, {
  getArtifacts,
  getCollections,
  getEmpires,
  getFigures,
  getTimelines,
} from "../services";
import { NewtonsCradle } from "ldrs/react";
import "ldrs/react/NewtonsCradle.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

function Dashboard() {
  // ReactQuery Get users
  const {
    data: usersData,
    isLoading: usersIsLoading,
    error: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  // Queries
  const {
    data: artifactsData,
    isLoading: artifactsIsLoading,
    error: artifactsError,
  } = useQuery({
    queryKey: ["artifacts"],
    queryFn: getArtifacts,
  });

  const {
    data: collectionsData,
    isLoading: collectionsIsLoading,
    error: collectionsError,
  } = useQuery({
    queryKey: ["collections"],
    queryFn: getCollections,
  });

  const {
    data: timelinesData,
    isLoading: timelinesIsLoading,
    error: timelinesError,
  } = useQuery({
    queryKey: ["timelines"],
    queryFn: getTimelines,
  });

  const {
    data: empiresData,
    isLoading: empiresIsLoading,
    error: empiresError,
  } = useQuery({
    queryKey: ["empires"],
    queryFn: getEmpires,
  });

  const {
    data: figuresData,
    isLoading: figuresIsLoading,
    error: figuresError,
  } = useQuery({
    queryKey: ["figures"],
    queryFn: getFigures,
  });

  // Loading & error
  if (
    artifactsIsLoading ||
    collectionsIsLoading ||
    timelinesIsLoading ||
    figuresIsLoading ||
    empiresIsLoading ||
    usersIsLoading
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
    figuresError ||
    usersError
  )
    return <p>Error loading data.</p>;

  // Bar chart: overview counts
  const overviewData = {
    labels: ["Artifacts", "Collections", "Empires", "Figures", "Timelines"],
    datasets: [
      {
        label: "Total Count",
        data: [
          artifactsData?.length || 0,
          collectionsData?.length || 0,
          empiresData?.length || 0,
          figuresData?.length || 0,
          timelinesData?.length || 0,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
      },
    ],
  };

  // Users chart
  const roles = [...new Set(usersData.map((u) => u.role))]; // sve unikatne role
  const usersByRole = roles.map(
    (role) => usersData.filter((u) => u.role === role).length
  );

  const usersRoleData = {
    labels: roles,
    datasets: [
      {
        label: "Users per Role",
        data: usersByRole,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
      },
    ],
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ marginBottom: "2rem" }}>📊 Statistics</h2>

      {/* Bar chart */}
      <div style={{ width: "100%", marginBottom: "3rem" }}>
        <Bar
          data={overviewData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "top" },
              title: { display: true, text: "Ancient History Statistics" },
            },
          }}
        />
      </div>

      {/* Users by role */}
      <div style={{ maxWidth: "500px", margin: "3rem auto" }}>
        <Pie
          data={usersRoleData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "bottom" },
              title: { display: true, text: "Users role statistics" },
            },
          }}
        />
      </div>
    </div>
  );
}

export default Dashboard;
