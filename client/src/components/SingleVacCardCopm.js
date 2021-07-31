import React from "react";
import "../css/style.css";

import StarsIcons from "./IconsStarsComp";
import EditIcons from "./IconsEditComp";

const SingleVacationCard = (props) => {
  let vacationCard = props.vacations.map((vacation, i) => {
    let img = "http://localhost:5004/" + vacation.ImageName;

    return (
      <div key={i} className="col-sm-12 col-md-6 col-xl-3 p-3">
        <div className="card single-card">
          <img className="card-img-top vacationImg" src={img} alt={vacation.Destination} />
          <div className="card-header text-center pt-3">
            <h4 className="card-title cinzelDecorativeFont">{vacation.Destination}</h4>
          </div>
          <div className="card-body d-grid gap-2">
            <div className="row ">
              <p className="card-text cardDescription" id="scrollbar">
                {vacation.Description}
              </p>
            </div>
            <div className="row">
              <div className="col-3 meriendaFont">Dates</div>
              <div className="col-9">
                <div className="card-text dates">
                  {vacation.StartDate === null ? "" : vacation.StartDate.slice(0, 10).replaceAll("-", "/").split("/").reverse().join("/")}-{vacation.EndDate === null ? "" : vacation.EndDate.slice(0, 10).replaceAll("-", "/").split("/").reverse().join("/")}
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <div className="row">
              <div className="col-6">
                <div className="row">
                  <div className="col-6 meriendaFont">Price</div>
                  <div className="col-6">{vacation.Price} &#36;</div>
                </div>
              </div>
              <div className="col-6">
                <div className="row">
                  <div className="col-6">
                    <div className="meriendaFont float-end">
                      <abbr title={vacation.follows.length <= 0 ? "There are no stars for this vacation" : `This vacation have ${vacation.follows.length} ${vacation.follows.length === 1 ? "star" : "stars"}!`}>
                        &nbsp;&nbsp;
                        {vacation.follows === undefined ? "" : vacation.follows.length}
                      </abbr>
                    </div>
                  </div>
                  <div className="col-6">{props.user.Role === 1 ? <EditIcons vacationToEdit={vacation} deleteVacationFromDB={props.deleteVacationFromDB} openModalEdit={props.openModalEdit} /> : <StarsIcons vacation={vacation} userID={props.user.ID} insertStarToDB={props.insertStarToDB} deleteStarFromDB={props.deleteStarFromDB} />}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return <div className="row">{vacationCard}</div>;
};
export default SingleVacationCard;
