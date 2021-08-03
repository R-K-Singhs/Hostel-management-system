import React, { Component } from "react";
import "./App.css";
import { Redirect, Route, Switch } from "react-router";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import AboutRoom from "./components/AboutRoom";
import AboutStudent from "./components/AboutStudent";
import Login from "./components/Login";
import SighUp from "./components/SighUp";
import GroupChats from "./components/GroupChats";
import Batchmates from "./components/Batchmates";
import WardenNavbar from "./components/WardenNavbar";
import AdminNavbar from "./components/AdminNavbar";
import Hostels from "./components/Hostels";
import AboutHostel from "./components/AboutHostel";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <WardenNavbar /> */}
        <AdminNavbar />
        <Hostels />
        {/* <SighUp /> */}
        {/* <Login /> */}
        {/* <AboutHostel /> */}

        {/* <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/signup">
            <SighUp />
          </Route>
          <Route exact path="/home">
            <Navbar />
            <HomePage />
          </Route>
          <Route exact path="/aboutRoom">
            <Navbar />
            <AboutRoom />
          </Route>
          <Route exact path="/aboutStudent">
            <Navbar />
            <AboutStudent />
          </Route>
          <Route exact path="/home">
            <Navbar />
            <HomePage />
          </Route>
          <Route exact path="/aboutRoom">
            <Navbar />
            <AboutRoom />
          </Route>
          <Route exact path="/groupChats">
            <Navbar />
            <GroupChats />
          </Route>
          <Route exact path="/batchmates">
            <Navbar />
            <Batchmates />
          </Route>

          <Redirect to="/" />
        </Switch> */}
      </div>
    );
  }
}
