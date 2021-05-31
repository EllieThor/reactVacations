import React, { Component } from "react";
import "../css/style.css";
import axios from "axios";
import { connect } from "react-redux";
import * as Api from "../Api/apiCalls";
import Chart from "chart.js/auto";

import { Route, Link } from "react-router-dom";

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // patterns OBJ
  inputsObj = {
    imageName: "",
  };

  onChangeFN = (e) => {
    this.inputsObj[e.target.id] = e.target.value;
    console.log("new Input To inputsObj :", e.target.id, "value: ", e.target.value);
  };

  closeRegistrationForm = () => {
    this.props.updateUserFormStatus(false);
    this.props.updateLogInStatus(true);
    console.log("add user status close : ", this.props.userFormStatus);
  };

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
  render() {
    return (
      <div
        className="container  p-3 mt-3"
        style={{
          backgroundImage: `url(${"assets/images/tapetTest.png"})`,
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* <form action="get"> */}
        <div className="RegistrationForm p-5">
          <div className="row">
            <div className="col-12">
              <Link to="/">
                <abbr title="Close">
                  <i className="fas fa-times float-end" onClick={() => this.closeRegistrationForm()}></i>
                </abbr>
              </Link>
            </div>
          </div>
          <div className="row">
            <h1 className="h3 mb-3 fw-normal">Please register</h1>
            <div className="col">
              <label htmlFor="FirstName">First Name:</label>
              <input type="text" id="FirstName" className="form-control" onChange={(e) => this.onChangeFN(e)} />
              <label htmlFor="Email">Email:</label>
              <input type="email" id="Email" className="form-control" onChange={(e) => this.onChangeFN(e)} />
            </div>
            <div className="col">
              <label htmlFor="LastName">Last Name:</label>
              <input type="text" id="LastName" className="form-control" onChange={(e) => this.onChangeFN(e)} />
              <label htmlFor="Password">Password:</label>
              <input type="password" id="Password" className="form-control" onChange={(e) => this.onChangeFN(e)} />
            </div>
            <Link to="/Vacations">
              <button className="btn btn-dark mt-3" onClick={() => this.insertUserToDB()}>
                add user
              </button>
            </Link>
          </div>
        </div>
        {/* </form> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // vacations: state.vacations,
    user: state.user,
    userID: state.userID,
    userRole: state.userRole,
    logInFormStatus: state.logInFormStatus,
    userFormStatus: state.userFormStatus,
    // vacationForm
    // showVacationForm: state.showVacationForm,
    // vacationFormButtonsStatus: state.vacationFormButtonsStatus,
    // vacationToEdit: state.vacationToEdit,
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
    // UpdateShowVacationForm(value) {
    //   dispatch({
    //     type: "UpdateShowVacationForm",
    //     payload: value,
    //   });
    // },
    // updateVacationButtonsForm(value) {
    //   dispatch({
    //     type: "updateVacationButtonsForm",
    //     payload: value,
    //   });
    // },
    // updateVacationToForm(value) {
    //   dispatch({
    //     type: "updateVacationToForm",
    //     payload: value,
    //   });
    // },
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

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
