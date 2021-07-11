import React, { Component } from "react";
import "../css/style.css";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import moment from "moment";
import Modal from "./ModalComp";
import ModalTRY from "./ModalTry";

import * as Api from "../Api/apiCalls";
import Swal from "sweetalert2";

class Header extends Component {
  componentDidMount() {}
  globalObj = {
    welcomeTime: "",
    fileToUpload: "",
    imageName: "",
    imageNameForServer: "",
  };
  // addNewVacBtn = () => (!this.props.newVac ? this.props.updateAddNewVac(true) : this.props.updateAddNewVac(false));

  addVacationClicked = () => {
    // witch button
    this.props.updateVacationButtonsForm(0);
    //update modal content
    this.props.updateContent(3);
  };

  updateContent = (value) => {
    this.props.updateContent(value);
  };
  // logOut
  logOutIconClicked = () => {
    this.props.updateUser([]);
  };
  SweetAlertLogIn = (title) => {
    Swal.fire({
      title: title === 0 ? "Please Login" : "email or password wrong, please try again",
      html: `
      <input type="text" id="email" class="swal2-input" placeholder="Email">
      <input type="password" id="password" class="swal2-input" placeholder="Password">`,
      confirmButtonText: "Sign in",
      focusConfirm: false,
      preConfirm: () => {
        const email = Swal.getPopup().querySelector("#email").value;
        const password = Swal.getPopup().querySelector("#password").value;
        if (!email || !password) {
          Swal.showValidationMessage(`Please enter email and password`);
        }
        return { email: email, password: password };
      },
    }).then((result) => {
      if (result.isConfirmed) this.getUserFromDB(result.value.email, result.value.password);
    });
  };

  SweetAlertRegister = (title, FirstName, LastName) => {
    Swal.fire({
      title: title === 0 ? "Please Register" : "user is already exists, Please try another email",
      html: `
      <input type="text" id="firstName" class="swal2-input" value="${FirstName == undefined ? "" : FirstName}"  placeholder="FirstName">
      <input type="text" id="lastName" class="swal2-input"  value="${LastName == undefined ? "" : LastName}" placeholder="LastName">
      <input type="text" id="email" class="swal2-input" placeholder="Email">
      <input type="password" id="password" class="swal2-input" placeholder="Password">`,
      confirmButtonText: "Sign in",
      focusConfirm: false,
      preConfirm: () => {
        const email = Swal.getPopup().querySelector("#email").value;
        const password = Swal.getPopup().querySelector("#password").value;
        const firstName = Swal.getPopup().querySelector("#firstName").value;
        const lastName = Swal.getPopup().querySelector("#lastName").value;
        if (!email || !password || !firstName || !lastName) {
          Swal.showValidationMessage(`Please enter all fields`);
        }
        return { email: email, password: password, firstName: firstName, lastName: lastName };
      },
    }).then((result) => {
      if (result.isConfirmed) this.insertUserToDB(result.value.firstName, result.value.lastName, result.value.email, result.value.password);
    });
  };

  insertUserToDB = async (FirstName, LastName, Email, Password) => {
    let currentObj = {
      FirstName: FirstName,
      LastName: LastName,
      Email: Email,
      Password: Password,
      Role: 0,
    };

    try {
      let user = await Api.postRequest("/users/insertUserToDb", currentObj);
      if (user.statusText === "OK") {
        if (user.data.name === "SequelizeUniqueConstraintError") {
          // alert("user is already exists, Please try another email");
          this.SweetAlertRegister(1, FirstName, LastName);
        } else {
          console.log("insert user answer: ", user.data);
          // this.globalObj.userEmail = user.data.Email;
          // this.globalObj.userPassword = user.data.Password;
          this.getUserFromDB(user.data.Email, user.data.Password);
        }
      } else {
        alert("something went wrong, please try again");
      }
    } catch (err) {
      console.log("Error ", err);
      alert("Something went wrong, please try again");
    }
  };

  getUserFromDB = async (userEmail, userPassword) => {
    let OBJ = {
      Email: userEmail,
      Password: userPassword,
    };
    try {
      let user = await Api.postRequest(`/users/getUserFromDb`, OBJ);
      console.log("user result : ", user.data.length);
      // if (user.data.length == 0) alert("user or password wrong");
      // FIXME: אולי יפריע לרגיסטר
      if (user.data.length == 0) this.SweetAlertLogIn(1);
      else this.props.updateUser(user.data);
    } catch (err) {
      console.log("Error ", err);
      alert("Something went wrong, please try again");
    }
  };

