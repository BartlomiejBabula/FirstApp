import React, { Component } from "react";
import "./LoginPanel.css";
import { BrowserRouter as Router, withRouter } from "react-router-dom";

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
          <button>Create new account</button>
        </div>
      </>
    );
  }
}

export default withRouter(LoginPanel);
