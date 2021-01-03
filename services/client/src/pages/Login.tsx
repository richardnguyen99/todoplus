/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";

import { Layout } from "@components";

type FormState = {
  formValues: {
    username: string;
    password: string;
  };
  formErrors: {
    username: string;
    password: string;
  };
  formValidity: {
    username: boolean;
    password: boolean;
  };
};

const Login: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    formValues: {
      username: "",
      password: "",
    },
    formErrors: {
      username: "",
      password: "",
    },
    formValidity: {
      username: false,
      password: false,
    },
  });

  const handleValidation = (target: EventTarget & HTMLInputElement): void => {
    const { value } = target;
    const name = target.name as "username" | "password";

    const fieldValidationErrors = formState.formErrors;
    const validity = formState.formValidity;
    // const isEmail = name === "username";
    const isPassword = name === "password";

    validity[name] = value.length > 0;
    fieldValidationErrors[name] = validity[name]
      ? ""
      : `${name} is required and cannot be empty`;

    if (validity[name]) {
      if (isPassword) {
        validity[name] = value.length >= 8;
        fieldValidationErrors[name] = validity[name]
          ? ""
          : `${name} should be 8 characters minimum`;
      }
    }

    setFormState({
      ...formState,
      formErrors: fieldValidationErrors,
      formValidity: validity,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { formValues } = formState;
    // TODO: Fix the type of e.target.name
    formValues[e.target.name as "username" | "password"] = e.target.value;
    setFormState({ formValues, ...formState });
    handleValidation(e.target);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { formValidity, formValues } = formState;
    if (Object.values(formValidity).every(Boolean)) {
      console.log(formValues);
    }
  };

  return (
    <Layout>
      <section className="tdp-hero">
        <div className="tdp-hero__center">
          <form className="tdp-form" onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="tdp-input-parent tdp-input-parent--shadow tdp-component--primary">
              <div className="tdp-input-content">
                <input
                  id="login"
                  name="username"
                  className="tdp-input tdp-input--has-icon"
                  onChange={handleChange}
                  value={formState.formValues.username}
                />
                <label
                  htmlFor="login"
                  className={`tdp-input__label${
                    formState.formValues.username ? "--hidden" : ""
                  }`}
                >
                  Login
                </label>
                <span className="tdp-input__icon">
                  <i className="bx bx-lock-open-alt" />
                </span>
                <div className="tdp-input__affects">
                  <div className="tdp-input__affects__1" />
                  <div className="tdp-input__affects__2" />
                  <div className="tdp-input__affects__3" />
                  <div className="tdp-input__affects__4" />
                </div>
              </div>
            </div>
            <div
              className={`tdp-input__validation${
                formState.formErrors.username ? "" : "--null"
              } tdp-input__validation--danger`}
            >
              {formState.formErrors.username
                ? formState.formErrors.username
                : ""}
            </div>
            <div className="tdp-input-parent tdp-input-parent--shadow tdp-component--primary">
              <div className="tdp-input-content">
                <input
                  id="password"
                  name="password"
                  className="tdp-input tdp-input--has-icon"
                  type="password"
                  onChange={handleChange}
                  value={formState.formValues.password}
                />
                <label
                  htmlFor="password"
                  className={`tdp-input__label${
                    formState.formValues.password ? "--hidden" : ""
                  }`}
                >
                  Password
                </label>
                <span className="tdp-input__icon">
                  <i className="bx bx-lock-open-alt" />
                </span>
                <div className="tdp-input__affects">
                  <div className="tdp-input__affects__1" />
                  <div className="tdp-input__affects__2" />
                  <div className="tdp-input__affects__3" />
                  <div className="tdp-input__affects__4" />
                </div>
              </div>
            </div>
            <div
              className={`tdp-input__validation${
                formState.formErrors.password ? "" : "--null"
              } tdp-input__validation--danger`}
            >
              {formState.formErrors.password
                ? formState.formErrors.password
                : ""}
            </div>
            <button
              type="submit"
              className="tdp-button tdp-button--primary tdp-button--default center"
            >
              <div className="tdp-button__content">Login</div>
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
