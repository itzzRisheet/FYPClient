import {
  faBoxOpen,
  faCancel,
  faFastForward,
  faGear,
  faPause,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./styles/videoCard.css";
import YouTube from "react-youtube";
import { Avatar, Menu } from "@mui/material";

const VideoCard = ({
  thumbnails,
  channelName,
  author,
  description,
  publishTime,
  views,
  title,
  videoLength,
  videoID,
  channelID,
}) => {
  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      //   autoplay: 1,
      controls: 0,
      // enablejsapi: 1,
    },
  };
  const [isHovered, setHovered] = useState(false);

  const VideoPlayer = () => {
    return (
      <YouTube
        videoId={videoID}
        opts={opts}
        className="youtube-video"
        // onReady={(e) => {
        //   e.target.playVidetoAt(0);
        // }}
      />
    );
  };
  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  // console.log(channelName);

  return (
    <div className="videoCard">
      <div
        className="thumbnail"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isHovered ? (
          <VideoPlayer />
        ) : (
          <video
            src=""
            poster={thumbnails[0].url}
            autoPlay={false}
            controls={false}
            muted
            loop
          />
        )}
      </div>
      <div className="body box">
        <div className="channelLogo box">
          <Avatar alt={channelName}>
            {" "}
            {channelName ? channelName[0] : "R"}
          </Avatar>
        </div>
        <div className="details box">
          <div className="title box">{title}</div>
          <div className="channelName box">{channelName}</div>
          <div className="views-publishtime box">
            <div className="views box">{views} views</div>
            <span>&#x2022;</span>
            <div className="publishTime box">{publishTime}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
