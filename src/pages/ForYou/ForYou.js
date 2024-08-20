import React, { useState, useEffect, useContext } from "react";
import Post from "../../components/Post";
import ModalPost from "../../components/ModalPost/ModalPost";
import video from "../../assets/media/lisa.mp4";

import { TiktokContext } from "../../tiktok-context";
import { Link } from "react-router-dom";

function ForYou() {
  const { api_url, userLoggedInData,posts, togglePostModal,setTogglePostModal} = useContext(TiktokContext);
 

  return (
    <div className="for_you py-3">
      {/* <video width="100%" height="100%" id={`video-of-25`}  onClick={()=>openPostOnModal()}>
        <source src={video} type="video/mp4" />
      </video> */}
      <section className="w-50 mx-auto">
        {posts.map((post,i) => { 
          return (
              <Post key={post.id} id={post.id} index={i} videoDetails={post} posts={posts}/>
          );
        })}


      {togglePostModal && <ModalPost />}

      </section>
    </div>
  );
}

export default ForYou;
