import React, { Component } from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import "../css/style.css";
import * as Api from "../Api/apiCalls";

import LogInComp from "./FormLogInComp";
import RegistrationComp from "./FormRegisterComp";
import VacationComp from "./FormVacationComp";

class SweetAlert extends Component {
  componentDidMount() {}
  SweetAlertOpen = () => {
    Swal.fire({
      title: "Login Form",
      html: `
      <input type="text" id="login" class="swal2-input" placeholder="Username">
      <input type="password" id="password" class="swal2-input" placeholder="Password">`,
      confirmButtonText: "Sign in",
      focusConfirm: false,
      preConfirm: () => {
        const login = Swal.getPopup().querySelector("#login").value;
        const password = Swal.getPopup().querySelector("#password").value;
        if (!login || !password) {
          Swal.showValidationMessage(`Please enter login and password`);
        }
        return { login: login, password: password };
      },
    }).then((result) => {
      this.getUserFromDB(result.value.login, result.value.password);
    });
  };
  getUserFromDB = async (userEmail, userPassword) => {
    let OBJ = {
      Email: userEmail,
      Password: userPassword,
    };
    try {
      let user = await Api.postRequest(`/users/getUserFromDb`, OBJ);
      this.props.updateUser(user.data);
    } catch (err) {
      console.log("Error ", err);
      alert("Something went wrong, please try again");
    }
  };
  // html: `<div>${this.props.content === 1 ? <LogInComp /> : this.props.content === 2 ? <RegistrationComp /> : this.props.content === 3 ? <VacationComp /> : "error, please reload again"}</div>`,
  updateContent = (value) => {
    this.props.updateContent(value);
  };
  render() {
    return (
      <div>
        <button className="btn btn-success" onClick={() => this.updateContent(2)} onClick={this.SweetAlertOpen}>
          try me!
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
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
    updateUser(value) {
      dispatch({
        type: "updateUser",
        payload: value,
      });
    },
    // vacation form
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
export default connect(mapStateToProps, mapDispatchToProps)(SweetAlert);
