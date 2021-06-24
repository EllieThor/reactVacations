import React, { Component } from "react";
import "../css/style.css";
import { connect } from "react-redux";
import * as Api from "../Api/apiCalls";
import { Link, Redirect } from "react-router-dom";
import moment from "moment";

import Header from "../components/HeaderComponent";
import LastVacation from "../components/NextVacationComp";
import MostPopularComp from "../components/MostPopularComp";
import Footer from "../components/footerComponent";
class Home extends Component {
  componentDidMount() {
    this.getVacationsFromDB();
  }
  // patterns OBJ
  inputsObj = {
    imageName: "",
    nearestVacIndex: 0,
    threeVacations: [],
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
    } catch (err) {
      console.log("Error ", err);
      alert("Something went wrong, please try again");
    }
  };

  updateContent = (value) => {
    this.props.updateContent(value);
  };

  getVacationsFromDB = async () => {
    try {
      let vacations = await Api.postRequest(`/vacations/getVacationsFromDb`);
      let allVacations = vacations.data;
      console.log("allVacations: ", allVacations);

      // next vacation
      const dateToCheckFor = moment();
      let nearestDate;

      allVacations.forEach((date, i) => {
        let diff = moment(date.StartDate).diff(moment(dateToCheckFor), "days");
        if (diff > 0) {
          if (nearestDate) {
            if (moment(date.StartDate).diff(moment(nearestDate), "days") < 0) {
              nearestDate = date.StartDate;
              this.nearestVacIndex = i;
            }
          } else {
            nearestDate = date.StartDate;
            this.nearestVacIndex = i;
          }
        }
      });
      console.log("nearestDate: ", nearestDate, " AND nearestVacation: ", this.nearestVacIndex);
      console.log("nearest Vacation: ", allVacations[this.nearestVacIndex]);
      // 3 popular
      let vacTest = [...allVacations];
      this.threeVacations = vacTest.sort((a, b) => b.follows.length - a.follows.length).slice(0, 3);
      console.log("this.threeVacations!!!!: ", this.threeVacations);
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

        // sorting
        let isUserExist = usersIDs.includes(this.props.userID);
        if (isUserExist) {
          allVacations.splice(i, 1);
          allVacations.unshift(item);
        }
        // console.log("this.props.userID: ", this.props.userID, "usersIDs: ", usersIDs, " test sorting: ", isUserExist);
      });

      // vacations array
      this.props.updateVacations(allVacations);
      console.log("all vacations after map: ", this.props.vacations);

      // TODO: delete graph before updating ???? אם הפונקציה של הגרף כבויה אין בעיות אבל העדכון של נתונים חדשים דופק אותה
      // this.getGraph();
    } catch (err) {
      console.log("Error ", err);
      alert("Something went wrong, please try again: ", err);
    }
  };

  render() {
    if (this.props.userID !== 0) {
      return <Redirect from="/" to="/Vacations" />;
    } else {
      return (
        <div className="container-fluid">
          <div className="row">
            <Header />
          </div>
          {/* text image */}
          <div className="row">row 1</div>
          {/* last vacation */}
          <div className="row">{this.props.vacations[this.nearestVacIndex] === undefined ? "" : <LastVacation vacation={this.props.vacations[this.nearestVacIndex]} />}</div>

          <h2 className="text-center py-5">The three most popular vacations</h2>
          <div className="row mb-5">{this.props.vacations === undefined ? "" : <MostPopularComp vacations={this.threeVacations} />}</div>
          <div className="row mt-2">
            <Footer />
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
