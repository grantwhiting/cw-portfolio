import { useState } from "react";

export default () => {
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState("I'm the Modal Content");

  const handleModal = (e, content) => {
    if (e) {
      e.preventDefault();
    }

    if (e.target.id !== "modalContent") {
      setModal(!modal);

      if (content) {
        setModalContent(content);
      }
    }
  };

  return { modal, handleModal, modalContent };
};
