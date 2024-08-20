import { createContext, useEffect, useState } from "react";

export const TiktokContext = createContext(null);

export function TiktokContextProvider(props) {
  const api_url = "http://localhost:3030/";
  let loggedIn = localStorage.getItem("loggedIn");

  const [activeTab, setActiveTab] = useState("");
  const [logInmodal, setLogInmodal] = useState(false);
  const [signinmodal, setSigninmodal] = useState(false);
  const [togglePostModal, setTogglePostModal] = useState(false);
  const [editProfileModal, setEditProfileModal] = useState(false);
  // User loggedin Data
  const [userLoggedIn, setUserLoggedIn] = useState(JSON.parse(loggedIn));
  const [userLoggedInData, setUserLoggedInData] = useState();
  const [followingList, setFollowingList] = useState([]);

  const [postOnModal, setPostOnModal] = useState(0);

  const [posts, setPosts] = useState([]);

  const getLoggedInUserData = async () => {
    if (JSON.parse(loggedIn) != "") {
      await fetch(
        api_url + `users/${JSON.parse(loggedIn)}?_embed=likes&_embed=favorites`
      )
        .then((res) => res.json())
        .then((data) => setUserLoggedInData(data));
    }
  };

  function DoIFollow(username) {
    let found = followingList.find((user) => user.username === username);
    return found;
  }
  // find liked post
  function findId(userId, postId) {
    let found = userLoggedInData?.likes?.find(
      (user) => user.userId == userId && user.postId == postId
    );
    return found;
  }
  // find bookmarked post

  function bookmarkedPost(userId, postId) {
    let found = userLoggedInData?.favorites?.find(
      (user) => user.userId == userId && user.postId == postId
    );
    return found;
  }
  const getFollowingList = async () => {
    let followerArr = [];
 
      await fetch(api_url + `UserFollowers?userId=${JSON.parse(userLoggedIn)}`)
        .then((res) => res.json())
        .then((followers) => {
          for (let i = 0; i < followers.length; i++) {
            fetch(api_url + `users/${followers[i].followerId}`)
              .then((res) => res.json())
              .then((userdata) => {
                followerArr.push(userdata);
              });
          }
        }); 
    setTimeout(() => {
      setFollowingList(followerArr);
    }, 1000);
  };

  async function getPosts() {
    await fetch(
      api_url +
        "posts?_embed=likes&_embed=user&_embed=UserComments&_embed=favorites"
    )
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  }

  useEffect(() => {
    getPosts();
  }, []);
  

  useEffect(() => {
    getLoggedInUserData();
  }, [userLoggedInData]);
  
  function openLogInModal() {
    setLogInmodal(!logInmodal);
  }
  function toggleSignInModal() {
    setSigninmodal(!signinmodal);
  }
  useEffect(() => {
    if (JSON.parse(loggedIn)) {
      setUserLoggedIn(JSON.parse(loggedIn));
    }

    if (userLoggedIn != "") {
      getLoggedInUserData();
      getFollowingList();
    }
  }, [loggedIn]);

  const followUser = async (id) => {
    await fetch(api_url + "UserFollowers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Math.floor(Math.random() * 99999).toString(),
        userId: JSON.parse(loggedIn),
        followerId: id,
      }),
    });
  };
  const likePost = async (id) => {
    await fetch(api_url + "likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Math.floor(Math.random() * 99999).toString(),
        userId: userLoggedIn,
        postId: id,
      }),
    });
  };
  const addPostToFavorite = async (id) => {
    await fetch(api_url + "favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Math.floor(Math.random() * 99999).toString(),
        userId: userLoggedIn,
        postId: id,
      }),
    });
  };

  const unFollowUser = async (id) => {
    if (id != undefined) {
      await fetch(api_url + `UserFollowers/${id}`, {
        method: "Delete",
      });
    }
  };
  const dislike = async (id) => {
    if (id != undefined) {
      await fetch(api_url + `likes/${id}`, {
        method: "Delete",
      });
    }
  };
  const unBookmarkPost = async (id) => {
    if (id != undefined) {
      await fetch(api_url + `favorites/${id}`, {
        method: "Delete",
      });
    }
  };

  const contextValue = {
    activeTab,
    setActiveTab,
    signinmodal,
    toggleSignInModal,
    setSigninmodal,
    logInmodal,
    unBookmarkPost,
    setLogInmodal,
    openLogInModal,
    bookmarkedPost,
    addPostToFavorite,
    findId,
    dislike,
    togglePostModal,
    setTogglePostModal,
    posts,
    setPosts,
    userLoggedIn,
    setUserLoggedIn,
    userLoggedInData,
    followingList,
    loggedIn,
    postOnModal,
    setPostOnModal,
    api_url,
    DoIFollow,
    followUser,
    unFollowUser,
    likePost,
    editProfileModal,
    setEditProfileModal,
  };

  return (
    <TiktokContext.Provider value={contextValue}>
      {props.children}
    </TiktokContext.Provider>
  );
}
