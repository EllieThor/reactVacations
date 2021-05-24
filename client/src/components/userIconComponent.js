import React from "react";
const UserIconCPT = (props) => {
  return (
    <div>
      <abbr title="Log Out">
        <i className="fas fa-sign-out-alt fa-2x logout" onClick={props.logOutIconClicked}></i>
      </abbr>
    </div>
  );
};

export default UserIconCPT;
