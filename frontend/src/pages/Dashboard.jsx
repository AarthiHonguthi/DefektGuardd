import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import AlertList from "../components/AlertList";
import DonutChart from "../components/DonutChart";
import DamagedLineChart from "../components/DamagedLineChart";
import { fetchDashboardStats, fetchAlerts } from "../services/api";

const chartData = [
  {
    data: [5, 8, 6, 10, 7, 12, 4],
    color: "#dc2626", // 🔴 Damaged
    label: "Damaged Items",
  },
  {
    data: [95, 92, 94, 90, 93, 88, 96],
    color: "#16a34a", // 🟢 Intact
    label: "Intact Items",
  },
];

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalScanned: 287,
    damagedCount: 40,
  });

  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const statsRes = await fetchDashboardStats();
        const alertsRes = await fetchAlerts();
        setStats(statsRes.data);
        setAlerts(alertsRes.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);

        // Optional: fallback to local db.json if needed
        try {
          const fallback = await fetch("/db.json");
          const data = await fallback.json();
          setAlerts(data.alerts || []);
        } catch (e) {
          console.error("Failed to load local db.json as fallback", e);
        }
      }
    };

    loadDashboard();
  }, []);

  return (
    <div className="dashboard-header-banner">
      <div className="dashboard-header">
        <h1>Inventory Overview</h1>
        <p>Monitor scanning activity, damage reports, and stock levels</p>
      </div>

      <div className="dashboard-cards">
        <Card
          title="Total Scanned Today"
          value={stats.totalScanned}
          color="#2563eb"
          chart={
            <DonutChart
              damaged={stats.damagedCount}
              intact={stats.totalScanned - stats.damagedCount}
            />
          }
        />
        <Card
          title="Damaged Items"
          value={stats.damagedCount}
          color="#dc2626"
          chart={
            <DamagedLineChart
              displayData={chartData[0].data}
              color={chartData[0].color}
              label={chartData[0].label}
            />
          }
        />
        <Card
          title="Intact Items"
          value={stats.totalScanned - stats.damagedCount}
          color="#16a34a"
          chart={
            <DamagedLineChart
              displayData={chartData[1].data}
              color={chartData[1].color}
              label={chartData[1].label}
            />
          }
        />
      </div>

      <div className="dashboard-section">
        <h2>Recent Damage Alerts</h2>
        <AlertList alerts={alerts} />
      </div>
    </div>
  );
};

// Card component with optional chart support
const Card = ({ title, value, color, chart }) => (
  <div className="stat-card" style={{ borderTop: `4px solid ${color}` }}>
    <h3>{title}</h3>
    <p>{value}</p>
    {chart && <div className="card-chart">{chart}</div>}
  </div>
);

export default Dashboard;
