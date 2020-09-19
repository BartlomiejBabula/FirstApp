import React from "react";
import Errors from "./Errors";

const ImputFormik = ({
  type,
  name,
  placeholder,
  handleChange,
  onBlur,
  touched,
  error,
  label,
}) => {
  return (
    <div className="InputWrap">
      <label>
        {label}
        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={onBlur}
        />
      </label>
      <Errors touched={touched} message={error} />
    </div>
  );
};

export default ImputFormik;
