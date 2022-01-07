import React, { useContext } from "react";
import { Portal } from "react-portal";
import { ModalContext } from "../contexts/modal-provider";
import { motion, AnimatePresence } from "framer-motion";

const Modal = () => {
  const { modalContent, handleModal, modal } = useContext(ModalContext);

  const spring = {
    type: "spring",
    damping: 50,
    stiffness: 750,
    mass: 2,
    duration: 0.1,
  };

  return (
    <Portal>
      <AnimatePresence>
        {modal && (
          <motion.div
            id="modalContainer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-screen modal-trigger"
            style={{ background: "rgba(0,0,0,0.8)" }}
            onClick={(event) => handleModal(event)}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={spring}
              className="relative flex flex-col items-start max-w-5xl p-5 text-lg text-gray-800 bg-white rounded-lg shadow-lg"
              style={{ width: "90%" }}
            >
              <button
                className="absolute self-end font-bold right-2 top-2 h-9 w-9 modal-trigger"
                onClick={(event) => handleModal(event)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-9 w-9 modal-trigger"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  onClick={(event) => handleModal(event)}
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {modalContent}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
};

export default Modal;
