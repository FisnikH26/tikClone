import React, { useContext, useState } from "react";
import { TiktokContext } from "../../tiktok-context";

const Signin = () => {
  const { api_url,signinmodal, setSigninmodal,toggleSignInModal } = useContext(TiktokContext);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (name.length <= 20) {
      console.log("Good Name");
    } else {
      console.log("No more then 20 chars");
    }
    if (/^[a-zA-Z0-9_.-]{1,30}$/g.test(username.trim())) {
      console.log("Good username");
    } else {
      console.log("No spaces");
    }

    // validate Email
    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g.test(email)) {
      console.log("Good email");
    } else {
      console.log("Bad email");
    }
    let newUser = {
        "id": Math.floor(Math.random() * 100000).toString(),
      "name":name ,
      "username":username ,
      "email":email ,
      "password":password,
      "profile_img": "https://imgs.search.brave.com/rCGeCHKkSE_s7ZwRS5VCQTKqCRaHgeLl4QYksqIjGws/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8zMTM1LzMxMzU3/MTUucG5n"
    }



    fetch(api_url+"users",{
        method:'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(newUser)
    })

    localStorage.setItem('loggedIn',JSON.stringify(newUser.id))
    toggleSignInModal()
;
  };

  return (
    <section
      className="position-absolute bg-black bg-opacity-50 w-100 h-100 "
      style={{ top: "0", left: "0" }}
    >
      <div
        className="position-absolute bg-white text-black p-3 "
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          height: "400px",
          minWidth: "300px",
        }}
      >
        <form className="form" onSubmit={submit}>
          <div className="d-flex gap-2">
            <div className="mb-3 w-50">
              <label htmlFor="nameInput" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="nameInput"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3 w-50">
              <label htmlFor="usernameInput" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="usernameInput"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex gap-2">
            <div className="mb-3 w-50">
              <label htmlFor="Email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="Email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3 w-50">
              <label htmlFor="passwordInput" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="passwordInput"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button className="btn btn-primary me-3">Submit</button>
          <button className="btn btn-danger" onClick={toggleSignInModal}>Close</button>
        </form>
      </div>
    </section>
  );
};

export default Signin;
