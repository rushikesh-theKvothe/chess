import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Actions from "../../actions";

class Piece extends Component {
  onPieceSelect(piece, eve) {
    this.props.selectPiece(piece);

    // eve.nativeEvent.stopImmediatePropagation();

    eve.stopPropagation();
  }

  render() {
    const { piece } = this.props;
    return (
      <div
        className="piece-container"
        onClick={this.onPieceSelect.bind(this, piece)}
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

export default connect(null, { ...Actions })(Piece);
