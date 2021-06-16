import React from "react";
import "../css/style.css";

const ModalTest = (props) => {
  let vacationToEdit = props.vacationToEdit;
  let ButtonsStatus = props.vacationFormButtonsStatus;

  let addVacationButton = () => {
    return (
      <button type="submit" className="btn btn-dark mt-3" data-bs-dismiss="modal" onClick={() => props.insertVacationToDB()}>
        Add vacation
      </button>
    );
  };

  // edit form
  let saveEditedVacationButton = () => {
    return (
      <button type="submit" className="btn btn-dark mt-3" data-bs-dismiss="modal" onClick={() => props.updateVacationDetailsInDB(vacationToEdit.ID)}>
        Save Changes
      </button>
    );
  };

  return (
    <div>
      {/* <!-- Button trigger modal -->
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button> */}

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title mb-3 fw-normal text-center" id="exampleModalLabel">
                {ButtonsStatus === 0 ? "Add New Vacation" : `${vacationToEdit.Destination}`}
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* <div className="addVacationForm p-5"> */}

              <label htmlFor="Destination">Destination:</label>
              <input type="text" id="Destination" className="form-control m-2" defaultValue={ButtonsStatus === 0 ? "" : vacationToEdit.Destination} placeholder="Destination" autoFocus="" onChange={(e) => props.onChangeFN(e)} />
              <label htmlFor="Description">Description:</label>
              <input type="text" id="Description" className="form-control  m-2" defaultValue={ButtonsStatus === 0 ? "" : vacationToEdit.Description} placeholder="Description" autoComplete="" onChange={(e) => props.onChangeFN(e)} />
              <label htmlFor="Price">Price:</label>
              <input type="number" id="Price" min="0" className="form-control  m-2" defaultValue={ButtonsStatus === 0 ? "" : vacationToEdit.Price} placeholder="Price" autoComplete="" onChange={(e) => props.onChangeFN(e)} />
              <label htmlFor="StartDate">StartDate:</label>
              <input type="date" id="StartDate" className="form-control  m-2" defaultValue={ButtonsStatus === 0 ? "" : vacationToEdit.StartDate} placeholder="StartDate" autoComplete="" onChange={(e) => props.onChangeFN(e)} />
              <label htmlFor="EndDate">EndDate:</label>
              <input type="date" id="EndDate" className="form-control  m-2" defaultValue={ButtonsStatus === 0 ? "" : vacationToEdit.EndDate} placeholder="EndDate" autoComplete="" onChange={(e) => props.onChangeFN(e)} />
              {/* <input id="filesToUpload" name="filesToUpload" type="file" onChange={(e) => props.fileChangeEvent(e)} multiple /> */}
              <input id="filesToUpload" name="filesToUpload" type="file" onChange={(e) => props.fileChangeEvent(e)} />
              <button type="button" className="btn btn-dark btn-s" onClick={() => props.upload()}>
                <i className="fas fa-file-upload"></i>&nbsp;Upload
              </button>
              {/* </div> */}
            </div>
            <div className="modal-footer">
              <button type="reset" className="btn btn-dark" data-bs-dismiss="modal">
                Close
              </button>
              {ButtonsStatus === 0 ? addVacationButton() : saveEditedVacationButton()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalTest;
