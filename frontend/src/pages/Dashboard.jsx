import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import AlertList from "../components/AlertList";
import { fetchDashboardStats, fetchAlerts } from "../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalScanned: 0,
    damagedCount: 0,
    stockCount: 0,
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
        />
        <Card
          title="Damaged Items"
          value={stats.damagedCount}
          color="#dc2626"
        />
        <Card title="Current Stock" value={stats.stockCount} color="#16a34a" />
      </div>

      <div className="dashboard-section">
        <h2>Recent Damage Alerts</h2>
        <AlertList alerts={alerts} />
      </div>
    </div>
  );
};

const Card = ({ title, value, color }) => (
  <div className="stat-card" style={{ borderTop: `4px solid ${color}` }}>
    <h3>{title}</h3>
    <p>{value}</p>
  </div>
);

export default Dashboard;
