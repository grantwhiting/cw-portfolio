import React, { ReactDOM, useContext } from "react";
import { ModalContext } from "../contexts/modal-provider";

const Modal = () => {
  const { modalContent, handleModal, modal } = useContext(ModalContext);
  const PortalChildren = () => (
    <div
      className="fixed top-0 left-0 flex items-center justify-center w-full h-screen"
      style={{ background: "rgba(0,0,0,0.8)" }}
    >
      <button
        className="absolute top-0 right-0 self-end w-8 h-8 mb-3 -mt-12 font-bold text-red-700 bg-white bg-red-200 rounded-full"
        onClick={() => handleModal()}
      >
        &times;
      </button>
      <div>{modalContent}</div>
      <div className="relative flex flex-col items-start p-5 text-lg text-gray-800 bg-white rounded shadow-lg"></div>
    </div>
  );

  const container = document.getElementById("portal");

  if (modal) {
    return ReactDOM.createPortal(PortalChildren, container);
  }
  return null;
};

export default Modal;
