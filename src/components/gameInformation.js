import React, { Component } from "react";
import { connect } from "react-redux";
import Actions from "../actions";

class GameInformation extends Component {
  render() {
    return (
      <div className="container gameInfo">
        <h4>Game Information</h4>
        <div className='infoRow'>
          <label>Moves :</label>
           {this.props.moveNo} 
        </div>
        <div className='infoRow'>
          <label>Turn : </label>
            {this.props.move}
        </div>
        <div className='btnDiv'>
          <input
            type="button"
            value="Undo"
            onClick={() => {
              this.props.undoMove();
            }}
          />
        </div>
        <div className='btnDiv'>
          <input
            type="button"
            value="Redo"
            onClick={() => {
              this.props.redoMove();
            }}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.present
  };
}

export default connect(mapStateToProps, { ...Actions })(GameInformation);
