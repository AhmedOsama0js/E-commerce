import { Outlet } from "react-router-dom";
import "./Dashboard.css";
import Header from "./Components/Header/DashboardHeader/Header";
import Sidebar from "./Components/Sidebar/Sidebar";

function Dashboard() {
  return (
    <div className="App">
      <Sidebar />
      <div className="body">
        <Header />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
