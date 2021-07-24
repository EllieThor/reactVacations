import React from "react";
import "../css/style.css";
const NextVacationComp = (props) => {
  let img = "http://localhost:5004/" + props.vacation.ImageName;
  let style = {
    // color: "#fff",
    background: `-webkit-linear-gradient(-70deg, rgb(220, 220, 220) 30%, rgba(0, 0, 0, 0) 30%), url('${img}')`,
    background: ` -o-linear-gradient(-70deg, rgb(220, 220, 220) 30%, rgba(0, 0, 0, 0) 30%),  url('${img}')`,
    background: `-moz-linear-gradient(-70deg, rgb(220, 220, 220) 30%, rgba(0, 0, 0, 0) 30%), url('${img}')`,
    background: `linear-gradient(-70deg, rgb(220, 220, 220) 30%, rgba(0, 0, 0, 0) 30%),  url('${img}')`,
    backgroundSize: "cover",
    " backgroundPosition": " 50% 21%",
  };
  return (
    <div>
      <div className="mb-3 nextVacationCard mx-auto">
        {/* <div className="row">
          <div className="col-lg-6">
            <div className="card-body">
              <h4 className="card-title meriendaFont">
                Dates: {props.vacation.StartDate.slice(0, 10).replaceAll("-", "/").split("/").reverse().join("/")}-{props.vacation.EndDate === null ? "" : props.vacation.StartDate.slice(0, 10).replaceAll("-", "/").split("/").reverse().join("/")}
              </h4>
              <h4 className="card-title cinzelDecorativeFont">{props.vacation.Destination}</h4>
              <p className="card-title">{props.vacation.Description}</p>
              <h5 className="card-title meriendaFont">Price: {props.vacation.Price}&#36;</h5>
            </div>
          </div>
          <div className="col-lg-6 nextVacationDiv">
            <img src={img} className="nextVacationImg" alt={props.vacation.Destination} />
          </div>
        </div> */}
        <div className="card-holder">
          <div className="cardNext text-end" style={style}>
            <h4 className="meriendaFont">
              Dates: {props.vacation.StartDate.slice(0, 10).replaceAll("-", "/").split("/").reverse().join("/")}-{props.vacation.EndDate === null ? "" : props.vacation.StartDate.slice(0, 10).replaceAll("-", "/").split("/").reverse().join("/")}
            </h4>
            <h2 className="cinzelDecorativeFont">{props.vacation.Destination}</h2>
            <h4 className="meriendaFont">Price: {props.vacation.Price}&#36;</h4>
            <p className="notoSansKRFont">{props.vacation.Description}</p>
          </div>
        </div>
      </div>
      {/* <div class="card mb-3  mx-auto nextCard">
        <div class="row g-0">
          <div class="col-md-5">
            <div class="card-body">
              <h5 className="meriendaFont">Dates: </h5>
              <h5 className="card-title meriendaFont dates">
                {props.vacation.StartDate.slice(0, 10).replaceAll("-", "/").split("/").reverse().join("/")}-{props.vacation.EndDate === null ? "" : props.vacation.StartDate.slice(0, 10).replaceAll("-", "/").split("/").reverse().join("/")}
              </h5>

              <h5 class="card-title cinzelDecorativeFont">{props.vacation.Destination}</h5>
              <p class="card-text">{props.vacation.Description}</p>
              <p class="card-text meriendaFont">Price: {props.vacation.Price}&#36;</p>
            </div>
          </div>
          <div class="col-md-7">
            <img src={img} class="img-fluid rounded-start" alt={props.vacation.Destination} />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default NextVacationComp;
