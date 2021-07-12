import React, { Component } from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import "../css/style.css";
import * as Api from "../Api/apiCalls";

class SweetAlert extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <div>SweetAlert</div>
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
