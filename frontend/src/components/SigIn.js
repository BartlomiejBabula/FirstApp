import React from "react";
import { Formik } from "formik";
import InputFormik from "./InputFormik";
import Errors from "./Errors";
import "../scss/SigIn.scss";
import * as Yup from "yup";
const formikImput = [
  {
    type: "text",
    name: "name",
    placeholder: "Wpisz imię",
  },
  {
    type: "email",
    name: "email",
    placeholder: "Wpisz email",
  },
  {
    type: "password",
    name: "password",
    placeholder: "Wpisz hasło",
  },
  {
    type: "password",
    name: "confirmPassword",
    placeholder: "Potwierdź hasło",
  },
  {
    type: "checkbox",
    name: "accept",
    label: "Akceptuj regulamin",
  },
];
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Musi być dłuższe niż 3 znaki")
    .max(12, "Musi być krótsze niż 12 znaków")
    .required("Musisz wprowadzić imię"),
  email: Yup.string()
    .email("Podaj poprawny adress email")
    .max(50, "Musi być krótszy niż 100 znaków")
    .required("Musisz wprowadzić adress email"),
  password: Yup.string()
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Musi być dłuższe niż 6 znaków, zawierać jendną wielką litere, małą litere, numer, oraz znak specjalny"
    )
    .min(6, "Musi być dłuższe niż 6 znaków")
    .required("Musisz wprowadzić hasło"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Hasło musi pasować"
  ),
  accept: Yup.bool().oneOf([true], "Musisz zaakceptować regulamin"),
});

const SigIn = () => {
  return (
    <div className="sigIn">
      <h2>Create your account</h2>
      <Formik
        initialValues={{ name: "", email: "", password: "", accept: false }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            {formikImput.map(({ type, name, placeholder, label }) => (
              <InputFormik
                type={type}
                name={name}
                placeholder={placeholder}
                handleChange={handleChange}
                onBlur={handleBlur}
                value={values[name]}
                touched={touched[name]}
                error={errors[name]}
                label={label}
              />
            ))}

            <div className="buttonWrap">
              <button type="submit">Wyślij</button>
              <button type="reset">Resetuj</button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default SigIn;
