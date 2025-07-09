import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Scan from "./pages/Scan";
import Inventory from "./pages/Inventory";
import Alerts from "./pages/Alerts";
import Layout from "./components/Layout";


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/alerts" element={<Alerts />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
