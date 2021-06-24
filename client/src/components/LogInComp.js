import React, { Component } from "react";
import "../css/style.css";
import { connect } from "react-redux";
import * as Api from "../Api/apiCalls";
import { Link, Redirect } from "react-router-dom";
import * as GlobalFNs from "../functions/functions";

class LogInComp extends Component {
  componentDidMount() {}
  // patterns OBJ
  inputsObj = {
    imageName: "",
  };

  // onChangeFN = (e) => {
  //   this.inputsObj[e.target.id] = e.target.value;
  //   console.log("new Input To inputsObj :", e.target.id, "value: ", e.target.value);
  // };

  getUserFromDB = async () => {
    let OBJ = {
      Email: GlobalFNs.inputsObj.userEmail,
      Password: GlobalFNs.inputsObj.userPassword,
    };
    try {
      let user = await Api.postRequest(`/users/getUserFromDb`, OBJ);
      // console.log("user.data: ", user.data);
      this.props.updateUser(user.data);
      // console.log("user: ", this.props.user);
      this.props.updateUserRole(user.data[0].Role);
      // console.log("userRole: ", this.props.userRole);
      this.props.updateUserID(user.data[0].ID);
      // console.log("userID: ", this.props.userID);
    } catch (err) {
      console.log("Error ", err);
      alert("Something went wrong, please try again");
    }
  };
  updateContent = (value) => {
    this.props.updateContent(value);
  };
  render() {
    return (
      <div className="container p-3 mt-3">
        <div className=" p-5">
          <h1 className="h3 mb-3 fw-normal">Please Log In</h1>
          <input type="email" id="userEmail" className="form-control m-2" placeholder="Email address" required="" autoFocus="" onChange={(e) => GlobalFNs.onChangeFN(e)} />
          <input type="password" id="userPassword" className="form-control  m-2" placeholder="Password" required="" autoComplete="" onChange={(e) => GlobalFNs.onChangeFN(e)} />
          <button className="w-100 btn btn-lg m-2 btn-dark" data-bs-dismiss="modal" onClick={() => this.getUserFromDB()}>
            Log in
          </button>
          {/* <Link to="/RegistrationForm"> */}
          {/* TODO: modal inside modal */}
          <button className="w-100 btn btn-lg m-2 btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => this.updateContent(1)}>
            Registration
          </button>
          {/* </Link> */}
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

    //modal
    updateContent(value) {
      dispatch({
        type: "updateContent",
        payload: value,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogInComp);
