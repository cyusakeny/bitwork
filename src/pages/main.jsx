import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Logout from "./logout";
import Login from "./login";
import Home from "./home";
class MainComponent extends Component {
  render() {
    return (
      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route exact path="/home" element={<Home />}></Route>
        <Route exact path="/logout" element={<Logout />}></Route>
      </Routes>
    );
  }
}

export default MainComponent;
