import axios from "axios";
import React, { useEffect, useState } from "react";

const Pathway = () => {
  // Function to show/hide the highlight line at the specified timestamp
  const highlightTimestamp = () => {
    const videoPlayer = document.querySelector(".video-player");
    const highlightLine = document.querySelector(".highlight-line");

    // Listen for video playback events
    videoPlayer.addEventListener("timeupdate", () => {
      // Check if current video time is within the highlighted timestamp range
      if (videoPlayer.currentTime >= timestampInSeconds) {
        highlightLine.style.display = "block";
      } else {
        highlightLine.style.display = "none";
      }
    });
  };

  useEffect(() => {
    highlightTimestamp();
    return () => {
      // Clean up event listener on component unmount
      const videoPlayer = document.querySelector(".video-player");
      videoPlayer.removeEventListener("timeupdate", highlightTimestamp);
    };
  }, []);
  return (
    <div className="relative">
      <div
        className={`h-screen w-screen  flex py-[10vh] flex-col bg-HomeBG-main `}
      >
        <div className="video-container ">
          <iframe
            className="video-player"
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/qEJ4hkpQW8E`}
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
        <div
          className="highlight-line  bg-yellow-500 h-1 "
          style={{ display: "none" }}
        ></div>
      </div>
    </div>
  );
};

export default Pathway;
