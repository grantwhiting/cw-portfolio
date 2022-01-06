import React from "react";

const FormErrors = ({ formErrors }) => {
  let render = null;
  Object.keys(formErrors).map((fieldName, i) => {
    if (formErrors[fieldName].length) {
      render = <p key={i}>{formErrors[fieldName]}</p>;
    }
  });
  return render;
};

export default FormErrors;
