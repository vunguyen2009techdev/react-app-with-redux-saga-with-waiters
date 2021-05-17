import { connect } from "react-redux";
import logo from "./logo.svg";
import "./App.css";
import * as services from "./services";
import * as actions from "./store/action";
import { useEffect } from "react";

function App(props) {
  const {
    getUsersRequested,
    getUsersSucceed,
    getUsersFailed,
    error,
    loading,
    user,
  } = props;

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
