import * as types from "../constant";

export const getUsersRequested = () => {
  return {
    type: types.GET_USER_REQUESTED,
  };
};

export const getUsersSucceed = (user) => {
  return {
    type: types.GET_USER_SUCCEED,
    payload: {
      user,
    },
  };
};

export const getUsersFailed = (error) => {
  return {
    type: types.GET_USER_FAILED,
    payload: {
      error,
    },
  };
};