  SweetAlertVacation = (title) => {
    Swal.fire({
      title: title === 0 ? "Add new Vacation" : "Edit Vacation",
      html: `
        <label htmlFor="Destination">Destination:</label>
        <input type="text" id="Destination" class="swal2-input" placeholder="Destination">
        <label htmlFor="Description">Description:</label>
        <input type="text" id="Description" class="swal2-input" placeholder="Description">
        <label htmlFor="Price">Price:</label>
        <input type="number" id="Price" class="swal2-input" placeholder="Price"><br/>
        <label htmlFor="StartDate">StartDate:</label>
        <input type="date" id="StartDate" class="swal2-input" placeholder="StartDate"><br/>
        <label htmlFor="EndDate">EndDate:</label>
        <input type="date" id="EndDate" class="swal2-input" placeholder="EndDate">
        <input type="file" id="fileToUpload" class="swal2-input" name="Image">
        
      `,
      // `Destination`, `Description`, `Price`, `ImageName`, `StartDate`, `EndDate`
      confirmButtonText: "Sign in",
      focusConfirm: false,
      preConfirm: () => {
        const Destination = Swal.getPopup().querySelector("#Destination").value;
        const Description = Swal.getPopup().querySelector("#Description").value;
        const Price = Swal.getPopup().querySelector("#Price").value;
        const StartDate = Swal.getPopup().querySelector("#StartDate").value;
        const EndDate = Swal.getPopup().querySelector("#EndDate").value;
        const fileToUpload = Swal.getPopup().querySelector("#fileToUpload").files[0];
        if (!Destination || !Description || !Price || !StartDate || !EndDate || !fileToUpload) {
          Swal.showValidationMessage(`Please enter all fields`);
        }
        return { Destination: Destination, Description: Description, Price: Price, StartDate: StartDate, EndDate: EndDate, fileToUpload: fileToUpload };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // this.fileChangeEvent(result.value.fileToUpload);
        this.uploadIMGToServer(result.value.fileToUpload);
        console.log("result.value.fileToUpload : ", result.value.fileToUpload);
        this.insertVacationToDB(result.value.Destination, result.value.Description, result.value.Price, result.value.StartDate, result.value.EndDate, result.value.fileToUpload.name);
      }
    });
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

  SweetAlertVacationTest = async () => {
    const { value: file } = await Swal.fire({
      title: "Select image",
      input: "file",
      inputAttributes: {
        accept: "image/*",
        "aria-label": "Upload your profile picture",
      },
      html: `
        <label htmlFor="Destination">Destination:</label>
        <input type="text" id="Destination" class="swal2-input" placeholder="Destination">
        <label htmlFor="Description">Description:</label>
        <input type="text" id="Description" class="swal2-input" placeholder="Description">
        <label htmlFor="Price">Price:</label>
        <input type="number" id="Price" class="swal2-input" placeholder="Price"><br/>
        <label htmlFor="StartDate">StartDate:</label>
        <input type="date" id="StartDate" class="swal2-input" placeholder="StartDate">
        <label htmlFor="EndDate">EndDate:</label>
        <input type="date" id="EndDate" class="swal2-input" placeholder="EndDate">
      `,
      // confirmButtonText: "Sign in",
      // focusConfirm: false,
      preConfirm: () => {
        const Destination = Swal.getPopup().querySelector("#Destination").value;
        const Description = Swal.getPopup().querySelector("#Description").value;
        const Price = Swal.getPopup().querySelector("#Price").value;
        const StartDate = Swal.getPopup().querySelector("#StartDate").value;
        const EndDate = Swal.getPopup().querySelector("#EndDate").value;
        if (!Destination || !Description || !Price || !StartDate || !EndDate) {
          Swal.showValidationMessage(`Please enter all fields`);
        }
        return { Destination: Destination, Description: Description, Price: Price, StartDate: StartDate, EndDate: EndDate };
      },
    });

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        Swal.fire({
          title: "Your uploaded picture",
          imageUrl: e.target.result,
          imageAlt: "The uploaded picture",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  fileChangeEvent = (file) => {
    console.log("fileChangeEvent :  ", file);
    this.globalObj.fileToUpload = file;
    this.uploadIMG();
  };

  uploadIMG = async () => {
    if (this.globalObj.fileToUpload !== undefined) {
      const formData = new FormData();
      const files = this.globalObj.fileToUpload;

      for (let i = 0; i < files.length; i++) {
        formData.append("uploads[]", files[i], files[i]["name"]);
      }
      console.log("UPLOAD! ", formData);

      let res = await Api.postRequest("/upload", formData);
      console.log("react is IMG? ", res);
    } else {
      alert("Click to upload image please");
    }
  };

  uploadIMGToServer = async (file) => {
    console.log("$#$#$# file : ", file);
    if (file !== undefined) {
      const formData = new FormData();
      const files = file;
      console.log("files : files:  ", files);

      for (let i = 0; i < files.length; i++) {
        formData.append("uploads[]", files[i], files[i]["name"]);
      }
      console.log("formData : formData:  ", formData);
      console.log("UPLOAD! ", formData);

      let res = await Api.postRequest("/upload", formData);
      console.log("react is IMG? ", res);
    } else {
      alert("Click to upload image please");
    }
  };

  render() {
    switch (Number(moment().format("H"))) {
      case 22:
      case 23:
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
        this.globalObj.welcomeTime = "Good Night, ";
        break;
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
        this.globalObj.welcomeTime = "Good Morning, ";
        break;
      case 12:
      case 13:
      case 14:
      case 15:
      case 16:
      case 17:
      case 18:
        this.globalObj.welcomeTime = "Good Afternoon, ";
        break;
      case 19:
      case 20:
      case 21:
        this.globalObj.welcomeTime = "Good Evening, ";
        break;
      default:
        this.globalObj.welcomeTime = "Hello, ";
    }
    return (
      <div className="headerS p-4 pb-2">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <div className="navbar-brand">
              <h2 className="logo">Vacation Stars</h2>
            </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav ms-auto pe-5 me-5">
                <h5 className="welcome me-2 pe-4"> {this.props.user[0] === undefined ? "" : this.globalObj.welcomeTime + this.props.user[0].FirstName + " " + this.props.user[0].LastName}</h5>
                <div className="row">
                  <div className="col-4">
                    {this.props.user[0] === undefined ? (
                      <abbr title="Log In">
                        {/* <i className="fas fa-user-circle fa-2x iconsColor" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => this.updateContent(1)}></i> */}
                        <i className="fas fa-user-circle fa-2x iconsColor" onClick={() => this.SweetAlertLogIn(0)}></i>
                      </abbr>
                    ) : this.props.user[0].Role === 1 && window.location.pathname === "/Vacations" ? (
                      <Link to="/Reports">
                        <abbr title="Reports">
                          <i className="far fa-chart-bar fa-2x  iconsColor"></i>
                        </abbr>
                      </Link>
                    ) : this.props.user[0].Role === 1 && window.location.pathname === "/Reports" ? (
                      <Link to="/Vacations">
                        <abbr title="Back to Vacation">
                          <i className="fas fa-map-marked-alt fa-2x  iconsColor"></i>
                        </abbr>
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="col-4">
                    {(this.props.user[0] === undefined ? "" : this.props.user[0].Role) === 1 && window.location.pathname === "/Vacations" ? (
                      <abbr title="Add New Vacation">
                        {/* <i className="fas fa-plus fa-2x iconsColor" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => this.addVacationClicked()}></i> */}
                        <i className="fas fa-plus fa-2x iconsColor" onClick={() => this.SweetAlertVacation(0)}></i>
                        {/* <i className="fas fa-plus fa-2x iconsColor" onClick={() => this.SweetAlertVacationTest()}></i> */}
                      </abbr>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="col-4">
                    {this.props.user[0] === undefined ? (
                      <abbr title="Register">
                        {/* <i className="fas fa-user-plus fa-2x iconsColor" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => this.updateContent(2)}></i> */}
                        <i className="fas fa-user-plus fa-2x iconsColor" onClick={() => this.SweetAlertRegister(0)}></i>
                      </abbr>
                    ) : (
                      <Link to="/">
                        <abbr title="Log Out">
                          <i className="fas fa-sign-out-alt fa-2x iconsColor" onClick={this.logOutIconClicked}></i>
                        </abbr>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className="row">
          <Modal content={this.props.content} />
          {/* <ModalTRY content={this.props.content} /> */}
        </div>
      </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
