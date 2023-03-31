import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserError } from "../../app/models/user";
import { RootState } from "../../app/store";
import { validateEmail, validatePassword } from "../../utils/utils";

const initialState = {
  user: new User({}),
  errorUser: new UserError({}),
  canSubmit: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    changeEmail: (state, action: PayloadAction<string>) => {
      const userObj = Object.assign({}, state.user);
      userObj.email = action.payload;
      state.user = userObj;

      const userObjErr = Object.assign({}, state.errorUser);
      userObjErr.email = !validateEmail(action.payload);
      state.errorUser = userObjErr;
    },
    changePassword: (state, action: PayloadAction<string>) => {
      const user = Object.assign({}, state.user);
      user.password = action.payload;
      state.user = user;

      const userObjErr = Object.assign({}, state.errorUser);
      userObjErr.password = !validatePassword(action.payload);
      state.errorUser = userObjErr;
    },
    submitLogin: (state) => {
      const userList = JSON.parse(localStorage.getItem("user") || "[]") || [];
      const index = userList.findIndex(
        (x: any) => x.email === state.user.email
      );
      if (index > -1) {
        if (state.user.password === userList[index].password) {
          localStorage.setItem("activeUser", JSON.stringify(state.user.email));
          window.location.pathname = "/events";
        } else {
          const userObjErr = Object.assign({}, state.errorUser);
          userObjErr.login = true;
          state.errorUser = userObjErr;
          state.canSubmit = false;
        }
      } else {
        const userObjErr = Object.assign({}, state.errorUser);
        userObjErr.login = true;
        state.errorUser = userObjErr;
        state.canSubmit = false;
      }
    },
    submitCheck: (state) => {
      const userObjErr = Object.assign({}, state.errorUser);
      userObjErr.email = !validateEmail(state.user.email);
      userObjErr.password = !validatePassword(state.user.password);
      state.errorUser = userObjErr;
      state.canSubmit = !Object.values(userObjErr).includes(true);
    },
  },
});

export const { changeEmail, changePassword, submitLogin, submitCheck } =
  loginSlice.actions;

export const userData = (state: RootState) => state.login.user;
export const userError = (state: RootState) => state.login.errorUser;
export const canSubmit = (state: RootState) => state.login.canSubmit;

export default loginSlice.reducer;
