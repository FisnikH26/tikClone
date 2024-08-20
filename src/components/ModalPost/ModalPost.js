import React, { useContext, useEffect, useState } from "react";
import avatar from "../../assets/avatar.png";
import Tabs from "../Tabs/Tabs";
import { TiktokContext } from "../../tiktok-context";
import Video from "../Video/Video";
import { isDisabled } from "@testing-library/user-event/dist/utils";
const ModalPost = () => {
  const [writeAComment, setWriteAComment] = useState("");
  const [comments, setComments] = useState([]);

  const {
    activeTab,
    posts,
    postOnModal,
    api_url,
    setPostOnModal,
    togglePostModal,
    userLoggedInData,
    setTogglePostModal,
  } = useContext(TiktokContext);
  const addComment = (e) => {
    e.preventDefault();

    fetch(api_url + `UserComments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Math.floor(Math.random() * 99999999).toString(),
        postId: posts[postOnModal].id,
        userId: userLoggedInData.id,
        comment: writeAComment,
      }),
    });

    setWriteAComment("");
  };
  const deleteComment = (id) => {
    fetch(api_url + `UserComments/${id}`, {
      method: "DELETE",
    });
  };

  const getComments = async () => {
    await fetch(api_url + `UserComments?postId=${postOnModal + 1}&_embed=user`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
      });
  };

  useEffect(() => {
    getComments();
  }, [postOnModal]);

  return (
    <div
      className="modal-post bg-color position-absolute w-100 h-100"
      style={{ top: 0, left: 0 }}
    >
      <div className="row mx-0 h-100vh">
        <div className="col-lg-8 h-100 d-flex align-items-end justify-content-between flex-column py-2 position-relative">
          <div className="d-flex w-100 align-items-center justify-content-between">
            <div>
              <button
                className="btn fw-bolder rounded-circle bg-dark "
                onClick={() => setTogglePostModal(!togglePostModal)}
              >
                <i className="fa-solid fa-xmark text-white"></i>
              </button>
            </div>
            <div>
              <form>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control form-search bg-color text-white rounded-start-pill"
                    placeholder="Search..."
                    aria-label="Search"
                    aria-describedby="search-addon"
                  />
                  <span
                    className="input-group-text bg-color text-light rounded-end-circle"
                    id="search-addon"
                  >
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </span>
                </div>
              </form>
            </div>
            <div>
              <button className="btn btn-dark rounded-pill">
                <i className="fa-solid fa-flag me-2"></i>
                <span>Raport</span>
              </button>
            </div>
          </div>
          <div className="d-flex w-100 justify-content-end">
            <button className="btn text-white">
              <i className="fa-solid fa-volume-high"></i>
            </button>
          </div>
          <div
            className="position-absolute h-100 bg-black"
            style={{
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              Zindex: 0,
            }}
          >
            <video width="100%" height="100%" autoPlay>
              <source src={posts[postOnModal].video} type="video/mp4" />
            </video>
          </div>
        </div>
        <main className="col-lg-4 py-2 ">
          <section className="bg-dark rounded pt-3 pb-1 px-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex gap-2 align-items-center">
                <div>
                  <img
                    src={posts[postOnModal].user.profile_img}
                    width={45}
                    height={45}
                    className="rounded-circle"
                  />
                </div>
                <div>
                  <h6 className="m-0">{posts[postOnModal].user.username}</h6>
                  <p className="fs-7 m-0">
                    <span>{posts[postOnModal].user.name} </span>•
                    <span> 2024-01-02</span>
                  </p>
                </div>
              </div>
              <div>
                <button className="btn btn-danger btn-sm">Follow</button>
              </div>
            </div>
            <p>{posts[postOnModal].description}</p>
            <p className="fs-7">Original sound - homer</p>
          </section>
          <section className="d-flex justify-content-between my-3">
            <div className="d-flex gap-2 align-items-center">
              <div className="d-flex gap-2">
                <button className="btn btn-dark rounded-circle btn-sm">
                  <i className="fa-solid fa-heart"></i>
                </button>
                <p className="mb-0">{posts[postOnModal].likes.length}</p>
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-dark rounded-circle btn-sm">
                  <i className="fa-solid fa-comment-dots"></i>
                </button>
                <p className="mb-0">{posts[postOnModal].UserComments.length}</p>
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-dark rounded-circle btn-sm">
                  <i className="fa-solid fa-bookmark"></i>
                </button>
                <p className="mb-0">{posts[postOnModal].favorites.length}</p>
              </div>
            </div>
            <div className="d-flex gap-1">
              <button className="btn btn-dark btn-sm rounded-circle">
                <i className="fa-solid fa-code"></i>
              </button>
              <button className="btn btn-danger btn-sm rounded-circle">
                <i className="fa-solid fa-paper-plane"></i>
              </button>
              <button className="btn btn-success btn-sm rounded-circle">
                <i className="fa-brands fa-whatsapp"></i>
              </button>
              <button className="btn btn-primary btn-sm rounded-circle">
                <i className="fa-brands fa-facebook-f"></i>
              </button>
              <button className="btn btn-info text-white btn-sm rounded-circle">
                <i className="fa-brands fa-twitter"></i>
              </button>
              <button className="btn text-white btn-sm rounded-circle">
                <i className="fa-solid fa-share"></i>
              </button>
            </div>
          </section>
          <section className="d-flex">
            <p
              className="bg-secondary ps-2 py-1 mb-0 rounded-start"
              style={{ flex: 1 }}
            >
              {`http://localhost:3000/${posts[postOnModal].user.username}/video/${posts[postOnModal].id}`}
            </p>
            <button className="btn bg-dark btn-sm text-white fw-semibold rounded-0 rounded-end">
              Copy link
            </button>
          </section>
          <section className="mt-2">
            <Tabs tabnames={["Comments"]}>
              {activeTab == "Comments" && (
                <>
                  <div className="comments overflow-y-scroll">
                    {comments.length ? (
                      comments.map((comment, i) => (
                        <div
                          key={i}
                          className="comment-container d-flex  justify-content-between my-2 pe-3"
                        >
                          <div className="d-flex gap-2 align-items-start">
                            <div>
                              <img
                                src={comment.user.profile_img}
                                width={40}
                                height={40}
                                className="rounded-circle"
                                style={{ objectFit: "cover" }}
                              />
                            </div>
                            <div>
                              <h6 className="mb-0">{comment.user.name}</h6>
                              <p className="mb-0">{comment.comment}</p>
                              <p className="text-secondary mb-0">2d ago</p>
                            </div>
                          </div>
                          {userLoggedInData && comment.user.id == userLoggedInData.id && (
                            <div>
                              <button
                                className="btn btn-sm fw-semibold text-danger"
                                onClick={() => deleteComment(comment.id)}
                              >
                                Delete
                              </button>
                            </div>
                          )}
                          {userLoggedInData && posts[postOnModal].userId == userLoggedInData.id && (
                            <div>
                              <button
                                className="btn btn-sm fw-semibold text-danger"
                                onClick={() => deleteComment(comment.id)}
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <>
                        <h6 className="text-center mt-5">
                          There are no comment
                        </h6>
                        <small className="text-center d-block">
                          Be first to comment
                        </small>
                      </>
                    )}
                  </div>
                  <div className="comment-input">
                    {userLoggedInData ? (
                      <form
                        className="d-flex align-items-center"
                        onSubmit={addComment}
                      >
                        <textarea
                          className="add-coment-textarea bg-dark text-secondary border-0 px-2 py-2 disabled"
                          rows={1}
                          placeholder="Write a comment"
                          style={{ flex: 1 }}
                          onChange={(e) => setWriteAComment(e.target.value)}
                        ></textarea>
                        <button
                          className={`btn btn-small fw-bold ${
                            writeAComment.length
                              ? "text-danger"
                              : "disabled border-0"
                          }`}
                        >
                          Post
                        </button>
                      </form>
                    ) : (
                      <p className="text-danger">Log in to comment</p>
                    )}
                  </div>
                </>
              )}
            </Tabs>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ModalPost;
