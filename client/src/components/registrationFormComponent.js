import React from "react";
import "../css/style.css";
const Registration = (props) => {
  return (
    <div>
      {" "}
      {/* <form action="get"> */}
      <div className="RegistrationForm p-5">
        <div className="row">
          <div className="col-12">
            <abbr title="Close">
              <i className="fas fa-times float-end" onClick={() => props.closeRegistrationForm()}></i>
            </abbr>
          </div>
        </div>
        <div className="row">
          <h1 className="h3 mb-3 fw-normal">Please register</h1>
          <div className="col">
            <label htmlFor="FirstName">First Name:</label>
            <input type="text" id="FirstName" className="form-control" onChange={(e) => props.onChangeFN(e)} />
            <label htmlFor="Email">Email:</label>
            <input type="email" id="Email" className="form-control" onChange={(e) => props.onChangeFN(e)} />
          </div>
          <div className="col">
            <label htmlFor="LastName">Last Name:</label>
            <input type="text" id="LastName" className="form-control" onChange={(e) => props.onChangeFN(e)} />
            <label htmlFor="Password">Password:</label>
            <input type="password" id="Password" className="form-control" onChange={(e) => props.onChangeFN(e)} />
          </div>
          <button className="btn btn-dark mt-3" onClick={() => props.insertUserToDB()}>
            add user
          </button>
        </div>
      </div>
      {/* </form> */}
    </div>
  );
};

export default Registration;
