import React, { useState } from "react";

const VideoControls = ({ 
  videoIsPlaying,
  videoCurrentTime,
  videoIsMuted,
  playTheVideo,
  muteTheVideo,
  rangePlay,
  videoDuration,
}) => {
  return (
    <div className="video-controls w-100 position-absolute d-flex flex-column justify-content-end h-50 p-3 gap-1">
      {/* controles Header */}
      <div className="d-flex justify-content-between">
        <div>
          <button className="btn text-white" onClick={playTheVideo}>
            <i
              className={`fa-solid ${!videoIsPlaying ? "fa-play" : "fa-pause"}`}
            ></i>
          </button>
        </div>
        <div>
          <button className="btn text-white" onClick={muteTheVideo}>
            <i
              className={`fa-solid ${
                videoIsMuted ? "fa-volume-xmark" : "fa-volume-high"
              }`}
            ></i>
          </button>
        </div>
      </div>
      {/* controles Footer */}
      <div className="controls-footer d-flex align-items-center gap-2">
        <input
          type="range"
          className="video-duration-bar"
          name="volume"
          min={0}
          max={videoDuration}
          value={videoCurrentTime}
          onChange={()=>{}}
        />
        <span className="fs-7 flex-1">
          00:
          {videoCurrentTime > 9 ? videoCurrentTime : "0" + videoCurrentTime}
          /00:{videoDuration}
        </span>
      </div>
    </div>
  );
};

export default VideoControls;
