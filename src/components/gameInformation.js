import React, { Component } from "react";
import { connect } from "react-redux";

class GameInformation extends Component {
  render() {
    return (
      <div className="container gameInfo">
        Game Information
        <div>Moves : { this.props.moveNo } </div>
        <div>Turn : { this.props.move }</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state
  };
}

export default connect(mapStateToProps, {})(GameInformation);
