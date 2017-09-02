export const ItemTypes = {
  KNIGHT: "KNIGHT",
  BISHOP: "BISHOP",
  KING: "KING",
  QUEEN: "QUEEN",
  ROOK: "ROOK",
  PAWN: "PAWN"
};

export const ActionTypes = {
  MOVE_PIECE : 'MOVE_PIECE',
  SELECT_PIECE:'SELECT_PIECE'
}

export const COLORS = {
  WHITE : "WHITE",
  BLACK : "BLACk"
}

export const INITIAL_GAME_STATE = {
  piecePosition: [
    /* White Pieces */
    { x: 4, y: 0, type: ItemTypes.KING, color: COLORS.WHITE, icon:"&#9812" },
    { x: 3, y: 0, type: ItemTypes.QUEEN, color: COLORS.WHITE, icon:"&#9813" },
    { x: 2, y: 0, type: ItemTypes.BISHOP, color: COLORS.WHITE, icon:"&#9815" },
    { x: 1, y: 0, type: ItemTypes.KNIGHT, color: COLORS.WHITE, icon:"&#9816" },
    { x: 0, y: 0, type: ItemTypes.ROOK, color: COLORS.WHITE, icon:"&#9814" },
    { x: 5, y: 0, type: ItemTypes.BISHOP, color: COLORS.WHITE, icon:"&#9815" },
    { x: 6, y: 0, type: ItemTypes.KNIGHT, color: COLORS.WHITE, icon:"&#9816" },
    { x: 7, y: 0, type: ItemTypes.ROOK, color: COLORS.WHITE, icon:"&#9814" },
    { x: 0, y: 1, type: ItemTypes.PAWN, color: COLORS.WHITE, icon:"&#9817" },
    { x: 1, y: 1, type: ItemTypes.PAWN, color: COLORS.WHITE, icon:"&#9817" },
    { x: 2, y: 1, type: ItemTypes.PAWN, color: COLORS.WHITE, icon:"&#9817" },
    { x: 3, y: 1, type: ItemTypes.PAWN, color: COLORS.WHITE, icon:"&#9817" },
    { x: 4, y: 1, type: ItemTypes.PAWN, color: COLORS.WHITE, icon:"&#9817" },
    { x: 5, y: 1, type: ItemTypes.PAWN, color: COLORS.WHITE, icon:"&#9817" },
    { x: 6, y: 1, type: ItemTypes.PAWN, color: COLORS.WHITE, icon:"&#9817" },
    { x: 7, y: 1, type: ItemTypes.PAWN, color: COLORS.WHITE, icon:"&#9817" },
    /* Black Pieces */
    { x: 4, y: 7, type: ItemTypes.KING, color: COLORS.BLACK, icon:"&#9818" },
    { x: 3, y: 7, type: ItemTypes.QUEEN, color: COLORS.BLACK, icon:"&#9819" },
    { x: 2, y: 7, type: ItemTypes.BISHOP, color: COLORS.BLACK, icon:"&#9821" },
    { x: 5, y: 7, type: ItemTypes.BISHOP, color: COLORS.BLACK, icon:"&#9821" },
    { x: 1, y: 7, type: ItemTypes.KNIGHT, color: COLORS.BLACK, icon:"&#9822" },
    { x: 6, y: 7, type: ItemTypes.KNIGHT, color: COLORS.BLACK, icon:"&#9822" },
    { x: 0, y: 7, type: ItemTypes.ROOK, color: COLORS.BLACK, icon:"&#9820" },
    { x: 7, y: 7, type: ItemTypes.ROOK, color: COLORS.BLACK, icon:"&#9820" },

    { x: 0, y: 6, type: ItemTypes.PAWN, color: COLORS.BLACK, icon:"&#9823" },
    { x: 1, y: 6, type: ItemTypes.PAWN, color: COLORS.BLACK, icon:"&#9823" },
    { x: 2, y: 6, type: ItemTypes.PAWN, color: COLORS.BLACK, icon:"&#9823" },
    { x: 3, y: 6, type: ItemTypes.PAWN, color: COLORS.BLACK, icon:"&#9823" },
    { x: 4, y: 6, type: ItemTypes.PAWN, color: COLORS.BLACK, icon:"&#9823" },
    { x: 5, y: 6, type: ItemTypes.PAWN, color: COLORS.BLACK, icon:"&#9823" },
    { x: 6, y: 6, type: ItemTypes.PAWN, color: COLORS.BLACK, icon:"&#9823" },
    { x: 7, y: 6, type: ItemTypes.PAWN, color: COLORS.BLACK, icon:"&#9823" }

  ],
  selectedPiece:{}
};

/* 

white chess KING	♔	U+2654	;
white chess QUEEN	♕	U+2655	;
white chess rook	♖	U+2656	;
white chess bishop	♗	U+2657	;
white chess knight	♘	U+2658	;
white chess pawn	♙	U+2659	;
black chess KING	♚	U+265A	;
black chess QUEEN	♛	U+265B	;
black chess rook	♜	U+265C	;
black chess bishop	♝	U+265D	;
black chess knight	♞	U+265E	;
black chess pawn	♟	U+265F	

*/
