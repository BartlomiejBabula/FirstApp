import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, withRouter } from "react-router-dom";
import "../scss/LoginPanel.scss";

class LoginPanel extends Component {
  state = {
    passwordValue: "",
    loginValue: "",
    access: false,
  };

  baza = [
    {
      id: 0,
      login: "Alfred",
      password: "kutas",
    },
  ];

  handleChange = (e) => {
    if (e.target.type == "text") {
      this.setState({
        loginValue: e.target.value,
      });
    } else {
      this.setState({
        passwordValue: e.target.value,
      });
    }
  };

  handleLogin = () => {
    const baza = [...this.baza];
    baza.map((item) => {
      if (
        item.password == this.state.passwordValue &&
        item.login == this.state.loginValue
      ) {
        this.setState({
          passwordValue: "",
          loginValue: "",
          access: true,
        });
        this.props.history.push("/homepage");
      } else console.log("Błędny login lub hasło");
    });
  };

  handleSigin = () => {
    this.props.history.push("/sigin");
  };

  render() {
    return (
      <>
        <div className="loginPanel">
          <h2>LoginPanel</h2>
          <input
            value={this.state.loginValue}
            type="text"
            placeholder="Login or email adress"
            onChange={this.handleChange}
          />
          <input
            value={this.state.passwordValue}
            type="password"
            placeholder="Password"
            onChange={this.handleChange}
          />
          <button onClick={this.handleLogin}>Login Now</button>
          <button onClick={this.handleSigin}>Create new account</button>
        </div>
      </>
    );
  }
}

export default withRouter(LoginPanel);
