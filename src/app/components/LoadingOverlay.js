"use client";
import { useEffect } from "react";

import "./LoadingOverlay.css";

const LoadingOverlay = () => {
  const loading = false;

  return (
    <>
      {loading && (
        <div className="loading-overlay">
          {/* Animated gradient background */}
          <div className="overlay-gradient"></div>

          {/* Floating particles */}
          <div className="particles">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="particle"
                style={{ "--delay": `${i * 0.1}s` }}
              ></div>
            ))}
          </div>

          {/* Loading indicator */}
          <div className="loading-container">
            <div className="loading-spinner">
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
            </div>
            <p className="loading-text">Loading</p>
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoadingOverlay;
