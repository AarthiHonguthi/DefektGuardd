import React from "react";
import "./DetailCard.css";

const DetailCard = ({ alert }) => {
  const { id, productName, sku, image, shippedFrom, confidence, timestamp } =
    alert;

  const time = new Date(timestamp).toLocaleTimeString();
  const date = new Date(timestamp).toDateString();

  return (
    <div className="alert-card">
      <img src={image} alt={productName} className="alert-image" />

      <div className="alert-details">
        <div className="alert-row">
          <span className="alert-id">ID: {id}</span>
          <span className="alert-time">{time}</span>
        </div>

        <div className="alert-product">Product: {productName}</div>
        <div className="alert-sku">SKU: {sku}</div>
        <div className="alert-ship">Shipped From: {shippedFrom}</div>
        <div className="alert-confidence">Confidence: {confidence}%</div>
        
      </div>
    </div>
  );
};

export default DetailCard;
