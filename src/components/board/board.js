import React, { Component } from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { connect } from "react-redux";
import Actions from "../../actions";
import BoardSquare from "./boardSquare";

class Board extends Component {
  renderBoard() {    
    let squares = [];
    for (let i = 0; i < 64; i++) {
      const x = i % 8;
      const y = Math.floor(i / 8);
      squares.push(
        <div key={i} className="boardsquare-container">
          <BoardSquare x={x} y={y} />
        </div>
      );
    }
    return squares;
  }
  render() {
    return (
      <div className="board-container">
        {this.renderBoard()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.present
  };
}
function mapDispatchToProps() {
  return { ...Actions };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  DragDropContext(HTML5Backend)(Board)
);
