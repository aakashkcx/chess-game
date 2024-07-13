import { Color, swapColor } from "@aakashkcx/chess-engine";
import { useState } from "react";

import { BackButton } from "../components/BackButton";
import { ChessBoard } from "../components/ChessBoard";
import { useChessGame } from "../hooks/useChessGame";

import "./ChessAI.css";

export function ChessAI() {
  const { board, fen, color, moves, ply, previous, makeMove, takeBack } =
    useChessGame();

  const [side, setSide] = useState(Color.White);

  return (
    <>
      <BackButton />
      <div className="chess-ai">
        <div className="fen">{fen}</div>
        <ChessBoard
          board={board}
          side={side}
          color={color}
          moves={moves}
          previous={previous}
          makeMove={makeMove}
        />
        <div className="controls">
          <div className="color">
            {color === Color.White ? "White" : "Black"}
          </div>
          <button onClick={() => setSide(swapColor(side))}>Flip Board</button>
          <button onClick={() => takeBack()} disabled={ply < 1}>
            Take Back
          </button>
        </div>
      </div>
    </>
  );
}
