import React, { useContext, useState } from "react";
import avatar from "../../assets/avatar.png";
import video from "../../assets/media/video.mp4";
import video_2 from "../../assets/media/video-2.mp4";
import video_3 from "../../assets/media/video-3.mp4";
import { useEffect } from "react";
import Tabs from "../../components/Tabs/Tabs";
import { TiktokContext } from "../../tiktok-context";
import { Link, useParams } from "react-router-dom";
import { jsonFullTextSearch } from "../../assets/helpers/FulltextSearch";
import Post_sm from "../../components/Post/Post_sm";
const Search = () => {
  const { activeTab, api_url } = useContext(TiktokContext);
  const [userSearched, setUserSearched] = useState();
  const [postsSearched, setPostsSearched] = useState();
  const { search } = useParams();

  const searchResults = async () => {
    await fetch(api_url + `users`)
      .then((res) => res.json())
      .then((data) => {
        setUserSearched(jsonFullTextSearch(data, search));
      });

    await fetch(api_url + `posts`)
      .then((res) => res.json())
      .then((data) => {
        setPostsSearched(jsonFullTextSearch(data, search));
      });
  };

  useEffect(() => {
    searchResults();
  }, [search]);

  return (
    <div className="search_page">
      <Tabs tabnames={["Top", "Users", "Videos"]}>
        <div className="tab-content pt-3">
          {activeTab == "Top" && (
            <>
              <div>
                {userSearched &&
                  userSearched.map((user) => {
                    if (
                      user.name.toLowerCase().includes(search.toLowerCase()) ||
                      user.username.toLowerCase().includes(search.toLowerCase())
                    ) {
                      return (
                        <Link to={`/${user.username}`} key={user.id} className="text-white text-decoration-none">
                          <div className="d-flex align-items-center gap-2 user">
                            <img
                              src={user.profile_img}
                              alt="avatar"
                              width={30}
                              height={30}
                              className="rounded-circle object-fit-cover"
                            />
                            <div>
                              <p className="user-name fw-semibold">
                                {user.name}
                              </p>
                              <small>@{user.username}</small>
                            </div>
                          </div>
                        </Link>
                      );
                    }
                  })}
              </div>
              <hr />
              <div className="top d-grid gap-2">
                {postsSearched &&
                  postsSearched.map((post) => {
                    return (
                      <Post_sm
                        video={post.video}
                        description={post.description}
                        key={post.id}
                      />
                    );
                  })}
              </div>
              <div className="videos d-grid gap-2"></div>
            </>
          )}
          {activeTab == "Users" && (
            <div className="users d-grid gap-2">
              {userSearched &&
                userSearched.map((user) => {
                  if (
                    user.name.toLowerCase().includes(search.toLowerCase()) ||
                    user.username.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return (
                      <div
                        key={user.id}
                        className="d-flex align-items-center gap-2 user"
                      >
                        <img
                          src={user.profile_img}
                          alt="avatar"
                          width={30}
                          height={30}
                          className="rounded-circle object-fit-cover"
                        />
                        <div>
                          <p className="user-name fw-semibold">{user.name}</p>
                          <small>@{user.username}</small>
                        </div>
                      </div>
                    );
                  }
                })}
            </div>
          )}
          {activeTab == "Videos" && (
            <div className="videos d-grid gap-2">
              {postsSearched &&
                postsSearched.map((post) => {
                  return (
                    <Post_sm
                      video={post.video}
                      description={post.description}
                      key={post.id}
                    />
                  );
                })}
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
};

export default Search;
