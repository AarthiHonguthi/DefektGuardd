import React, { useEffect, useState } from "react";
import axios from "axios";
// ...imports
import "./../styles/details.css";
import DetailModal from "../components/DetailModal";

const Details = () => {
  const [details, setDetails] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [detailsPerPage, setDetailsPerPage] = useState(10);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/details")
      .then((res) => setDetails(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredDetails = details.filter((detail) =>
    detail.productName?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDetails.length / detailsPerPage);
  const indexOfLast = currentPage * detailsPerPage;
  const indexOfFirst = indexOfLast - detailsPerPage;
  const currentDetails = filteredDetails.slice(indexOfFirst, indexOfLast);

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const handleChangePerPage = (e) => {
    setDetailsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const getConfidenceClass = (confidence, damage) => {
    const isIntact = damage?.toLowerCase() === "intact";
    if (isIntact) {
      if (confidence === 100) return "conf-green-100";
      if (confidence >= 90) return "conf-green-90";
      if (confidence >= 80) return "conf-green-80";
      if (confidence >= 70) return "conf-green-70";
      if (confidence >= 60) return "conf-green-60";
      return "conf-green-50";
    } else {
      if (confidence >= 90) return "conf-red-90";
      if (confidence >= 80) return "conf-red-80";
      if (confidence >= 70) return "conf-red-70";
      if (confidence >= 60) return "conf-red-60";
      return "conf-red-50";
    }
  };

  return (
    <div className="details-wrapper">
      <div className="top-bar">
        <h1 className="page-title">Scan History</h1>
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-green">Add new product</button>
        <button className="btn btn-outline-green">Export as CSV</button>
      </div>

      <table className="detail-table">
        <thead>
          <tr>
            <th>ProductID</th>
            <th>ProductName</th>
            <th>SKU</th>
            <th>Condition</th>
            <th>Confidence</th>
            <th>Location</th>
            <th>Image Preview</th>
          </tr>
        </thead>
        <tbody>
          {currentDetails.map((item, idx) => (
            <tr key={idx}>
              <td>{item.id}</td>
              <td>{item.productName || "-"}</td>
              <td>{item.sku || "-"}</td>
              <td>
                <span
                  className={`badge ${
                    item.damage?.toLowerCase() === "intact"
                      ? "badge-green"
                      : "badge-red"
                  }`}
                >
                  {item.damage?.toUpperCase() || "UNKNOWN"}
                </span>
              </td>
              <td>
                <span
                  className={`badge ${getConfidenceClass(
                    item.confidence,
                    item.damage
                  )}`}
                >
                  {item.confidence}%
                </span>
              </td>
              <td>{item.shippedFrom || "-"}</td>
              <td
                style={{
                  width: "100px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {item.image ? (
                  <button
                    onClick={() => setModalImage(item.image)}
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src="/view_icon.png"
                      alt="View"
                      style={{
                        width: "24px",
                        height: "24px",
                      }}
                    />
                  </button>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-controls">
        <div className="per-page">
          <label>
            &nbsp;
            <select value={detailsPerPage} onChange={handleChangePerPage}>
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={30}>30 per page</option>
              <option value={50}>50 per page</option>
            </select>
          </label>
        </div>
        <div className="page-nav">
          <button onClick={handlePrev} disabled={currentPage === 1}>
            ‹
          </button>
          <span>
            {indexOfFirst + 1} - {Math.min(indexOfLast, filteredDetails.length)}{" "}
            of {filteredDetails.length}
          </span>
          <button onClick={handleNext} disabled={currentPage === totalPages}>
            ›
          </button>
        </div>
      </div>

      {modalImage && (
        <DetailModal image={modalImage} onClose={() => setModalImage(null)} />
      )}
    </div>
  );
};

export default Details;
