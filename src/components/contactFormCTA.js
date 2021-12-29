import React, { useContext } from "react";
import { ModalContext } from "../contexts/modal-provider";
import ContactForm from "./contactForm";

const ContactFormCTA = ({ children }) => {
  const { handleModal } = useContext(ModalContext);
  return (
    <button onClick={(event) => handleModal(event, <ContactForm />)}>
      {children}
    </button>
  );
};

export default ContactFormCTA;
