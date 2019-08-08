import React from "react";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./toastify.css";

export const Toastify = () => {
  // identifier
  const containerId = "main-toastify";
  // position of toast
  const position = "top-right";
  // in miliseconds
  const autoCloseDelay = 2000;
  // transition type
  const transition = Slide;

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
      transition={transition}
    />
  );
};
