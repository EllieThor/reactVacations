import React, { Component } from "react";
import "../css/style.css";
import { connect } from "react-redux";
import * as Api from "../Api/apiCalls";
import { Redirect } from "react-router-dom";

import Nav from "../components/NavComp";
import SingleVacationCard from "../components/SingleVacCardCopm";
import Footer from "../components/FooterComp";
import Modal from "../components/ModalComp";

class Vacations extends Component {
  componentDidMount() {
    this.getVacationsFromDB();
  }

  getVacationsFromDB = async () => {
    try {
      let vacations = await Api.postRequest(`/vacations/getVacationsFromDb`);
      let allVacations = vacations.data;

      // map on vacations array in order to edit follows array In each of the items
      allVacations.map((item, i) => {
        let followsArr = item.follows;
        let usersIDs = [];
        // map on followsArr array in order to convert followsArr from array of objects to arr of usersId's numbers
        followsArr.map((id, i) => {
          let testing = Object.values(followsArr[i]);
          usersIDs.push(...testing);
        });
        item.follows = usersIDs;

        // sorting
        let isUserExist = item.follows.includes(this.props.user[0] === undefined ? 0 : this.props.user[0].ID);
        if (isUserExist) {
          allVacations.splice(i, 1);
          allVacations.unshift(item);
        }
      });

      // vacations array
      this.props.updateVacations(allVacations);
      console.log("all vacations: ", allVacations);
    } catch (err) {
      console.log("Error ", err);
      alert("Something went wrong, please try again: ", err);
    }
  };

  insertStarToDB = async (vacationID) => {
    let currentObj = {
      vacationID: vacationID,
      userID: this.props.user[0].ID,
    };

    try {
      let userFallow = await Api.postRequest("/users/insertStar", currentObj);
      console.log("if user star: ", userFallow);
      this.getVacationsFromDB();
    } catch (err) {
      console.log("Error ", err);
      alert("Something went wrong, please try again");
    }
  };

  deleteStarFromDB = async (vacationID) => {
    let currentObj = {
      vacationID: vacationID,
      userID: this.props.user[0].ID,
    };
    try {
      let vacation = await Api.postRequest("/users/deleteStar", currentObj);
      this.getVacationsFromDB();
      console.log("all vacations: ", this.props.vacations);
    } catch (err) {
      console.log("Error ", err);
      alert("Something went wrong, please try again");
    }
  };

  openModalEdit = (vacationObj) => {
    // witch button for form add-0 edit-1
    this.props.updateVacationButtonsForm(1);
    this.imgInput = "";
    this.vacationToEditID = vacationObj.ID;
    this.vacationDestination.value = vacationObj.Destination;
    this.vacationDescription.value = vacationObj.Description;
    this.vacationPrice.value = vacationObj.Price;
    this.vacationStartDate.value = vacationObj.StartDate;
    this.vacationEndDate.value = vacationObj.EndDate;
    this.imageNameForServer = vacationObj.ImageName;
  };

  addVacationClicked = () => {
    this.vacationToEditID = -1;
    this.imgInput = "";
    this.vacationDestination.value = "";
    this.vacationDescription.value = "";
    this.vacationPrice.value = "";
    this.vacationStartDate.value = "";
    this.vacationEndDate.value = "";
    this.imageNameForServer = "";
    // witch button
    this.props.updateVacationButtonsForm(0);
  };

  // TODO: ask before delete
  deleteVacationFromDB = async (vacationID) => {
    let currentObj = {
      ID: vacationID,
    };
    console.log("currentObj: ", currentObj);

    try {
      let vacation = await Api.postRequest("/vacations/deleteVacationFromDb", currentObj);
      this.getVacationsFromDB();
      console.log("all vacations: ", this.props.vacations);
    } catch (err) {
      console.log("Error ", err);
      alert("Something went wrong, please try again");
    }
  };

  updateContent = (value) => {
    this.props.updateContent(value);
  };
  // logOut
  logOutIconClicked = () => {
    this.props.updateUser([]);
  };

  // file change event
  fileChangeEvent = (e) => {
    console.log("e.target.files: ", e.target.files);
    this.imgInput = e.target.files;
  };
  // upload image
  uploadIMG = async () => {
    if (this.imgInput !== undefined) {
      const formData = new FormData();
      const files = this.imgInput;

      for (let i = 0; i < files.length; i++) {
        formData.append("uploads[]", files[i], files[i]["name"]);
      }

      this.imageNameForServer = files[0].name;
      let res = await Api.postRequest("/upload", formData);
      console.log("react is IMG? ", res);
    } else {
      alert("Click to upload image please");
    }
  };

