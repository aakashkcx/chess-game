import {
  ChessGame,
  Color,
  ColorPiece,
  Index64,
  Move,
  NO_MOVE,
  getStart,
  getTarget,
  index64To120,
} from "@aakashkcx/chess-engine";
import { useRef, useState } from "react";

/**
 * A projection of the chess game data for use in React state.
 */
type GameData = {
  /** The chess board, of length 64. */
  board: ColorPiece[];
  /** The Forsyth–Edwards Notation (FEN) string. */
  fen: string;
  /** The next color to move. */
  activeColor: Color;
  /** The array of legal moves that can be made. */
  moves: Move[];
  /** The number of plies played. */
  ply: number;
  /** The previous move played, or NO_MOVE. */
  previous: Move;
};

/**
 * Get the game data of a chess game.
 * @param game The chess game.
 * @returns A projection of the chess game data.
 */
function getGameData(game: ChessGame): GameData {
  return {
    board: game.getBoard(),
    fen: game.getFEN(),
    activeColor: game.activeColor,
    moves: game.generateMoves(),
    ply: game.ply,
    previous: game.ply > 0 ? game.moveList[game.ply - 1] : NO_MOVE,
  };
}

/**
 * A custom React hook which returns a stateful chess game.
 */
export function useChessGame() {
  const ref = useRef(new ChessGame());
  let gameRef = ref.current;

  const [game, setGame] = useState(getGameData(gameRef));

  /**
   * Make a move on the chessboard.
   * @param start The start square.
   * @param target The target square.
   * @returns Whether the move was legal and therefore completed.
   */
  function makeMove(start: Index64, target: Index64): boolean {
    start = index64To120(start);
    target = index64To120(target);
    for (const move of game.moves) {
      if (getStart(move) === start && getTarget(move) === target) {
        const legal = gameRef.makeMove(move);
        setGame(getGameData(gameRef));
        return legal;
      }
    }
    return false;
  }

  /**
   * Take back the move on the chessboard.
   * @param twice Whether to take back two moves (same side) or one move (switch sides).
   * @throws {Error} If take back not possible.
   */
  function takeBack(twice: boolean = false) {
    if (game.ply < (twice ? 2 : 1)) return alert("Cannot take back!");
    gameRef.takeBack();
    if (twice) gameRef.takeBack();
    setGame(getGameData(gameRef));
  }

  /**
   * Search for the best move and make the move on the chessboard.
   * @param timeMS The search time in milliseconds, default 1000 ms.
   * @returns Whether a move was found that was legal and completed.
   */
  function makeAIMove(timeMS?: number) {
    const move = gameRef.search(timeMS);
    if (!move) return false;
    const legal = gameRef.makeMove(move);
    setGame(getGameData(gameRef));
    return legal;
  }

  /**
   * Create a new chess game.
   * @param fen The starting Forsyth–Edwards Notation (FEN) string.
   *  If empty FEN string, game will start with empty board.
   * @throws {Error} If FEN string is invalid.
   */
  function newGame(fen?: string) {
    const game = new ChessGame(fen);
    gameRef = ref.current = game;
    setGame(getGameData(gameRef));
  }

  return { ...game, makeMove, takeBack, makeAIMove, newGame };
}
