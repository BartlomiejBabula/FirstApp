import React, { Component } from "react";
import Errors from "./Errors";
import "../scss/ModalMood.scss";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  activity: Yup.string()
    .min(3, "Aktywność musi być dłuższe niż 3 znaki")
    .max(100, "Aktywność musi być krótsze niż 100 znaków")
    .required("Wprowadź aktywność"),
  endTime: Yup.string().required("Wybierz date").nullable(),
});

const MoodalMood = ({ handleClick, modalOn, actualDate, actualTime }) => {
  return (
    <div className="modal">
      <button className="modalButton" onClick={handleClick}>
        X
      </button>
      {modalOn ? (
        <div className="modalON">
          <h2>Dodaj nastrój</h2>
          <Formik
            initialValues={{
              activity: "",
              date: actualDate,
              startTime: actualTime,
              endTime: "",
            }}
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
                  <label htmlFor="startTime">Od </label>
                  <input
                    type="time"
                    name="startTime"
                    id="startTime"
                    placeholder={actualTime}
                    value={values.startTime}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Errors
                    touched={touched.startTime}
                    message={errors.startTime}
                  />
                </div>
                <div className="inputWrap">
                  <label htmlFor="endTime">Do </label>
                  <input
                    type="time"
                    name="endTime"
                    id="endTime"
                    value={values.endTime}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Errors touched={touched.endTime} message={errors.endTime} />
                </div>
                <div className="inputWrap">
                  <label htmlFor="date"></label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    placeholder={actualDate}
                    min="2019-01-01"
                    max={actualDate}
                    value={values.date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Errors touched={touched.date} message={errors.date} />
                </div>
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
