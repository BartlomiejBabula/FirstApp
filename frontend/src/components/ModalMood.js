import React, { Component } from "react";
import "../scss/ModalMood.scss";

class MoodalMood extends Component {
  state = {};

  render() {
    return (
      <div className="modal">
        <button onClick={this.props.handleClick}>X</button>
        {this.props.modalOn ? <div className="modalON"></div> : false}
      </div>
    );
  }
}

export default MoodalMood;
