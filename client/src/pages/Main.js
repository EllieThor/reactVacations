import React, { Component } from "react";
import "../css/style.css";
import axios from "axios";
import { connect } from "react-redux";
import * as Api from "../Api/apiCalls";
import { Route, Link } from "react-router-dom";

import AddVacationForm from "../components/addVacationFormComponent";
import LogInForm from "../components/logInFormComponent";
import RegistrationForm from "../components/registrationFormComponent";

import UserIconCPT from "../components/userIconComponent";

import SingleVacationCard from "../components/singleVacationCard";

import Chart from "chart.js/auto";
import Reports from "../components/reportsComponent";

class Main extends Component {
  componentDidMount() {
    // this.getVacationsFromDB();
  }
  // patterns OBJ
  inputsObj = {
    imageName: "",
  };
  // logOut
  logOutIconClicked = () => {
    this.props.updateUserID(0);
    this.props.updateUser([]);
    this.props.updateUserRole(0);
    this.props.updateLogInStatus(true);
  };

  getGraph = () => {
    console.log("this.props.vacationsNames: ", this.props.vacationsNames);
    let ctx = document.getElementById("myChart").getContext("2d");
    let myChart = new Chart(ctx, {
      type: "bar",
      data: {
        // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        labels: this.props.vacationsNames,
        datasets: [
          {
            // TODO: מה זה הלייבל
            label: "# of Votes",
            // data: [12, 19, 3, 5, 2, 3],
            data: this.props.numberOfStars,
            backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(255, 159, 64, 0.2)"],
            borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
            borderWidth: 1,
          },
        ],
      },
      // options: {
      //   scales: {
      //     y: {
      //       beginAtZero: true,
      //     },
      //   },
      // },
    });
  };
  onChangeFN = (e) => {
    this.inputsObj[e.target.id] = e.target.value;
    console.log("new Input To inputsObj :", e.target.id, "value: ", e.target.value);
  };

  getVacationsFromDB = async () => {
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
        // vacationsNames.push(item.Destination);
        numberOf = item.follows.length;
        // numberOf > 0 ? numberOfStars.push(item.follows.length) : (test = 0);
        if (numberOf > 0) {
          numberOfStars.push(item.follows.length);
          vacationsNames.push(item.Destination);
        }
      });
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
      this.getVacationsFromDB();
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

    // TODO: unique email -הוספתי בדאטה בייס יוניק אבל בגלל שהוא לא מקבל מייל שקיים הוא זורק שגיאה- אם השגיאה היא כזו אז לכתוב מייל קיים
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
          if (user.data.name === "SequelizeUniqueConstraintError") {
            alert("user is already exists, Please try another email");
          } else {
            console.log("insert user answer: ", user.data);
            this.inputsObj.userEmail = user.data.Email;
            this.inputsObj.userPassword = user.data.Password;
            this.props.updateUserFormStatus(false);
            this.getUserFromDB();
          }
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

  // TODO: Modal
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
        <div className="row">{this.props.logInFormStatus ? "" : <UserIconCPT logOutIconClicked={this.logOutIconClicked} />}</div>
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
        <div className="row">{this.props.userID === 0 ? "" : <SingleVacationCard userRole={this.props.userRole} userID={this.props.userID} vacations={this.props.vacations} insertNewFallowToDB={this.insertNewFallowToDB} deleteUserFallowFromDB={this.deleteUserFallowFromDB} deleteVacationFromDB={this.deleteVacationFromDB} editVacationClicked={this.editVacationClicked} />}</div>
        <div>{this.props.userRole === 1 ? <Reports /> : ""}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);
