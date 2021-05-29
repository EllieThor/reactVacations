import React from "react";
import { Route, Link } from "react-router-dom";

const UserIconCPT = (props) => {
  return (
    <div>
      <Link to="/">
        <abbr title="Log Out">
          <i className="fas fa-sign-out-alt fa-2x logout" onClick={props.logOutIconClicked}></i>
        </abbr>
      </Link>
    </div>
  );
};

export default UserIconCPT;
