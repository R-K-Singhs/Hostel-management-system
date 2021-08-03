import React from "react";
import { useHistory } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import "./style/Navbar.css";
import listicon from "../images/list_icon_lg.svg";
import sistecicon from "../images/sistec_logo.png";

export default function Navbar() {
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem("studentId");
    sessionStorage.clear();
    return history.push("/");
  };

  return (
    <>
      <div className="">
        <nav className="navbar navbar-expand-lg fixed-top navbar-light ">
          <div className="container-fluid">
            <img id="sistec_logo" src={sistecicon} alt="" />
            <span>
              <b id="sistec_title">SISTec-Hostel</b>
            </span>
            <button
              className="navbar-toggler border border-primary "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <img src={listicon} alt="" />
              {/* <span class="navbar-toggler-icon"></span> */}
            </button>

            <div className="collapse navbar-collapse " id="navbarNav">
              <ul className="navbar-nav me-2 me-lg-0 ms-auto mb-lg-0">
                <li className="nav-item rounded text-buttom ">
                  <NavLink
                    className="nav-link active mt-2"
                    to="/home"
                    aria-current="page"
                    activeClassName="active-link"
                    exact
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item  rounded ">
                  <NavLink
                    className="nav-link active mt-2 "
                    to="/aboutRoom"
                    aria-current="page"
                    activeClassName="active-link"
                    exact
                  >
                    Room
                  </NavLink>
                </li>
                <li className="nav-item rounded ">
                  <NavLink
                    className="nav-link active mt-2"
                    aria-current="page"
                    activeClassName="active-link"
                    to="/batchmates"
                    exact
                  >
                    Batchmates
                  </NavLink>
                </li>
                <li className="nav-item rounded ">
                  <NavLink
                    className="nav-link active mt-2"
                    aria-current="page"
                    activeClassName="active-link"
                    to="/groupChats"
                    exact
                  >
                    Groups-chat
                  </NavLink>
                </li>

                <li className="nav-item rounded mx-0  ">
                  <div className="nav-link dropdown active" aria-current="page">
                    <button
                      className="dropdown-btn btn dropdown-toggle "
                      type="button"
                      id="dropdownMenuButton2"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Senoirs
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton2"
                    >
                      <li>
                        <Link className="dropdown-item" to="#">
                          Senoir
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="#">
                          Super Senior
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="#">
                          Mega Senior
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="nav-item rounded mx-0 ">
                  <div className="nav-link dropdown active" aria-current="page">
                    <button
                      className="dropdown-btn btn dropdown-toggle "
                      type="button"
                      id="dropdownMenuButton3"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Juniors
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton3"
                    >
                      <li>
                        <Link className="dropdown-item" to="#">
                          Junior
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="#">
                          Super Junior
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="#">
                          Mega Junior
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>

                {/* <li className="nav-item"> */}
                <div className=" dropdown m-2">
                  <button
                    className=" p-0 px-2 btn btn-primary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span>{sessionStorage.getItem("name")} </span>
                    <img
                      id="student_image_icon"
                      src={sessionStorage.getItem("image")}
                      alt="Img.."
                    />
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <Link className="dropdown-item  rounded" to="#">
                        your Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        className="logout-btn dropdown-item rounded "
                        onClick={logout}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div style={{ height: "4rem" }}></div>
    </>
  );
}
