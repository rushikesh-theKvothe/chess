import _ from "lodash";
import { INITIAL_GAME_STATE, ActionTypes } from "../constants";
import Actions from "../actions";

export default function game(state = INITIAL_GAME_STATE, action) {
  switch (action.type) {
    case ActionTypes.MOVE_PIECE:
      let { selectedPiece } = state;
      if (_.isEmpty(selectedPiece)) {
        return { ...state };
      }
      let { x, y } = action.payload.position;
      let piecePosition = _.cloneDeep(state.piecePosition);
      let validationFn = Actions[selectedPiece.type];     
      let validations = validationFn(selectedPiece, x, y, piecePosition);  

      if (validations.canMove) {
        let blockingPiece ={}
        if(!_.isEmpty(validations.blockingPiece)){
          blockingPiece = validations.blockingPiece[0]
        }        
        _.map(piecePosition, po => {
          if(blockingPiece.x === po.x && blockingPiece.y === po.y){
            po.x = -1
            po.y = -1
          }
          if (po.x === selectedPiece.x && po.y === selectedPiece.y) {            
            po.x = x;
            po.y = y;
          }
        });
        return { ...state, piecePosition: piecePosition };
      }
      return { ...state };

    case ActionTypes.SELECT_PIECE:
      //console.log("Selected Piece", action.payload);
      return { ...state, selectedPiece: action.payload };

    default:
      return state;
  }
}
