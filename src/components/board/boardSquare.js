import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { DropTarget } from "react-dnd";
import Piece from "../pieces";
import Square from "./square";
import _ from "lodash";
import Actions from "../../actions";
import { ItemTypes } from "../../constants";

const types = _.values(ItemTypes);

const squareTarget = {
  canDrop(props) {
    /* let pieceType = props.children.props.piece
      ? props.children.props.piece.type
      : "";
    let fn = Actions[pieceType];
    if (fn) return fn(props.x, props.y); */

    return true;
  },

  drop(props) {    
    //Actions.movePiece(props.x, props.y);
    props.movePiece({ x: props.x, y: props.y });
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}
class BoardSquare extends Component {
  renderOverlay(color) {
    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          zIndex: 1,
          opacity: 0.5,
          backgroundColor: color
        }}
      />
    );
  }

  renderPiece() {
    const { x, y, piecePosition } = this.props;
    let piece = _.filter(piecePosition, p => {
      return p.x === x && p.y === y;
    });
    if (!_.isEmpty(piece)) {
      return <Piece selectPieceFn={Actions.selectPiece} piece={piece[0]} />;
    } else {
      return null;
    }
  }

  isSelected() {
    const { x, y, selectedPiece } = this.props;
    if (selectedPiece && selectedPiece.x === x && selectedPiece.y === y) {
      return true;
    } else {
      return false;
    }
  }

  onSquareClick() {
    this.props.movePiece({ x: this.props.x, y: this.props.y });
  }

  render() {
    const { x, y, connectDropTarget, isOver, canDrop } = this.props;
    const black = (x + y) % 2 === 1;
    return connectDropTarget(
      <div className="square-container">
        <Square /* onClick={this.onSquareClick.bind(this)}*/ black={black} >
          {this.renderPiece()}
        </Square>
        {/* { this.isSelected() && this.renderOverlay("red") } */}
      </div>
    );
  }
}

BoardSquare.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};

function mapStateToProps(state) {
  return {
    piecePosition: state.present.piecePosition
  };
}

export default connect(mapStateToProps, { ...Actions })(
  DropTarget(types, squareTarget, collect)(BoardSquare)
);
