import React from "react";
import { Link } from "react-router-dom";
import "../css/style.css";

const Nav = (props) => {
  let welcomeTime;
  // 19 <= time <= 21;
  switch (new Date().getHours()) {
    case 22:
    case 23:
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
      welcomeTime = "Good Night, ";
      break;
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
      welcomeTime = "Good Morning, ";
      break;
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 18:
      welcomeTime = "Good Afternoon, ";
      break;
    case 19:
    case 20:
    case 21:
      welcomeTime = "Good Evening, ";
      break;
    default:
      welcomeTime = "Hello, ";
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
              <h5 className="welcome me-2 pe-4"> {props.user[0] === undefined ? "" : welcomeTime + props.user[0].FirstName + " " + props.user[0].LastName}</h5>
              <div className="row">
                <div className="col-4">
                  {props.userRole === 1 && window.location.pathname === "/Vacations" ? (
                    <Link to="/Reports">
                      <abbr title="Reports">
                        <i className="far fa-chart-bar fa-2x  iconsColor"></i>
                      </abbr>
                    </Link>
                  ) : props.userRole === 1 && window.location.pathname === "/Reports" ? (
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
                  {props.userRole === 1 && window.location.pathname === "/Vacations" ? (
                    <abbr title="Add New Vacation">
                      <i className="fas fa-plus fa-2x iconsColor" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => props.addVacationClicked()}></i>
                    </abbr>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-4">
                  {props.user[0] === undefined ? (
                    <abbr title="Log In">
                      <i className="fas fa-user-circle fa-2x iconsColor" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                    </abbr>
                  ) : (
                    <Link to="/Home">
                      <abbr title="Log Out">
                        <i className="fas fa-sign-out-alt fa-2x iconsColor" onClick={props.logOutIconClicked}></i>
                      </abbr>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
