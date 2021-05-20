import React from "react";
import "../css/style.css";
import * as Api from "../Api/apiCalls";
const AddVacationForm = (props) => {
  let vacationToEdit = props.vacationToEdit;
  let ButtonsStatus = props.vacationFormButtonsStatus;
  // add form
  let addVacationButton = () => {
    return (
      <button type="submit" className="btn btn-dark mt-3" onClick={() => props.insertVacationToDB()}>
        Add vacation
      </button>
    );
  };
  let addVacationResetButton = () => {
    return (
      <button type="reset" className="btn btn-dark mt-3">
        Reset
      </button>
    );
  };
  // edit form
  let saveEditedVacationButton = () => {
    return (
      <button type="submit" className="btn btn-dark mt-3" onClick={() => props.updateVacationDetailsInDB(vacationToEdit.ID)}>
        Save Changes
      </button>
    );
  };
  let dontSaveChangesButton = () => {
    return <button className="btn btn-dark mt-3">Cancel Edit</button>;
  };
  return (
    // ID`, `Destination`, `Description`, `Price`, `ImageName`, `StartDate`, `EndDate`, `createdAt`, `updatedAt`
    <div>
      <div className="addVacationForm p-5">
        {/* <form> */}
        <abbr title="Close">
          <i className="fas fa-times float-end" onClick={() => props.closeVacationForm()}></i>
        </abbr>
        <h1 className="h3 mb-3 fw-normal text-center">Add New Vacation</h1>
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
        <div className="row">
          {ButtonsStatus === 0 ? addVacationButton() : saveEditedVacationButton()}
          {ButtonsStatus === 0 ? addVacationResetButton() : dontSaveChangesButton()}
        </div>
        {/*  FIXME: בפורם עושה ריפש לעמוד ומבקש כניסה מחדש ובלי פורם אין ריסט */}
        {/* <button className="w-100 btn btn-lg m-2 btn-dark" type="submit" onClick={() => props.insertVacationToDB()}>
          Add vacation
        </button> */}
        {/* </form> */}
      </div>
    </div>
  );
};
// updateVacationDetailsInDB;
export default AddVacationForm;
