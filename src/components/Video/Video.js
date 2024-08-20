import React, { useContext, useEffect, useState } from "react";
import VideoControls from "./VideoControls";
import { TiktokContext } from "../../tiktok-context";

const Video = ({ id, video ,index}) => {
  const {setTogglePostModal,setPostOnModal} = useContext(TiktokContext)

    const [videoIsPlaying, setVideoIsPlaying] = useState(false);
    const [videoIsMuted, setVideoIsMuted] = useState(false);
    const [videoCurrentTime, setVideoCurrentTime] = useState(0);
    const [videoDuration, setVideoDuration] = useState(0);
    const openPostOnModal = ()=>{
        setTogglePostModal(true)
        setPostOnModal(index)
      }
    const playTheVideo = () => {
        let video = document.querySelector(`#video-of-${id}`);

        setVideoIsPlaying((prev) => !prev);
        videoIsPlaying ? video.pause() : video.play();
        setInterval(() => {
          rangePlay();
        
        }, 1000);
      };
      
      const muteTheVideo = () => {
        let video = document.querySelector(`#video-of-${id}`);
    
        setVideoIsMuted((prev) => !prev);
        video.muted = !videoIsMuted;
      };
      const rangePlay = () => {
        let video = document.querySelector(`#video-of-${id}`);
    
        setVideoCurrentTime(Math.floor(video.currentTime));
        return Number(video.currentTime.toFixed(0));
      };
      const getVideoDuration = () => {
        let video = document.querySelector(`#video-of-${id}`);
    
        let x = video.duration.toFixed(0);
        setVideoDuration(x);
      };
    

  useEffect(() => {
    setTimeout(() => {
      getVideoDuration();
    }, 100);
  }, []);
  return (
    <>
      <video width="100%" height="100%" id={`video-of-${id}`}  onClick={()=>openPostOnModal()}>
        <source src={video} type="video/mp4" />
      </video>
      <VideoControls  
        videoIsPlaying={videoIsPlaying}
        videoIsMuted={videoIsMuted}
        playTheVideo={playTheVideo} 
        muteTheVideo={muteTheVideo}
        videoCurrentTime={videoCurrentTime}
        rangePlay={rangePlay}
        videoDuration={videoDuration}
      />
    </>
  );
};

export default Video;
