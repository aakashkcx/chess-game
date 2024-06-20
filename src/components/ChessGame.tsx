import { Color } from "@aakashkcx/chess-engine";

import { useChessGame } from "../hooks/useChessGame";
import { ChessBoard } from "./ChessBoard";

import "./ChessGame.css";

export function ChessGame() {
  const { board, fen, color, moves, ply, makeMove, takeBack } = useChessGame();

  return (
    <div>
      <ChessBoard
        board={board}
        player={Color.White}
        color={color}
        moves={moves}
        makeMove={makeMove}
      />
      <div>{fen}</div>
      <button onClick={() => takeBack()} disabled={ply < 1}>
        Take Back
      </button>
    </div>
  );
}
