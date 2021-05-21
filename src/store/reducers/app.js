import { createReducer, createActionResources } from "redux-waiters";

export const appUpdateThemeAction = createActionResources("app update theme");

const initialState = {
  gl: false,
};

export default createReducer(
  {
    [appUpdateThemeAction.success]: (state) => {
      return {
        ...state,
        gl: !{ ...state }?.gl,
      };
    },
  },
  initialState
);

export const appThemeActionCreator = () =>
  appUpdateThemeAction.waiterAction(async (dispatch) => {
    setTimeout(() => {
      dispatch(appUpdateThemeAction.success());
    }, 3000);
  });
