import React from "react";
import { Route, Link } from "react-router-dom";

const HeaderComponent = (props) => {
  let time = new Date().getHours();

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
      welcomeTime = "Good Noon, ";
      break;
    case 16:
    case 17:
    case 18:
      welcomeTime = "Good Afternoon, ";
      break;
    case 19:
    case 20:
    case 21:
      welcomeTime = "Good Evening, ";

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
  console.log(".time: ", time, " welcome: ", welcomeTime);
  return (
    <div className="row">
      <div className="col-6">
        <h4> {props.user[0] === undefined ? "" : welcomeTime + props.user[0].FirstName + " " + props.user[0].LastName}</h4>
      </div>
      <div className="col-6 text-end">
        <div className="row">
          <div className="col-4 offset-8">
            {props.userRole === 1 ? (
              <abbr title="Add New Vacation">
                <i className="fas fa-plus fa-2x px-2" onClick={() => props.addVacationClicked()}></i>
              </abbr>
            ) : (
              ""
            )}
            <Link to="/">
              <abbr title="Log Out">
                <i className="fas fa-sign-out-alt fa-2x  px-2 logout" onClick={props.logOutIconClicked}></i>
              </abbr>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
