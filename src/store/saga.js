import * as services from "../services";
import { getUsersSucceed, getUsersFailed } from "./actions/user";
import * as types from "../constant";
import {
  call,
  put,
  all,
  takeEvery,
  takeLatest,
  delay,
} from "redux-saga/effects";
import { loginAction } from "./reducers/login";
import { incrementAction } from "./reducers/counter";
import { sagaPromise } from "../utils/saga-promise-helpers";

function* fetchUsers() {
  try {
    const res = yield call(services.fetchUsers);
    yield put(getUsersSucceed(res));
  } catch (error) {
    yield put(getUsersFailed(error));
  }
}

function* watchLog() {
  yield takeEvery("*", function* log(action) {
    console.log("action ", action);
  });
}

function* userLogin() {
  // //Simulate login successful
  // const loginResult = true;
  // yield delay(4000);
  // return loginResult;

  // Simulate login failed
  yield delay(4000);
  throw new Error("not found");
}

function* userSaga() {
  yield takeEvery(types.GET_USER_REQUESTED, fetchUsers);
}

function* watchLogin() {
  yield takeEvery(
    loginAction.start,
    loginAction.waiterActionForSaga(sagaPromise(userLogin))
  );
}

function* incrCounter(action) {
  try {
    console.log("call incrCounter start", action);
    yield delay(4000);
    console.log("call increcounter continue");
    yield put(incrementAction.success(1));
    console.log("call incr success");
  } catch (error) {
    console.log("incrCounter error");
  }
}

function* watchIncrCounter() {
  yield takeLatest(
    incrementAction.start,
    incrementAction.waiterActionForSaga(incrCounter)
  );
}

export default function* rootSaga() {
  yield all([userSaga(), watchIncrCounter(), watchLogin(), watchLog()]);
}
