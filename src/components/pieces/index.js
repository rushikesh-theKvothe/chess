import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Actions from "../../actions";
import { DragSource } from "react-dnd";

const knightSource = {
  beginDrag(props) {
    props.selectPiece(props.piece)
    return {};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
}

class Piece extends Component {
  onPieceSelect(piece, eve) {
    this.props.selectPiece(piece);

    // eve.nativeEvent.stopImmediatePropagation();

    eve.stopPropagation();
  }

  render() {
    const { connectDragSource, isDragging, piece } = this.props;
    return connectDragSource(
      <div
        className="piece-container"
        /* onClick={this.onPieceSelect.bind(this, piece)} */
      >
        <div
          style={{
            color: piece && piece.color === "WHITE" ? "orange" : "blue"
          }}
          dangerouslySetInnerHTML={{ __html: piece ? piece.icon : null }}
        />
      </div>
    );
  }
}

Piece.propTypes = {
  piece: PropTypes.object.isRequired
};

export default connect(null, { ...Actions })(
  DragSource(
    props => {
      return props.piece ? props.piece.type : "";
    },
    knightSource,
    collect
  )(Piece)
);
