// src/services/api.js
import axios from "axios";

export const fetchDashboardStats = () =>
  axios.get("http://localhost:3001/dashboard");
export const fetchAlerts = () => axios.get("http://localhost:3001/alerts");
