import React from "react";

const Errors = ({ touched, message }) => (
  <div className="formMessage">{message && touched ? message : "\xA0"}</div>
);

export default Errors;
