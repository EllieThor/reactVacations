import React, { Component } from "react";
import "../css/style.css";
import { connect } from "react-redux";
import * as Api from "../Api/apiCalls";

import { Link } from "react-router-dom";

class RegistrationForm extends Component {
  componentDidMount() {}
  // patterns OBJ
  inputsObj = {
    imageName: "",
  };

  onChangeFN = (e) => {
    this.inputsObj[e.target.id] = e.target.value;
    console.log("new Input To inputsObj :", e.target.id, "value: ", e.target.value);
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
    if (currentObj.FirstName === undefined || currentObj.LastName === undefined || currentObj.Email === undefined || currentObj.Password === undefined) {
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
    } catch (err) {
      console.log("Error ", err);
      alert("Something went wrong, please try again");
    }
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
        <div className="RegistrationForm p-5">
          <div className="row">
            <div className="col-12">
              <Link to="/">
                <abbr title="Close">
                  <i className="fas fa-times float-end"></i>
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

    // vacationForm
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
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
