import React, { Component } from "react";
import "../css/style.css";
import { connect } from "react-redux";
import * as Api from "../Api/apiCalls";
import { Redirect } from "react-router-dom";

import Header from "../components/HeaderComp";
import SingleVacationCard from "../components/SingleVacCardCopm";
import Footer from "../components/FooterComp";

class Vacations extends Component {
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
    console.log("yael inputsObj :", this.inputsObj);
  };

  getVacationsFromDB = async () => {
    try {
      let vacations = await Api.postRequest(`/vacations/getVacationsFromDb`);
      let allVacations = vacations.data;

      // map on vacations array in order to edit follows array In each of the items
      allVacations.map((item, i) => {
        let followsArr = item.follows;
        let usersIDs = [];
        // משפיע גם בקומפוננטה של אייקון פולו
        // map on followsArr array in order to convert followsArr from array of objects to arr of usersId's numbers
        followsArr.map((id, i) => {
          let testing = Object.values(followsArr[i]);
          usersIDs.push(...testing);
        });
        item.follows = usersIDs;
        // console.log("usersIDs : ", usersIDs);

        // sorting
        let isUserExist = item.follows.includes(this.props.userID);
        if (isUserExist) {
          allVacations.splice(i, 1);
          allVacations.unshift(item);
        }
        // console.log("this.props.userID: ", this.props.userID, "usersIDs: ", usersIDs, " test sorting: ", isUserExist);
      });

      // vacations array
      this.props.updateVacations(allVacations);
      console.log("all vacations: ", allVacations);

      // TODO: delete graph before updating ???? אם הפונקציה של הגרף כבויה אין בעיות אבל העדכון של נתונים חדשים דופק אותה
      // this.getGraph();
    } catch (err) {
      console.log("Error ", err);
      alert("Something went wrong, please try again: ", err);
    }
  };

  insertStarToDB = async (vacationID) => {
    let currentObj = {
      vacationID: vacationID,
      userID: this.props.userID,
    };

    try {
      let userFallow = await Api.postRequest("/users/insertStar", currentObj);
      console.log("if user star: ", userFallow);
      this.getVacationsFromDB();
    } catch (err) {
      console.log("Error ", err);
      alert("Something went wrong, please try again");
    }
  };

  deleteStarFromDB = async (vacationID) => {
    let currentObj = {
      vacationID: vacationID,
      userID: this.props.userID,
    };
    try {
      let vacation = await Api.postRequest("/users/deleteStar", currentObj);
      this.getVacationsFromDB();
      console.log("all vacations: ", this.props.vacations);
    } catch (err) {
      console.log("Error ", err);
      alert("Something went wrong, please try again");
    }
  };

  // TODO: inputs stay after default- לא קשור לריקון האובייקט הגלובלי כי זה דיפולט! ברגע שכבר יש ערך הוא שם אותו
  // vacation form buttons
  editVacationClicked = (vacationObj) => {
    // witch button
    this.props.updateVacationButtonsForm(1);
    //witch vacation edit
    this.props.updateVacationToForm(vacationObj);
    //update modal content
    this.props.updateContent(3);
  };

  addVacationClicked = () => {
    // witch button
    this.props.updateVacationButtonsForm(0);
    //update modal content
    this.props.updateContent(3);
  };

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
        <div>
          <div>{this.props.user[0] === undefined ? "" : <Header />}</div>
          <div className="container">
            <div className="row mt-3">{this.props.userID === 0 ? "" : <SingleVacationCard userRole={this.props.userRole} userID={this.props.userID} vacations={this.props.vacations} insertStarToDB={this.insertStarToDB} deleteStarFromDB={this.deleteStarFromDB} deleteVacationFromDB={this.deleteVacationFromDB} editVacationClicked={this.editVacationClicked} />}</div>
          </div>
          <div className="footer">{this.props.userID === 0 ? "" : <Footer />}</div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Vacations);
