import React, { Component } from "react";
import "../css/style.css";
import axios from "axios";
import { connect } from "react-redux";
import * as Api from "../Api/apiCalls";

import AddVacationForm from "../components/addVacationFormComponent";
import LogInForm from "../components/logInFormComponent";
import RegistrationForm from "../components/registrationFormComponent";

import SingleVacationCard from "../components/singleVacationCard";

class Main extends Component {
  componentDidMount() {
    this.getVacationsFromDB();
  }
  // patterns OBJ
  inputsObj = {
    imageName: "",
  };

  onChangeFN = (e) => {
    this.inputsObj[e.target.id] = e.target.value;
    console.log("new Input To inputsObj :", e.target.id, "value: ", e.target.value);
  };

  getVacationsFromDB = async () => {
    try {
      let vacations = await Api.postRequest(`/vacations/getVacationsFromDb`);
      this.props.updateVacations(vacations.data);
      console.log("all vacations: ", this.props.vacations);

      let vacationsTest = this.props.vacations;
      console.log("vacations test: ", vacationsTest);

      // עובד

      let usersISs = [];
      let vacationsStar = vacationsTest.map((vacation, i) => {
        usersISs.push(vacation.follows);
      });
      console.log("usersISs 1: ", usersISs);

      // עובד
      let finalISs = [];
      usersISs.map((vacation, i) => {
        finalISs.push(vacation);
      });
      console.log("finalISs 2 test3: ", finalISs);

      // לא עובד
      let endAgain = finalISs.map((vacation, i) => {
        usersISs.push(vacation[i]);
      });
      console.log("endAgain 3: ", endAgain);

      // console.log("all follows: ", this.props.vacations == undefined ? "" : this.props.vacations[0].follows[0].userID);
      // console.log("all follows: ", this.props.vacations == undefined ? "" : this.props.vacations[0].follows[0].userID);
      // let usersISs = [];
      // for (let i = 0; i < this.props.vacations.length; i++) {
      //   usersISs.push(this.props.vacations[i][userID]);
      // }
      // var output = [];
      // for (var i = 0; i < input.length; ++i) output.push(input[i][field]);

      // console.log("usersISs: ", usersISs);
      // TODO: פור לופ על המערך כדי להוציא יוזר איי די
    } catch (err) {
      console.log("Error ", err);
      alert("Something went wrong, please try again");
    }
  };

  //FIXME: לרוקן אובייקט מתוכן הטפסים
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

  // log in
  getUserFromDB = async () => {
    let OBJ = {
      Email: this.inputsObj.userEmail,
      Password: this.inputsObj.userPassword,
    };
    try {
      let user = await Api.postRequest(`/users/getUserFromDb`, OBJ);
      console.log("user.data: ", user.data);
      this.props.updateUser(user.data);
      console.log("user: ", this.props.user);
      this.props.updateUserRole(user.data[0].Role);
      console.log("userRole: ", this.props.userRole);
      this.props.updateUserID(user.data[0].ID);
      console.log("userID: ", this.props.userID);
      this.props.updateLogInStatus(false);
      console.log("updateLogInStatus: ", this.props.logInFormStatus);
      console.log("userID again: ", this.props.userID);
    } catch (err) {
      console.log("Error ", err);
      alert("Something went wrong, please try again");
    }
  };

