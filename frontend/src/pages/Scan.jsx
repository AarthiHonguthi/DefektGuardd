import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { FaCamera, FaUpload } from "react-icons/fa";
import "./ScanPage.css";

const Scan = () => {
  const webcamRef = useRef(null);
  const fileInputRef = useRef(null); // new

  const [cameraOn, setCameraOn] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [loading, setLoading] = useState(false);

  const backendURL = `${process.env.REACT_APP_BACKEND_URL}/predict`;

  const sendToBackend = (file) => {
    console.log("Sending...");
    console.log("Backend URL:", process.env.REACT_APP_BACKEND_URL);

    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);
    setPrediction(null);
    setConfidence(null);

    fetch(backendURL, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.label) {
          setPrediction(data.label);
          setConfidence(data.confidence);
        }
      })
      .catch(() => alert("Failed to predict"))
      .finally(() => {
        setLoading(false);
        setImageFile(null); // clear the selected file
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // reset file input
        }
      });
  };

  const handleStartCamera = () => {
    setCameraOn(true);
  };

  const handleCapture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      fetch(imageSrc)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "webcam.jpg", { type: "image/jpeg" });
          sendToBackend(file);
        });
    }
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      sendToBackend(file);
    }
  };

  return (
    <div className="scanner-container">
      <h1>Package Scanner</h1>
      <p>
        Scan a package via webcam or upload an image to check its condition.
      </p>

      <div className="scanner-panels">
        {/* Webcam Panel */}
        <div className="panel webcam-panel">
          <div className="panel-header webcam-header">
            <FaCamera className="icon" /> Webcam
          </div>

          <div className="camera-box">
            {cameraOn ? (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="webcam-feed"
              />
            ) : (
              <span className="camera-note">
                ⚠ Make sure to allow camera access!
              </span>
            )}
          </div>

          {cameraOn ? (
            <button className="open-camera-btn" onClick={handleCapture}>
              Capture & Predict
            </button>
          ) : (
            <button className="open-camera-btn" onClick={handleStartCamera}>
              Open Camera
            </button>
          )}
        </div>

        {/* Upload Image Panel */}
        <div className="panel scanned-panel">
          <div className="panel-header scanned-header">
            <FaUpload className="icon" /> Upload Image
          </div>
          <div className="upload-box">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input"
              ref={fileInputRef} // attach ref
            />
            {imageFile && (
              <p className="file-name">Selected: {imageFile.name}</p>
            )}
          </div>
        </div>
      </div>

      <div className="result-section">
        {loading && <p>🔍 Analyzing image...</p>}
        {prediction && (
          <p className={`prediction-text ${prediction}`}>
            Prediction: <strong>{prediction}</strong>
            <br />
            Confidence: {(confidence * 100).toFixed(2)}%
          </p>
        )}
      </div>
    </div>
  );
};

export default Scan;
