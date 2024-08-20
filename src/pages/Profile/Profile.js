import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { TiktokContext } from "../../tiktok-context";
import ModalPost from "../../components/ModalPost/ModalPost";
import EditProfile from "../../components/EditProfile/EditProfile";
import Post_sm from "../../components/Post/Post_sm";

const Profile = () => {
  const {
    api_url,
    userLoggedInData,
    DoIFollow,
    togglePostModal,
    editProfileModal,
    setEditProfileModal,
  } = useContext(TiktokContext);
  const { username } = useParams();
  const [userFollowedBy, setUserFolloweBy] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [favoritePosts, setFavoritePosts] = useState([]);

  const [activeTab, setActiveTab] = useState("videos");
  const [user, setUser] = useState([]);

  async function getUserData() {
    await fetch(
      api_url +
        `users/?username=${username}&_embed=posts&_embed=favorites&_embed=UserFollowers&_embed=likes`
    )
      .then((res) => res.json())
      .then((data) => {
        setUser(data[0]);
      });
  }
  async function getFavoritePosts() {
    let likeslist = [];
    for (let i = 0; i < user.likes.length; i++) {
      await fetch(api_url + `posts?id=${user.likes[i].postId}`)
        .then((res) => res.json())
        .then((data) => {
          likeslist.push(data[0]);
        })
        .catch((err) => console.log(err));
    }

    setLikedPosts(likeslist);
  }
  async function getLikedPosts() {
    let favoritelist = [];
    for (let i = 0; i < user.favorites.length; i++) {
      await fetch(api_url + `posts?id=${user.favorites[i].postId}`)
        .then((res) => res.json())
        .then((data) => {
          favoritelist.push(data[0]);
        })
        .catch((err) => console.log(err));
    }

    setFavoritePosts(favoritelist);
  }
  async function getUserfollowedBy() {
    await fetch(api_url + `UserFollowers?followerId=${user?.id}`)
      .then((res) => res.json())
      .then((data) => {
        setUserFolloweBy(data);
      });
  }
  useEffect(() => {
    // console.log(user);
  }, [user]);

  useEffect(() => {
    getUserData();
    if (user.id) {
      getUserfollowedBy();
      getLikedPosts();
      getFavoritePosts();
    }
  }, [user]);

  return (
    <section className="pt-4 profile">
      <div className="profile-header">
        {/* name */}
        <div className="d-flex justify-content-between w-50 ">
          <div className="d-flex gap-3">
            <div className="rounded-circle overflow-hidden">
              <img
                src={user.profile_img}
                width={120}
                height={120}
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="align-self-start">
              <h3 className="mb-1">{user.username}</h3>
              <p className="fw-semibold mb-1">{user.name}</p>
              {userLoggedInData && DoIFollow(username) && (
                <button className="btn btn-outline-danger rounded-1">
                  Following
                </button>
              )}
              {(userLoggedInData && username != userLoggedInData.username) ||
                (!userLoggedInData && (
                  <button className="btn btn-danger rounded-1">Follow</button>
                ))}

              {userLoggedInData && username == userLoggedInData.username && (
                <button
                  className="btn btn-dark rounded-1 "
                  onClick={() => {
                    setEditProfileModal(true);
                  }}
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
          <div role="button">
            <i className="fa-solid fa-share"></i>
          </div>
        </div>
        {/* Followers and bio */}
        <div>
          <button className="btn btn-link text-light me-3">
            <b>{userFollowedBy.length}</b> Followers
          </button>
          <button className="btn btn-link text-light me-3">
            <b>{user.UserFollowers?.length}</b> Following
          </button>
          <button className="btn btn-link text-light">
            <b>60</b> Likes
          </button>
        </div>
        <div>
          {userLoggedInData && userLoggedInData.id == user.id ? userLoggedInData.bio : "No Bio Yet"}
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-4">
        <div className="tabNames d-flex gap-3 border-bottom border-dark">
          <div
            role="button"
            className={
              activeTab == "videos"
                ? "tabname fw-semibold px-4 pb-2 border-bottom border-3"
                : "tabname fw-semibold px-4 pb-2 "
            }
            onClick={() => setActiveTab("videos")}
          >
            Videos
          </div>
          <div
            role="button"
            className={
              activeTab == "favorites"
                ? "tabname fw-semibold px-4 pb-2 border-bottom border-3"
                : "tabname fw-semibold px-4 pb-2 "
            }
            onClick={() => setActiveTab("favorites")}
          >
            Favorites
          </div>
          <div
            role="button"
            className={
              activeTab == "liked"
                ? "tabname fw-semibold px-4 pb-2 border-bottom border-3"
                : "tabname fw-semibold px-4 pb-2 "
            }
            onClick={() => setActiveTab("liked")}
          >
            Liked
          </div>
        </div>
        <div className="tab-content pt-3">
          {activeTab == "videos" && (
            <div
              className={`videos  ${user?.posts?.length ? "d-grid gap-2" : ""}`}
            >
              {user?.posts?.length ? (
                user?.posts?.map((post) => {
                  return (
                    <Post_sm
                      video={post.video}
                      description={post.description}
                      key={post.id}
                    />
                  );
                })
              ) : (
                <h2 className="text-center">No Videos Posts</h2>
              )}
              {togglePostModal && <ModalPost />}
            </div>
          )}
          {activeTab == "favorites" && (
            <div
              className={`favorites  ${
                user.favorites.length ? "d-grid gap-2" : ""
              }`}
            >
              {favoritePosts.length ? (
                favoritePosts.map((post) => {
                  return (
                    <Post_sm
                      video={post.video}
                      description={post.description}
                      key={post.id}
                    />
                  );
                })
              ) : (
                <h2 className="text-center">No Favorite Posts</h2>
              )}
            </div>
          )}
          {activeTab == "liked" && (
            <div className={`liked  ${
              likedPosts.length && "d-grid gap-2"}`}>
              {likedPosts.length ? (
                likedPosts.map((post) => {
                  return (
                    <Post_sm
                      video={post.video}
                      description={post.description}
                      key={post.id}
                    />
                  );
                })
              ) : (
                <h2 className="text-center">No Liked Posts</h2>
              )}
            </div>
          )}
        </div>
      </div>
      {editProfileModal && <EditProfile />}
    </section>
  );
};

export default Profile;
