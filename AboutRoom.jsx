import React, { useEffect, useState } from "react";
import "./style/AboutRoom.css";
import axios from "axios";
import Carousel from "./child_components/Carousel";
import RoomAppliancesCard from "./child_components/RoomAppliancesCard";
import { Redirect } from "react-router";
// import images................................................
import fanimg from "../images/fan_image.png";
import tableimg from "../images/table_image.png";
import electricboard from "../images/electri_board_image.png";
import bulbimg from "../images/bulb_image.png";
import cupboardimg from "../images/cupboard_image.png";
import chairimg from "../images/chair_image.png";
import bedimg from "../images/bed_image.png";
import wifiimg from "../images/wifi_image.jpg";

export default function AboutRoom(props) {
  const [isStudent, setisStudent] = useState(false);
  const [roomData, setroomData] = useState("");
  const [studentsData, setstudentsData] = useState("");
  const [carouselData, setcarouselData] = useState([]);

  useEffect(() => {
    setroomData(props.roomDetails[2]);
    setisStudent(props.roomDetails[0]);

    // console.log(props.roomDetails[2]);
    if (roomData !== "") {
      let studentIds = "";
      let studentId_index = 1;
      const roomDataArr = Object.values(roomData);

      if (studentsData === "") {
        for (let i = 1; i <= 6; i++) {
          let studentId = "studentId0" + i;
          // console.log(studentId, " / ", roomDataArr[i + 2]);
          if (roomDataArr[i + 2] !== null) {
            if (studentId_index === 1) {
              studentIds =
                studentIds + "studentId='" + roomDataArr[i + 2] + "'";
            } else {
              studentIds =
                studentIds + " || studentId='" + roomDataArr[i + 2] + "'";
            }
            studentId_index++;
          }
        }

        const query = `select name,mobile,email,studentId,image from students where  ${studentIds}`;
        console.log("componenet did update and query : " + query);
        axios
          .post(`http://localhost:3001/hostel/room/students/details`, {
            query: query,
          })
          .then((result) => {
            setstudentsData(result.data);
            console.log(result.data);
            setcarouselData("hi rahul singh's");
            console.log("data access successfully");
            const data = [];
            result.data.forEach((element) => {
              console.log("student Details: ", element.image);
              data.push({
                image: "http://localhost:3001/" + element.image,
                title: element.name,
                disc: "Mo." + element.mobile + " Email:" + element.email,
              });
            });

            console.log(
              "hostel Room Partners",
              data,
              "chousel data ",
              carouselData
            );
          })
          .catch((err) => {
            return console.log("Error : ", err);
          });
        console.log("student details", studentsData, "");
      }
    }
  });

  return (
    <div className="container-flude">
      <div className="container-flude bg-info p-2">
        {isStudent ? (
          <h4 className="text-dark text-start">Allocated Room:</h4>
        ) : (
          ""
        )}
        <div className="text-dark room-container d-flex justify-content-between flex-wrap">
          <span>
            Room No. <b>{"0000"}</b>
          </span>
          {isStudent ? (
            <span>
              Hostel Name:- <b>{"Gate hostel"}</b>
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="w-100 bg-white border border-secondary">
        <div className="w-100  alert-info p-2 ">
          <b>Room Parteners</b>
        </div>
        {/* {carouselData.length > 0 ? "" : <Carousel data={carouselData} />} */}
      </div>
      <div className="my-1 bg-white border border-secondary">
        <div className="  alert-success p-2 ">
          <b>Room Appliances</b>
        </div>
      </div>
      {isStudent ? (
        <div className="horizontal-scroll d-flex flex-nowrap ">
          <RoomAppliancesCard
            image={fanimg}
            name="fan"
            roomId={roomData.roomId}
            status={roomData.fanStatus}
          />
          <RoomAppliancesCard
            image={bulbimg}
            name="light"
            roomId={roomData.roomId}
            status={roomData.lightStatus}
          />
          <RoomAppliancesCard
            image={wifiimg}
            name="wifi"
            roomId={roomData.roomId}
            status={roomData.wifiStatus}
          />
          <RoomAppliancesCard
            image={chairimg}
            name="chair"
            roomId={roomData.roomId}
            status={roomData.chairStatus}
          />
          <RoomAppliancesCard
            image={bedimg}
            name="bed"
            roomId={roomData.roomId}
            status={roomData.bedStatus}
          />
          <RoomAppliancesCard
            image={electricboard}
            name="electricity"
            roomId={roomData.roomId}
            status={roomData.electricityStatus}
          />
          <RoomAppliancesCard
            image={tableimg}
            name="table"
            roomId={roomData.roomId}
            status={roomData.tableStatus}
          />
          <RoomAppliancesCard
            image={cupboardimg}
            name="cupboard"
            roomId={roomData.roomId}
            status={roomData.cupboardStatus}
          />
        </div>
      ) : (
        <div
          className="card border border-2 border-info rounded m-2 "
          style={{ maxWidth: "3rem" }}
        >
          <div className="card-header" style={{ textAlign: "start" }}>
            Fan
          </div>
          <div className="card-body">
            <img
              src={bulbimg}
              alt="mage not found"
              style={{ maxWidth: "8rem", maxHeight: "4rem" }}
            />
          </div>
          <div
            className="card-footer text-dark"
            style={{ backgroundColor: "green" }}
          >
            <b>Working</b>
          </div>
          <div
            className="card-footer text-dark"
            style={{ backgroundColor: "yellow" }}
          >
            <b>Working</b>
          </div>
          <div
            className="card-footer text-dark"
            style={{ backgroundColor: "red" }}
          >
            <b>Working</b>
          </div>
        </div>
      )}

      <div className="mt-1 border border-secondary">
        {isStudent ? (
          <>
            <div className=" alert-info  p-2 ">
              <b>Send Complaints</b>
            </div>
            <div className="d-flex   alert-primary ">
              <input
                type="text"
                className="form-control rounded-0 my-1 ms-1 mr-0 "
                placeholder="write a message"
              />
              <button className="btn btn-primary my-1 me-1 ml-0 rounded-0 border border-dark">
                <b>Send</b>
              </button>
            </div>
          </>
        ) : (
          <div className=" alert-info  p-2 ">
            <b>All Complaints Requests</b>
          </div>
        )}

        <div className="p-1 complaints-container ">
          <h6 className="text-start text-white  ms-2">
            <b>All Complaints</b>
          </h6>
          <div className=" vertical-scroll px-5">
            <div className="border border-primary d-flex m-1 rounded">
              <span
                className="bg-primary rounded-start"
                style={{ width: ".3rem" }}
              ></span>
              <p className="p-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
                excepturi a unde atque tempore accusamus obcaecati molestiae
                necessitatibus doloribus commodi?
              </p>
            </div>
            <div className="border border-primary d-flex m-1 rounded">
              <span
                className="bg-primary rounded-start"
                style={{ width: ".3rem" }}
              ></span>
              <p className="p-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
                excepturi a unde atque tempore accusamus obcaecati molestiae
                necessitatibus doloribus commodi?
              </p>
            </div>
            <div className="border border-primary d-flex m-1 rounded">
              <span
                className="bg-primary rounded-start"
                style={{ width: ".3rem" }}
              ></span>
              <p className="p-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
                excepturi a unde atque tempore accusamus obcaecati molestiae
                necessitatibus doloribus commodi?
              </p>
            </div>
            <div className="border border-primary d-flex m-1 rounded">
              <span
                className="bg-primary rounded-start"
                style={{ width: ".3rem" }}
              ></span>
              <p className="p-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
                excepturi a unde atque tempore accusamus obcaecati molestiae
                necessitatibus doloribus commodi?
              </p>
            </div>
            <div className="border border-primary d-flex m-1 rounded">
              <span
                className="bg-primary rounded-start"
                style={{ width: ".3rem" }}
              ></span>
              <p className="p-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
                excepturi a unde atque tempore accusamus obcaecati molestiae
                necessitatibus doloribus commodi?
              </p>
            </div>
            <div className="border border-primary d-flex m-1 rounded">
              <span
                className="bg-primary rounded-start"
                style={{ width: ".3rem" }}
              ></span>
              <p className="p-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
                excepturi a unde atque tempore accusamus obcaecati molestiae
                necessitatibus doloribus commodi?
              </p>
            </div>
          </div>
        </div>
        <div className="m-2">
          <button
            className="w-100 btn btn-lg btn-warning"
            onClick={() => {
              props.roomDetails[1](false);
            }}
          >
            <b>Back</b>
          </button>
        </div>
      </div>
    </div>
  );
  // }
}
