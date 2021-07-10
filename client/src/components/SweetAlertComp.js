import React, { Component } from "react";
import Swal from "sweetalert2";
// const Swal = require("sweetalert2");
class SweetAlert extends Component {
  componentDidMount() {}
  SweetAlertOpen = () => {
    console.log("gg");
    Swal.fire("Oops...", "Something went wrong!", "error");
  };
  render() {
    return (
      <div>
        <button className="btn btn-success" onClick={this.SweetAlertOpen}>
          try me!
        </button>
      </div>
    );
  }
}

export default SweetAlert;
