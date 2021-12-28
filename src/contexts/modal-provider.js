import React, { createContext } from "react";
import useModal from "../hooks/useModal";
import Modal from "../components/modal";

const ModalContext = createContext({});

const ModalProvider = ({ children }) => {
  const { modal, handleModal, modalContent } = useModal();

  return (
    <ModalContext.Provider
      value={{
        modal,
        handleModal,
        modalContent,
      }}
    >
      <Modal />
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
