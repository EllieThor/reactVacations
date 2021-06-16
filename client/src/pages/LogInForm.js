import React, { Component } from "react";
import "../css/style.css";
import axios from "axios";
import { connect } from "react-redux";
import * as Api from "../Api/apiCalls";
import { Route, Link } from "react-router-dom";
import Chart from "chart.js/auto";

class LogIn extends Component {
  componentDidMount() {
    
  }
  // patterns OBJ
  inputsObj = {
    imageName: "",
  };

  onChangeFN = (e) => {
    this.inputsObj[e.target.id] = e.target.value;
    console.log("new Input To inputsObj :", e.target.id, "value: ", e.target.value);
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
    } catch (err) {
      console.log("Error ", err);
      alert("Something went wrong, please try again");
    }
  };

  openRegistrationForm = () => {
    // close log in if he is open
    this.props.updateLogInStatus(false);

    // open addUser form
    this.props.updateUserFormStatus(true);
    console.log("userFormStatus : ", this.props.userFormStatus);
  };

  render() {
    return (
      <div
        className="container p-3 mt-3 logInPage"
        style={{
          backgroundImage: `url(${"assets/images/tapetTest.png"})`,
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="logInForm p-5">
          {/* <form> */}
          <h1 className="h3 mb-3 fw-normal">Please Log In</h1>
          <input type="email" id="userEmail" className="form-control m-2" placeholder="Email address" required="" autoFocus="" onChange={(e) => this.onChangeFN(e)} />
          <input type="password" id="userPassword" className="form-control  m-2" placeholder="Password" required="" autoComplete="" onChange={(e) => this.onChangeFN(e)} />
          <Link to="/Vacations">
            <button className="w-100 btn btn-lg m-2 btn-dark" type="submit" onClick={() => this.getUserFromDB()}>
              Log in
            </button>
          </Link>

          <Link to="/RegistrationForm">
            <button className="w-100 btn btn-lg m-2 btn-dark">Registration</button>
          </Link>
          {/* <button className="w-100 btn btn-lg m-2 btn-dark" onClick={() => this.openRegistrationForm()}>
            Registration
          </button> */}
          {/* </form> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
