import * as types from "../../constant";

const initialState = {
  loading: false,
  info: null,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USER_REQUESTED:
      return {
        loading: true,
        info: null,
        error: null,
      };
    case types.GET_USER_SUCCEED:
      return {
        loading: false,
        info: action?.payload?.info,
        error: null,
      };
    case types.GET_USER_FAILED:
      return {
        loading: false,
        info: null,
        error: action?.payload?.error,
      };
    default:
      return state;
  }
};

export default userReducer;
