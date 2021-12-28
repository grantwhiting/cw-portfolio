import { useState } from "react";

function useModal() {
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState();

  const handleModal = (content = false) => {
    setModal(!modal);
    if (content) {
      setModalContent(content);
    }
  };

  return { modal, handleModal, modalContent };
}

export default useModal;
