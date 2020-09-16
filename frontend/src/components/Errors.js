import React from "react";

const Errors = ({ touched, message }) => {
  if (!touched) {
    return <div className="formMessageInvalid">&nbsp;</div>;
  }
  if (message) {
    return <div className="formMessageInvalid">{message}</div>;
  }
  return <div className="formMessageValid"></div>;
};

export default Errors;
