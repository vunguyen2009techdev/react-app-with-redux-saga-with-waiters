import { connect } from "react-redux";
import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import * as actions from "./store/action";

function App(props) {
  const { getUsersRequested, error, loading, user } = props;

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
};

export default connect(mapState, mapDispatch)(App);
