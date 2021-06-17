import React, { Component } from "react";
import "../css/style.css";
import axios from "axios";
import { connect } from "react-redux";
import * as Api from "../Api/apiCalls";
import { Route, Link, Redirect } from "react-router-dom";

import HeaderComponent from "../components/HeaderComponent";
import AddVacationForm from "../components/addVacationFormComponent";
import ModalTest from "../components/modalComponent";
import SingleVacationCard from "../components/singleVacationCard";
import LogInForm from "./LogInForm";
import RegistrationForm from "./RegistrationForm";

class Vacations extends Component {
  componentDidMount() {
    // if (this.props.userID === 0) {
    //   <Redirect from="/Vacations" to="/RegistrationForm " />;
    // }

    // if (this.props.userID <= 0) {
    //   window.location.replace("/");
    //   console.log("the user route is not exists if : ", this.props.userID);
    // } else {
    //   this.getVacationsFromDB();
    //   console.log("the user route is exists &&& else : ", this.props.userID);
    // }
    if (this.props.userID === 0) {
      return <Redirect from="/Vacations" to="/" />;
    } else this.getVacationsFromDB();
  }

  // patterns OBJ
  inputsObj = {
    imageName: "",
  };

  onChangeFN = (e) => {
    this.inputsObj[e.target.id] = e.target.value;
    console.log("new Input To inputsObj :", e.target.id, "value: ", e.target.value);
  };

  // logOut
  logOutIconClicked = () => {
    this.props.updateUserID(0);
    this.props.updateUser([]);
    this.props.updateUserRole(0);
    this.props.updateLogInStatus(true);
  };

  getVacationsFromDB = async () => {
    // console.log("this in vacation route: ", this.props.user[0]);
    try {
      let vacations = await Api.postRequest(`/vacations/getVacationsFromDb`);
      let allVacations = vacations.data;

      // graph
      let vacationsNames = [];
      let numberOfStars = [];
      let numberOf = 0;
      // let test = 0; else : ניסיון

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
        // console.log("usersIDs : ", usersIDs);

        //graph
        numberOf = item.follows.length;
        if (numberOf > 0) {
          numberOfStars.push(item.follows.length);
          vacationsNames.push(item.Destination);
        }

        // sorting
        let isUserExist = usersIDs.includes(this.props.userID);
        if (isUserExist) {
          allVacations.splice(i, 1);
          allVacations.unshift(item);
        }
        // console.log("this.props.userID: ", this.props.userID, "usersIDs: ", usersIDs, " test sorting: ", isUserExist);
      });

      // vacations array
      this.props.updateVacations(allVacations);
      console.log("all vacations: ", allVacations);
      // graph names
      this.props.updateVacationsNames(vacationsNames);
      console.log("vacationsNames: ", this.props.vacationsNames);
      // graph stars
      this.props.updateNumberOfStars(numberOfStars);
      console.log("numberOfStars: ", this.props.numberOfStars);

