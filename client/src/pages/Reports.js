import React, { Component } from "react";
import "../css/style.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Chart from "chart.js/auto";

import Footer from "../components/FooterComp";
import Header from "../components/HeaderComp";

class Reports extends Component {
  componentDidMount() {
    if (this.props.userID === 0) {
      return <Redirect from="/Reports" to="/" />;
    } else this.getGraph();
  }
  // patterns OBJ
  inputsObj = {
    imageName: "",
  };
  onChangeFN = (e) => {
    this.inputsObj[e.target.id] = e.target.value;
    console.log("new Input To inputsObj :", e.target.id, "value: ", e.target.value);
  };

  getGraph = () => {
    let ctx = document.getElementById("myChart").getContext("2d");
    let myChart = new Chart(ctx, {
      type: "bar",
      data: {
        // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        labels: this.props.vacations.filter((vac) => vac.follows.length > 0).map((vacation) => vacation.Destination),
        datasets: [
          {
            // TODO: מה זה הלייבל
            label: "# of Votes",
            // data: [12, 19, 3, 5, 2, 3],
            data: this.props.vacations.filter((vac) => vac.follows.length > 0).map((vacation) => vacation.follows.length),
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
  // logOut
  logOutIconClicked = () => {
    this.props.updateUserID(0);
    this.props.updateUser([]);
    this.props.updateUserRole(0);
  };
  render() {
    if (this.props.userID === 0) {
      return <Redirect from="/Reports" to="/" />;
    } else {
      return (
        <div>
          <div className="row">
            <Header />
          </div>
          <div className="row mt-3 py-4">
            <div id="graphDIV" className="graph">
              <canvas id="myChart" className="graph"></canvas>
            </div>
          </div>
          <div className="row">
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

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
