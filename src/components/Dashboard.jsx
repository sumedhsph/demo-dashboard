import React from "react";
import "./Dashboard.scss";
import PopulationBarchart from "./recharts/PopulationBarchart";
import PopulationLineChart from "./recharts/PopulationLineChart";
import SocialMediaBarChart from "./recharts/SocialMediaBarChart";

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <PopulationBarchart />
      <PopulationLineChart />
      <SocialMediaBarChart />
    </div>
  );
}

export default Dashboard;
