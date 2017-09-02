import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Square extends Component {
  render() {
    const { black } = this.props;
    const fill = black ? "black" : "white";
    const stroke = black ? "white" : "black";

    return (
      <div
        className="piece-main-container"
        style={{ backgroundColor: fill, color: stroke }}
        onClick={this.props.onClick.bind(this)}
      >
        {this.props.children}
      </div>
    );
  }
}

Square.propTypes = {
  black: PropTypes.bool
};
