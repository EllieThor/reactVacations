import React from "react";
import LogInComp from "../components/LogInFormComp";
import RegistrationComp from "./RegistrationComp";
const Modal = (props) => {
  return (
    <div>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title mb-3 fw-normal text-center" id="exampleModalLabel">
                title
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">{props.body === 1 ? <LogInComp /> : props.body === 2 ? <RegistrationComp /> : ""}</div>
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
