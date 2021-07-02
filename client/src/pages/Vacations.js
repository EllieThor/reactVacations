import React, { Component } from "react";
import "../css/style.css";
import { connect } from "react-redux";
import * as Api from "../Api/apiCalls";
import { Redirect } from "react-router-dom";

import Header from "../components/HeaderComp";
import SingleVacationCard from "../components/SingleVacCardCopm";
import Footer from "../components/FooterComp";

import VacationComp from "../components/FormVacationComp";

class Vacations extends Component {
  componentDidMount() {
    this.getVacationsFromDB();
  }
  state = {};
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
        let isUserExist = item.follows.includes(this.props.user[0] === undefined ? 0 : this.props.user[0].ID);
        if (isUserExist) {
          allVacations.splice(i, 1);
          allVacations.unshift(item);
        }
        // console.log("this.props.user[0].ID: ", this.props.user[0].ID, "usersIDs: ", usersIDs, " test sorting: ", isUserExist);
      });

      // vacations array
      this.props.updateVacations(allVacations);
      console.log("all vacations: ", allVacations);
    } catch (err) {
      console.log("Error ", err);
      alert("Something went wrong, please try again: ", err);
    }
  };

  insertStarToDB = async (vacationID) => {
    let currentObj = {
      vacationID: vacationID,
      userID: this.props.user[0].ID,
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
      userID: this.props.user[0].ID,
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
    console.log("editVacationClicked vacationObj : ", vacationObj);
    this.props.updateVacationToForm({});
    console.log("AFTER DELETE vacationToEdit : ", this.props.vacationToEdit);
    // witch button
    this.props.updateVacationButtonsForm(1);
    //witch vacation edit

    this.props.updateVacationToForm(vacationObj);
    console.log("AFTER UPDATE vacationToEdit : ", this.props.vacationToEdit);

    //update modal content
    this.props.updateContent(3);
  };

  // TODO: להעיף להאדר
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

  teyMe = () => {
    document.getElementById("removeMe").remove();
  };

  returnMe = () => {
    document.getElementById("removeMe").hide();
  };

  // end img
  render() {
    if (this.props.user[0] === undefined) {
      return <Redirect from="/Vacations" to="/" />;
    } else {
      return (
        <div>
          {/* <div>
            <div>
              but not me!
              <div id="removeMe">hi destroy me!</div>
            </div>
            <button className="btn btn-info" onClick={() => this.teyMe()}>
              try me
            </button>
            <hr />
          </div> */}
          <div>{this.props.user[0] === undefined ? "" : <Header />}</div>
          <div>{this.props.user[0] === undefined ? "" : <VacationComp />}</div>
          <div className="container">
            <div className="row mt-3">{this.props.user[0] === undefined ? "" : <SingleVacationCard user={this.props.user[0]} vacations={this.props.vacations} insertStarToDB={this.insertStarToDB} deleteStarFromDB={this.deleteStarFromDB} deleteVacationFromDB={this.deleteVacationFromDB} editVacationClicked={this.editVacationClicked} />}</div>
          </div>
          <div className="footer">{this.props.user[0] === undefined ? "" : <Footer />}</div>
        </div>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    vacations: state.vacations,
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
