import React from "react";
const UserIconCPT = (props) => {
  let userID = props.userID;
  let IconClassName = userID === 0 ? "fas fa-sign-in-alt fa-2x logIn" : "fas fa-sign-out-alt fa-2x logout";
  let title = userID === 0 ? "Log In" : "Log Out";
  let onClickFN = userID === 0 ? props.logIconClicked : props.logOutIconClicked;
  return (
    <div>
      <abbr title={title}>
        <i className="fas fa-sign-out-alt fa-2x logout" onClick={props.logOutIconClicked}></i>
        {/* <i className={IconClassName} onClick={onClickFN}></i> */}
      </abbr>
    </div>
  );
};

export default UserIconCPT;
