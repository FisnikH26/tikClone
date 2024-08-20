import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Video from "./Video/Video";
import { TiktokContext } from "../tiktok-context";
const Post = ({ id, videoDetails, index }) => {
  const {
    api_url,
    DoIFollow,
    bookmarkedPost,
    followUser,
    findId,
    userLoggedInData,
    unFollowUser,
    loggedIn,
    addPostToFavorite,
    likePost,
    dislike,
    unBookmarkPost,
  } = useContext(TiktokContext);

  const removeUser = async (id) => {
    await fetch(
      api_url + `UserFollowers?userId=${JSON.parse(loggedIn)}&followerId=${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        unFollowUser(data[0].id);
      })
      .catch((err) => console.log(err));
  };

  const findLikedPostId = async (id) => {
    await fetch(api_url + `likes?userId=${JSON.parse(loggedIn)}&postId=${id}`)
      .then((res) => res.json())
      .then((data) => {
        dislike(data[0].id);
      })
      .catch((err) => console.log(err));
  };
  const findBookmarkedPostId = async (id) => {
    await fetch(
      api_url + `favorites?userId=${JSON.parse(loggedIn)}&postId=${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        unBookmarkPost(data[0].id);
      })
      .catch((err) => console.log(err)); 
  };
 

  return (
    <div className="post my-3 border-bottom border-dark pb-3" role="button">
      <div className="post-header d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-start gap-2">
          <div className="rounded-circle overflow-hidden">
            <img
              src={videoDetails.user.profile_img}
              alt="avatar"
              width={50}
              height={50}
              style={{ objectFit: "cover" }}
            />
          </div>
          <div>
            <div className="d-flex gap-2 align-items-center">
              <Link
                to={`/${videoDetails.user.username}`}
                className="text-white text-decoration-none"
              >
                <h6 className="m-0 d-inline-block me-2">
                  {videoDetails.user.username}
                </h6>
                <p className="m-0 fs-7 d-inline-block">
                  @{videoDetails.user.name}
                </p>
              </Link>
            </div>
            <p className="m-0 post-description">{videoDetails.description}</p>
            <p className="fs-7">
              <span className="me-2">
                <i className="fa-solid fa-music"></i>
              </span>
              {videoDetails.user.name + "'s Original sound"}
            </p>
          </div>
        </div>
        <div>
          {userLoggedInData && videoDetails.user.id == userLoggedInData.id ? (
            <button
            className="btn btn-dark fw-semibold rounded-0"
          disabled >
            My Post
          </button>
          ) :
          DoIFollow(videoDetails.user.username) != undefined ? (
            <button
              className="btn btn-dark fw-semibold rounded-0"
              onClick={() => {
                removeUser(videoDetails.user.id);
              }}
            >
              Following
            </button>
          ) : (
            <button
              className="btn btn-danger rounded-0"
              onClick={() => followUser(videoDetails.user.id)}
            >
              Follow
            </button>
          )}
        </div>
      </div>
      <div className="post-body ps-5">
        <div className="post-content d-flex align-items-end gap-3">
          {/* <Link to={`/${videoDetails.author.author_username}/video/${videoDetails.id}`}> */}
          <div className="video-container bg-black overflow-hidden rounded-3 position-relative">
            <Video id={id} video={videoDetails.video} index={index} />
          </div>
          {/* </Link> */}

          <div className="post-interections d-flex flex-column gap-2 align-items-center">
            {/* Like */}
            <div className="d-flex flex-column text-center fw-semibold">
              {userLoggedInData ? (
                findId(userLoggedInData.id, videoDetails.id) == undefined ? (
                  <button
                    className="btn rounded-circle text-white"
                    onClick={() => likePost(videoDetails.id)}
                  >
                    <i className="fa-solid fa-heart"></i>
                  </button>
                ) : (
                  <button
                    className="btn rounded-circle text-danger"
                    onClick={() => findLikedPostId(videoDetails.id)}
                  >
                    <i className="fa-solid fa-heart-crack"></i>
                  </button>
                )
              ) : (
                <button className="btn rounded-circle text-white">
                  <i className="fa-solid fa-heart"></i>
                </button>
              )}
              <span>{videoDetails?.likes?.length}</span>
            </div>
            {/* Comment */}
            <div className="d-flex flex-column text-center fw-semibold">
              <button className="btn rounded-circle text-white">
                <i className="fa-solid fa-comment-dots"></i>
              </button>
              <span>{videoDetails?.UserComments?.length}</span>
            </div>
            {/* Bookmark */}
            <div className="d-flex flex-column text-center fw-semibold">
              {userLoggedInData ? (
                bookmarkedPost(userLoggedInData.id, videoDetails.id) ==
                undefined ? (
                  <button
                    className="btn rounded-circle text-white"
                    onClick={() => addPostToFavorite(videoDetails.id)}
                  >
                    <i className="fa-solid fa-bookmark"></i>
                  </button>
                ) : (
                  <button
                    className="btn rounded-circle text-warning"
                    onClick={() => findBookmarkedPostId(videoDetails.id)}
                  >
                    <i className="fa-solid fa-bookmark"></i>
                  </button>
                )
              ) : (
                <button className="btn rounded-circle text-white">
                  <i className="fa-solid fa-bookmark"></i>
                </button>
              )}
              <span>{videoDetails?.favorites?.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
