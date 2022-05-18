import React, { useEffect, useState } from "react";
import "../css/home.css";
import pic from "../images/dark.jpg";
import useWindowFocus from "use-window-focus";
import { Link, useNavigate } from "react-router-dom";
const Home = () => {
  const [status, setStatus] = useState("Active");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const windowFocused = useWindowFocus();
  useEffect(() => {
    if (windowFocused) {
      setStatus("Active");
    }
    const fetchData = async () => {
      const people = await localStorage.getItem("users").split(",").slice();
      const index = people.indexOf(sessionStorage.getItem("user"));
      if (index === -1) {
        sessionStorage.removeItem("user");
        navigate("/");
      }
    };
    fetchData();

    window.addEventListener("storage", () => {
      const people = localStorage.getItem("users").split(",").slice();
      setUsers(people);
    });
  }, [users, windowFocused, navigate]);

  const logout = (user) => {
    const elements = localStorage.getItem("users").split(",").slice();
    const id = elements.indexOf(user);
    elements.splice(id, 1);
    localStorage.setItem("users", elements);
    var evt = new CustomEvent("storage", { detail: "leo" });
    window.dispatchEvent(evt);
    console.log("data", user);
    if (sessionStorage.getItem("user") === user) {
      sessionStorage.removeItem("user");
      navigate("/");
    }
  };
  const deleteuser = () => {
    sessionStorage.removeItem("user");
    navigate("/");
  };
  window.onblur = () => {
    let myinterval = setInterval(() => {
      console.log("waiting");
    }, 600000);
    clearInterval(myinterval);
    setStatus("Inactive");
  };
  const renderObjects = () => {
    const elements = localStorage.getItem("users").split(",").slice();
    if (elements != null) {
      return elements.map((user, i) => {
        return (
          <div key={i}>
            <p style={{ color: "white" }}>{user}</p>
            <button
              style={{ color: "white" }}
              value={user}
              onClick={() => logout(user)}
            >
              Logout user
            </button>
          </div>
        );
      });
    } else {
      return "";
    }
  };
  return (
    <div className="hcontainer">
      <img src={pic} alt="batimage" width={500} height={500} />
      <div className="content">
        <h3 className="name">{sessionStorage.getItem("user")}</h3>
        <h1>Batman agents</h1>
        <div className="description">{renderObjects()}</div>
        <h2 style={{ color: "white" }}>{status}</h2>
        <button className="logout" onClick={deleteuser}>
          Log out
        </button>
        <button className="login">
          <Link to="/">Log in</Link>
        </button>
      </div>
    </div>
  );
};
export default Home;
