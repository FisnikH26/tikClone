import React, { useContext, useEffect, useState } from "react";
import { TiktokContext } from "../../tiktok-context";
import Post from "../../components/Post";

const Following = () => {
  const { api_url,followingList, openLogInModal,loggedIn } = useContext(TiktokContext);
    const [followingPosts,setFollowingPosts] = useState()

    const smnew = async()=>{
        let list = []
        for (let i = 0; i < followingList.length; i++) {
            
            await fetch(api_url + `posts?userId=${followingList[i].id}&_embed=user&_embed=likes`)
            .then(res=>res.json())
            .then(data=> list.push(data[0]))
        }
        
        let HavePosts = list.filter(list => list !== undefined)
        setFollowingPosts(HavePosts)

    } 

  useEffect(() => {
    smnew() 
    if(JSON.parse(loggedIn) == ''){
      window.location.replace('http://localhost:3000/')
    }
  }, []);

  return (
    <div className="w-50 mx-auto">
      {followingPosts &&
        followingPosts.map((user,i) => (
            <Post key={user.id} id={user.id} videoDetails={user}/> 
          )
        )}
    </div>
  );
};

export default Following;
