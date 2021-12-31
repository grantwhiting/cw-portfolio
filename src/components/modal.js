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
            className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-screen"
            style={{ background: "rgba(0,0,0,0.8)" }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={spring}
              className="relative flex flex-col items-start w-full max-w-5xl p-5 text-lg text-gray-800 bg-white rounded-lg shadow-lg h-4/5"
            >
              <button
                className="absolute top-0 right-0 self-end w-8 h-8 font-bold"
                onClick={(event) => handleModal(event)}
              >
                &times;
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
