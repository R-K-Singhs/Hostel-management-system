import React from "react";
import "./child_style/EmptyPage.css";
import image from "./chield_images/emptyImg.jpg";

export default function EmptyPage() {
  return (
    <div className="empty-box-container m-0 p-0 text-center d-flex flex-column justify-content-center">
      <div>
        <img
          src={image}
          alt="error"
          style={{
            maxHeight: "400px",
            maxWidth: "600px",
          }}
        />
        <h1 className="justify-content-center" style={{ marginTop: "-14rem" }}>
          <b className="empty-box-text">Empty</b>
        </h1>
      </div>
    </div>
  );
}
