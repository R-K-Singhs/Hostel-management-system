import React from "react";
// import { useHistory } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import "./style/Navbar.css";
import listicon from "../images/list_icon_lg.svg";
import sistecicon from "../images/sistec_logo.png";
import image from "../images/boy_img_logo.png";

export default function AdminNavbar() {
  //   const history = useHistory();

  const logout = () => {
    localStorage.removeItem("studentId");
    sessionStorage.clear();
    // return history.push("/");
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
                {/* <li className="nav-item rounded text-buttom ">
                  <NavLink
                    className="nav-link active mt-2"
                    to="#"
                    aria-current="page"
                    activeClassName="active-link"
                    exact
                  >
                    Home
                  </NavLink>
                </li> */}
                <li className="nav-item rounded text-buttom ">
                  <NavLink
                    className="nav-link active mt-2"
                    to="#"
                    aria-current="page"
                    activeClassName="active-link"
                    exact
                  >
                    Notics
                  </NavLink>
                </li>
                {/* <li className="nav-item rounded ">
                  <NavLink
                    className="nav-link active mt-2"
                    aria-current="page"
                    activeClassName="active-link"
                    to="#"
                    exact
                  >
                    Warden
                  </NavLink>
                </li> */}
                <li className="nav-item rounded mx-0">
                  <div className="nav-link dropdown active" aria-current="page">
                    <button
                      className="dropdown-btn btn dropdown-toggle "
                      type="button"
                      id="dropdownMenuButtonStudents"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      students
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButtonStudents"
                    >
                      <li>
                        <Link className="dropdown-item" to="#">
                          1st year
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="#">
                          2nd year
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="#">
                          3rd year
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="#">
                          4th year
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="nav-item rounded mx-0">
                  <div className="nav-link dropdown active" aria-current="page">
                    <button
                      className="dropdown-btn btn dropdown-toggle "
                      type="button"
                      id="dropdownMenuButtonHostels"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Hostel
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButtonHostels"
                    >
                      <li>
                        <Link className="dropdown-item" to="#">
                          hostel-1
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="#">
                          hostel-2
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="#">
                          hostel-3
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <div className="d-flex justify-content-center">
                  <div className="mx-1 search" style={{ maxWidth: "150px" }}>
                    <input
                      className="mt-2 form-control"
                      type="search"
                      placeholder="Search Student "
                      aria-label="Search"
                    />
                  </div>
                </div>

                {/* <li className="nav-item"> */}
                <div className=" dropdown m-2">
                  <button
                    className=" p-0 px-2 btn btn-primary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span>{`rahul singh's`} </span>
                    <img id="student_image_icon" src={image} alt="Img.." />
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
