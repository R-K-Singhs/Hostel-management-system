import React, { useEffect, useState } from "react";
import "./style/Hostels.css";
import { Link } from "react-router-dom";
import validator from "validator";
import { Redirect } from "react-router";
import sweetalert from "sweetalert";
import axios from "axios";
import EmptyPage from "./child_components/EmptyPage";
import ErrorPage from "./child_components/ErrorPage";
import Spinner from "./magic_components/Spinner";
import image from "../images/image_not_found.png";
import RatingIndicator from "./child_components/RatingIndicator";
import AboutHostel from "./AboutHostel";

export default function Hostels() {
  const [hostels, sethostels] = useState([]);
  const [submitStatus, setsubmitStatus] = useState("");
  const [showSpinner, setshowSpinner] = useState(false);
  const adminId = "SistecAdmin0187";
  const [showdetails, setshowdetails] = useState(false);
  const [hostelIndex, sethostelIndex] = useState("0");

  useEffect(() => {
    console.log("componenet did mount");

    axios
      .get(`http://localhost:3001/admin/${adminId}/hostels/details`)
      .then((result) => {
        if (hostels.length <= 0) {
          console.log("data access successfully", result.data);
          if (result.data !== "empty") {
            sethostels(result.data);
          }
        } else if (hostels.length !== result.data.length) {
          console.log("data updated successfully", result.data);
          if (result.data !== "empty") {
            sethostels(result.data);
          }
        }
      })
      .catch((err) => {
        return console.log("Error : ", err);
      });
  });

  const addNewHostel = (e) => {
    e.preventDefault();
    const addHostelForm = document.getElementById("addNewHostelForm");
    const errorbox = addHostelForm.getElementsByClassName("error-box")[0];
    const btnSubmit = addHostelForm.querySelector("button[type=submit]");
    const inputs = addHostelForm.querySelectorAll(
      "input[type='text'] ,input[type='number'],textarea"
    );
    const files = addHostelForm.querySelectorAll("input[type='file']");
    console.log("add hostel form submitted");
    setshowSpinner(true);
    btnSubmit.disabled = true;

    errorbox.style.backgroundColor = "cyan";
    errorbox.style.color = "purple";
    setsubmitStatus("Please wait......");
    sweetalert("", "Please wait...", "info", {
      closeOnClickOutside: false,
      buttons: false,
      className: "swa-text",
    });
    errorbox.focus();
    const formdata = new FormData();
    formdata.append("hostelName", inputs[0].value);
    formdata.append("hostelFee", inputs[1].value);
    formdata.append("wardenEmail", inputs[2].value);
    formdata.append("aboutHostel", inputs[3].value);
    formdata.append("title1", inputs[4].value);
    formdata.append("discription1", inputs[5].value);
    formdata.append("title2", inputs[6].value);
    formdata.append("discription2", inputs[7].value);
    formdata.append("title3", inputs[8].value);
    formdata.append("discription3", inputs[9].value);
    formdata.append("title4", inputs[10].value);
    formdata.append("discription4", inputs[11].value);
    formdata.append("title5", inputs[12].value);
    formdata.append("discription5", inputs[13].value);
    formdata.append("image1", files[0].files[0]);
    formdata.append("image2", files[1].files[0]);
    formdata.append("image3", files[2].files[0]);
    formdata.append("image4", files[3].files[0]);
    formdata.append("image5", files[4].files[0]);

    formdata.forEach((value, key) => {
      console.log(key, value);
    });

    axios
      .post(`http://localhost:3001/admin/${adminId}/hostel/newhostel`, formdata)
      .then((res) => {
        if (res.data === "done" && res.status === 200) {
          setshowSpinner(false);
          setsubmitStatus(`--:CONGRATULATIONS:-- Hostel Added Successfully`);
          errorbox.style.backgroundColor = "green";
          errorbox.style.color = "yellow";
          btnSubmit.disabled = false;
          sweetalert({
            title: "--:CONGRATULATIONS:--",
            text: "Hostel Added Successfully",
            icon: "success",
          });
          errorbox.focus();
        } else {
          setshowSpinner(false);
          setsubmitStatus(`Failed please try again`);
          errorbox.style.backgroundColor = "red";
          errorbox.style.color = "yellow";
          btnSubmit.disabled = false;
          sweetalert({
            title: "Failed",
            text: `Failed please try again`,
            icon: "error",
          });
          errorbox.focus();
        }
      })
      .catch((err) => {
        setshowSpinner(false);
        setsubmitStatus(`Failed due to your connection please try again`);
        errorbox.style.backgroundColor = "red";
        errorbox.style.color = "yellow";
        btnSubmit.disabled = false;
        sweetalert({
          title: "Failed",
          text: `Failed due to your connection please try again`,
          icon: "error",
        });
        errorbox.focus();
      });
  };

  const updateHostel = (e) => {
    e.preventDefault();

    const addHostelForm = document.getElementById("editHostelForm");
    const errorbox = addHostelForm.getElementsByClassName("error-box")[0];
    const btnSubmit = addHostelForm.querySelector("button[type=submit]");
    const inputs = addHostelForm.querySelectorAll(
      "input[type='text'] ,input[type='number'],textarea"
    );
    const files = addHostelForm.querySelectorAll("input[type='file']");
    console.log("update hostel form submitted");
    setshowSpinner(true);
    btnSubmit.disabled = true;

    errorbox.style.backgroundColor = "cyan";
    errorbox.style.color = "purple";
    setsubmitStatus("Please wait......");
    sweetalert("", "Please wait...", "info", {
      closeOnClickOutside: false,
      buttons: false,
      className: "swa-text",
    });
    errorbox.focus();
    const formdata = new FormData();

    formdata.append("hostelId", hostels[hostelIndex].hostelId);
    console.log(formdata.get("hostelId"));
    formdata.append("hostelName", inputs[0].value);
    formdata.append("hostelFee", inputs[1].value);
    formdata.append("wardenEmail", inputs[2].value);
    formdata.append("aboutHostel", inputs[3].value);
    formdata.append("title1", inputs[4].value);
    formdata.append("discription1", inputs[5].value);
    formdata.append("title2", inputs[6].value);
    formdata.append("discription2", inputs[7].value);
    formdata.append("title3", inputs[8].value);
    formdata.append("discription3", inputs[9].value);
    formdata.append("title4", inputs[10].value);
    formdata.append("discription4", inputs[11].value);
    formdata.append("title5", inputs[12].value);
    formdata.append("discription5", inputs[13].value);

    if (files[0].files[0]) {
      formdata.append("isImg1", "true");
      formdata.append("image1", files[0].files[0]);
    } else {
      formdata.append("isImg1", "false");
      formdata.append("image1", hostels[hostelIndex].image1);
    }
    if (files[1].files[0]) {
      formdata.append("isImg2", "true");
      formdata.append("image2", files[1].files[0]);
    } else {
      formdata.append("isImg2", "false");
      formdata.append("image2", hostels[hostelIndex].image2);
    }
    if (files[2].files[0]) {
      formdata.append("isImg3", "true");
      formdata.append("image3", files[2].files[0]);
    } else {
      formdata.append("isImg3", "false");
      formdata.append("image3", hostels[hostelIndex].image3);
    }
    if (files[3].files[0]) {
      formdata.append("isImg4", "true");
      formdata.append("image4", files[3].files[0]);
    } else {
      formdata.append("isImg4", "false");
      formdata.append("image4", hostels[hostelIndex].image4);
    }
    if (files[4].files[0]) {
      formdata.append("isImg5", "true");
      formdata.append("image5", files[4].files[0]);
    } else {
      formdata.append("isImg5", "false");
      formdata.append("image5", hostels[hostelIndex].image5);
    }

    // formdata.forEach((value, key) => {
    //   console.log(value);
    // });

    axios
      .post(
        `http://localhost:3001/admin/${adminId}/hostel/updatehostel`,
        formdata
      )
      .then((res) => {
        if (res.data === "done" && res.status === 200) {
          setshowSpinner(false);
          setsubmitStatus(`--:CONGRATULATIONS:-- Hostel updated Successfully`);
          errorbox.style.backgroundColor = "green";
          errorbox.style.color = "yellow";
          btnSubmit.disabled = false;
          sweetalert({
            title: "--:CONGRATULATIONS:--",
            text: "Hostel Added Successfully",
            icon: "success",
          });
          errorbox.focus();
        } else {
          setshowSpinner(false);
          setsubmitStatus(`Failed please try again`);
          errorbox.style.backgroundColor = "red";
          errorbox.style.color = "yellow";
          btnSubmit.disabled = false;
          sweetalert({
            title: "Failed",
            text: `Failed please try again`,
            icon: "error",
          });
          errorbox.focus();
        }
      })
      .catch((err) => {
        setshowSpinner(false);
        setsubmitStatus(`Failed due to your connection please try again`);
        errorbox.style.backgroundColor = "red";
        errorbox.style.color = "yellow";
        btnSubmit.disabled = false;
        sweetalert({
          title: "Failed",
          text: `Failed due to your connection please try again`,
          icon: "error",
        });
        errorbox.focus();
      });
  };

  const hostelDetails = (isShow) => {
    setshowdetails(isShow);
  };

  return (
    <div>
      {showdetails ? (
        <AboutHostel hostelDetails={[hostelDetails, hostels[hostelIndex]]} />
      ) : (
        <>
          {hostels.length >= 1 ? (
            hostels.map((value, index) => (
              <div key={index}>
                <div className="hostels-card-box m-4  rounded  ">
                  <div className=" card text-start border border-1 border-info">
                    <div className="card-header d-flex justify-content-between">
                      <h3>
                        <b>{value.hostelName}</b>
                      </h3>

                      <div className="d-flex">
                        <span className="mt-1 me-1"> Rating: </span>
                        <RatingIndicator rating={value.rating} />
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-8 col-12 order-sm-1  order-2">
                          <h6 className="card-title">
                            Hostel Fee :{" "}
                            <b>
                              <i>{value.hostelFee}</i>
                            </b>
                            /year
                          </h6>
                          <h6 className="card-title">
                            Warden Mobile No. :{" "}
                            <span>
                              <b>
                                <i>{value.wardenMobile}</i>
                              </b>
                            </span>
                          </h6>
                          <h6 className="card-title">
                            Warden Email Id :{" "}
                            <span>
                              <b>
                                <i>{value.wardenEmail}</i>
                              </b>
                            </span>
                          </h6>
                          <br />

                          <h6>
                            <b>About Hostel</b>
                          </h6>
                          <hr />
                          <p
                            className="text-secondary"
                            style={{ fontSize: "1rem" }}
                          >
                            {value.aboutHostel}
                          </p>
                        </div>
                        <div className="col-sm-4 col-12 order-1 order-sm-2 text-center">
                          <img
                            src={
                              value.wardenImage === "null"
                                ? image
                                : value.wardenImage
                            }
                            alt="no image"
                            className="img-thumbnail"
                            style={{ maxHeight: "300px", maxWidth: "300px" }}
                          />
                          <h6 className="blockquote-footer">
                            Warden :{" "}
                            <cite title="Source Title">{value.wardenName}</cite>
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer text-muted text-end">
                      <button
                        className="btn btn-success me-2"
                        onClick={(e) => {
                          sethostelIndex(e.target.value);
                          hostelDetails(true);
                          // console.log(e.target.value);
                        }}
                        value={index}
                      >
                        Show Details
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#editHostelForm"
                        onClick={(e) => {
                          sethostelIndex(e.target.value);
                          // console.log(e.target.value);
                        }}
                        value={index}
                      >
                        Edit Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <EmptyPage />
          )}
          <div className="mx-2">
            <button
              className="w-100 btn btn-lg btn-primary "
              data-bs-toggle="modal"
              data-bs-target="#addNewHostelForm"
            >
              Add Hostel
            </button>
            <button className="w-100 btn btn-lg btn-warning my-2">
              <b>Back</b>
            </button>
          </div>
        </>
      )}

      {/* <!-- Modal for Edit hostel profile --> */}
      <form
        className="modal fade m-0 p-0"
        id="editHostelForm"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        onSubmit={updateHostel}
      >
        <div className="modal-dialog modal-fullscreen border border-2 border-info rounded">
          <div className="modal-content">
            <div className="modal-header bg-info">
              <h5 className="modal-title" id="exampleModalLabel">
                <b>Edit Hostel Details</b>
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className=" row m-auto">
                <h2 className="w-100 m-0 p-0">
                  {showSpinner ? <Spinner /> : ""}
                </h2>
                <span
                  className="error-box rounded w-100 p-2 m-0 mt-2"
                  tabIndex="0"
                  style={{ boxShadow: "none" }}
                >
                  {submitStatus}
                </span>
              </div>
              <div className="">
                <label htmlFor="" className="form-label">
                  Hostel name
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Enter hostel name"
                  defaultValue={
                    hostels.length >= 1 ? hostels[hostelIndex].hostelName : ""
                  }
                />
              </div>
              <div className="">
                <label htmlFor="" className="form-label">
                  Hostel Fee per year
                </label>
                <input
                  type="number"
                  className="form-control form-control-sm mb-2"
                  placeholder="Enter hostel Fee as per year"
                  defaultValue={
                    hostels.length >= 1 ? hostels[hostelIndex].hostelFee : ""
                  }
                />
              </div>

              <div className="">
                <label htmlFor="" className="form-label">
                  Warden's email Id
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Enter warden's Email Id as resistered"
                  defaultValue={
                    hostels.length >= 1 ? hostels[hostelIndex].wardenEmail : ""
                  }
                />
              </div>
              <div className="">
                <label htmlFor="" className="form-label">
                  About hostel
                </label>
                <textarea
                  className="form-control form-control-sm"
                  cols="30"
                  rows="3"
                  placeholder="write a short discription"
                  defaultValue={
                    hostels.length >= 1 ? hostels[hostelIndex].aboutHostel : ""
                  }
                ></textarea>
              </div>
              <label htmlFor="" className="form-label">
                <b>Upload Images</b>
              </label>
              <div className="border border-1 border-secondary p-1 bg-light">
                <div className="row">
                  <div className="col-12 col-sm-9 order-sm-1 order-2">
                    <input
                      className="form-control form-control-sm"
                      type="file"
                      accept="image/jpg, image/jpeg"
                      onChange={(e) => {
                        let file = e.target.files[0];
                        const img =
                          document.getElementById("updateHostelImage1");
                        if (file) {
                          let read = new FileReader();
                          read.readAsDataURL(file);
                          read.onload = function (event) {
                            img.src = event.target.result;
                          };
                        } else {
                          img.src =
                            "http://localhost:3001/" +
                            hostels[hostelIndex].image1;
                        }
                      }}
                    />
                    <input
                      className="form-control form-control-sm"
                      type="text"
                      placeholder="Tittle"
                      defaultValue={
                        hostels.length >= 1 ? hostels[hostelIndex].title1 : ""
                      }
                    />
                    <textarea
                      className="form-control form-control-sm"
                      id=""
                      cols="30"
                      rows="2"
                      placeholder="Write a discription"
                      defaultValue={
                        hostels.length >= 1
                          ? hostels[hostelIndex].discription1
                          : ""
                      }
                    ></textarea>
                  </div>
                  <div className="col-12 col-sm-3 order-sm-2 order-1">
                    <img
                      id="updateHostelImage1"
                      src={
                        hostels.length >= 1
                          ? "http://localhost:3001/" +
                            hostels[hostelIndex].image1
                          : image
                      }
                      alt=""
                      style={{ maxHeight: "120px", maxWidth: "100%" }}
                    />
                  </div>
                </div>
              </div>
              <div className="border border-1 border-secondary p-1 bg-light">
                <div className="row">
                  <div className="col-12 col-sm-9 order-sm-1 order-2">
                    <input
                      className="form-control form-control-sm"
                      type="file"
                      accept="image/jpg, image/jpeg"
                      onChange={(e) => {
                        let file = e.target.files[0];
                        const img =
                          document.getElementById("updateHostelImage2");
                        if (file) {
                          let read = new FileReader();
                          read.readAsDataURL(file);
                          read.onload = function (event) {
                            img.src = event.target.result;
                          };
                        } else {
                          img.src =
                            "http://localhost:3001/" +
                            hostels[hostelIndex].image2;
                        }
                      }}
                    />
                    <input
                      className="form-control form-control-sm"
                      type="text"
                      placeholder="Tittle"
                      defaultValue={
                        hostels.length >= 1 ? hostels[hostelIndex].title2 : ""
                      }
                    />
                    <textarea
                      className="form-control form-control-sm"
                      id=""
                      cols="30"
                      rows="2"
                      placeholder="Write a discription"
                      defaultValue={
                        hostels.length >= 1
                          ? hostels[hostelIndex].discription2
                          : ""
                      }
                    ></textarea>
                  </div>
                  <div className="col-12 col-sm-3 order-sm-2 order-1">
                    <img
                      id="updateHostelImage2"
                      src={
                        hostels.length >= 1
                          ? "http://localhost:3001/" +
                            hostels[hostelIndex].image2
                          : image
                      }
                      alt=""
                      style={{ maxHeight: "120px", maxWidth: "100%" }}
                    />
                  </div>
                </div>
              </div>
              <div className="border border-1 border-secondary p-1 bg-light">
                <div className="row">
                  <div className="col-12 col-sm-9 order-sm-1 order-2">
                    <input
                      className="form-control form-control-sm"
                      type="file"
                      accept="image/jpg, image/jpeg"
                      onChange={(e) => {
                        let file = e.target.files[0];
                        const img =
                          document.getElementById("updateHostelImage3");
                        if (file) {
                          let read = new FileReader();
                          read.readAsDataURL(file);
                          read.onload = function (event) {
                            img.src = event.target.result;
                          };
                        } else {
                          img.src =
                            "http://localhost:3001/" +
                            hostels[hostelIndex].image3;
                        }
                      }}
                    />
                    <input
                      className="form-control form-control-sm"
                      type="text"
                      placeholder="Tittle"
                      defaultValue={
                        hostels.length >= 1 ? hostels[hostelIndex].title3 : ""
                      }
                    />
                    <textarea
                      className="form-control form-control-sm"
                      id=""
                      cols="30"
                      rows="2"
                      placeholder="Write a discription"
                      defaultValue={
                        hostels.length >= 1
                          ? hostels[hostelIndex].discription3
                          : ""
                      }
                    ></textarea>
                  </div>
                  <div className="col-12 col-sm-3 order-sm-2 order-1">
                    <img
                      id="updateHostelImage3"
                      src={
                        hostels.length >= 1
                          ? "http://localhost:3001/" +
                            hostels[hostelIndex].image3
                          : image
                      }
                      alt=""
                      style={{ maxHeight: "120px", maxWidth: "100%" }}
                    />
                  </div>
                </div>
              </div>
              <div className="border border-1 border-secondary p-1 bg-light">
                <div className="row">
                  <div className="col-12 col-sm-9 order-sm-1 order-2">
                    <input
                      className="form-control form-control-sm"
                      type="file"
                      accept="image/jpg, image/jpeg"
                      onChange={(e) => {
                        let file = e.target.files[0];
                        const img =
                          document.getElementById("updateHostelImage4");
                        if (file) {
                          let read = new FileReader();
                          read.readAsDataURL(file);
                          read.onload = function (event) {
                            img.src = event.target.result;
                          };
                        } else {
                          img.src =
                            "http://localhost:3001/" +
                            hostels[hostelIndex].image4;
                        }
                      }}
                    />
                    <input
                      className="form-control form-control-sm"
                      type="text"
                      placeholder="Tittle"
                      defaultValue={
                        hostels.length >= 1 ? hostels[hostelIndex].title4 : ""
                      }
                    />
                    <textarea
                      className="form-control form-control-sm"
                      id=""
                      cols="30"
                      rows="2"
                      placeholder="Write a discription"
                      defaultValue={
                        hostels.length >= 1
                          ? hostels[hostelIndex].discription4
                          : ""
                      }
                    ></textarea>
                  </div>
                  <div className="col-12 col-sm-3 order-sm-2 order-1">
                    <img
                      id="updateHostelImage4"
                      src={
                        hostels.length >= 1
                          ? "http://localhost:3001/" +
                            hostels[hostelIndex].image4
                          : image
                      }
                      alt=""
                      style={{ maxHeight: "120px", maxWidth: "100%" }}
                    />
                  </div>
                </div>
              </div>
              <div className="border border-1 border-secondary p-1 bg-light">
                <div className="row">
                  <div className="col-12 col-sm-9 order-sm-1 order-2">
                    <input
                      className="form-control form-control-sm"
                      type="file"
                      accept="image/jpg, image/jpeg"
                      onChange={(e) => {
                        let file = e.target.files[0];
                        const img =
                          document.getElementById("updateHostelImage5");
                        if (file) {
                          let read = new FileReader();
                          read.readAsDataURL(file);
                          read.onload = function (event) {
                            img.src = event.target.result;
                          };
                        } else {
                          img.src =
                            "http://localhost:3001/" +
                            hostels[hostelIndex].image5;
                        }
                      }}
                    />
                    <input
                      className="form-control form-control-sm"
                      type="text"
                      placeholder="Tittle"
                      defaultValue={
                        hostels.length >= 1 ? hostels[hostelIndex].title5 : ""
                      }
                    />
                    <textarea
                      className="form-control form-control-sm"
                      id=""
                      cols="30"
                      rows="2"
                      placeholder="Write a discription"
                      defaultValue={
                        hostels.length >= 1
                          ? hostels[hostelIndex].discription5
                          : ""
                      }
                    ></textarea>
                  </div>
                  <div className="col-12 col-sm-3 order-sm-2 order-1">
                    <img
                      id="updateHostelImage5"
                      src={
                        hostels.length >= 1
                          ? "http://localhost:3001/" +
                            hostels[hostelIndex].image5
                          : image
                      }
                      alt=""
                      style={{ maxHeight: "120px", maxWidth: "100%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer bg-info">
              <button
                type="button"
                className="btn btn-warning"
                data-bs-dismiss="modal"
              >
                <b>Close</b>
              </button>
              <button type="submit" className="btn btn-success">
                <b>Save</b>
              </button>
            </div>
          </div>
        </div>
      </form>
      {/* <!-- Modal for Add new hostel  --> */}
      <form
        className="modal fade m-0 p-0"
        id="addNewHostelForm"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        onSubmit={addNewHostel}
      >
        <div className="modal-dialog modal-fullscreen border border-2 border-info rounded">
          <div className="modal-content">
            <div className="modal-header bg-info">
              <h5 className="modal-title" id="exampleModalLabel">
                <b>Add New Hostel</b>
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className=" row m-auto">
                <h2 className="w-100 m-0 p-0">
                  {showSpinner ? <Spinner /> : ""}
                </h2>
                <span
                  className="error-box rounded w-100 p-2 m-0 mt-2"
                  tabIndex="0"
                  style={{ boxShadow: "none" }}
                >
                  {submitStatus}
                </span>
              </div>
              <div className="">
                <label htmlFor="formGroupExampleInput" className="form-label">
                  Hostel name
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="formGroupExampleInput"
                  placeholder="Enter hostel name"
                  required
                />
              </div>
              <div className="">
                <label htmlFor="hostelFee" className="form-label">
                  Hostel Fee per year
                </label>
                <input
                  type="number"
                  className="form-control form-control-sm mb-2"
                  id="hostelFee"
                  placeholder="Enter hostel Fee as per year"
                  required
                />
              </div>

              <div className="">
                <label htmlFor="hostelWardenEmail" className="form-label">
                  Warden's email Id
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="hostelWardenEmail"
                  placeholder="Enter warden's Email Id as resistered"
                  required
                />
              </div>
              <div className="">
                <label htmlFor="aboutNewHostel" className="form-label">
                  About hostel
                </label>
                <textarea
                  className="form-control form-control-sm"
                  id="aboutNewHostel"
                  cols="30"
                  rows="3"
                  placeholder="write a short discription"
                  required
                ></textarea>
              </div>
              <label htmlFor="" className="form-label">
                <b>Upload Images</b>
              </label>
              <div className="border border-1 border-secondary p-1 bg-light">
                <div className="row">
                  <div className="col-12 col-sm-9 order-sm-1 order-2">
                    <input
                      className="form-control form-control-sm"
                      type="file"
                      accept="image/jpg, image/jpeg"
                      required
                      onChange={(e) => {
                        let file = e.target.files[0];
                        const img = document.getElementById("newHostelImage1");
                        if (file) {
                          let read = new FileReader();
                          read.readAsDataURL(file);
                          read.onload = function (event) {
                            img.src = event.target.result;
                          };
                        } else {
                          img.src = image;
                        }
                      }}
                    />
                    <input
                      className="form-control form-control-sm"
                      type="text"
                      placeholder="Tittle"
                      required
                    />
                    <textarea
                      className="form-control form-control-sm"
                      id=""
                      cols="30"
                      rows="2"
                      placeholder="Write a discription"
                      required
                    ></textarea>
                  </div>
                  <div className="col-12 col-sm-3 order-sm-2 order-1">
                    <img
                      id="newHostelImage1"
                      src={image}
                      alt=""
                      style={{ maxHeight: "120px", maxWidth: "100%" }}
                    />
                  </div>
                </div>
              </div>
              <div className="border border-1 border-secondary p-1 bg-light">
                <div className="row">
                  <div className="col-12 col-sm-9 order-sm-1 order-2">
                    <input
                      className="form-control form-control-sm"
                      type="file"
                      accept="image/jpg, image/jpeg"
                      required
                      onChange={(e) => {
                        let file = e.target.files[0];
                        const img = document.getElementById("newHostelImage2");
                        if (file) {
                          let read = new FileReader();
                          read.readAsDataURL(file);
                          read.onload = function (event) {
                            img.src = event.target.result;
                          };
                        } else {
                          img.src = image;
                        }
                      }}
                    />
                    <input
                      className="form-control form-control-sm"
                      type="text"
                      placeholder="Tittle"
                      required
                    />
                    <textarea
                      className="form-control form-control-sm"
                      id=""
                      cols="30"
                      rows="2"
                      placeholder="Write a discription"
                      required
                    ></textarea>
                  </div>
                  <div className="col-12 col-sm-3 order-sm-2 order-1">
                    <img
                      id="newHostelImage2"
                      src={image}
                      alt=""
                      style={{ maxHeight: "120px", maxWidth: "100%" }}
                    />
                  </div>
                </div>
              </div>
              <div className="border border-1 border-secondary p-1 bg-light">
                <div className="row">
                  <div className="col-12 col-sm-9 order-sm-1 order-2">
                    <input
                      className="form-control form-control-sm"
                      type="file"
                      accept="image/jpg, image/jpeg"
                      required
                      onChange={(e) => {
                        let file = e.target.files[0];
                        const img = document.getElementById("newHostelImage3");
                        if (file) {
                          let read = new FileReader();
                          read.readAsDataURL(file);
                          read.onload = function (event) {
                            img.src = event.target.result;
                          };
                        } else {
                          img.src = image;
                        }
                      }}
                    />
                    <input
                      className="form-control form-control-sm"
                      type="text"
                      placeholder="Tittle"
                      required
                    />
                    <textarea
                      className="form-control form-control-sm"
                      id=""
                      cols="30"
                      rows="2"
                      placeholder="Write a discription"
                      required
                    ></textarea>
                  </div>
                  <div className="col-12 col-sm-3 order-sm-2 order-1">
                    <img
                      id="newHostelImage3"
                      src={image}
                      alt=""
                      style={{ maxHeight: "120px", maxWidth: "100%" }}
                    />
                  </div>
                </div>
              </div>
              <div className="border border-1 border-secondary p-1 bg-light">
                <div className="row">
                  <div className="col-12 col-sm-9 order-sm-1 order-2">
                    <input
                      className="form-control form-control-sm"
                      type="file"
                      accept="image/jpg, image/jpeg"
                      required
                      onChange={(e) => {
                        let file = e.target.files[0];
                        const img = document.getElementById("newHostelImage4");
                        if (file) {
                          let read = new FileReader();
                          read.readAsDataURL(file);
                          read.onload = function (event) {
                            img.src = event.target.result;
                          };
                        } else {
                          img.src = image;
                        }
                      }}
                    />
                    <input
                      className="form-control form-control-sm"
                      type="text"
                      placeholder="Tittle"
                      required
                    />
                    <textarea
                      className="form-control form-control-sm"
                      id=""
                      cols="30"
                      rows="2"
                      placeholder="Write a discription"
                      required
                    ></textarea>
                  </div>
                  <div className="col-12 col-sm-3 order-sm-2 order-1">
                    <img
                      id="newHostelImage4"
                      src={image}
                      alt=""
                      style={{ maxHeight: "120px", maxWidth: "100%" }}
                    />
                  </div>
                </div>
              </div>
              <div className="border border-1 border-secondary p-1 bg-light">
                <div className="row">
                  <div className="col-12 col-sm-9 order-sm-1 order-2">
                    <input
                      className="form-control form-control-sm"
                      type="file"
                      accept="image/jpg, image/jpeg"
                      required
                      onChange={(e) => {
                        let file = e.target.files[0];
                        const img = document.getElementById("newHostelImage5");
                        if (file) {
                          let read = new FileReader();
                          read.readAsDataURL(file);
                          read.onload = function (event) {
                            img.src = event.target.result;
                          };
                        } else {
                          img.src = image;
                        }
                      }}
                    />
                    <input
                      className="form-control form-control-sm"
                      type="text"
                      placeholder="Tittle"
                      required
                    />
                    <textarea
                      className="form-control form-control-sm"
                      id=""
                      cols="30"
                      rows="2"
                      placeholder="Write a discription"
                      required
                    ></textarea>
                  </div>
                  <div className="col-12 col-sm-3 order-sm-2 order-1">
                    <img
                      id="newHostelImage5"
                      src={image}
                      alt=""
                      style={{ maxHeight: "120px", maxWidth: "100%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer bg-info">
              <button
                type="button"
                className="btn btn-warning"
                data-bs-dismiss="modal"
              >
                <b>Close</b>
              </button>
              <button type="submit" className="btn btn-success">
                <b>Save</b>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
