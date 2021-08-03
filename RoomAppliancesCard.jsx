import React, { Component } from "react";
import axios from "axios";
import sweetalert from "sweetalert";
import "./child_style/RoomAppliancesCard.css";
import Spinner from "../magic_components/Spinner";

export default class RoomAppliancesCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      name: "",
      roomId: "",
      inputClass: "",
      waiting: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.name !== state.name) {
      // console.log("getDerivedStateFromProps..2");
      return {
        inputClass: props.name + "status form-check-input mt-0 ",
        status: props.status,
        name: props.name,
        roomId: props.roomId,
      };
    } else {
      // console.log("getDerivedStateFromProps..3");
      return null;
    }
  }

  componentDidMount() {
    document.getElementsByClassName(this.state.name + "status")[
      this.state.status - 1
    ].checked = "false";
    // console.log("after state" + this.state.inputClass);
  }

  changeStatus = (new_status) => {
    sweetalert("", "Please wait...", "info", {
      closeOnClickOutside: false,
      buttons: false,
      className: "swa-text",
    });
    let query = `UPDATE rooms SET ${
      this.state.name + "Status"
    }='${new_status}' WHERE roomId='${this.state.roomId}'`;

    if (window.navigator.onLine) {
      this.setState({
        waiting: true,
      });
      axios
        .post(
          "http://localhost:3001/student/room/update_status",
          {
            query: query,
          },
          (err) => {
            console.log("error:" + err);
          }
        )
        .then((res) => {
          if (res.status === 200) {
            sweetalert(
              "Successful",
              "Your update request is accepted successfuly",
              "success"
            );
            this.setState({
              status: new_status,
              waiting: false,
            });
          } else {
            sweetalert(
              "Failed",
              "Your request is not acceptes by server so try again",
              "error",
              {
                closeOnClickOutside: false,
              }
            );
            this.setState({
              waiting: false,
            });
          }
          // console.log("success", res);
        })
        .catch((err) => {
          if (err) {
            // console.log(err);
            sweetalert(
              "Failed",
              "Your request is not acceptes due to server issue",
              "error",
              {
                closeOnClickOutside: false,
              }
            );
            this.setState({
              waiting: false,
            });
          }
        });
    } else {
      sweetalert(
        "Warning!",
        "you dont't have internet connection so, your request is not updated successfully please refresh this page",
        "warning",
        {
          closeOnClickOutside: false,
        }
      );
      // console.log(this.state.name, this.state.status);
    }
  };

  updateStatus0 = (event) => {
    this.changeStatus("1");
  };
  updateStatus1 = (event) => {
    this.changeStatus("2");
  };
  updateStatus2 = (event) => {
    this.changeStatus("3");
  };

  render() {
    return (
      <div className="m-1">
        <div
          className="card  text-dark border border-info border-2 "
          style={{ width: "15rem" }}
        >
          <h3 className="card-header text-start">
            <b>{this.props.name}</b>
          </h3>
          <img
            style={{ height: "10rem" }}
            src={this.props.image}
            className="card-img-top "
            alt="loading....."
          />
          {this.state.waiting ? <Spinner /> : ""}
          <div className="card-body rounded-bottom  text-start bg-info m-0 p-1">
            <b>update now:</b>
            <div className="input-group mb-1">
              <div className="input-group-text py-0 px-2">
                <input
                  className={this.state.inputClass}
                  type="radio"
                  name={this.props.name}
                  key="1"
                  aria-label="Checkbox for following text input"
                  onClick={this.updateStatus0}
                />
              </div>
              <span className="form-control  py-0 ">Working </span>
            </div>
            <div className="input-group mb-1">
              <div className="input-group-text py-0 px-2">
                <input
                  className={this.state.inputClass}
                  type="radio"
                  name={this.props.name}
                  aria-label="Checkbox for following text input"
                  onClick={this.updateStatus1}
                />
              </div>
              <span className="form-control py-0 ">Not working </span>
            </div>
            <div className="input-group ">
              <div className="input-group-text py-0 px-2">
                <input
                  className={this.state.inputClass}
                  type="radio"
                  name={this.props.name}
                  value=""
                  aria-label="Checkbox for following text input"
                  onClick={this.updateStatus2}
                />
              </div>
              <span className="form-control py-0 ">Not available</span>
            </div>
          </div>
          {/* <div className="card-footer bg-info">footer</div> */}
        </div>
      </div>
    );
  }
}
