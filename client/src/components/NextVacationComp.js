import React from "react";
import "../css/style.css";
const NextVacationComp = (props) => {
  let img = "http://localhost:5004/" + props.vacation.ImageName;
  return (
    <div className="row">
      <div className="card mb-3  mx-auto col-7">
        <div className="row g-0">
          <div className="col-md-5">
            <div className="card-body">
              <h5 className="meriendaFont">Dates: </h5>
              <h5 className="card-title meriendaFont dates">
                {props.vacation.StartDate.slice(0, 10).replaceAll("-", "/").split("/").reverse().join("/")}-{props.vacation.EndDate === null ? "" : props.vacation.StartDate.slice(0, 10).replaceAll("-", "/").split("/").reverse().join("/")}
              </h5>

              <h5 className="card-title cinzelDecorativeFont">{props.vacation.Destination}</h5>
              <p className="card-text">{props.vacation.Description}</p>
              <p className="card-text meriendaFont">Price: {props.vacation.Price}&#36;</p>
            </div>
          </div>
          <div className="col-md-7">
            <img src={img} className="img-fluid rounded-start" alt={props.vacation.Destination} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextVacationComp;
