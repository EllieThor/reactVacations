import React from "react";
import "../css/style.css";
import StarsIcons from "./IconsStarsComp";
import EditIcons from "./IconsEditComp";

const SingleVacationCard = (props) => {
  let vacationCard = props.vacations.map((vacation, i) => {
    let img = "http://localhost:5004/" + vacation.ImageName;
    let starImg = "http://localhost:5004/star4.png";

    return (
      <div key={i} className="col-sm-12 col-md-6 col-xl-3 p-3">
        <div className="card single-card">
          <img className="card-img-top productImg" src={img} alt={vacation.Destination} />
          <div class="card-header text-center">
            <h5 className="card-title">{vacation.Destination}</h5>
          </div>
          <div className="card-body productCard d-grid gap-2">
            <div className="row">
              <p className="card-text cardDescription">{vacation.Description}</p>
            </div>
            <div className="row">
              <div className="col-3">Dates</div>
              <div className="col-9">
                <div className="card-text">
                  {vacation.StartDate.slice(0, 10).replaceAll("-", "/").split("/").reverse().join("/")}-{vacation.EndDate === null ? "" : vacation.StartDate.slice(0, 10).replaceAll("-", "/").split("/").reverse().join("/")}
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer text-muted">
            <div className="row">
              <div className="col-6">
                <div className="row">
                  <div className="col-5">Price</div>
                  <div className="col-7">{vacation.Price} &#36;</div>
                </div>
              </div>
              <div className="col-6">
                <div className="row">
                  <div className="col-6">
                    <div className="numOfStars">
                      <abbr title={vacation.follows.length <= 0 ? "There are no stars for this vacation" : `There are ${vacation.follows.length} stars to this vacation`}>
                        <i className="far fa-star" />
                      </abbr>
                      &nbsp;&nbsp;
                      {vacation.follows === undefined ? "" : vacation.follows.length}
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
