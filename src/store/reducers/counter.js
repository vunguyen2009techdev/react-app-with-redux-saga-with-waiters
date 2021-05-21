import { createReducer, createActionResources } from "redux-waiters";

export const incrementAction = createActionResources("increment counter");
export const subtractAction = createActionResources("subtract counter");
export const multiplyAction = createActionResources("multiply counter");

const delay = (ms) => {
  return new Promise((resolve, reject) => {
    return setTimeout(() => {
      resolve();
    }, ms);
  });
};

const initialState = 0;

export default createReducer(
  {
    [incrementAction.success]: (state, payload) => {
      return state + payload || 1;
    },
    [subtractAction.success]: (state, payload) => {
      return state - (payload || 1);
    },
    [multiplyAction.success]: (state, payload) => {
      return state * (payload || 1);
    },
  },
  initialState
);

export const incrementActionCreator = (quantity = 1) => {
  return incrementAction.waiterAction(async (dispatch) => {
    dispatch(incrementAction.start());
    await delay(2000);
    dispatch(incrementAction.success(quantity));
  });
};

export const subtractActionCreator = (quantity = 1) => {
  return subtractAction.waiterAction(async (dispatch) => {
    dispatch(subtractAction.start());
    await delay(3000);
    dispatch(subtractAction.success(quantity));
  });
};

export const multiplyActionCreator = (quantity = 1) => {
  return multiplyAction.waiterAction(async (dispatch) => {
    dispatch(multiplyAction.start());
    await delay(4000);
    dispatch(multiplyAction.success(quantity));
  });
};
