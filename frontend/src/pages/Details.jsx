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
  const [conditionFilter, setConditionFilter] = useState("all");
  const [warehouseFilter, setWarehouseFilter] = useState("all");
  const [confidenceFilter, setConfidenceFilter] = useState("all");

  useEffect(() => {
    const sampleData = [
      {
        id: 1,
        productName: "Wireless Mouse",
        sku: "MOU123",
        damage: "intact",
        confidence: 98,
        shippedFrom: "Warehouse A",
        image: "/sample1.jpg",
      },
      {
        id: 2,
        productName: "Mechanical Keyboard",
        sku: "KEY456",
        damage: "damaged",
        confidence: 72,
        shippedFrom: "Warehouse B",
        image: "/sample2.jpg",
      },
      {
        id: 3,
        productName: "HD Monitor",
        sku: "MON789",
        damage: "intact",
        confidence: 100,
        shippedFrom: "Warehouse C",
        image: null,
      },
      {
        id: 4,
        productName: "USB Webcam",
        sku: "WEB999",
        damage: "damaged",
        confidence: 65,
        shippedFrom: "Warehouse D",
        image: "/sample3.jpg",
      },
      {
        id: 5,
        productName: "Bluetooth Speaker",
        sku: "SPK321",
        damage: "intact",
        confidence: 87,
        shippedFrom: "Warehouse A",
        image: null,
      },
      {
        id: 6,
        productName: "External Hard Drive",
        sku: "HDD654",
        damage: "damaged",
        confidence: 59,
        shippedFrom: "Warehouse B",
        image: "/sample4.jpg",
      },
      {
        id: 7,
        productName: "Gaming Headset",
        sku: "HED147",
        damage: "intact",
        confidence: 90,
        shippedFrom: "Warehouse C",
        image: null,
      },
      {
        id: 8,
        productName: "Laptop Stand",
        sku: "LST258",
        damage: "damaged",
        confidence: 74,
        shippedFrom: "Warehouse D",
        image: "/sample5.jpg",
      },
      {
        id: 9,
        productName: "Ethernet Cable",
        sku: "ETH369",
        damage: "intact",
        confidence: 92,
        shippedFrom: "Warehouse A",
        image: null,
      },
      {
        id: 10,
        productName: "Wireless Charger",
        sku: "CHG987",
        damage: "damaged",
        confidence: 68,
        shippedFrom: "Warehouse B",
        image: "/sample6.jpg",
      },
    ];

    setDetails(sampleData);
  }, []);

  const filteredDetails = details
    .filter((detail) =>
      detail.productName?.toLowerCase().includes(search.toLowerCase())
    )
    .filter((detail) =>
      conditionFilter === "all"
        ? true
        : detail.damage?.toLowerCase() === conditionFilter
    )
    .filter((detail) =>
      warehouseFilter === "all" ? true : detail.shippedFrom === warehouseFilter
    )
    .filter((detail) => {
      if (confidenceFilter === "all") return true;
      const [min, max] = confidenceFilter.split("-").map(Number);
      return detail.confidence >= min && detail.confidence < max;
    });

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
        <button disabled className="btn btn-green">
          Filters
        </button>
        <div className="filters">
          <div className="filter-group">
            <label htmlFor="confidence">Confidence:</label>
            <select
              id="confidence"
              className="styled-select"
              value={confidenceFilter}
              onChange={(e) => setConfidenceFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="0-10">0 - 10%</option>
              <option value="10-20">10 - 20%</option>
              <option value="20-30">20 - 30%</option>
              <option value="30-40">30 - 40%</option>
              <option value="40-50">40 - 50%</option>
              <option value="50-60">50 - 60%</option>
              <option value="60-70">60 - 70%</option>
              <option value="70-80">70 - 80%</option>
              <option value="80-90">80 - 90%</option>
              <option value="90-101">90 - 100%</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="condition">Condition:</label>
            <select
              id="condition"
              className="styled-select"
              value={conditionFilter}
              onChange={(e) => setConditionFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="intact">Intact</option>
              <option value="damaged">Damaged</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="warehouse">Warehouse:</label>
            <select
              id="warehouse"
              className="styled-select"
              value={warehouseFilter}
              onChange={(e) => setWarehouseFilter(e.target.value)}
            >
              <option value="all">All</option>
              {Array.from(new Set(details.map((d) => d.shippedFrom))).map(
                (loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
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
