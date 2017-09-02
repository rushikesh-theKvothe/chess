import _ from "lodash";
import { ItemTypes, ActionTypes, COLORS } from "../constants";

function selectPiece(piece) {
  return {
    type: ActionTypes.SELECT_PIECE,
    payload: piece
  };
}

function movePiece(position) {
  return {
    type: ActionTypes.MOVE_PIECE,
    payload: { position }
  };
}

function canMovePawn(movingPiece, toX, toY, boardPosition) {
  let { x, y, color } = movingPiece;

  let validPosition = color === COLORS.WHITE
    ? toX - x === 0 && toY - y === 1
    : toX - x === 0 && toY - y === -1;

  let pieceBlockingMove = false;

  let blockingPiece = _.filter(boardPosition, bpo => {
    return bpo.x === toX && bpo.y === toY;
  });

  if (!_.isEmpty(blockingPiece)) {
    if (blockingPiece[0].type === movingPiece.type) {
      pieceBlockingMove = true;
    }
  }

  return validPosition && !pieceBlockingMove;
}

function canMoveKing(movingPiece, toX, toY, boardPosition) {
  let { x, y } = movingPiece;
  const dx = toX - x;
  const dy = toY - y;
  let validPosition =
    (Math.abs(dx) === 1 && Math.abs(dy) === 0) ||
    (Math.abs(dx) === 0 && Math.abs(dy) === 1) ||
    (Math.abs(dx) === 1 && Math.abs(dy) === 1);

  let pieceBlockingMove = false;

  let blockingPiece = _.filter(boardPosition, bpo => {
    return bpo.x === toX && bpo.y === toY;
  });

  if (!_.isEmpty(blockingPiece)) {
    if (blockingPiece[0].type === movingPiece.type) {
      pieceBlockingMove = true;
    }
  }

  return validPosition && !pieceBlockingMove;
}

function canMoveQueen(movingPiece, toX, toY, boardPosition) {
  let { x, y } = movingPiece;
  const dx = toX - x;
  const dy = toY - y;

  let validPosition =
    validateBishopMove(dx, dy) || validateRookMove(toX, toY, x, y);

  let pieceBlockingMove = false;

  let blockingPiece = _.filter(boardPosition, bpo => {
    return bpo.x === toX && bpo.y === toY;
  });

  if (!_.isEmpty(blockingPiece)) {
    if (blockingPiece[0].type === movingPiece.type) {
      pieceBlockingMove = true;
    }
  }

  return validPosition && !pieceBlockingMove;
}

function canMoveRook(movingPiece, toX, toY, boardPosition) {
  let { x, y } = movingPiece;

  let validPosition = validateRookMove(toX, toY, x, y);

  let pieceBlockingMove = false;

  let blockingPiece = _.filter(boardPosition, bpo => {
    return bpo.x === toX && bpo.y === toY;
  });

  if (!_.isEmpty(blockingPiece)) {
    if (blockingPiece[0].type === movingPiece.type) {
      pieceBlockingMove = true;
    }
  }

  return validPosition && !pieceBlockingMove;
}

function canMoveBishop(movingPiece, toX, toY, boardPosition) {
  let { x, y } = movingPiece;
  const dx = toX - x;
  const dy = toY - y;

  let validPosition = validateBishopMove(dx, dy);

  let pieceBlockingMove = false;

  let blockingPiece = _.filter(boardPosition, bpo => {
    return bpo.x === toX && bpo.y === toY;
  });

  if (!_.isEmpty(blockingPiece)) {
    if (blockingPiece[0].type === movingPiece.type) {
      pieceBlockingMove = true;
    }
  }

  return validPosition && !pieceBlockingMove;
}

function canMoveKnight(movingPiece, toX, toY, boardPosition) {
  let { x, y } = movingPiece;
  const dx = toX - x;
  const dy = toY - y;

  let validPosition =
    (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
    (Math.abs(dx) === 1 && Math.abs(dy) === 2);

  let pieceBlockingMove = false;

  let blockingPiece = _.filter(boardPosition, bpo => {
    return bpo.x === toX && bpo.y === toY;
  });

  if (!_.isEmpty(blockingPiece)) {
    if (blockingPiece[0].type === movingPiece.type) {
      pieceBlockingMove = true;
    }
  }

  return validPosition && !pieceBlockingMove;
}

function validateBishopMove(dx, dy) {
  return (
    Math.abs(dx) === Math.abs(dy) && (Math.abs(dx) > 0 && Math.abs(dx) < 8)
  );
}

function validateRookMove(toX, toY, x, y) {
  return (toX - x === 0 && toY - y !== 0) || (toX - x !== 0 && toY - y === 0);
}

export default {
  [ItemTypes.KNIGHT]: canMoveKnight,
  [ItemTypes.BISHOP]: canMoveBishop,
  [ItemTypes.QUEEN]: canMoveQueen,
  [ItemTypes.PAWN]: canMovePawn,
  [ItemTypes.ROOK]: canMoveRook,
  [ItemTypes.KING]: canMoveKing,
  movePiece,
  selectPiece
};