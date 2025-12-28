import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#58f591ff", "#ffe371ff", "#f77575ff"];

const DashboardCharts = () => {
  const tasks = useSelector(state => state.tasks.tasks);
  const [openChart, setOpenChart] = useState(null);

  const pending = tasks.filter(t => t.status === "Pending").length;
  const inProgress = tasks.filter(t => t.status === "In Progress").length;
  const completed = tasks.filter(t => t.status === "Completed").length;

  const total = tasks.length || 1;
  const completedPercent = Math.round((completed / total) * 100);

  const statusData = [
    { name: "Pending", value: pending },
    { name: "In Progress", value: inProgress },
    { name: "Completed", value: completed }
  ];

  const priorityData = [
    { name: "Low", value: tasks.filter(t => t.priority === "Low").length },
    { name: "Medium", value: tasks.filter(t => t.priority === "Medium").length },
    { name: "High", value: tasks.filter(t => t.priority === "High").length }
  ];

  return (
    <>
      {/* CARDS */}
      <div className="grid md:grid-cols-4 gap-6 mt-6">
        {[
          { label: "Pending", value: pending, color: "bg-yellow-100" },
          { label: "In Progress", value: inProgress, color: "bg-blue-100" },
          { label: "Completed", value: completed, color: "bg-green-100" },
          { label: "Completion", value: `${completedPercent}%`, color: "bg-purple-100" }
        ].map((c, i) => (
          <div key={i} className={`p-5 rounded-xl shadow ${c.color}`}>
            <p className="text-sm font-medium">{c.label}</p>
            <h2 className="text-3xl font-bold">{c.value}</h2>
          </div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">

        {/* DONUT */}
        <div
          onClick={() => setOpenChart("priority")}
          className="bg-white p-5 rounded-xl shadow cursor-pointer hover:scale-105 transition"  >
          <h3 className="font-bold mb-3">Priority</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={priorityData}
                dataKey="value"
                innerRadius={60}
                outerRadius={90}
                label >
                {priorityData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* BAR */}
        <div
          onClick={() => setOpenChart("status")}
          className="bg-white p-5 rounded-xl shadow cursor-pointer hover:scale-105 transition" >
          <h3 className="font-bold mb-3">Status</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={statusData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#ee5e95ff" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PROGRESS */}
        <div
          
          className="bg-white p-5 rounded-xl shadow cursor-pointer"
        >
          <h3 className="font-bold mb-4">Completed %</h3>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-green-500 h-4 transition-all duration-700"
              style={{ width: `${completedPercent}%` }}
            ></div>
          </div>
          <p className="mt-2 font-bold">{completedPercent}%</p>
        </div>
      </div>

      {/* MODAL */}
      {openChart && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-2xl">
            <button
              className="float-right text-red-500 font-bold"
              onClick={() => setOpenChart(null)}
            >
              ✕
            </button>

            <div className="mt-8 h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                {openChart === "priority" ? (
                  <PieChart>
                    <Pie data={priorityData} dataKey="value" outerRadius={150} label>
                      {priorityData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                ) : openChart === "status" ? (
                  <BarChart data={statusData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#ee5e95ff" />
                  </BarChart>
                ) : (
                  <div className="flex items-center justify-center h-full text-4xl font-bold">
                    {completedPercent}%
                  </div>
                )}
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardCharts;
