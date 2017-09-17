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
  let dx = toX - x;
  let dy = toY - y;
  console.log(dx, ":", dy);

  let validPosition = color === COLORS.WHITE
    ? dx === 0 && dy === 1
    : dx === 0 && dy === -1;

  let pieceBlockingMove = false;

  let blockingPiece = _.filter(boardPosition, bpo => {
    return bpo.x === toX && bpo.y === toY;
  });

  if (!_.isEmpty(blockingPiece)) {
    if (blockingPiece[0].color === movingPiece.color) {
      pieceBlockingMove = true;
    } else {
      if (Math.abs(dx) === 1 && Math.abs(dy) === 1) {
        console.log("in 1");
        validPosition = true;
      }
      if (Math.abs(dx) === 0 && Math.abs(dy) === 1) {
        validPosition = false;
      }
    }
  }

  return {
    canMove: validPosition && !pieceBlockingMove,
    blockingPiece: blockingPiece
  };
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
    if (blockingPiece[0].color === movingPiece.color) {
      pieceBlockingMove = true;
    }
  }

  return {
    canMove: validPosition && !pieceBlockingMove,
    blockingPiece: blockingPiece
  };
}

function canMoveQueen(movingPiece, toX, toY, boardPosition) {
  let { x, y } = movingPiece;
  const dx = toX - x;
  const dy = toY - y;

  let validRookMoves = getRookValidPositions(
    x,
    y,
    boardPosition,
    movingPiece.color
  );
  let validBishopMoves = getBishopValidPositions(
    x,
    y,
    movingPiece.color,
    boardPosition
  );
  let validMoves = validRookMoves.concat(validBishopMoves);
  console.log(
    "Rook Moves",
    validRookMoves,
    "Bishop Moves",
    validBishopMoves,
    "All",
    validMoves
  );

  let a = _.filter(validMoves, pos => {
    return pos.x === toX && pos.y === toY;
  });

  if (!_.isEmpty(a)) {
    let blockingPiece = _.filter(boardPosition, bpo => {
      return bpo.x === toX && bpo.y === toY;
    });

    return {
      canMove: true,
      blockingPiece: blockingPiece
    };
  } else {
    return {
      canMove: false
    };
  }

  /*   let validPosition =
    validateBishopMove(dx, dy) || validateRookMove(toX, toY, x, y);

  let pieceBlockingMove = false;

  let blockingPiece = _.filter(boardPosition, bpo => {
    return bpo.x === toX && bpo.y === toY;
  });
  if (!_.isEmpty(blockingPiece)) {
    if (blockingPiece[0].color === movingPiece.color) {
      pieceBlockingMove = true;
    }
  }

  return {
    canMove: validPosition && !pieceBlockingMove,
    blockingPiece: blockingPiece
  }; */
}

function getRookValidPositions(xPos, yPos, boardPosition, pieceColor) {
  let horizontalPositions = [], verticalPositions = [];

  /* let lDx = xPos - 0;
  let rDx = 8 - xPos;
  let uDy = yPos - 0;
  let dDy = 8 - yPos; */

  //console.log(uDy, dDy, lDx, rDx);
  for (let i = xPos; i >= 0; i--) {
    if (xPos > i && i >= 0 && xPos !== i) {
      let a = _.filter(boardPosition, p => {
        return p.x === i && p.y === yPos;
      });
      if (_.isEmpty(a)) {
        horizontalPositions.push({ x: i, y: yPos });
      } else {
        if (pieceColor !== a[0].color) {
          horizontalPositions.push({ x: i, y: yPos });
        }
        break;
      }
    }
  }
  for (let i = xPos; i < 8; i++) {
    if (xPos <= i && i < 8 && xPos !== i) {
      let a = _.filter(boardPosition, p => {
        return p.x === i && p.y === yPos;
      });
      if (_.isEmpty(a)) {
        horizontalPositions.push({ x: i, y: yPos });

        //break;
      } else {
        if (pieceColor !== a[0].color) {
          horizontalPositions.push({ x: i, y: yPos });
        }
        break;
      }
    }
  }

  for (let i = yPos; i >= 0; i--) {
    if (yPos > i && i >= 0 && yPos !== i) {
      let a = _.filter(boardPosition, p => {
        return p.x === xPos && p.y === i;
      });
      //console.log("a", a);
      if (_.isEmpty(a)) {
        verticalPositions.push({ x: xPos, y: i });
      } else {
        if (pieceColor !== a[0].color) {
          verticalPositions.push({ x: xPos, y: i });
        }
        break;
      }
    }
  }

  for (let i = yPos; i < 8; i++) {
    if (yPos <= i && i < 8 && yPos !== i) {
      let a = _.filter(boardPosition, p => {
        return p.x === xPos && p.y === i;
      });
      if (_.isEmpty(a)) {
        verticalPositions.push({ x: xPos, y: i });
      } else {
        if (pieceColor !== a[0].color) {
          verticalPositions.push({ x: xPos, y: i });
        }
        break;
      }
    }
  }
  let validPositions = horizontalPositions.concat(verticalPositions);
  return validPositions;
}

