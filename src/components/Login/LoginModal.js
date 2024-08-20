import React, { useContext, useEffect, useState } from "react";
import { TiktokContext } from "../../tiktok-context";

const LoginModal = () => {

  const { api_url, openLogInModal,loggedIn,userLoggedIn,setUserLoggedIn} = useContext(TiktokContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function logIn() {
    await fetch(api_url + `users?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        if(data[0].password !== password){
          alert("user password : " + data[0].password + "\n" + "password : " + password )
        }else{
          const user = data[0].id
          openLogInModal() 
          localStorage.setItem('loggedIn',JSON.stringify(user))
          window.location.reload()
        }
      })
      .catch(err=> alert(err));
  }

  function submit(e){  
      e.preventDefault()
      logIn()
  }
 
  return (
    <section
      className="position-absolute bg-black bg-opacity-50 w-100 h-100"
      style={{ top: "0", left: "0" }}
    >
      <div
        className="position-absolute bg-white text-black px-3 "
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          height: "400px",
          minWidth: "300px",
        }}
      >
        <form className="form" onSubmit={submit}>
          <div className="mb-3">
            <label htmlFor="emailInput" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="emailInput"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            /> 
          </div>
          <div className="mb-3">
            <label for="passwordInput" className="form-label">
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
          <button className="btn btn-primary me-3"  >
            Submit
          </button>
          <button className="btn btn-danger" onClick={() => openLogInModal()}>
            Close
          </button>
        </form>
      </div>
    </section>
  );
};

export default LoginModal;
