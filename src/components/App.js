import React from "react";
import "./App.css";
import LoginPanel from "./LoginPanel";
import MoodTracker from "./MoodTracker";
import SigIn from "./SigIn";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

class App extends React.Component {
  state = {
    access: false,
  };

  render() {
    return (
      <div className="App">
        <Router>
          <Route path="/" exact component={LoginPanel} />
          <Route path="/homepage" component={MoodTracker} />
          <Route path="/sigin" component={SigIn} />
        </Router>
      </div>
    );
  }
}

export default App;
