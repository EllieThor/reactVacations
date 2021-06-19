import React from "react";
import { Link } from "react-router-dom";
import "../css/style.css";

const HeaderComponent = (props) => {
  let welcomeTime;
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
    // case 4 < time < 12:
    //   welcomeTime = "Good Morning, ";
    //   break;
    // case 11 < time < 16:
    //   welcomeTime = "Good Noon, ";
    //   break;
    // case 15 < time < 22:
    //   welcomeTime = "Good Afternoon, ";
    //   break;
    // case 21 < time < 24:
    //   welcomeTime = "Good Evening, ";
    //   break;
    // case 0 < time < 5:
    //   welcomeTime = "Good Night, ";
    //   break;
  }
  // let time = new Date().getHours();
  // console.log(".time: ", time, " welcome: ", welcomeTime);
  return (
    <div className="row header pt-2">
      <div className="col-3">
        <h2 className="logo">Vacation Stars</h2>
      </div>
      <div className="col-5 d-flex align-items-end">
        <h5 className="welcome"> {props.user[0] === undefined ? "" : welcomeTime + props.user[0].FirstName + " " + props.user[0].LastName}</h5>
      </div>
      <div className="col-4 text-end">
        <div className="row">
          <div className="col-4 offset-8">
            <div className="row">
              <div className="col-4">
                {props.userRole === 1 && window.location.pathname === "/Vacations" ? (
                  <Link to="/Reports">
                    <abbr title="Reports">
                      <i className="far fa-chart-bar fa-2x px-3 iconsColor"></i>
                    </abbr>
                  </Link>
                ) : props.userRole === 1 && window.location.pathname === "/Reports" ? (
                  <Link to="/Vacations">
                    <abbr title="Back to Vacation">
                      <i className="fas fa-map-marked-alt fa-2x px-3 iconsColor"></i>
                    </abbr>
                  </Link>
                ) : (
                  ""
                )}
              </div>
              <div className="col-4">
                {props.userRole === 1 ? (
                  <abbr title="Add New Vacation">
                    <i className="fas fa-plus fa-2x px-3 iconsColor" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => props.addVacationClicked()}></i>
                  </abbr>
                ) : (
                  ""
                )}
              </div>
              <div className="col-4">
                <Link to="/">
                  <abbr title="Log Out">
                    <i className="fas fa-sign-out-alt fa-2x  px-3 iconsColor" onClick={props.logOutIconClicked}></i>
                  </abbr>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
