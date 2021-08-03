import React, { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import sweetalert from "sweetalert";
import "./style/Login.css";
import image from "../images/hostel_img.png";
import axios from "axios";
import Spinner from "./magic_components/Spinner";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enroll: "",
      pass: "",
      submit_status: "",
      isLogin: false,
      spinner: false,
    };
  }

  formSubmit = (e) => {
    e.preventDefault();
    this.setState({ spinner: true });
    document.querySelector("button[type=submit]").disabled = true;
    let remember = document.getElementById("flexCheckChecked");
    axios
      .post("http://localhost:3001/student/login", {
        enroll: this.state.enroll.toUpperCase(),
        password: this.state.pass,
      })
      .then((res) => {
        // console.log(res);
        if (res.data === "failed") {
          this.setState({
            submit_status: "Now you didn't login Please try again",
          });
          sweetalert({
            title: "Failed",
            text: `Now you didn't login Please try again`,
            icon: "error",
          });
          document.getElementsByClassName("error-box")[0].focus();
          document.querySelector("button[type=submit]").disabled = false;
          this.setState({ spinner: false });
          // console.log("failed");
        } else if (res.data === "incorrectPass") {
          this.setState({
            submit_status: "--: Incorrect password :--",
          });
          sweetalert({
            title: "Failed",
            text: `Incorrect password`,
            icon: "error",
          });
          document.getElementsByClassName("error-box")[0].focus();
          document.querySelector("button[type=submit]").disabled = false;
          this.setState({ spinner: false });
          // console.log("incorrect password");
        } else if (res.data === "notExist") {
          this.setState({
            submit_status: `This Enrollment No. "${this.state.enroll}" isn't Resistered`,
          });
          sweetalert({
            title: "Failed",
            text: `This Enrollment No. "${this.state.enroll}" isn't Resistered`,
            icon: "error",
          });
          document.getElementsByClassName("error-box")[0].focus();
          document.querySelector("button[type=submit]").disabled = false;
          this.setState({ spinner: false });
          // console.log("use not exists");
        } else if (
          res.data[0].studentId &&
          res.data[0].image &&
          res.data[0].email
        ) {
          sessionStorage.setItem("name", res.data[0].name);
          sessionStorage.setItem("mobile", res.data[0].mobile);
          sessionStorage.setItem("email", res.data[0].email);
          sessionStorage.setItem("dob", res.data[0].dob);
          // sessionStorage.setItem("password", res.data[0].password);
          sessionStorage.setItem("enroll", res.data[0].enroll);
          sessionStorage.setItem("gender", res.data[0].gender);
          sessionStorage.setItem("hostelId", res.data[0].hostelId);
          sessionStorage.setItem(
            "image",
            "http://localhost:3001/" + res.data[0].image
          );
          sessionStorage.setItem("isDiploma", res.data[0].isDiploma);
          sessionStorage.setItem("profile", res.data[0].profile);
          sessionStorage.setItem("roomNo", res.data[0].roomNo);
          sessionStorage.setItem("session", res.data[0].session);
          sessionStorage.setItem("signUpDate", res.data[0].signUpDate);
          sessionStorage.setItem("status", res.data[0].status);
          sessionStorage.setItem("studentId", res.data[0].studentId);
          if (remember.checked) {
            localStorage.setItem("studentId", res.data[0].studentId);
          }
          this.setState({
            isLogin: true,
          });
        } else {
          this.setState({
            submit_status: `Error occurred please try again`,
          });
          sweetalert({
            title: "Failed",
            text: `Error occurred please try again`,
            icon: "error",
          });
          document.getElementsByClassName("error-box")[0].focus();
          document.querySelector("button[type=submit]").disabled = false;
          this.setState({ spinner: false });
          // console.log("Error occurred please try again");
        }
      })
      .catch((err) => {
        this.setState({
          submit_status: `server isn't responding please try again`,
        });
        document.getElementsByClassName("error-box")[0].focus();
        document.querySelector("button[type=submit]").disabled = false;
        this.setState({ spinner: false });
      });
  };

  onChange = (e) => {
    let { name, value } = e.target;
    this.setState((prestate) => {
      return {
        ...prestate,
        [name]: value,
        submit_status: "",
      };
    });
  };

  componentDidMount() {
    const studentId = localStorage.getItem("studentId");
    if (studentId) {
      // console.log(studentId);
      axios
        .post("http://localhost:3001/student/details/id", {
          studentId: studentId,
        })
        .then((res) => {
          if (res.data[0].studentId && res.data[0].image && res.data[0].email) {
            sessionStorage.setItem("name", res.data[0].name);
            sessionStorage.setItem("mobile", res.data[0].mobile);
            sessionStorage.setItem("email", res.data[0].email);
            sessionStorage.setItem("dob", res.data[0].dob);
            // sessionStorage.setItem("password", res.data[0].password);
            sessionStorage.setItem("enroll", res.data[0].enroll);
            sessionStorage.setItem("gender", res.data[0].gender);
            sessionStorage.setItem("hostelId", res.data[0].hostelId);
            sessionStorage.setItem(
              "image",
              "http://localhost:3001/" + res.data[0].image
            );
            sessionStorage.setItem("isDiploma", res.data[0].isDiploma);
            sessionStorage.setItem("profile", res.data[0].profile);
            sessionStorage.setItem("roomNo", res.data[0].roomNo);
            sessionStorage.setItem("session", res.data[0].session);
            sessionStorage.setItem("signUpDate", res.data[0].signUpDate);
            sessionStorage.setItem("status", res.data[0].status);
            sessionStorage.setItem("studentId", res.data[0].studentId);
            this.setState({
              isLogin: true,
            });
          }
        })
        .catch((err) => {
          this.setState({
            submit_status: `Now server isn't responding please login later`,
          });
          document.getElementsByClassName("error-box")[0].focus();
        });
    }
  }

  render() {
    if (this.state.isLogin) {
      return <Redirect to="/home" />;
    } else {
      return (
        <div>
          <div className="container my-5">
            <div className=" container w-50 d-flex justify-content-center text-center  flex-column ">
              <div className="container text-center bg-light border border-dark ">
                <h2 className="text-center my-2">
                  <strong className="text-dark">Login Form</strong>
                </h2>
                <h6 className="error-box rounded p-1 mb-1" tabIndex="0">
                  {this.state.submit_status}
                </h6>
                <h2 className="w-100 m-0 p-0 mt-2">
                  {this.state.spinner ? <Spinner /> : ""}
                </h2>
                <img src={image} alt="wait.." className="responsive w-100" />
                <form onSubmit={this.formSubmit} className=" text-center ">
                  <label
                    htmlFor="roll"
                    className="text-start w-100 text-dark mt-2"
                  >
                    <b> Enrollment No.</b>
                  </label>
                  <input
                    type="text"
                    name="enroll"
                    onChange={this.onChange}
                    value={this.state.enroll}
                    className="form-control"
                    placeholder="Enter Enrollment No."
                    required
                  />
                  <label htmlFor="pass" className="text-start w-100 text-dark">
                    <b> Password</b>
                  </label>
                  <input
                    type="password"
                    name="pass"
                    value={this.state.pass}
                    onChange={this.onChange}
                    className="form-control "
                    placeholder="Enter Password"
                    required
                    autoComplete="true"
                  />
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="on"
                      id="flexCheckChecked"
                      defaultChecked
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckChecked"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="d-flex justify-content-between flex-wrap  ">
                    <button
                      type="submit"
                      className=" border border-dark mt-2 btn-sm btn btn-success w-100 text-dark"
                    >
                      <b> LOGIN</b>
                    </button>
                    <button className=" border border-dark mt-2 btn-sm btn w-100 btn-warning">
                      <b> CANCEL</b>
                    </button>
                    <div className="container">
                      <div className=" d-flex text-primary w-100  justify-content-between">
                        <p className="forget-container">forget password</p>
                        <Link to="/signup" className="forget-container">
                          SignUp
                        </Link>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
