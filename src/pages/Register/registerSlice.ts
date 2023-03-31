import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RegisterUser, RegisterError } from "../../app/models/user";
import { RootState } from "../../app/store";
import { validateEmail, validatePassword, validateName } from "../../utils/utils";
// import { writeJsonFile } from "write-json-file";
// import { fetchCount } from "./counterAPI";

const initialRegState = {
  registerUser: new RegisterUser({}),
  registerError: new RegisterError({}),
  canSubmit: false,
};

export const registerSlice = createSlice({
  name: "register",
  initialState: initialRegState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    changeRegisterEmail: (state, action: PayloadAction<string>) => {
      const userObj = Object.assign({}, state.registerUser);
      userObj.email = action.payload;
      state.registerUser = userObj;

      const userObjErr = Object.assign({}, state.registerError);
      userObjErr.email = !validateEmail(action.payload);
      state.registerError = userObjErr;
    },
    changeRegisterPassword: (state, action: PayloadAction<string>) => {
      const user = Object.assign({}, state.registerUser);
      user.password = action.payload;
      state.registerUser = user;

      const userObjErr = Object.assign({}, state.registerError);
      userObjErr.password = !validatePassword(action.payload);
      state.registerError = userObjErr;
    },
    changeRegisterName: (state, action: PayloadAction<string>) => {
      const user = Object.assign({}, state.registerUser);
      user.name = action.payload;
      state.registerUser = user;

      const userObjErr = Object.assign({}, state.registerError);
      userObjErr.name = !validateName(action.payload);
      state.registerError = userObjErr;
    },
    submitRegister: (state) => {
      debugger;
      const userList = JSON.parse(localStorage.getItem("user") || "[]") || [];
      const index = userList.findIndex((x: any) => x.email === state.registerUser.email);
      if (index === -1) {
        userList.push(state.registerUser);
        localStorage.setItem("user", JSON.stringify(userList));
        window.location.pathname = "/";
      } else {
        const userObjErr = Object.assign({}, state.registerError);
        userObjErr.register = true;
        state.registerError = userObjErr;
        state.canSubmit = false;
      }
    },
    submitCheck: (state) => {
      const userObjErr = Object.assign({}, state.registerError);
      userObjErr.name = !validateName(state.registerUser.name);
      userObjErr.email = !validateEmail(state.registerUser.email);
      userObjErr.password = !validatePassword(state.registerUser.password);
      state.registerError = userObjErr;
      state.canSubmit = !Object.values(userObjErr).includes(true);
    },
  },
});

export const { changeRegisterEmail, changeRegisterPassword, changeRegisterName, submitRegister, submitCheck } = registerSlice.actions;

export const regitserData = (state: RootState) => state.register.registerUser;
export const registerErr = (state: RootState) => state.register.registerError;
export const canSubmit = (state: RootState) => state.register.canSubmit;

export default registerSlice.reducer;
