import React from "react";
import Avatar from "@material-ui/core/Avatar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

function Navbar({ username }) {
  const exit = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="navbar">
      <div className="user">
        <Avatar
          className="avatar"
          src="https://images.pexels.com/photos/1304647/pexels-photo-1304647.jpeg?auto=compress&cs=tinysrgb&crop=faces&fit=crop&h=200&w=200"
        />
        <span className="username">{username}</span>
      </div>

      <div className="logout" onClick={exit}>
        <ExitToAppIcon /> logout
      </div>
    </div>
  );
}

export default Navbar;
