import React from "react";
import "../css/style.css";

const FollowIcon = (props) => {
  const isStar = props.vacationFollows.includes(props.userID);

  let addNewFollow = () => {
    return <i className="far fa-star" onClick={() => props.insertStarToDB(props.vacationID)}></i>;
  };
  let removeFollow = () => {
    return <i className="fas fa-star isStar" onClick={() => props.deleteStarFromDB(props.vacationID)}></i>;
  };
  return (
    <div className="row">
      <div className="col-6">
        <abbr title={isStar ? "Remove Star" : "Add Star"}>{isStar ? removeFollow() : addNewFollow()}</abbr>
      </div>
    </div>
  );
};

export default FollowIcon;
