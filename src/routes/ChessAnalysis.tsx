import { Color } from "@aakashkcx/chess-engine";
import { Link } from "react-router-dom";

import { ChessBoard } from "../components/ChessBoard";
import { useChessGame } from "../hooks/useChessGame";

import "./ChessAnalysis.css";

export function ChessAnalysis() {
  const { board, fen, color, moves, ply, makeMove, takeBack } = useChessGame();

  return (
    <div>
      <Link to="/">Back</Link>
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
