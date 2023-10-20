import logo from "./logo.svg";
import "./App.css";

import axios from "axios";
import { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function doLogin(e) {
    e.preventDefault();
    const { data } = await axios.post("http://localhost:4000/user/login", {
      email,
      password,
    });
    window.localStorage.setItem("access-token", data.data.accessToken);
  }

  async function getPeople() {
    const accessToken = window.localStorage.getItem("access-token");
    if (accessToken) {
      const { data } = await axios.get("http://localhost:4000/people", {
        headers: {
          Authorization: accessToken,
        },
      });
      console.log(data);
    } else {
      alert("User not logged in");
    }
  }

  return (
    <>
      <form onSubmit={doLogin}>
        <label>
          Email
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>
        <label>
          Password
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <button>Login</button>
      </form>

      <button onClick={getPeople} type="button">
        Get People
      </button>
    </>
  );
}

export default App;
