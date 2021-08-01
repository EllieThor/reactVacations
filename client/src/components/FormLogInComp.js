import React, { Component } from "react";
import "../css/style.css";
import { connect } from "react-redux";
import * as Api from "../Api/apiCalls";

class LogInComp extends Component {
  componentDidMount() {}
  // patterns OBJ
  inputsObj = {
    imageName: "",
  };

  onChangeFN = (e) => {
    this.inputsObj[e.target.id] = e.target.value;
  };

  getUserFromDB = async () => {
    let OBJ = {
      Email: this.inputsObj.userEmail,
      Password: this.inputsObj.userPassword,
    };
    try {
      let user = await Api.postRequest(`/users/getUserFromDb`, OBJ);
      this.props.updateUser(user.data);
    } catch (err) {
      // console.log("Error ", err);
      alert("Something went wrong, please try again");
    }
  };

  render() {
    return (
      <div className="container p-3 mt-3">
        <div className="">
          <h1 className="h3 mb-3 fw-normal">Please Log In</h1>
          <input type="email" id="userEmail" className="form-control m-2" placeholder="Email address" required="" autoFocus="" onChange={(e) => this.onChangeFN(e)} />
          <input type="password" id="userPassword" className="form-control  m-2" placeholder="Password" required="" autoComplete="" onChange={(e) => this.onChangeFN(e)} />
          <button className="w-100 btn btn-lg m-2 btn-dark" data-bs-dismiss="modal" onClick={() => this.getUserFromDB()}>
            Log in
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogInComp);
