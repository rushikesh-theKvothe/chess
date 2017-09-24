import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Square extends Component {
  render() {
    const { black } = this.props;
    const className = black ? "blackSquare" : "whiteSquare"
    const fill = black ? "#9F5132" : "#D3BC94";//9F5132 //D3BC94
    const stroke = black ? "white" : "black";    
    return (
      /* onClick={this.props.onClick.bind(this)} */
      <div
        className={"piece-main-container " + className}>
        {this.props.children}
      </div>
    );
  }
}

Square.propTypes = {
  black: PropTypes.bool
};
