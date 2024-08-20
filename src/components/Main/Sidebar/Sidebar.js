import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TiktokContext } from "../../../tiktok-context";

function Sidebar() {
  const { followingList, userLoggedInData, toggleSignInModal, openLogInModal } =
    useContext(TiktokContext);

  useEffect(() => {
    console.log(userLoggedInData);
  }, []);

  return (
    <>
      <nav className=" py-3 border-bottom border-dark ">
        <ul className="nav flex-column gap-3">
          <li className="">
            <Link
              to={"/"}
              className="d-flex fw-bold fw-bold text-decoration-none nav-link active"
            >
              <div className="nav-icon">
                <i className="fa-solid fa-house"></i>
              </div>
              <span>For You</span>
            </Link>
          </li>
          {userLoggedInData && (
            <>
              <li>
                <Link
                  to="/following"
                  className="d-flex fw-bold fw-bold text-decoration-none nav-link"
                >
                  <div className="nav-icon">
                    <i className="fa-solid fa-user-check"></i>
                  </div>
                  <span>Following</span>
                </Link>
              </li>
              <li>
                <Link
                  to={userLoggedInData ? `/${userLoggedInData.username}` : `/`}
                  className="d-flex fw-bold fw-bold text-decoration-none nav-link"
                >
                  <div className="nav-icon">
                    <i className="fa-solid fa-user"></i>
                  </div>
                  <span>Profile</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <section>
        <small className="fw-semibold d-block">Following accounts</small>
        {userLoggedInData ? (
          followingList.map((account, i) => {
            return (
              <div
                className="d-flex flex-column align-items-start gap-2"
                key={i}
              >
                <Link
                  to={`/${account.username}`}
                  className="text-white text-decoration-none"
                >
                  <div className="d-flex align-items-center gap-2 user">
                    <img
                      src={account.profile_img}
                      alt="avatar"
                      width={30}
                      height={30}
                      className="rounded-circle"
                    />
                    <div>
                      <p className="user-name fw-semibold">
                        {account.username}
                      </p>
                      <small>{account.name}</small>
                    </div>
                  </div>
                </Link>
                {followingList.length > 10 && (
                  <button className="btn btn-link text-decoration-none">
                    Show more
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <>
            <button
              className="btn btn-danger btn-sm w-50 d-block my-2 rounded-0  "
              onClick={() => openLogInModal()}
            >
              <i className="fa-solid fa-right-to-bracket"></i>

              <span className="fw-semibold"> Log in</span>
            </button>
            <button
              className="btn btn-outline-danger btn-sm w-50 d-block my-2 rounded-0 "
              onClick={() => toggleSignInModal()}
            >
              <i className="fa-solid fa-user-plus"></i>
              <span className="fw-semibold"> Sign in</span>
            </button>
          </>
        )}
      </section>
      <footer>
        <ul className="nav gap-1">
          <li>
            <a href="#" className="text-secondary fs-7">
              About
            </a>
          </li>
          <li>
            <a href="#" className="text-secondary fs-7">
              Newsroom
            </a>
          </li>
          <li>
            <a href="#" className="text-secondary fs-7">
              Contact
            </a>
          </li>
          <li>
            <a href="#" className="text-secondary fs-7">
              Careers
            </a>
          </li>
        </ul>
        <ul className="nav gap-1">
          <li>
            <a href="#" className="text-secondary fs-7">
              TikTok for Good
            </a>
          </li>
          <li>
            <a href="#" className="text-secondary fs-7">
              Advertise
            </a>
          </li>
          <li>
            <a href="#" className="text-secondary fs-7">
              TikTok LIVE Creator Networks
            </a>
          </li>
          <li>
            <a href="#" className="text-secondary fs-7">
              Developers
            </a>
          </li>
          <li>
            <a href="#" className="text-secondary fs-7">
              Transparency
            </a>
          </li>
          <li>
            <a href="#" className="text-secondary fs-7">
              TikTok Rewards
            </a>
          </li>
          <li>
            <a href="#" className="text-secondary fs-7">
              TikTok Embeds
            </a>
          </li>
        </ul>
        <ul className="nav gap-1">
          <li>
            <a href="#" className="text-secondary fs-7">
              Help
            </a>
          </li>
          <li>
            <a href="#" className="text-secondary fs-7">
              Safety
            </a>
          </li>
          <li>
            <a href="#" className="text-secondary fs-7">
              Terms
            </a>
          </li>
          <li>
            <a href="#" className="text-secondary fs-7">
              Privacy
            </a>
          </li>
          <li>
            <a href="#" className="text-secondary fs-7">
              Creator Portal
            </a>
          </li>
          <li>
            <a href="#" className="text-secondary fs-7">
              Community
            </a>
          </li>
          <li>
            <a href="#" className="text-secondary fs-7">
              Guidelines
            </a>
          </li>
        </ul>
        <p className="text-secondary fs-7">© 2024 TikTok</p>
      </footer>
    </>
  );
}

export default Sidebar;