function canMoveRook(movingPiece, toX, toY, boardPosition) {
  let { x, y } = movingPiece;

  let validPositions = getRookValidPositions(
    x,
    y,
    boardPosition,
    movingPiece.color
  );

  let a = _.filter(validPositions, pos => {
    return pos.x === toX && pos.y === toY;
  });

  if (!_.isEmpty(a)) {
    let blockingPiece = _.filter(boardPosition, bpo => {
      return bpo.x === toX && bpo.y === toY;
    });

    return {
      canMove: true,
      blockingPiece: blockingPiece
    };
  } else {
    return {
      canMove: false
    };
  }

  /* let validPosition = validateRookMove(toX, toY, x, y);

  let pieceBlockingMove = false;

  let blockingPiece = _.filter(boardPosition, bpo => {
    return bpo.x === toX && bpo.y === toY;
  });

  if (!_.isEmpty(blockingPiece)) {
    if (blockingPiece[0].color === movingPiece.color) {
      pieceBlockingMove = true;
    }
  }

  return {
    canMove: validPosition && !pieceBlockingMove,
    blockingPiece: blockingPiece
  }; */
}

function getBishopValidPositions(xPos, yPos, color, boardPosition) {
  let leftSideMoves = [], rightSideMoves = [];
  //for upper left side moves
  for (let i = xPos, j = yPos; i >= 0 && j < 8; i--, j++) {
    if (i !== xPos && j !== yPos) {
      let a = _.filter(boardPosition, pie => {
        return pie.x === i && pie.y === j;
      });

      if (_.isEmpty(a)) {
        leftSideMoves.push({ x: i, y: j });
      } else {
        if (a[0].color !== color) {
          leftSideMoves.push({ x: i, y: j });
        }
        break;
      }
    }
  }
  //for  left down side moves
  for (let i = xPos, j = yPos; i >= 0 && j >= 0; i--, j--) {
    if (i !== xPos && j !== yPos) {
      let a = _.filter(boardPosition, pie => {
        return pie.x === i && pie.y === j;
      });

      if (_.isEmpty(a)) {
        leftSideMoves.push({ x: i, y: j });
      } else {
        if (a[0].color !== color) {
          leftSideMoves.push({ x: i, y: j });
        }
        break;
      }
    }
  }
  //for right down side moves
  for (let i = xPos, j = yPos; i < 8 && j >= 0; i++, j--) {
    if (i !== xPos && j !== yPos) {
      let a = _.filter(boardPosition, pie => {
        return pie.x === i && pie.y === j;
      });

      if (_.isEmpty(a)) {
        rightSideMoves.push({ x: i, y: j });
      } else {
        if (a[0].color !== color) {
          rightSideMoves.push({ x: i, y: j });
        }
        break;
      }
    }
  }
  //for right up side moves
  for (let i = xPos, j = yPos; i < 8 && j < 8; i++, j++) {
    if (i !== xPos && j !== yPos) {
      let a = _.filter(boardPosition, pie => {
        return pie.x === i && pie.y === j;
      });

      if (_.isEmpty(a)) {
        rightSideMoves.push({ x: i, y: j });
      } else {
        if (a[0].color !== color) {
          rightSideMoves.push({ x: i, y: j });
        }
        break;
      }
    }
  }
  let a = leftSideMoves.concat(rightSideMoves);
  console.log(
    leftSideMoves,
    "leftSideMoves",
    rightSideMoves,
    "rightSideMoves",
    a,
    "all moves"
  );
  return a;
}

function canMoveBishop(movingPiece, toX, toY, boardPosition) {
  let { x, y } = movingPiece;
  const dx = toX - x;
  const dy = toY - y;

  let validPositions = getBishopValidPositions(
    x,
    y,
    movingPiece.color,
    boardPosition
  );

  let a = _.filter(validPositions, pos => {
    return pos.x === toX && pos.y === toY;
  });

  if (!_.isEmpty(a)) {
    let blockingPiece = _.filter(boardPosition, bpo => {
      return bpo.x === toX && bpo.y === toY;
    });

    return {
      canMove: true,
      blockingPiece: blockingPiece
    };
  } else {
    return {
      canMove: false
    };
  }

  /* let validPosition = validateBishopMove(dx, dy);

  let pieceBlockingMove = false;

  let blockingPiece = _.filter(boardPosition, bpo => {
    return bpo.x === toX && bpo.y === toY;
  });

  if (!_.isEmpty(blockingPiece)) {
    if (blockingPiece[0].color === movingPiece.color) {
      pieceBlockingMove = true;
    }
  }

  return {
    canMove: validPosition && !pieceBlockingMove,
    blockingPiece: blockingPiece
  }; */
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
    if (blockingPiece[0].color === movingPiece.color) {
      pieceBlockingMove = true;
    }
  }

  return {
    canMove: validPosition && !pieceBlockingMove,
    blockingPiece: blockingPiece
  };
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
