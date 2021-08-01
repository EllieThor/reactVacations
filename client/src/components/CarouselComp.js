import React from "react";
import "../css/style.css";

const CarouselComp = (props) => {
  let randoms = props.vacations === undefined ? "" : props.vacations;

  let img1 = randoms[0] === undefined ? "" : "http://localhost:5004/" + randoms[0].ImageName;
  let img2 = randoms[0] === undefined ? "" : "http://localhost:5004/" + randoms[1].ImageName;
  let img3 = randoms[0] === undefined ? "" : "http://localhost:5004/" + randoms[2].ImageName;

  return (
    <div className="row">
      <div className="col-9 mx-auto">
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={img1} className="d-block w-100" alt="..." />
              <div className="carousel-caption carouselTextArea d-md-block">
                <h5 className="randomsText">{randoms[0] === undefined ? "" : randoms[0].Destination}</h5>
              </div>
            </div>
            <div className="carousel-item">
              <img src={img2} className="d-block w-100" alt="..." />
              <div className="carousel-caption carouselTextArea d-md-block">
                <h5 className="randomsText">{randoms[0] === undefined ? "" : randoms[1].Destination}</h5>
              </div>
            </div>
            <div className="carousel-item">
              <img src={img3} className="d-block w-100" alt="..." />
              <div className="carousel-caption carouselTextArea d-md-block ">
                <h5 className="randomsText">{randoms[0] === undefined ? "" : randoms[2].Destination}</h5>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default CarouselComp;
