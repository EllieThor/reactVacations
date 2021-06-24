import React from "react";
import "../css/style.css";
const MostPopularComp = (props) => {
  let vacationCard =
    props.vacations === undefined
      ? ""
      : props.vacations.map((vacation, i) => {
          let img = "http://localhost:5004/" + vacation.ImageName;
          return (
            <div key={i} className="col-4">
              <div className="card">
                <img src={img} className="" alt={vacation.ImageName} />
                <div className="card-body">
                  <h5 className="card-text">{i === 0 ? "First Place" : i === 1 ? "Second Place" : i === 2 ? "Third Place" : ""}</h5>
                  <p className="card-text">{vacation.Description}</p>
                  <h3 className="card__title">{vacation.Destination}</h3>
                  <div className="card__title"></div>
                  <h6 className="card__title">{vacation.Price}&#36;</h6>
                </div>
              </div>
              {/* <span className="cardPu">
                <img src={img} className="" alt={vacation.ImageName} />
                <div className="card__overlay">
                  <div className="card__header">
                    <div className="card__header-text">
                      <h3 className="card__title">{vacation.Destination}</h3>
                      <span className="card__status">{vacation.Price}</span>
                    </div>
                  </div>
                  <p className="card__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, blanditiis?</p>
                </div>
              </span> */}
            </div>
            // <div key={i} className="carousel-item active">
            //   <img src={img} className="d-block w-100" alt={vacation.ImageName} />
            //   <div className="carousel-caption d-none d-md-block">
            //     <h5>{vacation.Destination}</h5>
            //     <p>{vacation.Price}</p>
            //   </div>
            // </div>
          );
        });

  return (
    // <div className="popularRow">
    //   <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
    //     <div className="carousel-indicators">
    //       <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    //       <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    //       <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
    //     </div>
    //     <div className="carousel-inner">{vacationCard}</div>
    //     <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    //       <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    //       <span className="visually-hidden">Previous</span>
    //     </button>
    //     <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    //       <span className="carousel-control-next-icon" aria-hidden="true"></span>
    //       <span className="visually-hidden">Next</span>
    //     </button>
    //   </div>
    // </div>
    <div className="row">{vacationCard}</div>
  );
};

export default MostPopularComp;
