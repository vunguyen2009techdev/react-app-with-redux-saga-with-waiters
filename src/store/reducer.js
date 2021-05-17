import * as types from "../constant";

const initialState = {
  loading: false,
  error: null,
  user: null,
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USER_REQUESTED:
      return {
        loading: true,
        user: null,
        error: null,
      };
    case types.GET_USER_SUCCEED:
      return {
        loading: false,
        user: action?.payload?.user,
        error: null,
      };
    case types.GET_USER_FAILED:
      return {
        loading: false,
        user: null,
        error: action?.payload?.error,
      };
    default:
      return state;
  }
};
