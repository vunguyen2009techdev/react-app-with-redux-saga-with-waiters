import { connect, useSelector, useDispatch } from "react-redux";
import logo from "./logo.svg";
import "./App.css";
import { useEffect, lazy, Suspense } from "react";
import { isWaiting, useWaiter } from "redux-waiters";
import {
  appThemeActionCreator,
  appUpdateThemeAction,
} from "./store/reducers/app";
import { getUsersRequested } from "./store/actions/user";
import Login from "./Login";

const CounterComponent = lazy(() => import("./Counter"));
const LoginComponent = lazy(() => import("./Login"));

const appThemeSelector = isWaiting(appUpdateThemeAction?.id);

function App(props) {
  const dispatch = useDispatch();
  const gl = useSelector((state) => state.app.gl);
  const [appThemeLoading] = useWaiter(appThemeSelector);
  const { getUsersRequested, loading, error, info } = props;

  useEffect(() => {
    getUsersRequested();
  }, [getUsersRequested]);

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
        <p>Welcome {info?.name}</p>
        <p>
          Edit <code>src/App.js</code> and save to reload. with gl:{" "}
          {gl ? "true" : "false"}
          <br />
          {appThemeLoading && "app loading..."}
        </p>

        <button
          onClick={(e) => {
            e.preventDefault();
            dispatch(appThemeActionCreator());
          }}
        >
          Update theme
        </button>

        <Suspense fallback={<div>Loading...</div>}>
          <CounterComponent />
          <LoginComponent />
        </Suspense>
      </header>
    </div>
  );
}

const mapState = (state) => {
  const { user = {} } = state || {};
  const { loading = false, error = null, info = null } = user || {};
  return { loading, error, info };
};

const mapDispatch = {
  getUsersRequested,
};

export default connect(mapState, mapDispatch)(App);
