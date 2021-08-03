import React from "react";
export default function Carousel(props) {
  let data = props.data;
  // console.log(props);
  return (
    <div>
      <div
        id="carouselExampleDark"
        className="carousel carousel-dark slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          {data.map((data, index) => {
            // console.log(data, "....", index);
            if (index === 0) {
              //   console.log("button if", index);
              return (
                <button
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide-to={index}
                  className="active"
                  aria-current="true"
                  aria-label={"Slide " + (index + 1)}
                  key={index}
                ></button>
              );
            } else {
              //   console.log("button else", index);
              return (
                <button
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide-to={index}
                  aria-label={"Slide " + (index + 1)}
                  key={index}
                ></button>
              );
            }
          })}
        </div>
        <div className="carousel-inner">
          {data.map((data, index) => {
            if (index === 0) {
              //   console.log("button if", index);
              return (
                <div
                  className="carousel-item active"
                  data-bs-interval="10000"
                  key={index}
                >
                  <img src={data.image} className="d-block w-100" alt="..." />
                  <div className="carousel-caption d-none d-md-block text-bold">
                    <h4>
                      <b>{data.title}</b>
                    </h4>
                    <h6>{data.disc}</h6>
                  </div>
                </div>
              );
            } else {
              //   console.log("button else", index);
              return (
                <div
                  className="carousel-item"
                  data-bs-interval="2000"
                  key={index}
                >
                  <img src={data.image} className="d-block w-100" alt="..." />
                  <div className="carousel-caption d-none d-md-block">
                    <h4>
                      <b>{data.title}</b>
                    </h4>
                    <h6>{data.disc}</h6>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
