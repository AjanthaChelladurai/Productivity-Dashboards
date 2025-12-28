import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MotivationQuote from "../components/MotiationQuote";
import DashboardCharts from "../components/DashboardCharts";

const Dashboard = () => {
  return (
    <div>
     {/*  <Sidebar />
      <Header />
      <main className="pt-16 md:ml-60 p-6">
        <MotivationQuote/>
       
      </main> */}
      <MotivationQuote/>
      <DashboardCharts/>
    </div>
  );
};

export default Dashboard;
