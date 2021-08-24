import { Button } from "@material-ui/core";
import React, { useState } from "react";
import axios from "./axios";
import Message from "./components/Message";

function Login() {
  const [sign, setSign] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(false);

  const signUp = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please fill all the form");
    } else {
      axios
        .post("/user/register", {
          username,
          password,
        })
        .then((res) => {
          setSign(false);
          setMessage(true);
        });

      setUsername("");
      setPassword("");
    }
  };

  const signIn = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please fill all the form");
    } else {
      axios
        .post("/user/login", {
          username,
          password,
        })
        .then((res) => {
          if (res.data === "No user") {
            alert("no user with this credentials");
          } else {
            if (res.data === "Invalid") {
              alert("Invalid username or password");
            } else {
              const userData = res.data;
              const saveState = (state) => {
                try {
                  const serializedState = JSON.stringify(state);
                  localStorage.setItem("state", serializedState);
                } catch {
                  // ignore write errors
                }
              };

              saveState(userData);
              window.location.reload();
            }
          }
        });

      setUsername("");
      setPassword("");
    }
  };

  return (
    <div className="login">
      {message && <Message />}
      <div className={sign ? `signUp ` : `signUp none`}>
        <h1>Sign up</h1>
        <form>
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            placeholder="Username"
          />
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Password"
          />
          <Button type="submit" onClick={signUp}>
            Sign up
          </Button>
        </form>
        <span className="switch">
          Already have an account? <a onClick={() => setSign(false)}>log in</a>
        </span>
      </div>

      <div className="part_1">
        <img src="linker.png" alt="" />
      </div>

      <div className={sign ? `part_2 none` : `part_2`}>
        <h1>Login</h1>
        <form>
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            placeholder="Username"
          />
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Password"
          />
          <Button type="submit" onClick={signIn}>
            Log in
          </Button>
        </form>
        <span className="switch">
          Don't have an account? <a onClick={() => setSign(true)}>Sign Up</a>
        </span>
      </div>
    </div>
  );
}

export default Login;