      // TODO: delete graph before updating ???? אם הפונקציה של הגרף כבויה אין בעיות אבל העדכון של נתונים חדשים דופק אותה
      // this.getGraph();
    } catch (err) {
      console.log("Error ", err);
      alert("Something went wrong, please try again: ", err);
    }
  };
  // follow or not on vacations
  insertNewFallowToDB = async (vacationID) => {
    let currentObj = {
      vacationID: vacationID,
      userID: this.props.userID,
    };

    try {
      let userFallow = await Api.postRequest("/users/insertNewFallowToDb", currentObj);
      console.log("if user star: ", userFallow);
      this.getVacationsFromDB();
    } catch (err) {
      console.log("Error ", err);
      alert("Something went wrong, please try again");
    }
  };

  deleteUserFallowFromDB = async (vacationID) => {
    let currentObj = {
      vacationID: vacationID,
      userID: this.props.userID,
    };
    try {
      let vacation = await Api.postRequest("/users/deleteUserFallowFromDb", currentObj);
      this.getVacationsFromDB();
      console.log("all vacations: ", this.props.vacations);
    } catch (err) {
      console.log("Error ", err);
      alert("Something went wrong, please try again");
    }
  };

  // TODO: Modal
  // vacation form buttons
  editVacationClicked = (vacationObj) => {
    // witch button
    this.props.updateVacationButtonsForm(1);
    // open vacation form
    // this.props.UpdateShowVacationForm(true);
    //witch vacation edit
    this.props.updateVacationToForm(vacationObj);
  };

  addVacationClicked = () => {
    // witch button
    this.props.updateVacationButtonsForm(0);

    // open vacation form
    // this.props.UpdateShowVacationForm(true);
  };

  closeVacationForm = () => {
    this.props.UpdateShowVacationForm(false);
  };

  // upload image
  fileChangeEvent = (e) => {
    console.log("e.target.files: ", e.target.files);
    this.inputsObj.filesToUpload = e.target.files;
  };

  upload = async () => {
    if (this.inputsObj.filesToUpload != undefined) {
      const formData = new FormData();
      const files = this.inputsObj.filesToUpload;

      for (let i = 0; i < files.length; i++) {
        formData.append("uploads[]", files[i], files[i]["name"]);
      }
      console.log("UPLOAD! ", formData);
      console.log("name:! ", files[0].name);
      this.inputsObj.imageNameForServer = files[0].name;
      let imgName = files[0].name;
      console.log("cccc: ", imgName);
      this.inputsObj.imageName = imgName;
      console.log("this.inputsObj.imageName: ", this.inputsObj.imageName);
      let res = await Api.postRequest("/upload", formData);
      console.log("react is IMG? ", res);
    } else {
      alert("Click to upload image please");
    }
  };

  insertVacationToDB = async () => {
    let currentObj = {
      Destination: this.inputsObj.Destination,
      Description: this.inputsObj.Description,
      Price: this.inputsObj.Price,
      ImageName: this.inputsObj.imageNameForServer,
      StartDate: this.inputsObj.StartDate,
      EndDate: this.inputsObj.EndDate,
      // `vacations`-`ID`, `Destination`, `Description`, `Price`, `ImageName`, `StartDate`, `EndDate`, `createdAt`, `updatedAt`
    };
    console.log("currentObj: ", currentObj);
    if (currentObj.Destination === "" || currentObj.Description === "" || currentObj.Price <= 0 || currentObj.Price == undefined || currentObj.ImageName == undefined || currentObj.StartDate === undefined || currentObj.EndDate === undefined) {
      alert("All fields must be filled out");
    } else {
      try {
        let vacation = await Api.postRequest("/vacations/insertVacationToDb", currentObj);
        this.getVacationsFromDB();
        this.inputsObj = {
          imageName: "",
        };
        this.props.UpdateShowVacationForm(false);
        console.log("new vacations: ", this.props.vacations);
      } catch (err) {
        console.log("Error ", err);
        alert("Something went wrong, please try again");
      }
    }
  };
  updateVacationDetailsInDB = async (vacationId) => {
    let currentObj = {
      ID: vacationId,
      Destination: this.inputsObj.Destination,
      Description: this.inputsObj.Description,
      Price: this.inputsObj.Price,
      ImageName: this.inputsObj.imageNameForServer,
      StartDate: this.inputsObj.StartDate,
      EndDate: this.inputsObj.EndDate,
    };

    try {
      let vacation = await Api.postRequest("/vacations/updateVacationDetailsInDb", currentObj);
      this.getVacationsFromDB();
      this.inputsObj = {
        imageName: "",
      };
      this.props.UpdateShowVacationForm(false);
      console.log("all vacations: ", this.props.vacations);
    } catch (err) {
      console.log("Error ", err);
      alert("Something went wrong, please try again");
    }
  };

  // TODO: Warning before deletion
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
  // end img
  render() {
    if (this.props.userID === 0) {
      return <Redirect from="/Vacations" to="/" />;
    } else {
      return (
        <div className="container">
          <div className="row mt-3">{this.props.user[0] === undefined ? "" : <HeaderComponent logOutIconClicked={this.logOutIconClicked} user={this.props.user} userRole={this.props.userRole} addVacationClicked={this.addVacationClicked} />}</div>

          <div className="row addVacationROW">
            <AddVacationForm onChangeFN={this.onChangeFN} closeVacationForm={this.closeVacationForm} fileChangeEvent={this.fileChangeEvent} upload={this.upload} insertVacationToDB={this.insertVacationToDB} updateVacationDetailsInDB={this.updateVacationDetailsInDB} vacationFormButtonsStatus={this.props.vacationFormButtonsStatus} vacationToEdit={this.props.vacationToEdit} />
          </div>
          {/* TODO: fix or delete modal */}
          {/* <div className="row">
          <ModalTest onChangeFN={this.onChangeFN} closeVacationForm={this.closeVacationForm} fileChangeEvent={this.fileChangeEvent} upload={this.upload} insertVacationToDB={this.insertVacationToDB} updateVacationDetailsInDB={this.updateVacationDetailsInDB} vacationFormButtonsStatus={this.props.vacationFormButtonsStatus} vacationToEdit={this.props.vacationToEdit} />
        </div> */}
          <div className="row">{this.props.userID === 0 ? "" : <SingleVacationCard userRole={this.props.userRole} userID={this.props.userID} vacations={this.props.vacations} insertNewFallowToDB={this.insertNewFallowToDB} deleteUserFallowFromDB={this.deleteUserFallowFromDB} deleteVacationFromDB={this.deleteVacationFromDB} editVacationClicked={this.editVacationClicked} />}</div>
        </div>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    vacations: state.vacations,
    user: state.user,
    userID: state.userID,
    userRole: state.userRole,
    logInFormStatus: state.logInFormStatus,
    userFormStatus: state.userFormStatus,
    // vacationForm
    showVacationForm: state.showVacationForm,
    vacationFormButtonsStatus: state.vacationFormButtonsStatus,
    vacationToEdit: state.vacationToEdit,
    // graph
    vacationsNames: state.vacationsNames,
    numberOfStars: state.numberOfStars,
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
    updateLogInStatus(value) {
      dispatch({
        type: "updateLogInStatus",
        payload: value,
      });
    },
    updateUserFormStatus(value) {
      dispatch({
        type: "updateUserFormStatus",
        payload: value,
      });
    },
    updateUserID(value) {
      dispatch({
        type: "updateUserID",
        payload: value,
      });
    },
    updateUserRole(value) {
      dispatch({
        type: "updateUserRole",
        payload: value,
      });
    },
    // vacation form
    UpdateShowVacationForm(value) {
      dispatch({
        type: "UpdateShowVacationForm",
        payload: value,
      });
    },
    updateVacationButtonsForm(value) {
      dispatch({
        type: "updateVacationButtonsForm",
        payload: value,
      });
    },
    updateVacationToForm(value) {
      dispatch({
        type: "updateVacationToForm",
        payload: value,
      });
    },
    // graph
    updateVacationsNames(value) {
      dispatch({
        type: "updateVacationsNames",
        payload: value,
      });
    },
    updateNumberOfStars(value) {
      dispatch({
        type: "updateNumberOfStars",
        payload: value,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Vacations);
