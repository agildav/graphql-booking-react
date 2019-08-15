import React from "react";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./toastify.scss";

export const Toastify = () => {
  // identifier
  const containerId = "main-toastify";
  // position of toast
  const position = "top-right";
  // in miliseconds
  const autoCloseDelay = 1200;

  return (
    <ToastContainer
      containerId={containerId}
      position={position}
      autoClose={autoCloseDelay}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      draggable
      pauseOnHover
      transition={Slide}
    />
  );
};
