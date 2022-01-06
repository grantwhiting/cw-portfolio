import React from "react";

const FormErrors = ({ errors }) => {
  Object.keys(errors).map((fieldName, i) => {
    if (errors[fieldName].length) {
      return (
        <p key={i}>{errors[fieldName]}</p>
      );
    } else {
      return '';
    }
  })
};

export default FormErrors;
