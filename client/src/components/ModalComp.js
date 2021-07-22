import React from "react";
import LogInComp from "./FormLogInComp";
import RegistrationComp from "./FormRegisterComp";

const Modal = (props) => {
  return (
    <div>
      <div className="modal fade" id="logOrRegisterModal" tabIndex="-1" aria-labelledby="logOrRegisterModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title mb-3 fw-normal text-center" id="logOrRegisterModalLabel">
                Vacations Stars
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">{props.content === 1 ? <LogInComp /> : props.content === 2 ? <RegistrationComp /> : "error, please reload again"}</div>
            <div className="modal-footer">
              <button type="reset" className="btn btn-dark" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
