import React from "react";
const LastVacation = (props) => {
  return (
    <div>
      <div>last vacation</div>
      <div>{props.vacation === undefined ? "" : props.vacation.Price}</div>
    </div>
  );
};

export default LastVacation;
