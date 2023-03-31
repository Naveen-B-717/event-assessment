import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import "./Login.scss";
import { changeEmail, changePassword, canSubmit, submitLogin, userError, submitCheck } from "./loginSlice";

const Login = () => {
  const canSubmitForm = useAppSelector(canSubmit);
  const errorUser = useAppSelector(userError);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (canSubmitForm) {
      dispatch(submitLogin());
    }
  }, [canSubmitForm]);

  return (
    <div className="login">
      <div className="login__block">
        <h1 className="title">Sign In</h1>
        {errorUser.login && (
          <div className="form__input-error">
            <p>Invalid username or password</p>
          </div>
        )}
        <form
          className="form login__form"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(submitCheck());
          }}
        >
          <div className="form__group">
            <label htmlFor="userEmail" className="form__label">
              Email
            </label>
            <input type="text" name="useremail" id="userEmail" className="form__input" onBlur={(e) => dispatch(changeEmail(e.target.value))} />
            {errorUser.email && (
              <div className="form__input-error">
                <p>Email is not valid</p>
              </div>
            )}
          </div>
          <div className="form__group">
            <label htmlFor="userPassword" className="form__label">
              Password
            </label>
            <input className="form__input" type="password" name="pass" id="userPassword" onBlur={(e) => dispatch(changePassword(e.target.value))} />
            {errorUser.password && (
              <div className="form__input-error">
                <p>Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character</p>
              </div>
            )}
          </div>
          <div className="form__action">
            <input className="form__button" type="submit" />
            <div className="login__noaccount">
              <span>Don't have an account?</span>
              <Link to="/register" className="login__noaccount-link">
                Register
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
