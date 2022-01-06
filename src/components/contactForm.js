import React, { useState } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import FormErrors from "./formErrors";
import { useEffect } from "react";

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
            <>
              <form className="w-full">
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
                        className="block w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-11"
                        onChange={handleUserInput}
                      />
                      {showErrors && !nameValid && (
                        <p className="mt-3 text-sm text-red-500">
                          Please enter you name.
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
                        className="block w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-11"
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
                        className="block w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-60"
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
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {loading ? "Submitting" : "Submit"}
                  </button>
                </div>
              </form>
              <div>
                {error && (
                  <p>
                    Uh oh! Something we wrong. Please try again or email{" "}
                    <a href="mailto:hello@courtneywhiting.com">
                      hello@courtneywhiting.com
                    </a>
                    .
                  </p>
                )}
              </div>
            </>
          )}
          {data && (
            <p className="text-2xl">
              Thank you! I will reach out to you as soon as I can.
            </p>
          )}
        </>
      )}
    </Mutation>
  );
};

export default ContactForm;
