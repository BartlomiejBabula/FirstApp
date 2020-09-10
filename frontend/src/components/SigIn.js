import React from "react";
import { Formik } from "formik";
import Errors from "./Errors";
import "../scss/SigIn.scss";
import * as Yup from "yup";

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
    <div className="sigin">
      <h2>Create your account</h2>
      <Formik
        initialValues={{ name: "", email: "", password: "", accept: false }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
          }, 500);
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
            <div className="input-wrap">
              <label htmlFor="name">Imię</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Wpisz imię"
                onChange={handleChange}
                onBlur={handleBlur}
                values={values.name}
              />
              <Errors touched={touched.name} message={errors.name} />
            </div>

            <div className="input-wrap">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Wpisz email"
                onChange={handleChange}
                onBlur={handleBlur}
                values={values.email}
              />
              <Errors touched={touched.email} message={errors.email} />
            </div>

            <div className="input-wrap">
              <label htmlFor="password">Hasło</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Wpisz hasło"
                onChange={handleChange}
                onBlur={handleBlur}
                values={values.password}
              />
              <Errors touched={touched.password} message={errors.password} />
            </div>

            <div className="input-wrap">
              <label htmlFor="confirmPassword">Powtórz hasło</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Potwierdź hasło"
                onChange={handleChange}
                onBlur={handleBlur}
                values={values.password}
              />
              <Errors
                touched={touched.confirmPassword}
                message={errors.confirmPassword}
              />
            </div>

            <div className="input-wrap">
              <label htmlFor="accept">
                <input
                  type="checkbox"
                  name="accept"
                  id="accept"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  checked={values.accept}
                />
                Akceptuje regulamin
              </label>
              <Errors touched={touched.accept} message={errors.accept} />
            </div>

            <div className="input-wrap">
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
