import React, { Component } from "react";
import "../css/style.css";
import { connect } from "react-redux";
import * as Api from "../Api/apiCalls";
import { Redirect } from "react-router-dom";
import moment from "moment";

import Nav from "../components/NavComp";
import NextVacationComp from "../components/NextVacationComp";
import CarouselComp from "../components/CarouselComp";
import MostPopularComp from "../components/MostPopularComp";
import Footer from "../components/FooterComp";
class Home extends Component {
  componentDidMount() {
    this.getVacationsFromDB();
  }

  updateContent = (value) => {
    this.props.updateContent(value);
  };

  getVacationsFromDB = async () => {
    try {
      let vacations = await Api.postRequest(`/vacations/getVacationsFromDb`);
      let allVacations = vacations.data;

      // carousel

      // Shuffle array
      let forRandom = [...allVacations];
      const shuffled = forRandom.sort(() => 0.5 - Math.random());
      // Get sub-array of first n elements after shuffled
      let randomVacations = shuffled.slice(0, 3);
      this.randoms = randomVacations;

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
      // 3 most popular

      let vacTest = [...allVacations];
      this.threeVacations = vacTest.sort((a, b) => b.follows.length - a.follows.length).slice(0, 3);

      // vacations array
      this.props.updateVacations(allVacations);
    } catch (err) {
      // console.log("Error ", err);
      alert("Something went wrong, please try again: ", err);
    }
  };

  render() {
    if (this.props.user[0] !== undefined) {
      return <Redirect from="/" to="/Vacations" />;
    } else {
      return (
        <div className="container-fluid">
          <div className="row">{<Nav user={this.props.user[0]} updateContent={this.updateContent} content={this.props.content} />}</div>
          <h2 className="text-center py-5 my-3 meriendaFont ourNextVacation">Our Vacations</h2>
          <div className="row py-2">
            <CarouselComp vacations={this.randoms} />
          </div>
          <h2 className="text-center py-5 meriendaFont ourNextVacation">Our next vacation</h2>
          <div className="row mb-4">{this.props.vacations[this.nearestVacIndex] === undefined ? "" : <NextVacationComp vacation={this.props.vacations[this.nearestVacIndex]} />}</div>
          <div className="row mt-2 HBackground">
            <h2 className="text-center pt-5 meriendaFont ">The three most popular vacations</h2>
            <h4 className="text-center p-5 notoSansKRFont ">
              On this site you can watch vacations, and if you like them you can vote and make an impact! <br />
              Give your favorite vacations a star, and maybe your favorite vacation will be one of the top three.
            </h4>
          </div>
          <div className="row my-5">{this.props.vacations === undefined ? "" : <MostPopularComp vacations={this.threeVacations} />}</div>
          <div className="footer mt-3 py-2">
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
