import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import { jsonFullTextSearch } from "../../assets/helpers/FulltextSearch";
import { TiktokContext } from "../../tiktok-context";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { api_url, userLoggedInData, toggleSignInModal, openLogInModal } =
    useContext(TiktokContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [tooltip, setTooltip] = useState(false);
  const getSearched = async () => {
    let names = [];
    await fetch(api_url + `users`)
      .then((res) => res.json())
      .then((data) => {
        for (const username of data) {
          if (username.name.toLowerCase().includes(searchTerm.toLowerCase()))
            names.push(username.name);
        }
      });

    setSearchResults(names);
  };
  const logout = () => {
    localStorage.setItem("loggedIn", JSON.stringify(''));
    window.location.reload();
  };
  useEffect(() => {
    if (searchTerm != "") {
      getSearched();
    }
  }, [searchTerm, searchResults]);
  return (
    <>
      <section>
        <Link to={'/'}>
        <img src={logo} alt="logo" />
        </Link>
      </section>
      <section className="position-relative">
        <form action={`/search/${searchTerm}`}>
          <div className="input-group">
            <input
              type="text"
              className="form-control form-search bg-color text-white"
              placeholder="Search..."
              aria-label="Search"
              aria-describedby="search-addon"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span
              className="input-group-text bg-color text-light"
              id="search-addon"
            >
              <Link to={`/search/${searchTerm}`} className="text-white">
                <i className="fa-solid fa-magnifying-glass"></i>
              </Link>
            </span>
          </div>
        </form>
        {searchTerm.length != 0 && (
          <div className="position-absolute w-100 bg-white">
            <ul className="nav flex-column  gap-1">
              {searchResults.map((result, i) => {
                return (
                  <Link
                    to={`/search/${result}`}
                    key={i}
                    className="text-black ps-3 fw-semibold text-decoration-none"
                  >
                    <li className="search_item">{result}</li>
                  </Link>
                );
              })}
            </ul>
          </div>
        )}
      </section>
      <section className="d-flex gap-3 align-items-center">
        <div>
          <div>
            <button className="btn btn-dark">+ Upload</button>
          </div>
        </div>
        {userLoggedInData?.id ? (
          <div className="d-flex align-items-center gap-3">
            <div>
              <a href="#" className="text-decoration-none text-white">
                <i className="fa-regular fa-paper-plane"></i>
              </a>
            </div>
            <div>
              <button className="btn text-white bg-color">
                <i className="fa-regular fa-message "></i>
              </button>
            </div>
            <div
              className="profile position-relative"
              onMouseEnter={() => setTooltip(true)}
            >
              <img
                src={userLoggedInData.profile_img}
                alt="avatar"
                className="rounded-circle"
                width={30}
                height={30}
                style={{ objectFit: "cover" }}
              />
              {tooltip && (
                <div
                  className="position-absolute bg-dark"
                  style={{ top: 40, right: 0, minWidth: "120px" }}
                  onMouseEnter={() => setTooltip(true)}
                >
                  <button
                    className="btn px-4 w-100 rounded-0 btn-dark"
                    onClick={logout}
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            <button
              className="btn btn-danger btn-sm px- my-3 rounded-0"
              onClick={openLogInModal}
            >
              <i className="fa-solid fa-right-to-bracket"></i>
            </button>
            <button
              className="btn btn-outline-danger btn-sm px- my-3 rounded-0"
              onClick={toggleSignInModal}
            >
              <i className="fa-solid fa-user-plus"></i>
            </button>
            <button className="btn btn-dark btn-sm">
              <i className="fa-solid  fa-ellipsis-vertical"></i>
            </button>
          </>
        )}
      </section>
    </>
  );
};

export default Navbar;
