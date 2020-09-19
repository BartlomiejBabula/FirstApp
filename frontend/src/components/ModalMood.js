import React, { Component } from "react";
import Errors from "./Errors";
import "../scss/ModalMood.scss";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import InputFormik from "./InputFormik";

const validationSchema = Yup.object().shape({
  activity: Yup.string()
    .min(3, "Aktywność musi być dłuższe niż 3 znaki")
    .max(100, "Aktywność musi być krótsze niż 100 znaków")
    .required("Wprowadź aktywność"),
  time: Yup.string().required("Wybierz godzine").nullable(),
  selectMood: Yup.string().required("Wybierz nastrój"),
});

const dropdownOptions = [
  { label: "Wybierz nastrój", value: "" },
  { label: "happy", value: "happy" },
  { label: "good", value: "good" },
  { label: "normal", value: "normal" },
  { label: "sad", value: "sad" },
];

const MoodalMood = ({ handleClick, modalOn, actualDate, actualTime }) => {
  return (
    <div className="modal">
      <button className="modalButton" onClick={handleClick}>
        X
      </button>
      {modalOn && (
        <div className="modalON">
          <h2>Dodaj nastrój</h2>
          <Formik
            initialValues={{
              activity: "",
              date: actualDate,
              time: "",
              selectMood: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              alert(JSON.stringify(values, null, 2));
              resetForm({ activity: "", time: "", selectMood: "" });
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
                  <label htmlFor="time"></label>
                  <input
                    type="time"
                    name="time"
                    id="time"
                    placeholder={actualTime}
                    value={values.time}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Errors touched={touched.time} message={errors.time} />
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
                  <label htmlFor="selectMood"></label>
                  <Field as="select" name="selectMood">
                    {dropdownOptions.map((select, i) => {
                      return (
                        <option value={select.value} key={i}>
                          {select.label}
                        </option>
                      );
                    })}
                  </Field>
                  <Errors
                    touched={touched.selectMood}
                    message={errors.selectMood}
                  />
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
      )}
    </div>
  );
};

export default MoodalMood;
