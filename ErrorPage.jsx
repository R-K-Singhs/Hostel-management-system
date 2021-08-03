import React from "react";
import "./child_style/EmptyPage.css";
import image from "./chield_images/error_img.jpeg";

export default function ErrorPage() {
  return (
    <div
      className="error-box-container text-center d-flex flex-column  justify-content-center"
      style={{ textAlign: "center" }}
    >
      <div>
        <img
          src={image}
          alt="error"
          style={{ maxHeight: "400px", maxWidth: "600px" }}
        />
      </div>
    </div>
  );
}
