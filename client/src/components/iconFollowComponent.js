import React from "react";
import "../css/style.css";

const FollowIcon = (props) => {
  const isStar = props.vacationFollows.includes(props.userID);

  let addNewFollow = () => {
    return <i className="far fa-star" onClick={() => props.insertNewFallowToDB(props.vacationID)}></i>;
  };
  let removeFollow = () => {
    return <i className="fas fa-star isStar" onClick={() => props.deleteUserFallowFromDB(props.vacationID)}></i>;
  };
  return (
    <div>
      <abbr title={isStar ? "Remove Star" : "Add Star"}>{isStar ? removeFollow() : addNewFollow()}</abbr>
    </div>
  );
};

export default FollowIcon;
