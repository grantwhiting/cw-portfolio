import React, { useState } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

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

  const handleSubmit = async (e, createSubmission) => {
    e.preventDefault();
    createSubmission({
      variables: {
        clientMutationId: "contact form",
        name: nameValue,
        email: emailValue,
        message: messageValue,
      },
    });
  };

  return (
    <Mutation mutation={CONTACT_MUTATION}>
      {(createSubmission, { loading, error, data }) => (
        <>
          <form
            className="w-full"
            onSubmit={(e) => handleSubmit(e, createSubmission)}
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
                    className="block w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-11"
                    onChange={(e) => setNameValue(e.target.value)}
                  />
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
                    onChange={(e) => setEmailValue(e.target.value)}
                  />
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
                    value={messageValue}
                    className="block w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-60"
                    onChange={(e) => setMessageValue(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </div>
          </form>
          <div>
            {loading && <p>Loading...</p>}
            {error && (
              <p>An unknown error has occurred, please try again later...</p>
            )}
            {data && <p>yeah boi</p>}
          </div>
        </>
      )}
    </Mutation>
  );
};

export default ContactForm;
