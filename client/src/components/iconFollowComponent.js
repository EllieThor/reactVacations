import React from "react";
import "../css/style.css";

const FollowIcon = (props) => {
  // let userID = props.userID;
  let isStar = false;
  // // let IconClassName = userID === 0 ? "fas fa-sign-in-alt fa-2x logIn" : "fas fa-sign-out-alt fa-2x logout";
  // let IconClassName = isStar ? "fas fa-star" : "far fa-star";
  // let title = isStar ? "Rising star" : "Falling star";
  // let onClickFN = isStar ? props.deleteUserFallowFromDB : props.insertNewFallowToDB;
  let addNewFollow = () => {
    return <i className="fas fa-star" onClick={() => props.insertNewFallowToDB(props.vacationID)}></i>;
  };
  let removeFollow = () => {
    return <i className="far fa-star" onClick={() => props.deleteUserFallowFromDB(props.vacationID)}></i>;
  };
  return (
    <div>
      <abbr title="title">
        {/* <abbr title={title}> */}
        {/* <i className={IconClassName} onClick={onClickFN(props.vacationID)}></i> */}
        <i className="fas fa-star" onClick={() => props.insertNewFallowToDB(props.vacationID)}></i>
        <i className="far fa-star" onClick={() => props.deleteUserFallowFromDB(props.vacationID)}></i>
        {/* {!isStar ? removeFollow() : addNewFollow()} */}
      </abbr>
    </div>
  );
};

export default FollowIcon;
