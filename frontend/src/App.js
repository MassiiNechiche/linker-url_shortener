import React from "react";
import "./App.css";
import Core from "./components/Core";
import Navbar from "./components/Navbar";
import Login from "./Login";

function App() {
  const loadState = () => {
    try {
      const serializedState = localStorage.getItem("state");
      if (serializedState === null) {
        return undefined;
      }
      const state = JSON.parse(serializedState);

      return state;
    } catch (err) {
      return undefined;
    }
  };

  const user = loadState();

  if (!user) return <Login />;

  return (
    <div className="App">
      <Navbar username={user.username} />
      <Core myId={user.id} />
      <img className="linker" src="linker.png" alt="" />
    </div>
  );
}

export default App;
