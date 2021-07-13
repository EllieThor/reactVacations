import React, { Component } from "react";
import "../css/style.css";
import { connect } from "react-redux";
import * as Api from "../Api/apiCalls";
import { Redirect } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../components/HeaderComp";
import SingleVacationCard from "../components/SingleVacCardCopm";
import Footer from "../components/FooterComp";
import Modal from "../components/ModalComp";

import VacationComp from "../components/FormVacationComp";
import SweetAlert from "../components/SweetAlertComp";

class Vacations extends Component {
  componentDidMount() {
    this.getVacationsFromDB();
  }

  // patterns OBJ
  inputsObj = {
    imageName: "",
    fileToUpload: "",
    imageNameForServer: "",
  };

  onChangeFN = (e) => {
    this.inputsObj[e.target.id] = e.target.value;
    console.log("new Input To inputsObj :", e.target.id, "value: ", e.target.value);
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
  // FIXME: sweetAlert
  // editVacationClicked = (vacationObj) => {
  //   console.log("editVacationClicked vacationObj : ", vacationObj);
  //   this.props.updateVacationToForm({});
  //   console.log("AFTER DELETE vacationToEdit : ", this.props.vacationToEdit);
  //   // witch button
  //   this.props.updateVacationButtonsForm(1);
  //   //witch vacation edit

  //   this.props.updateVacationToForm(vacationObj);
  //   console.log("AFTER UPDATE vacationToEdit : ", this.props.vacationToEdit);

  //   //update modal content
  //   this.props.updateContent(3);

  //   this.SweetAlertVacation(1, vacationObj);
  // };

  SweetAlertVacation = (title, vacationObj) => {
    Swal.fire({
      title: title === 0 ? "Add new Vacation" : "Edit Vacation",
      html: `
        <label htmlFor="Destination">Destination:</label>
        <input type="text" id="Destination" class="swal2-input" placeholder="Destination" value="${vacationObj == undefined ? "" : vacationObj.Destination}">
        <label htmlFor="Description">Description:</label>
        <input type="text" id="Description" class="swal2-input" placeholder="Description" value="${vacationObj == undefined ? "" : vacationObj.Description}">
        <label htmlFor="Price">Price:</label>
        <input type="number" id="Price" class="swal2-input" placeholder="Price" value="${vacationObj == undefined ? "" : vacationObj.Price}"><br/>
        <label htmlFor="StartDate">StartDate:</label>
        <input type="date" id="StartDate" class="swal2-input" placeholder="StartDate" value="${vacationObj == undefined ? "" : vacationObj.StartDate}"><br/>
        <label htmlFor="EndDate">EndDate:</label>
        <input type="date" id="EndDate" class="swal2-input" placeholder="EndDate" value="${vacationObj == undefined ? "" : vacationObj.EndDate}">
        <input type="file" id="fileToUpload" class="swal2-input" name="Image">
        
      `,
      // `Destination`, `Description`, `Price`, `ImageName`, `StartDate`, `EndDate`
      confirmButtonText: "Add Vacation",
      focusConfirm: false,
      preConfirm: () => {
        const Destination = Swal.getPopup().querySelector("#Destination").value;
        const Description = Swal.getPopup().querySelector("#Description").value;
        const Price = Swal.getPopup().querySelector("#Price").value;
        const StartDate = Swal.getPopup().querySelector("#StartDate").value;
        const EndDate = Swal.getPopup().querySelector("#EndDate").value;
        const fileToUpload = Swal.getPopup().querySelector("#fileToUpload").files;
        if (!Destination || !Description || !Price || !StartDate || !EndDate || !fileToUpload) {
          Swal.showValidationMessage(`Please enter all fields`);
        }
        return { Destination: Destination, Description: Description, Price: Price, StartDate: StartDate, EndDate: EndDate, fileToUpload: fileToUpload };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.uploadIMGToServer(result.value.fileToUpload);
        console.log("image name for insert : ", result.value.fileToUpload[0]["name"]);
        this.updateVacationDetailsInDB(vacationObj.ID, result.value.Destination, result.value.Description, result.value.Price, result.value.StartDate, result.value.EndDate, result.value.fileToUpload[0]["name"]);
      }
    });
  };

  uploadIMGToServer = async (file) => {
    if (file !== undefined) {
      const formData = new FormData();
      const files = file;
      console.log("files : ", files);

      for (let i = 0; i < files.length; i++) {
        formData.append("uploads[]", files[i], files[i]["name"]);
      }
      console.log("formData :  ", formData);
      console.log("UPLOAD! ", formData);

      let res = await Api.postRequest("/upload", formData);
      console.log("IMG is upload : ", res);
    } else {
      alert("Click to upload image please");
    }
  };

  updateVacationDetailsInDB = async (vacationId, Destination, Description, Price, StartDate, EndDate, ImgName) => {
    let currentObj = {
      ID: vacationId,
      Destination: Destination,
      Description: Description,
      Price: Price,
      ImageName: ImgName,
      StartDate: StartDate,
      EndDate: EndDate,
    };

    try {
      let vacation = await Api.postRequest("/vacations/updateVacationDetailsInDb", currentObj);
      this.getVacationsFromDB();
      this.inputsObj = {
        fileToUpload: "",
        imageName: "",
        imageNameForServer: "",
      };

      console.log("this.inputsObj AFTER : ", this.inputsObj);
      console.log("all vacations: ", this.props.vacations);
    } catch (err) {
      console.log("Error ", err);
      alert("Something went wrong, please try again");
    }
  };

  insertVacationToDB = async (Destination, Description, Price, StartDate, EndDate, ImgName) => {
    let currentObj = {
      Destination: Destination,
      Description: Description,
      Price: Price,
      ImageName: ImgName,
      StartDate: StartDate,
      EndDate: EndDate,
      // `vacations`-`ID`, `Destination`, `Description`, `Price`, `ImageName`, `StartDate`, `EndDate`, `createdAt`, `updatedAt`
    };
    console.log("currentObj: ", currentObj);

    try {
      let vacation = await Api.postRequest("/vacations/insertVacationToDb", currentObj);
      this.getVacationsFromDB();
      this.globalObj = {
        welcomeTime: "",
        fileToUpload: "",
        imageName: "",
        imageNameForServer: "",
      };
      console.log("new vacations: ", this.props.vacations);
    } catch (err) {
      console.log("Error ", err);
      alert("Something went wrong, please try again");
    }
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

  render() {
    if (this.props.user[0] === undefined) {
      return <Redirect from="/Vacations" to="/" />;
    } else {
      return (
        <div>
          <div>{this.props.user[0] === undefined ? "" : <Header />}</div>
          <div className="container">
            <div className="row mt-3">{this.props.user[0] === undefined ? "" : <SingleVacationCard user={this.props.user[0]} vacations={this.props.vacations} insertStarToDB={this.insertStarToDB} deleteStarFromDB={this.deleteStarFromDB} deleteVacationFromDB={this.deleteVacationFromDB} editVacationClicked={this.editVacationClicked} />}</div>
          </div>
          <div className="footer">{this.props.user[0] === undefined ? "" : <Footer />}</div>
          <div className="row">
            <Modal content={this.props.content} />
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
