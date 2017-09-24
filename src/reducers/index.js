import _ from "lodash";
import { INITIAL_GAME_STATE, ActionTypes, COLORS } from "../constants";
import Actions from "../actions";

let intitialState = {
  past: [],
  present: INITIAL_GAME_STATE,
  future: []
};

export default function game(state = intitialState, action) {
  switch (action.type) {
    case ActionTypes.MOVE_PIECE:
      let { selectedPiece } = state.present;
      if (_.isEmpty(selectedPiece)) {
        return { ...state };
      }
      let { x, y } = action.payload.position;
      let piecePosition = _.cloneDeep(state.present.piecePosition);
      let validationFn = Actions[selectedPiece.type];
      let validations = validationFn(selectedPiece, x, y, piecePosition);

      if (validations.canMove && selectedPiece.color == state.present.move) {
        let blockingPiece = {};
        if (!_.isEmpty(validations.blockingPiece)) {
          blockingPiece = validations.blockingPiece[0];
        }
        _.map(piecePosition, po => {
          if (blockingPiece.x === po.x && blockingPiece.y === po.y) {
            po.x = -1;
            po.y = -1;
          }
          if (po.x === selectedPiece.x && po.y === selectedPiece.y) {
            po.x = x;
            po.y = y;
          }
        });
        let whoseMove = selectedPiece.color === COLORS.WHITE
          ? COLORS.BLACK
          : COLORS.WHITE;
        let moveNo = state.present.moveNo + 1;

        let presentState = _.cloneDeep(state.present);
        let pastState = _.cloneDeep(state.past);
        pastState.push(state.present);
        presentState = {
          ...presentState,
          piecePosition: piecePosition,
          moveNo: moveNo,
          move: whoseMove
        };
        return {
          ...state,
          present: presentState,
          past: pastState,
          future:[]
        };
      }
      return { ...state };

    case ActionTypes.SELECT_PIECE:
      let presentState = _.cloneDeep(state.present);
      /* let pastState = _.cloneDeep(state.past);
        pastState.push(state.present);
      */
      presentState = {
        ...presentState,
        selectedPiece: action.payload
      };
      return {
        ...state,
        present: presentState
      };
    //return { ...state, selectedPiece: action.payload };

    /* 
      get last element from pastState Array and put it as present state
      take present State and put it at the start of fututeState Array
    */


    case ActionTypes.UNDO:
      var { present, past, future } = state;

      if (!_.isEmpty(past)) {
        future.push(present);
        let previousState = past.pop();
        present = previousState;
        return { ...state, past: past, present: present, future: future };
      }
      return state;
    /* 
      get first element from futureState Array and put it as present state
      take present State and put it at the end of pastState Array
    */

    case ActionTypes.REDO:
      var { present, past, future } = state;
      if (!_.isEmpty(future)) {
        past.push(present);
        let futureState = future.shift();
        present = futureState;
        return { ...state, past: past, present: present, future: future };
      }
      return state;

    default:
      return state;
  }
}
