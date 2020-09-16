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
      {console.log(touched, error)}
    </div>
  );
};

export default ImputFormik;

//przycisk + na dole ekranu prawej stronie, widoczny po zalogowaniu, na każdym ekranie, otwiera popou formularz, godzina, nazwa aktwynosci, samopoczucie skala 1-10, commit,
