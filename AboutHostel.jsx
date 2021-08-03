import React, { useEffect, useState } from "react";
// import image1 from "../images/background0.jpg";
import Carousel from "./child_components/Carousel";
import RatingIndicator from "./child_components/RatingIndicator";
import { Link } from "react-router-dom";
// import image from "../images/boy_img_logo.png";
import sweetalert from "sweetalert";
import axios from "axios";
import EmptyPage from "./child_components/EmptyPage";
import ErrorPage from "./child_components/ErrorPage";
import Spinner from "./magic_components/Spinner";
import image from "../images/image_not_found.png";
import AboutRoom from "./AboutRoom";

export default function AboutHostel(props) {
  // console.log(props.hostelDetails[1]);
  // const arr = ["rahul ", "singhss"];
  const [rooms, setrooms] = useState([]);
  const [submitStatus, setsubmitStatus] = useState("error status");
  const [showSpinner, setshowSpinner] = useState(false);
  const adminId = "SistecAdmin0187";
  const hostelId = props.hostelDetails[1].hostelId;
  const [showdetails, setshowdetails] = useState(false);
  const [roomIndex, setroomIndex] = useState("0");
  const [isStudent, setisStudent] = useState(false);

  const carouselData = [];
  carouselData.push({
    image: "http://localhost:3001/" + props.hostelDetails[1].image1,
    title: props.hostelDetails[1].title1,
    disc: "thie is the hostel pic which is vwry nice",
  });
  carouselData.push({
    image: "http://localhost:3001/" + props.hostelDetails[1].image2,
    title: props.hostelDetails[1].title2,
    disc: "thie is the hostel pic which is vwry nice",
  });
  carouselData.push({
    image: "http://localhost:3001/" + props.hostelDetails[1].image3,
    title: props.hostelDetails[1].title3,
    disc: "thie is the hostel pic which is vwry nice",
  });
  carouselData.push({
    image: "http://localhost:3001/" + props.hostelDetails[1].image4,
    title: props.hostelDetails[1].title4,
    disc: "thie is the hostel pic which is vwry nice",
  });
  carouselData.push({
    image: "http://localhost:3001/" + props.hostelDetails[1].image5,
    title: props.hostelDetails[1].title5,
    disc: props.hostelDetails[1].discription5,
  });

  const addNewRoom = (e) => {
    e.preventDefault();
    const addNewRoomForm = document.getElementById("addNewRoom");
    const inputs = addNewRoomForm.querySelectorAll("input,select");
    const errorbox = addNewRoomForm.getElementsByClassName("error-box")[0];
    const btnSubmit = addNewRoomForm.querySelector("button[type=submit]");

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

    const formData = new FormData();
    formData.append("roomName", inputs[0].value);
    formData.append("totalBed", inputs[1].value);
    formData.append("isBathRoom", inputs[2].value);
    formData.append("floorNumber", inputs[3].value);
    formData.append("hostelId", hostelId);

    formData.forEach((value, index) => {
      console.log(value);
    });

    axios
      .post(`http://localhost:3001/admin/${adminId}/room/newroom`, formData)
      .then((res) => {
        if (res.data === "done" && res.status === 200) {
          setshowSpinner(false);
          setsubmitStatus(`--:CONGRATULATIONS:-- Hostel Added Successfully`);
          errorbox.style.backgroundColor = "green";
          errorbox.style.color = "yellow";
          btnSubmit.disabled = false;
          sweetalert({
            title: "--:CONGRATULATIONS:--",
            text: "Room Added Successfully",
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

  const isShowRoomDetails = (isShow) => {
    setshowdetails(isShow);
  };

  useEffect(() => {
    console.log("componenet did mount");
    axios
      .get(`http://localhost:3001/hostel/${hostelId}/room/allrooms`)
      .then((result) => {
        if (rooms.length <= 0) {
          console.log("data access successfully", result.data);
          if (result.data !== "empty") {
            setrooms(result.data);
          }
        } else if (rooms.length !== result.data.length) {
          console.log("data updated successfully", result.data);
          if (result.data !== "empty") {
            setrooms(result.data);
          }
        }

        // console.log(result.data);
      })
      .catch((err) => {
        return console.log("Error : ", err);
      });
  });

  // console.log(carouselData);
  return (
    <div>
      {showdetails ? (
        <AboutRoom
          roomDetails={[isStudent, isShowRoomDetails, rooms[roomIndex]]}
        />
      ) : (
        <div>
          <div className=" card text-start rounded-0 border border-3 border-info">
            <div
              className="card-header d-flex justify-content-between flex-column flex-sm-row
          "
            >
              <div className="w-100 d-flex flex-sm-row flex-column justify-content-between">
                <h3>
                  <b>{"gate hostel"}</b>
                </h3>
                <div className="d-flex">
                  <span className="mt-1 me-1"> Rating: </span>
                  <RatingIndicator rating={props.hostelDetails[1].rating} />
                </div>
              </div>
            </div>
            <div className="card-body">
              <Carousel data={carouselData} />
              <div className="row mt-3">
                <div className="col-sm-9 col-12 order-sm-1  order-2">
                  <h6 className="card-title">
                    Hostel Fee :{" "}
                    <b>
                      <i>{props.hostelDetails[1].hostelFee}</i>
                    </b>
                    /year
                  </h6>
                  <h6 className="card-title">
                    Warden Mobile No. :{" "}
                    <span>
                      <b>
                        <i>{props.hostelDetails[1].wardenMobile}</i>
                      </b>
                    </span>
                  </h6>
                  <h6 className="card-title">
                    Warden Email Id :{" "}
                    <span>
                      <b>
                        <i>{props.hostelDetails[1].wardenEmail}</i>
                      </b>
                    </span>
                  </h6>
                  <br />

                  <h6>
                    <b>About Hostel</b>
                  </h6>
                  <hr />
                  <p className="text-secondary" style={{ fontSize: "1rem" }}>
                    {props.hostelDetails[1].aboutHostel}
                  </p>
                </div>
                <div className="col-sm-3 col-12 order-1 pt-3 order-sm-2 text-center">
                  <img
                    src={
                      props.hostelDetails[1].wardenImage === "null"
                        ? image
                        : props.hostelDetails[1].wardenImage
                    }
                    alt="no image"
                    className="img-thumbnail"
                    style={{ maxHeight: "200px", maxWidth: "200px" }}
                  />
                  <h6 className="blockquote-footer">
                    Warden :{" "}
                    <cite title="Source Title">
                      {props.hostelDetails[1].wardenName}
                    </cite>
                  </h6>
                </div>
              </div>
            </div>
          </div>

          <div className="container-flude">
            <h4 className=" alert alert-primary m-0 p-2 rounded-0">
              <b>Hostel's Rooms</b>
            </h4>
            <div className="container-flude  p-1 bg-white">
              <div className="container-flude border border-dark d-flex flex-wrap justify-content-center ">
                {rooms.length >= 1 ? (
                  rooms.map((value, index) => (
                    <div key={index}>
                      <button
                        type="button"
                        className="btn m-2"
                        style={
                          value.roomCondition == 1
                            ? {
                                minWidth: "100px",
                                backgroundColor: "green",
                              }
                            : value.roomCondition == 2
                            ? {
                                minWidth: "100px",
                                backgroundColor: "yellow",
                              }
                            : {
                                minWidth: "100px",
                                backgroundColor: "red",
                              }
                        }
                        onClick={() => {
                          setroomIndex(index);
                          isShowRoomDetails(true);
                          // console.log(index);
                        }}
                        value={index}
                      >
                        <h6 className="bg-white text-dark p-1">
                          <b>{value.roomName}</b>
                        </h6>
                        <span className="badge  text-dark p-2">
                          Floor No : {value.floorNumber}
                        </span>
                      </button>
                    </div>
                  ))
                ) : (
                  <>
                    <EmptyPage />
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="px-2 bg-light">
            <button
              className="w-100 btn btn-lg btn-primary mt-2"
              data-bs-toggle="modal"
              data-bs-target="#addNewRoom"
            >
              <b>Add Room</b>
            </button>
            <button
              className="w-100 btn btn-lg btn-warning my-2"
              onClick={() => {
                props.hostelDetails[0](false);
              }}
            >
              <b>Back</b>
            </button>
          </div>
        </div>
      )}

      {/* <!-- Modal for Add new room  --> */}
      <div
        className="modal fade "
        id="addNewRoom"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog  border border-2 border-info rounded">
          <form className="modal-content m-0 p-0 " onSubmit={addNewRoom}>
            <div className="modal-header bg-info">
              <h5 className="modal-title" id="exampleModalLabel">
                <b>Add New Room</b>
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <div className=" row m-0 p-0">
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
                  Room No. OR Room Name
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Enter Room No. OR Room Name"
                  required
                />
              </div>
              <div className="">
                <label htmlFor="" className="form-label">
                  Total Bed
                </label>
                <select
                  className="form-select form-select-sm mb-2"
                  aria-label=".form-select-sm example"
                >
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                  <option value="4">Four</option>
                  <option value="5">Five</option>
                  <option value="6">Six</option>
                </select>
              </div>

              <div className="">
                <label htmlFor="" className="form-label">
                  BathRoom Attached
                </label>
                <select
                  className="form-select form-select-sm mb-2"
                  aria-label=".form-select-sm example"
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>

              <div className="">
                <label htmlFor="" className="form-label">
                  Floor Number
                </label>
                <select
                  className="form-select form-select-sm mb-2"
                  aria-label=".form-select-sm example"
                >
                  <option value="0">Ground</option>
                  <option value="1">1st</option>
                  <option value="2">2nd</option>
                  <option value="3">3rd</option>
                  <option value="4">4th</option>
                  <option value="5">5th</option>
                </select>
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
          </form>
        </div>
      </div>
    </div>
  );
}
