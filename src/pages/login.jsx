import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const UpdateUsername = (evt) => {
    let name = evt.target.value;
    setUsername(name.toString().toLowerCase());
  };
  const SaveName = () => {
    navigate("/home");
    sessionStorage.setItem("user", username);
    if (
      localStorage.getItem("users") !== null &&
      localStorage.getItem("users").length !== 0
    ) {
      const users = localStorage.getItem("users").split(",");
      let flag = 0;
      for (const element of users) {
        if (element === sessionStorage.getItem("user")) {
          flag++;
        }
      }
      if (flag !== 0) {
        console.log("user already registered");
      } else {
        const newusers = [...users, sessionStorage.getItem("user")];
        localStorage.setItem("users", newusers);
      }
    } else {
      const newusers = sessionStorage.getItem("user");
      localStorage.setItem("users", newusers);
    }
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="lcontainer">
      <form action="">
        <input
          type="text"
          placeholder="Username"
          required={true}
          onChange={UpdateUsername}
        />
        <button onClick={SaveName}>Login</button>
      </form>
    </div>
  );
};
export default Login;
