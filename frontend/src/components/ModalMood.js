import React, { Component } from "react";
import Errors from "./Errors";
import "../scss/ModalMood.scss";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  activity: Yup.string()
    .min(3, "Musi być dłuższe niż 3 znaki")
    .max(100, "Musi być krótsze niż 100 znaków")
    .required("Wprowadź aktywność"),

  date: Yup.date().required("Wybierz date").nullable(),
});

const MoodalMood = ({ handleClick, modalOn }) => {
  return (
    <div className="modal">
      <button className="modalButton" onClick={handleClick}>
        X
      </button>
      {modalOn ? (
        <div className="modalON">
          <h2>Dodaj nastrój</h2>
          <Formik
            initialValues={{ activity: "", time: "2020-10-19" }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              alert(JSON.stringify(values, null, 2));
              resetForm({ activity: "" });
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
                <div className="inputWrap">
                  <label htmlFor="activity">
                    <textarea
                      type="text"
                      name="activity"
                      id="activity"
                      placeholder="Wpisz aktywność"
                      value={values.activity}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    ></textarea>
                  </label>
                  <Errors
                    touched={touched.activity}
                    message={errors.activity}
                  />
                </div>
                <div className="inputWrap">
                  <label htmlFor="date"></label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    placeholder="2020-09-16"
                    min="2019-01-01"
                    max="2020-09-16"
                    value={values.date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Errors touched={touched.date} message={errors.date} />
                </div>
                <button className="sentBtn" type="submit">
                  Wyślij
                </button>
              </form>
            )}
          </Formik>
        </div>
      ) : (
        false
      )}
    </div>
  );
};

export default MoodalMood;
