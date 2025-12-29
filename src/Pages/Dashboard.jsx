import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MotivationQuote from "../components/MotiationQuote";
import DashboardCharts from "../components/DashboardCharts";

const Dashboard = () => {
  return (
    <div>
      <MotivationQuote/>
      <DashboardCharts/>
    </div>
  );
};

export default Dashboard;
