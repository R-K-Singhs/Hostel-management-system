import React, { Component } from "react";
import "./style/HomePage.css";
import { Redirect } from "react-router";

export default class HomePage extends Component {
  render() {
    if (!sessionStorage.getItem("studentId")) {
      return <Redirect to="/" />;
    } else {
      return (
        <>
          <iframe
            className="home-page-container"
            src="https://www.sistec.ac.in/"
            title="sistec profile"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </>
      );
    }
  }
}
