import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { FaCamera, FaUpload } from "react-icons/fa";
import { MdCheckCircle, MdError } from "react-icons/md";
import "./ScanPage.css";

const Scan = () => {
  const webcamRef = useRef(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const handleStartCamera = () => {
    setCameraOn(true); // Turn on the camera
  };

  const handleCapture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log("Captured image:", imageSrc);
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  return (
    <div className="scanner-container">
      <h1>Webcam QR code scanner</h1>
      <p>Click "Open camera" &amp; point the QR toward it</p>

      <div className="scanner-panels">
        {/* Webcam Panel */}
        <div className="panel webcam-panel">
          <div className="panel-header webcam-header">
            <i className="icon"></i> Webcam
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
               Capture
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
            <i className="icon"></i> Upload an Image
          </div>
          <div className="upload-box">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input"
            />
            {imageFile && (
              <p className="file-name">Selected: {imageFile.name}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scan;
