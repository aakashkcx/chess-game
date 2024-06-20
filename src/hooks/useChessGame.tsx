import {
  ChessGame,
  Color,
  ColorPiece,
  Index64,
  Move,
  getStart,
  getTarget,
  index64To120,
} from "@aakashkcx/chess-engine";
import { useRef, useState } from "react";

/**
 * A projection of the chess game data for use in React state.
 */
interface GameData {
  /** The chess board, of length 64. */
  board: ColorPiece[];
  /** The Forsyth–Edwards Notation (FEN) string. */
  fen: string;
  /** The next color to move. */
  color: Color;
  /** The array of legal moves that can be made. */
  moves: Move[];
  /** The number of plies played. */
  ply: number;
}

/**
 * Get the game data of a chess game.
 * @param game The chess game.
 * @returns A projection of the chess game data.
 */
function getGameData(game: ChessGame): GameData {
  return {
    board: game.getBoard(),
    fen: game.getFEN(),
    color: game.activeColor,
    moves: game.generateMoves(),
    ply: game.ply,
  };
}

/**
 * A custom React hook which returns a stateful chess game.
 */
export function useChessGame() {
  const ref = useRef(new ChessGame());
  const gameRef = ref.current;

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
   */
  function takeBack(twice: boolean = false) {
    if (game.ply < (twice ? 2 : 1)) return alert("Cannot take back!");
    gameRef.takeBack();
    if (twice) gameRef.takeBack();
    setGame(getGameData(gameRef));
  }

  return { gameRef, ...game, makeMove, takeBack };
}
