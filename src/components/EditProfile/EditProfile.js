import React, { useContext, useState } from "react";
import { TiktokContext } from "../../tiktok-context";
import avatar from "../../assets/avatar.png";
const EditProfile = () => {
  const { api_url,editProfileModal, setEditProfileModal, userLoggedInData } =
    useContext(TiktokContext);
  const [username, setusername] = useState(userLoggedInData.username);
  const [name, setName] = useState(userLoggedInData.name);
  const [bio, setBio] = useState(userLoggedInData.name);
  const submit = (e) => {
    e.preventDefault();
    let editedData = {
      username: username,
      name: name,
      bio:bio
    };
    // location.replace(`http://localhost:3000/${username}`)
    fetch(api_url + `users/${userLoggedInData.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedData),
    });
    // console.log(editedData);
  };

  return (
    <section
      className="position-absolute bg-black bg-opacity-50 w-100 h-100 "
      style={{ top: "0", left: "0" }}
    >
      <div
        className="position-absolute bg-dark text-black p-3 "
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          minWidth: "300px",
        }}
      >
        <form className="form" onSubmit={submit}>
          <div className="d-flex gap-2  border-bottom">
            <label className="form-label text-white" style={{ flex: 1 }}>
              Profile photo
            </label>
            <div className="mb-3 " style={{ flex: 1.5 }}>
              <div
                style={{ width: 100, height: 100 }}
                className="rounded-circle overflow-hidden"
              >
                <img
                  src={userLoggedInData.profile_img}
                  alt="profile photo"
                  width={100 + "%"}
                  height={100 + "%"}
                />
              </div>
            </div>
          </div>
          <div className="d-flex gap-2 pt-3  border-bottom">
            <label
              htmlFor="username"
              className="form-label text-white"
              style={{ flex: 1 }}
            >
              Username
            </label>
            <div className="mb-3 " style={{ flex: 1.5 }}>
              <input
                type="text"
                className="form-control bg-dark rounded-0 text-white w-75"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
              <small className="text-white fs-7">http://localhost:3000/{username}</small>
              <br />
              <small className="text-white fs-7">
                Usernames can only contain letters, numbers, underscores, and
                periods. Changing your username will also change your profile
                link.{" "}
              </small>
            </div>
          </div>
          <div className="d-flex gap-2 pt-3 border-bottom">
            <label
              htmlFor="name"
              className="form-label text-white"
              style={{ flex: 1 }}
            >
              name
            </label>
            <div className="mb-3" style={{ flex: 1.5 }}>
              <input
                type="text"
                className="form-control bg-dark rounded-0 text-white w-75"
                id="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <small className="text-white">
                Your nickname can only be changed once every 7 days
              </small>
            </div>
          </div>
          <div className="d-flex gap-2 pt-3 border-bottom">
            <label
              htmlFor="bio"
              className="form-label text-white"
              style={{ flex: 1 }}
            >
              Bio
            </label>
            <div className="mb-3" style={{ flex: 1.5 }}>
              <textarea
                rows={5}
                id="bio"
                value={bio}
                className="form-control bg-dark rounded-0 text-white w-75"
                onChange={(e)=>setBio(e.target.value)}
              ></textarea>
              <small className="text-white">{bio.length}/80</small>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-end pt-3">
            <button className="btn border-secondary rounded-0  text-white fw-semibold me-3">
              Submit
            </button>
            <button
              className="btn border-secondary rounded-0  text-white fw-semibold"
              onClick={() => setEditProfileModal(false)}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditProfile;
