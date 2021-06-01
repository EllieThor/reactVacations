import React from "react";
import FollowIcon from "./iconFollowComponent";
import EditIcons from "./iconsEditAdminComponent";

const SingleVacationCard = (props) => {
  let vacationCard = props.vacations.map((vacation, i) => {
    let img = "http://localhost:5004/" + vacation.ImageName;

    return (
      <div key={i} className="col-sm-12 col-md-6 col-xl-3 p-3">
        <div className="card">
          <img className="card-img-top productImg" src={img} alt={vacation.Destination} />
          <div className="card-body productCard d-grid gap-2">
            <div className="row">
              <div className="col-7">
                <h5 className="card-title">{vacation.Destination}</h5>
              </div>
              <div className="col-5">
                {props.userRole === 1 ? (
                  <EditIcons vacationToEdit={vacation} vacationID={vacation.ID} vacationFollows={vacation.follows} deleteVacationFromDB={props.deleteVacationFromDB} editVacationClicked={props.editVacationClicked} updateVacationDetailsInDB={props.updateVacationDetailsInDB} />
                ) : (
                  <FollowIcon vacationID={vacation.ID} userID={props.userID} vacationFollows={vacation.follows} insertNewFallowToDB={props.insertNewFallowToDB} deleteUserFallowFromDB={props.deleteUserFallowFromDB} />
                )}
              </div>
            </div>
            <div className="row">
              <div>Description</div>
              <p className="card-text cardDescription">{vacation.Description}</p>
            </div>
            <div className="row">
              <div className="col-3">Price</div>
              <div className="col-9">
                <p className="card-text">{vacation.Price} &#36;</p>
              </div>
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
        </div>
      </div>
    );
  });
  return <div className="row">{vacationCard}</div>;
};
export default SingleVacationCard;
