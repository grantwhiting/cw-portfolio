import React, { useState } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { StaticImage } from "gatsby-plugin-image";

const CONTACT_MUTATION = gql`
  mutation CreateSubmissionMutation(
    $clientMutationId: String!
    $name: String!
    $email: String!
    $message: String!
  ) {
    createSubmission(
      input: {
        clientMutationId: $clientMutationId
        name: $name
        email: $email
        message: $message
      }
    ) {
      success
      data
    }
  }
`;

const ContactForm = () => {
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [messageValue, setMessageValue] = useState("");
  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [messageValid, setMessageValid] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    if (formValid) {
      setShowErrors(false);
    }
  }, [formValid]);

  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    switch (name) {
      case "contact-name":
        setNameValue(value);
        break;
      case "contact-email":
        setEmailValue(value);
        break;
      case "contact-message":
        setMessageValue(value);
        break;
    }

    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    let fieldValidationErrors = formErrors;
    let isNameValid = nameValid;
    let isEmailValid = emailValid;
    let isMessageValid = messageValid;

    switch (fieldName) {
      case "contact-name":
        isNameValid = value.length > 0;
        fieldValidationErrors.name = isNameValid
          ? ""
          : "Please enter your name";
        break;
      case "contact-email":
        isEmailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = isEmailValid
          ? ""
          : "Email address is invalid";
        break;
      case "contact-message":
        isMessageValid = value.length > 0;
        fieldValidationErrors.message = isMessageValid
          ? ""
          : "Please enter a message";
        break;
    }

    setFormErrors(fieldValidationErrors);
    setNameValid(isNameValid);
    setEmailValid(isEmailValid);
    setMessageValid(isMessageValid);
    setFormValid(isNameValid && isEmailValid && isMessageValid);
  };

  const handleSubmit = async (e, createSubmission) => {
    e.preventDefault();
    if (formValid) {
      createSubmission({
        variables: {
          clientMutationId: "contact form",
          name: nameValue,
          email: emailValue,
          message: messageValue,
        },
      });
    } else {
      setShowErrors(true);
    }
  };

  return (
    <Mutation mutation={CONTACT_MUTATION}>
      {(createSubmission, { loading, error, data }) => (
        <>
          {!data && (
            <AnimatePresence>
              <StaticImage
                className="w-3/4 mb-6 ml-auto mr-auto"
                src="../images/Contact-Header.png"
                alt="Glasses logo"
              />
              <motion.form
                className="w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="contact-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="contact-name"
                        id="contact-name"
                        value={nameValue}
                        className="block w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-brand-default focus:border-brand-default sm:text-sm h-11"
                        onChange={handleUserInput}
                      />
                      {showErrors && !nameValid && (
                        <p className="mt-3 text-sm text-red-500">
                          Please enter your name.
                        </p>
                      )}
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="contact-email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="contact-email"
                        value={emailValue}
                        className="block w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-brand-default focus:border-brand-default sm:text-sm h-11"
                        onChange={handleUserInput}
                      />
                      {showErrors && !emailValid && (
                        <p className="mt-3 text-sm text-red-500">
                          Please enter a valid email address.
                        </p>
                      )}
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="contact-message"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        name="contact-message"
                        value={messageValue}
                        className="block w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-brand-default focus:border-brand-default sm:text-sm h-60"
                        onChange={handleUserInput}
                      ></textarea>
                      {showErrors && !messageValid && (
                        <p className="mt-3 text-sm text-red-500">
                          Please enter a message.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 text-right sm:px-6">
                  <button
                    onClick={(e) => handleSubmit(e, createSubmission)}
                    disabled={loading}
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white transition border border-transparent rounded-md shadow-sm bg-brand-default hover:bg-brand-lighter focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-default"
                  >
                    {loading ? "Submitting" : "Submit"}
                  </button>
                </div>
              </motion.form>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {error && (
                  <p>
                    Uh oh! Something went wrong. Please try again or email me at{" "}
                    <a href="mailto:hello@courtneywhiting.com">
                      hello@courtneywhiting.com
                    </a>
                    .
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          )}
          {data && (
            <div className="flex items-center justify-center w-full h-full">
              <p className="text-2xl">
                Thank you! I will reach out to you as soon as I can.
              </p>
            </div>
          )}
        </>
      )}
    </Mutation>
  );
};

export default ContactForm;
