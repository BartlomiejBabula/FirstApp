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
  value,
  label,
}) => {
  console.log(type);
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
          values={value}
        />
      </label>
      <Errors touched={touched} message={error} />
    </div>
  );
};

export default ImputFormik;
