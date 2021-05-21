import { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isWaiting, useWaiter } from "redux-waiters";
import {
  incrementAction,
  subtractAction,
  multiplyAction,
  incrementActionCreator,
  subtractActionCreator,
  multiplyActionCreator,
} from "./store/reducers/counter";

const isIncrementSelector = isWaiting(incrementAction?.id);
const isSubtractSelector = isWaiting(subtractAction?.id);
const isMultiplySelector = isWaiting(multiplyAction?.id);

function Counter() {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state?.counter);
  const [isLoadingIncr] = useWaiter(isIncrementSelector);
  const [isLoadingSubt] = useWaiter(isSubtractSelector);
  const [isLoadingMult] = useWaiter(isMultiplySelector);

  return (
    <div>
      <button
        onClick={(e) => {
          e.preventDefault();
          dispatch(incrementActionCreator());
        }}
      >
        Increment counter
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          dispatch(subtractActionCreator());
        }}
      >
        Subtract counter
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          dispatch(multiplyActionCreator(2));
        }}
      >
        Multiple with 2 counter
      </button>
      {isLoadingIncr && <p>Incr loading...</p>}
      {isLoadingSubt && <p>Subt loading...</p>}
      {isLoadingMult && <p>Mult loading...</p>}
      Counter: {counter}
    </div>
  );
}

export default memo(Counter);
