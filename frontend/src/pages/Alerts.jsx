import React, { useEffect, useState } from "react";
import axios from "axios";
import AlertCard from "./AlertCard";
import "./../styles/alerts.css";

const Alerts = () => {
  const [groupedAlerts, setGroupedAlerts] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3001/alerts")
      .then((res) => {
        const grouped = res.data.reduce((acc, alert) => {
          const date = new Date(alert.timestamp).toDateString();
          if (!acc[date]) acc[date] = [];
          acc[date].push(alert);
          return acc;
        }, {});
        setGroupedAlerts(grouped);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="alerts-page">
      <h1 className="page-title">Damage Alerts</h1>
      {Object.entries(groupedAlerts).map(([date, alerts]) => (
        <div key={date} className="alert-group">
          <h2 className="group-date">{date}</h2>
          {alerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Alerts;
