import React from "react";
import { useState } from "react";
import "./child_style/RatingIndicator.css";

export default function RatingIndicator(props) {
  const [ratting, setratting] = useState(parseInt(props.rating));

  return (
    <div>
      <div className="d-flex mt-2 text-center justify-content-center">
        <span
          className={
            ratting >= 1 ? "me-1 fa fa-star checked" : "me-1 fa fa-star"
          }
        ></span>
        <span
          className={
            ratting >= 2 ? "me-1 fa fa-star checked" : "me-1 fa fa-star"
          }
        ></span>
        <span
          className={
            ratting >= 3 ? "me-1 fa fa-star checked" : "me-1 fa fa-star"
          }
        ></span>
        <span
          className={
            ratting >= 4 ? "me-1 fa fa-star checked" : "me-1 fa fa-star"
          }
        ></span>
        <span
          className={
            ratting >= 5 ? "me-1 fa fa-star checked" : "me-1 fa fa-star"
          }
        ></span>
      </div>
    </div>
  );
}
