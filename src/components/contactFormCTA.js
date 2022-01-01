import React, { useContext } from "react";
import { ModalContext } from "../contexts/modal-provider";
import ContactForm from "./contactForm";

const ContactFormCTA = ({ children }) => {
  const { handleModal } = useContext(ModalContext);
  return (
    <button
      onClick={(event) => handleModal(event, <ContactForm />)}
      className="flex items-center w-full h-5 p-5 px-5 text-xl text-left transition-colors rounded-sm modal-trigger text-5 hover:text-gray-500"
    >
      {children}
    </button>
  );
};

export default ContactFormCTA;