  // Registration
  insertUserToDB = async () => {
    let currentObj = {
      FirstName: this.inputsObj.FirstName,
      LastName: this.inputsObj.LastName,
      Email: this.inputsObj.Email,
      Password: this.inputsObj.Password,
      Role: 0,
    };
    // TODO: unique
    if (currentObj.FirstName === undefined || currentObj.LastName === undefined || currentObj.Email == undefined || currentObj.Password === undefined) {
      alert("All fields must be filled out");

      // let currentAlert = "";
      // switch (currentObj) {
      //   case currentObj.FirstName === undefined:
      //     currentAlert = "A First Name must be entered ";
      //     break;
      //   case currentObj.LastName === undefined:
      //     currentAlert = "A Last Name must be entered";
      //     break;
      //   case currentObj.Email == undefined:
      //     currentAlert = "An email address must be entered";
      //     break;
      //   case currentObj.Password === undefined:
      //     currentAlert = "A Password must be entered";
      //     break;
      // }
      // alert(currentAlert);

      // const action = "say_hello";
      // switch (action) {
      //   case "say_hello": {
      //     // added brackets
      //     let message = "hello";
      //     console.log(message);
      //     break;
      //   } // added brackets
      //   case "say_hi": {
      //     // added brackets
      //     let message = "hi";
      //     console.log(message);
      //     break;
      //   } // added brackets
      //   default: {
      //     // added brackets
      //     console.log("Empty action received.");
      //     break;
      //   } // added brackets
      // }
    } else {
      try {
        let user = await Api.postRequest("/users/insertUserToDb", currentObj);
        if (user.statusText === "OK") {
          console.log("insert user answer: ", user.data);
          this.inputsObj.userEmail = user.data.Email;
          this.inputsObj.userPassword = user.data.Password;
          this.props.updateUserFormStatus(false);
          this.getUserFromDB();
        } else {
          alert("something went wrong, please try again");
        }
      } catch (err) {
        console.log("Error ", err);
        alert("Something went wrong, please try again");
      }
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

  // forms buttons
  closeLogInForm = () => {
    this.props.updateLogInStatus(false);
    console.log("log in status close : ", this.props.logInFormStatus);
  };

  openRegistrationForm = () => {
    // close log in if he is open
    this.props.updateLogInStatus(false);

    // open addUser form
    this.props.updateUserFormStatus(true);
    console.log("userFormStatus : ", this.props.userFormStatus);
  };

  closeRegistrationForm = () => {
    this.props.updateUserFormStatus(false);
    this.props.updateLogInStatus(true);
    console.log("add user status close : ", this.props.userFormStatus);
  };
  // TODO:
  // vacation form buttons
  editVacationClicked = (vacationObj) => {
    // witch button
    this.props.updateVacationButtonsForm(1);
    // open vacation form
    this.props.UpdateShowVacationForm(true);
    //witch vacation edit
    this.props.updateVacationToForm(vacationObj);
  };

  addVacationClicked = () => {
    // witch button
    this.props.updateVacationButtonsForm(0);

    // open vacation form
    this.props.UpdateShowVacationForm(true);
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
  // end img

  render() {
    return (
      <div className="container">
        <div
          className="row logInROW my-2"
          style={{
            backgroundImage: `url(${"assets/images/tapetTest.png"})`,
            backgroundRepeat: "no-repeat",
          }}
        >
          {this.props.logInFormStatus ? <LogInForm onChangeFN={this.onChangeFN} closeLogInForm={this.closeLogInForm} getUserFromDB={this.getUserFromDB} openRegistrationForm={this.openRegistrationForm} /> : ""}
        </div>
        <div
          className="row logInROW my-2"
          style={{
            backgroundImage: `url(${"assets/images/tapetTest.png"})`,
            backgroundRepeat: "no-repeat",
          }}
        >
          {this.props.userFormStatus ? <RegistrationForm onChangeFN={this.onChangeFN} closeRegistrationForm={this.closeRegistrationForm} insertUserToDB={this.insertUserToDB} /> : ""}
        </div>
        <div className="row">
          {this.props.userRole === 1 ? (
            <abbr title="Add New Vacation">
              <i className="fas fa-plus fa-2x" onClick={() => this.addVacationClicked()}></i>
            </abbr>
          ) : (
            ""
          )}
        </div>
        <div className="row addVacationROW">
          {this.props.userRole === 1 && this.props.showVacationForm ? (
            <AddVacationForm onChangeFN={this.onChangeFN} closeVacationForm={this.closeVacationForm} fileChangeEvent={this.fileChangeEvent} upload={this.upload} insertVacationToDB={this.insertVacationToDB} updateVacationDetailsInDB={this.updateVacationDetailsInDB} vacationFormButtonsStatus={this.props.vacationFormButtonsStatus} vacationToEdit={this.props.vacationToEdit} />
          ) : (
            ""
          )}
        </div>
        <div className="row">{this.props.userID === 0 ? "" : <SingleVacationCard userRole={this.props.userRole} vacations={this.props.vacations} insertNewFallowToDB={this.insertNewFallowToDB} deleteUserFallowFromDB={this.deleteUserFallowFromDB} deleteVacationFromDB={this.deleteVacationFromDB} editVacationClicked={this.editVacationClicked} />}</div>
      </div>
    );
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
