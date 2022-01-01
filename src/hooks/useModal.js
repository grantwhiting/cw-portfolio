import { useState } from "react";

const useModal = () => {
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState("I'm the Modal Content");

  const handleModal = (e, content) => {
    if (e) {
      e.preventDefault();
    }

    if (e.target.classList.contains("modal-trigger")) {
      setModal(!modal);

      if (content) {
        setModalContent(content);
      }
    }
  };

  return { modal, handleModal, modalContent };
};

export default useModal;
