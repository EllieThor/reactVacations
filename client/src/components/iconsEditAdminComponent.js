import React from "react";
import "../css/style.css";
const EditIcons = (props) => {
  return (
    <div className="row">
      <div className="col-4">
        <h5>{props.vacationFollows.length}</h5>
      </div>
      <div className="col-4">
        <abbr title="Edit Vacation">
          <i className="fas fa-pen fa-lg" onClick={() => props.editVacationClicked(props.vacationToEdit)}></i>
        </abbr>
      </div>
      <div className="col-4">
        <abbr title="Delete Vacation">
          <i className="fas fa-trash fa-lg" onClick={() => props.deleteVacationFromDB(props.vacationID)}></i>
        </abbr>
      </div>
    </div>
  );
};

export default EditIcons;