  // CREATE vacation
  insertVacationToDB = async () => {
    // `vacations`-`ID`, `Destination`, `Description`, `Price`, `ImageName`, `StartDate`, `EndDate`, `createdAt`, `updatedAt`
    let currentObj = {
      Destination: this.vacationDestination.value,
      Description: this.vacationDescription.value,
      Price: Number(this.vacationPrice.value),
      ImageName: this.imageNameForServer,
      StartDate: this.vacationStartDate.value,
      EndDate: this.vacationEndDate.value,
    };
    console.log("currentObj: ", currentObj);
    if (currentObj.Destination === "" || currentObj.Description === "" || currentObj.Price <= 0 || currentObj.Price === undefined || currentObj.ImageName === undefined || currentObj.StartDate === undefined || currentObj.EndDate === undefined) {
      alert("All fields must be filled out");
    } else {
      try {
        let vacation = await Api.postRequest("/vacations/insertVacationToDb", currentObj);
        this.getVacationsFromDB();

        console.log("new vacations: ", this.props.vacations);
      } catch (err) {
        console.log("Error ", err);
        alert("Something went wrong, please try again");
      }
    }
  };
  // UPDATE vacation
  updateVacationDetailsInDB = async () => {
    let currentObj = {
      ID: this.vacationToEditID,
      Destination: this.vacationDestination.value,
      Description: this.vacationDescription.value,
      Price: Number(this.vacationPrice.value),
      ImageName: this.imageNameForServer,
      StartDate: this.vacationStartDate.value,
      EndDate: this.vacationEndDate.value,
    };

    try {
      let vacation = await Api.postRequest("/vacations/updateVacationDetailsInDb", currentObj);
      this.getVacationsFromDB();
      console.log("all vacations: ", this.props.vacations);
    } catch (err) {
      console.log("Error ", err);
      alert("Something went wrong, please try again");
    }
    this.imgInput = "";
    this.vacationDestination.value = "";
    this.vacationDescription.value = "";
    this.vacationPrice.value = "";
    this.vacationStartDate.value = "";
    this.vacationEndDate.value = "";
    this.imageNameForServer = "";
  };

  render() {
    if (this.props.user[0] === undefined) {
      return <Redirect from="/Vacations" to="/" />;
    } else {
      return (
        <div>
          <div>{this.props.user[0] === undefined ? "" : <Nav user={this.props.user[0]} addVacationClicked={this.addVacationClicked} logOutIconClicked={this.logOutIconClicked} updateContent={this.updateContent} />}</div>

          <div className="container">
            <div className="row mt-3">{this.props.user[0] === undefined ? "" : <SingleVacationCard user={this.props.user[0]} vacations={this.props.vacations} insertStarToDB={this.insertStarToDB} deleteStarFromDB={this.deleteStarFromDB} deleteVacationFromDB={this.deleteVacationFromDB} openModalEdit={this.openModalEdit} />}</div>
          </div>
          <div className="footer">{this.props.user[0] === undefined ? "" : <Footer />}</div>
          {/* VACATION MODAL */}
          <div className="row">
            <div className="modal fade" id="vacationModal" tabIndex="-1" aria-labelledby="logOrRegisterModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title mb-3 fw-normal text-center" id="exampleModalLabel">
                      Vacations Stars
                    </h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <div className="vacationForm">
                      <h5>{this.props.vacationFormButtonsStatus === 0 ? "Add New Vacation" : "Edit vacation"}</h5>
                      <label htmlFor="Destination">Destination:</label>
                      <input type="text" id="Destination" className="form-control m-2" ref={(ref) => (this.vacationDestination = ref)} placeholder="Destination" />
                      <label htmlFor="Description">Description:</label>
                      <input type="text" id="Description" className="form-control  m-2" ref={(ref) => (this.vacationDescription = ref)} placeholder="Description" />
                      <label htmlFor="Price">Price:</label>
                      <input type="number" id="Price" min="0" className="form-control  m-2" ref={(ref) => (this.vacationPrice = ref)} placeholder="Price" />
                      <label htmlFor="StartDate">StartDate:</label>
                      <input type="date" id="StartDate" className="form-control  m-2" ref={(ref) => (this.vacationStartDate = ref)} placeholder="StartDate" />
                      <label htmlFor="EndDate">EndDate:</label>
                      <input type="date" id="EndDate" className="form-control  m-2" ref={(ref) => (this.vacationEndDate = ref)} placeholder="EndDate" />
                      <input type="file" id="filesToUpload" name="filesToUpload" onChange={(e) => this.fileChangeEvent(e)} ref={(ref) => (this.imgInput = ref)} />
                      <button type="button" className="btn btn-dark btn-s" onClick={() => this.uploadIMG()}>
                        <i className="fas fa-file-upload"></i>&nbsp;Upload
                      </button>
                      {this.props.vacationFormButtonsStatus === 0 ? (
                        <button type="submit" className="btn btn-dark mt-3" data-bs-dismiss="modal" onClick={() => this.insertVacationToDB()}>
                          Add vacation
                        </button>
                      ) : (
                        <button type="submit" className="btn btn-dark mt-3" data-bs-dismiss="modal" onClick={() => this.updateVacationDetailsInDB()}>
                          Save Changes
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="reset" className="btn btn-dark" data-bs-dismiss="modal">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    vacations: state.vacations,
    user: state.user,

    // vacationForm
    vacationFormButtonsStatus: state.vacationFormButtonsStatus,
    vacationToEdit: state.vacationToEdit,

    //modal
    content: state.content,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateVacations(value) {
      dispatch({
        type: "updateVacations",
        payload: value,
      });
    },
    updateUser(value) {
      dispatch({
        type: "updateUser",
        payload: value,
      });
    },

    updateVacationButtonsForm(value) {
      dispatch({
        type: "updateVacationButtonsForm",
        payload: value,
      });
    },
    // FIXME: delete
    updateVacationToForm(value) {
      dispatch({
        type: "updateVacationToForm",
        payload: value,
      });
    },
    //modal
    updateContent(value) {
      dispatch({
        type: "updateContent",
        payload: value,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Vacations);
