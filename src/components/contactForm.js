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
    <div>
      <Mutation mutation={CONTACT_MUTATION}>
        {(createSubmission, { loading, error, data }) => (
          <>
            <form onSubmit={(e) => handleSubmit(e, createSubmission)}>
              <input
                type="text"
                value={nameValue}
                placeholder="Name"
                onChange={(e) => setNameValue(e.target.value)}
              />
              <input
                type="text"
                value={emailValue}
                placeholder="Email"
                onChange={(e) => setEmailValue(e.target.value)}
              />
              <textarea
                value={messageValue}
                onChange={(e) => setMessageValue(e.target.value)}
              ></textarea>

              <button type="submit">Submit</button>
            </form>
            <div style={{ padding: "20px" }}>
              {loading && <p>Loading...</p>}
              {error && (
                <p>An unknown error has occurred, please try again later...</p>
              )}
              {data && <p>yeah boi</p>}
              {console.log(data)}
            </div>
          </>
        )}
      </Mutation>
    </div>
  );
};

export default ContactForm;
