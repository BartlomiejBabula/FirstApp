import React from "react";
import "../scss/App.scss";
import LoginPanel from "./LoginPanel";
import MoodTracker from "./MoodTracker";
import SigIn from "./SigIn";
import MoodalMood from "./ModalMood";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

class App extends React.Component {
  state = {
    access: true,
    modalOn: false,
    date: new Date().toISOString().slice(0, 10),
    time: new Date().toISOString().slice(11, 16),
  };

  handleClick = () => {
    this.setState({
      modalOn: !this.state.modalOn,
    });
  };

  render() {
    return (
      <>
        <div className={this.state.modalOn ? "App blur" : "App"}>
          <Router>
            <Route path="/" exact component={LoginPanel} />
            <Route path="/homepage" component={MoodTracker} />
            <Route path="/sigin" component={SigIn} />
          </Router>
        </div>
        {this.state.access ? (
          <MoodalMood
            handleClick={this.handleClick}
            modalOn={this.state.modalOn}
            actualDate={this.state.date}
            actualTime={this.state.time}
          />
        ) : (
          false
        )}
      </>
    );
  }
}

export default App;
