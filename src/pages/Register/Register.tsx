import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { changeRegisterEmail, changeRegisterPassword, changeRegisterName, submitCheck, canSubmit, registerErr, submitRegister } from "./registerSlice";

import "./Register.scss";

const Register = () => {
  const canSubmitForm = useAppSelector(canSubmit);
  const errorUser = useAppSelector(registerErr);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (canSubmitForm) {
      dispatch(submitRegister());
    }
  }, [canSubmitForm]);

  return (
    <div className="register">
      <div className="register__block">
        <h1 className="title"> Sign Up</h1>
        {errorUser.register && (
          <div className="form__input-error">
            <p>User already registered</p>
          </div>
        )}
        <form
          className="form register__form"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(submitCheck());
          }}
        >
          <div className="form__group">
            <label htmlFor="userEmail" className="form__label">
              Email
            </label>
            <input type="text" name="username" id="userEmail" className="form__input" onBlur={(e) => dispatch(changeRegisterEmail(e.target.value))} placeholder="Enter your email..." />
            {errorUser.email && (
              <div className="form__input-error">
                <p>Email is not valid</p>
              </div>
            )}
          </div>

          <div className="form__group">
            <label htmlFor="userName" className="form__label">
              User Name
            </label>
            <input type="text" name="username" id="userName" className="form__input" onBlur={(e) => dispatch(changeRegisterName(e.target.value))}  placeholder="Enter your user name..." />
            {errorUser.name && (
              <div className="form__input-error">
                <p>Minimum of 2 characters</p>
              </div>
            )}
          </div>

          <div className="form__group">
            <label htmlFor="userPassword" className="form__label">
              Password
            </label>
            <input className="form__input" type="password" name="pass" id="userPassword" onBlur={(e) => dispatch(changeRegisterPassword(e.target.value))}  placeholder="Enter your password..."/>

            {errorUser.password && (
              <div className="form__input-error">
                <p>Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character</p>
              </div>
            )}
          </div>

          <div className="form__action">
            <input className="form__button" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
