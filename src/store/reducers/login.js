import { createReducer, createActionResources } from "redux-waiters";

export const loginAction = createActionResources("login");

const initialState = {
  login: false,
};

export default createReducer(
  {
    [loginAction.success]: (state) => {
      return { ...state, login: true };
    },
    [loginAction.error]: (state) => {
      return { ...state, login: false };
    },
  },
  initialState
);
