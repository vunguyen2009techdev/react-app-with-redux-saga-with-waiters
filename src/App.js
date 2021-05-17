import { connect } from "react-redux";
import logo from "./logo.svg";
import "./App.css";
import * as services from "./services";
import * as actions from "./store/action";
import { useEffect } from "react";
import update from 'immutability-helper';

function App(props) {
  const {
    getUsersRequested,
    getUsersSucceed,
    getUsersFailed,
    error,
    loading,
    user,
  } = props;

  const initialArray = [1, 2, 3];
  const newArray = update(initialArray, { $push: [4] });
  console.log("=========change array=========");
  console.log({
    newArray,
    initialArray,
  });
  console.log("=========change array=========");

  const collection = [1, 2, { a: [12, 17, 15] }];
  const newCollection = update(collection, { 2: { a: { $splice: [[1, 1, 13, 14]] } } });
  console.log("=========Nested collections=========");
  console.log({
    newCollection,
    collection,
  });
  console.log("=========Nested collections=========");

  const obj = { a:5, b: 3 };
  const newObj = update(obj, { b: { $apply: (x) => { return x * 2; } } });
  const newObj2 = update(obj, { b: { $set: obj.b * 2 } });

  console.log("=========obj newObj newObj2=========");
  console.log({
    newObj,
    newObj2,
    obj,
  });
  console.log("=========obj newObj newObj2=========");

  const originState = {};
  const desiredState = {
    foo: [
      {
        bar: ['x', 'y', 'z']
      }
    ]
  };

  const mutateState = update(originState, {
    foo: foo => update(foo || [], {
      0: fooZero => update(fooZero || {}, {
        bar: bar => update(bar || [], {
          $push: ["x", "y", "z"]
        })
      })
    })
  });

  console.log("=========originState desiredState mutateState=========");
  console.log({
    desiredState,
    mutateState,
    TestBoolean: JSON.stringify(desiredState) === JSON.stringify(mutateState),
    originState,
  })
  console.log("=========originState desiredState mutateState=========");

  useEffect(async () => {
    getUsersRequested();
    try {
      const dbUser = await services.fetchUsers();
      getUsersSucceed(dbUser);
    } catch (error) {
      getUsersFailed(error);
    }
  }, [getUsersRequested, getUsersSucceed, getUsersFailed]);

  if (loading) {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Loading...</p>
        </header>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>You got an error: {error?.message}</p>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Welcome {user?.name}</p>
      </header>
    </div>
  );
}

const mapState = (state) => {
  return {
    error: state.error,
    loading: state.loading,
    user: state.user,
  };
};

const mapDispatch = {
  getUsersRequested: actions.getUsersRequested,
  getUsersSucceed: actions.getUsersSucceed,
  getUsersFailed: actions.getUsersFailed,
};

export default connect(mapState, mapDispatch)(App);
