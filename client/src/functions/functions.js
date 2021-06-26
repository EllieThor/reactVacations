import { connect } from "react-redux";
import * as Api from "../Api/apiCalls";
export let inputsObj = {
  imageName: "",
  // Destination: "",
  // Description: "",
  // Price: 0,
  // ImageName: "",
  // StartDate: "",
  // EndDate: "",
};

export function onChangeFN(e) {
  inputsObj[e.target.id] = e.target.value;
  console.log("new Input To inputsObj :", e.target.id, "value: ", e.target.value);
}

export async function getUserFromDB() {
  let OBJ = {
    Email: inputsObj.userEmail,
    Password: inputsObj.userPassword,
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

export default connect(mapStateToProps, mapDispatchToProps);
