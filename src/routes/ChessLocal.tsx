import { Color } from "@aakashkcx/chess-engine";

import { BackButton } from "../components/BackButton";
import { ChessBoard } from "../components/ChessBoard";
import { useChessGame } from "../hooks/useChessGame";

import "./ChessLocal.css";

export function ChessLocal() {
  const { board, fen, color, moves, ply, makeMove, takeBack } = useChessGame();

  return (
    <>
      <BackButton />
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
    </>
  );
}
