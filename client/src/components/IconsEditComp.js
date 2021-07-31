import React from "react";
import "../css/style.css";
const EditIcons = (props) => {
  return (
    <div className="row">
      <div className="col-6">
        <abbr title="Edit Vacation">
          <i className="fas fa-pen fa-lg iconsColor" data-bs-toggle="modal" data-bs-target="#vacationModal" onClick={() => props.openModalEdit(props.vacationToEdit)}></i>
        </abbr>
      </div>
      <div className="col-6">
        <abbr title="Delete Vacation">
          <i className="fas fa-trash fa-lg iconsColor" onClick={() => props.deleteVacationFromDB(props.vacationToEdit.ID)}></i>
        </abbr>
      </div>
    </div>
  );
};

export default EditIcons;
