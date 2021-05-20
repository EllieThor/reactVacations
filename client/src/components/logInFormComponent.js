import React from "react";
import "../css/style.css";
const LogInForm = (props) => {
  return (
    <div>
      <div className="logInForm p-5">
        {/* <form> */}
        {/* <abbr title="Close">
          <i className="fas fa-times float-end" onClick={() => props.closeLogInForm()}></i>
        </abbr> */}
        <h1 className="h3 mb-3 fw-normal">Please Log In</h1>
        <input type="email" id="userEmail" className="form-control m-2" placeholder="Email address" required="" autoFocus="" onChange={(e) => props.onChangeFN(e)} />
        <input type="password" id="userPassword" className="form-control  m-2" placeholder="Password" required="" autoComplete="" onChange={(e) => props.onChangeFN(e)} />
        <button className="w-100 btn btn-lg m-2 btn-dark" type="submit" onClick={() => props.getUserFromDB()}>
          Log in
        </button>
        <button className="w-100 btn btn-lg m-2 btn-dark" onClick={() => props.openRegistrationForm()}>
          Registration
        </button>
        {/* </form> */}
      </div>
    </div>
  );
};

export default LogInForm;
