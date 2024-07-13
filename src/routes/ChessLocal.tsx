import { Color, swapColor } from "@aakashkcx/chess-engine";
import { useEffect, useState } from "react";

import { BackButton } from "../components/BackButton";
import { ChessBoard } from "../components/ChessBoard";
import { useChessGame } from "../hooks/useChessGame";

import "./ChessLocal.css";

export function ChessLocal() {
  const { board, fen, color, moves, ply, previous, makeMove, takeBack } =
    useChessGame();

  const [side, setSide] = useState(Color.White);

  useEffect(() => setSide(color), [color]);

  return (
    <>
      <BackButton />
      <div className="chess-local">
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
