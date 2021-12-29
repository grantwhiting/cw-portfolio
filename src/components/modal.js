import React, { useContext } from "react";
import { createPortal } from "react-dom";
import { ModalContext } from "../contexts/modal-provider";

const Modal = () => {
  const { modalContent, handleModal, modal } = useContext(ModalContext);
  const container = document.getElementById("portal");

  if (modal) {
    return createPortal(
      <div
        className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-screen"
        style={{ background: "rgba(0,0,0,0.8)" }}
      >
        <div className="relative flex flex-col items-start w-full max-w-5xl p-5 text-lg text-gray-800 bg-white rounded shadow-lg h-4/5">
          <button
            className="absolute top-0 right-0 self-end w-8 h-8 font-bold"
            onClick={(event) => handleModal(event)}
          >
            &times;
          </button>
          {modalContent}
        </div>
      </div>,
      container
    );
  }
  return null;
};

export default Modal;
