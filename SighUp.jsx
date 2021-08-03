import React, { Component } from "react";
import "./style/SignUp.css";
import image from "../images/signup.png";
import { Link } from "react-router-dom";
import validator from "validator";
import { Redirect } from "react-router";
import sweetalert from "sweetalert";
import axios from "axios";
import Spinner from "./magic_components/Spinner";

export default class SighUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submit_status: "",
      mobile_err: "",
      pass_err: "",
      email_err: "",
      roll_err: "",
      name: "",
      mobile: "",
      email: "",
      dob: "",
      pass: "",
      repass: "",
      enroll: "",
      image: "",
      gender: "",
      session: "",
      spinner: false,
      isdiploma: false,
    };
  }

  formSubmit = (event) => {
    event.preventDefault();
    if (
      this.state.email_err === "" &&
      this.state.mobile_err === "" &&
      this.state.roll_err === "" &&
      this.state.pass_err === ""
    ) {
      const session = this.state.session;
      const enroll = this.state.enroll;

      this.setState({
        submit_status: "Please wait........",
        spinner: true,
      });
      document.getElementsByClassName("error-box")[0].focus();
      if (this.state.isdiploma) {
        if (
          (parseInt(session.slice(0, 4)) + 1).toString() ===
          "20" + enroll.slice(6, 8)
        ) {
          // console.log("verifyed diploma");
          document.querySelector("input[type=submit]").disabled = true;
          if (this.sendRequestForSignup()) {
            // console.log("result-2");
            document.querySelector("input[type=submit]").disabled = false;
            this.setState({
              spinner: false,
            });
          }
        } else {
          this.setState(
            {
              submit_status: `your session "${
                parseInt(session.slice(0, 4)) +
                1 +
                "" +
                parseInt(session.slice(4))
              }" is not matched according to your enrollment no. "${enroll}"`,
              spinner: false,
            },
            () => {
              document.getElementsByClassName("error-box")[0].focus();
            }
          );
        }
      } else {
        if (
          parseInt(session.slice(0, 4)).toString() ===
          "20" + enroll.slice(6, 8)
        ) {
          // console.log("verifyed 12th");
          document.querySelector("input[type=submit]").disabled = true;
          if (this.sendRequestForSignup()) {
            // console.log("result-1");
            this.setState({
              spinner: false,
            });
          }
        } else {
          this.setState(
            {
              submit_status: `your session "${session}" is not matched according to your enrollment no. "${enroll}"`,
              spinner: false,
            },
            () => {
              document.getElementsByClassName("error-box")[0].focus();
            }
          );
        }
      }
    } else {
      this.setState(
        {
          submit_status: "Please enter all data correctly ",
          spinner: false,
        },
        () => {
          document.getElementsByClassName("error-box")[0].focus();
        }
      );
    }
    console.log("your form is submitted");
  };

  sendRequestForSignup() {
    // console.log("request sended");
    let formdata = new FormData();
    formdata.append("image", this.state.image);
    formdata.append("name", this.state.name);
    formdata.append("mobile", this.state.mobile);
    formdata.append("email", this.state.email);
    formdata.append("enroll", this.state.enroll.toUpperCase());
    formdata.append("password", this.state.pass);
    formdata.append("dob", this.state.dob);
    formdata.append("gender", this.state.gender);
    formdata.append("session", this.state.session);
    formdata.append("isdiploma", this.state.isdiploma);
    formdata.append("profile", "student");
    axios
      .post("http://localhost:3001/student/signup", formdata)
      .then((res) => {
        if (res.data === "done" && res.status === 200) {
          this.setState(
            {
              submit_status: `--:CONGRATULATIONS:-- Your are resistered successfully Now you can enjoy with Sistec_hostel`,
              spinner: false,
            },
            () => {
              document.getElementsByClassName("error-box")[0].focus();
              document.querySelector("input[type=submit]").disabled = false;
            }
          );
          sweetalert({
            title: "Successful",
            text: "Your account is cteated successfully",
            icon: "success",
          });
        } else if (res.data === "DuplicateUser" && res.status === 200) {
          this.setState(
            {
              submit_status: `Email Id: '${this.state.email}' OR Enrollment No: '${this.state.enroll}' already have resistered `,
              spinner: false,
            },
            () => {
              document.getElementsByClassName("error-box")[0].focus();
              document.querySelector("input[type=submit]").disabled = false;
            }
          );
          sweetalert({
            title: "Failed",
            text: `Email Id: '${this.state.email}' OR Enrollment No: '${this.state.enroll}' already have resistered `,
            icon: "error",
          });
        } else {
          this.setState(
            {
              submit_status: "Your Id is not created Please try again",
              spinner: false,
            },
            () => {
              document.getElementsByClassName("error-box")[0].focus();
              document.querySelector("input[type=submit]").disabled = false;
            }
          );
          sweetalert({
            title: "Failed",
            text: `Your Id is not created Please try again`,
            icon: "error",
          });
        }
      })
      .catch((err) => {
        // console.log(err);
        this.setState(
          {
            submit_status: "Your Id is not created Please try again",
            spinner: false,
          },
          () => {
            document.getElementsByClassName("error-box")[0].focus();
            document.querySelector("input[type=submit]").disabled = false;
          }
        );
      });
    // console.log("request finished");
  }

  dataChange = (event) => {
    const { name, value } = event.target;
    // console.log(name, value);
    this.setState(
      (state) => {
        return {
          ...state,
          [name]: value,
          submit_status: "",
        };
      },
      () => {
        this.checkError(name);
      }
    );
  };

  checkError = (name) => {
    let data;
    if (name === "mobile") {
      data = this.state.mobile;
      if (!validator.isMobilePhone(data) || data.length !== 10) {
        this.setState({
          mobile_err: "Invalied Mobile Number",
        });
      } else {
        this.setState({
          mobile_err: "",
        });
      }
    } else if (name === "email") {
      data = this.state.email;
      if (!validator.isEmail(data)) {
        this.setState({
          email_err: " Invalied email",
        });
      } else {
        this.setState({
          email_err: "",
        });
      }
    } else if (name === "enroll") {
      data = this.state.enroll.toUpperCase().trim();
      if (data.length === 12 && validator.isAlpha(data.slice(4, 6))) {
        if (data.indexOf("0514") === 0 && data.slice(4, 6) === "PY") {
          this.setState({
            roll_err: "",
          });
        } else if (
          data.indexOf("0187") === 0 &&
          (data.slice(4, 6) === "EC" ||
            data.slice(4, 6) === "CS" ||
            data.slice(4, 6) === "ME" ||
            data.slice(4, 6) === "EX" ||
            data.slice(4, 6) === "CE")
        ) {
          this.setState({
            roll_err: "",
          });
        } else {
          this.setState({
            roll_err: "Invalied Enrollment no.",
          });
        }
      } else {
        this.setState({
          roll_err: "Invalied Enrollment no.",
        });
      }
    } else if (name === "repass" || name === "pass") {
      data = this.state.pass;
      if (data.length < 6) {
        this.setState({
          pass_err: "Password must have 6 charactor",
        });
      } else if (data !== this.state.repass) {
        this.setState({
          pass_err: "Both password should be same",
        });
      } else {
        this.setState({
          pass_err: "",
        });
      }
    }
  };

  render() {
    if (sessionStorage.getItem("studentId")) {
      return <Redirect to="/home" />;
    } else {
      return (
        <div className="container my-5">
          <div className="row m-0 w-100">
            <div className=" col-xxl-5 col-xl-6 col-lg-7 col-md-8 col-sm-9 col-10  mx-auto ">
              <div className="row w-auto pb-4 bg-light border border-dark">
                <h1 className="text-dark m-0 p-0 pb-1 ">
                  <div className="text-end m-0 p-0 pe-3">
                    <Link to="/" style={{ textDecoration: "none" }}>
                      <span id="close" title="Close">
                        &times;
                      </span>
                    </Link>
                  </div>
                  <div className="w-100 p-0 m-0 text-center">
                    <strong id="heading">SignUp</strong>
                  </div>
                </h1>
                <div className=" row m-auto">
                  <span
                    className="error-box rounded w-100 p-1 m-0"
                    tabIndex="0"
                  >
                    {this.state.submit_status}
                  </span>
                  <h2 className="w-100 m-0 p-0 mt-2">
                    {this.state.spinner ? <Spinner /> : ""}
                  </h2>
                </div>
                <div className="col-12  col-md-6  order-md-2 p-0">
                  <div className="img-container d-flex justify-content-center align-item-center">
                    <div className="signup_img m-auto ">
                      <img
                        id="image"
                        src={image}
                        className="responsive"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 text-dark  col-md-6 order-md-1 p-0 ">
                  <form onSubmit={this.formSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input
                      className="form-control form-control-sm"
                      type="text"
                      name="name"
                      value={this.state.name}
                      onChange={this.dataChange}
                      placeholder="Enter your name"
                      required
                    />
                    <label htmlFor="mobile">Mobile Number:</label>
                    <input
                      className="form-control form-control-sm"
                      type="number"
                      name="mobile"
                      value={this.state.mobile}
                      onChange={this.dataChange}
                      placeholder="Enter your mobile no."
                      required
                    />
                    <p>{this.state.mobile_err}</p>
                    <label htmlFor="email">Email Id:</label>
                    <input
                      className="form-control form-control-sm"
                      type="text"
                      name="email"
                      value={this.state.email}
                      onChange={this.dataChange}
                      placeholder="Enter your Email Id"
                      required
                    />
                    <p>{this.state.email_err}</p>
                    <label htmlFor="dob">Date Of Birth:</label>
                    <input
                      className="form-control form-control-sm"
                      type="date"
                      name="dob"
                      value={this.state.dob}
                      onChange={this.dataChange}
                      placeholder="Choose your DOB"
                      required
                    />
                    <label htmlFor="dob">Gender:</label>
                    <div className="d-flex justify-content-between form-control form-control-sm">
                      <div className="text-start">
                        <input
                          className="m-0 form-check-input"
                          type="radio"
                          name="gender"
                          value="male"
                          onChange={this.dataChange}
                          required
                        />
                        {" Male"}
                      </div>
                      <div className="text-start">
                        <input
                          className="m-0 form-check-input"
                          type="radio"
                          name="gender"
                          value="female"
                          onChange={this.dataChange}
                          required
                        />
                        {" Female"}
                      </div>
                      <div className="text-start ">
                        <input
                          className="m-0 form-check-input"
                          type="radio"
                          name="gender"
                          value="other"
                          onChange={this.dataChange}
                          required
                        />
                        {" Other"}
                      </div>
                    </div>

                    <label htmlFor="isdiploma">Completed Degree:</label>
                    <div className="d-flex justify-content-between form-control form-control-sm">
                      <div className="text-start">
                        <input
                          className="m-0 form-check-input"
                          type="radio"
                          name="isdiploma"
                          value="false"
                          onChange={() => {
                            this.setState(
                              {
                                isdiploma: false,
                                submit_status: "",
                              },
                              () => {
                                let sess =
                                  document.getElementById("session").options[
                                    document.getElementById("session")
                                      .selectedIndex
                                  ].value;
                                this.setState({
                                  session: sess,
                                  submit_status: "",
                                });
                              }
                            );
                          }}
                          required
                        />
                        {" 12th"}
                      </div>
                      <div className="text-start w-50">
                        <input
                          className="m-0 form-check-input"
                          type="radio"
                          name="isdiploma"
                          value="true"
                          onChange={() => {
                            this.setState(
                              {
                                isdiploma: true,
                                submit_status: "",
                              },
                              () => {
                                let sess =
                                  document.getElementById("session").options[
                                    document.getElementById("session")
                                      .selectedIndex
                                  ].value;
                                this.setState({
                                  session: sess,
                                  submit_status: "",
                                });
                              }
                            );
                          }}
                          required
                        />
                        {" Diploma"}
                      </div>
                    </div>
                    <label htmlFor="session">Session:</label>
                    <select
                      className="form-select form-select-sm"
                      aria-label="Default select example"
                      id="session"
                      onChange={(e) => {
                        this.setState({
                          submit_status: "",
                          session:
                            e.target.options[e.target.selectedIndex].value,
                        });
                      }}
                      required
                    >
                      {this.state.isdiploma ? (
                        <>
                          <option disabled>Select Session</option>
                          <option value="2014-2018">2015-2018</option>
                          <option value="2015-2019">2016-2019</option>
                          <option value="2016-2020">2017-2020</option>
                          <option value="2017-2021">2018-2021</option>
                          <option value="2018-2022">2019-2022</option>
                          <option value="2019-2023">2020-2023</option>
                          <option value="2020-2024">2021-2024</option>
                          <option value="2021-2025">2022-2025</option>
                          <option value="2022-2026">2023-2026</option>
                          <option value="2023-2027">2024-2027</option>
                          <option value="2024-2028">2025-2028</option>
                          <option value="2025-2029">2026-2029</option>
                          <option value="2026-2030">2027-2030</option>
                        </>
                      ) : (
                        <>
                          <option disabled>Select Session</option>
                          <option value="2015-2019">2015-2019</option>
                          <option value="2016-2020">2016-2020</option>
                          <option value="2017-2021">2017-2021</option>
                          <option value="2018-2022">2018-2022</option>
                          <option value="2019-2023">2019-2023</option>
                          <option value="2020-2024">2020-2024</option>
                          <option value="2021-2025">2021-2025</option>
                          <option value="2022-2026">2022-2026</option>
                          <option value="2023-2027">2023-2027</option>
                          <option value="2024-2028">2024-2028</option>
                          <option value="2025-2029">2025-2029</option>
                          <option value="2026-2030">2026-2030</option>
                        </>
                      )}
                    </select>
                    <label htmlFor="enroll">Enrollment Number:</label>
                    <input
                      className="form-control form-control-sm"
                      type="text"
                      name="enroll"
                      value={this.state.enroll}
                      onChange={this.dataChange}
                      placeholder="Enter your Enrollment No."
                      required
                    />
                    <p>{this.state.roll_err}</p>
                    <label htmlFor="image">Profile image:</label>
                    <input
                      className="form-control form-control-sm"
                      type="file"
                      name="image"
                      onChange={(e) => {
                        this.setState({ image: e.target.files[0] });
                      }}
                      required
                    />

                    <label htmlFor="pass">Password:</label>
                    <input
                      className="form-control form-control-sm"
                      type="text"
                      name="pass"
                      value={this.state.pass}
                      onChange={this.dataChange}
                      placeholder="Creat your Password"
                      required
                    />
                    <p>{this.state.pass_err}</p>
                    <label htmlFor="repass">Re Password:</label>
                    <input
                      className="form-control form-control-sm"
                      type="text"
                      name="repass"
                      value={this.state.repass}
                      onChange={this.dataChange}
                      placeholder="Enter Re- Password"
                      required
                    />
                    <input
                      type="submit"
                      value="Rester Now"
                      className="btn btn-success btn-sm mt-2 w-100"
                    />
                    <Link
                      id="cancelbtn"
                      className="btn btn-warning btn-sm w-100 mt-1"
                      to="/"
                    >
                      <b>Back</b>
                    </Link>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
