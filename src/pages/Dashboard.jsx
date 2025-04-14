import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <div>Dashboard</div>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default Dashboard;
