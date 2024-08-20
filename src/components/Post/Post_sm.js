import React, { useContext, useState } from "react";


const Post_sm = ({ video, description }) => {
 
    const playVideo = (e) => {
      e.target.play();
      e.target.muted = true;
    };
    const pauseVideo = (e) => {
      e.target.currentTime = 0;
      e.target.pause();
    };
    const descriptionSliced = ()=>{
      if(description != undefined && description.length > 20){
       let shorterDescription = description.slice(0,20) 
       return shorterDescription + "..."
      }
  
      return description
    }
    return (
      <div className="post-sm" role="button" >
        <div
          className="post-content position-relative bg-secondary rounded-4 overflow-hidden"
          onMouseEnter={playVideo}
          onMouseLeave={pauseVideo}
        >
          <video width="100%" height="100%" className="position-absolute">
            <source src={video} type="video/mp4" />
          </video>
        </div>
        <p>{descriptionSliced()}</p>
      </div>
    );
  };


  export default Post_sm