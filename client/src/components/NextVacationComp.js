import React from "react";
import "../css/style.css";
const LastVacation = (props) => {
  let img = "http://localhost:5004/" + props.vacation.ImageName;
  return (
    <div>
      <div className="card mb-3 lastVacationCard  mx-auto">
        <div className="row g-0">
          <div className="col-md-8">
            <div className="card-body">
              <h4 className="card-title">Our next vacation</h4>
              <h5 className="card-title">{props.vacation.Destination}</h5>
              <h5 className="card-title">{props.vacation.Description}</h5>
              <h5 className="card-title">{props.vacation.Price}</h5>
              <h5 className="card-title">{props.vacation.Price}</h5>
              <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <img src={img} className="img-fluid rounded-start" alt={props.vacation.Destination} />
          </div>
        </div>
      </div>
      <div>{props.vacation.Destination}</div>
    </div>
  );
};

export default LastVacation;
