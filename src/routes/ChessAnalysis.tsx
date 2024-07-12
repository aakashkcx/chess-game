import { Color } from "@aakashkcx/chess-engine";
import { KeyboardEvent, useState } from "react";

import { BackButton } from "../components/BackButton";
import { ChessBoard } from "../components/ChessBoard";
import { useChessGame } from "../hooks/useChessGame";

import "./ChessAnalysis.css";

export function ChessAnalysis() {
  const { board, fen, color, moves, ply, previous, makeMove, takeBack } =
    useChessGame();

  const [player, setPlayer] = useState(Color.White);

  const [fenInput, setFenInput] = useState(fen);

  function fenInputDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter") return;
    alert();
  }

  return (
    <>
      <BackButton />
      <div className="chess-analysis">
        <input
          type="text"
          className="fen"
          value={fenInput}
          onChange={(e) => setFenInput(e.target.value)}
          onKeyDown={fenInputDown}
        />
        <ChessBoard
          board={board}
          player={player}
          color={color}
          moves={moves}
          previous={previous}
          makeMove={makeMove}
        />
        <div className="controls">
          <div className="color">
            {color === Color.White ? "White" : "Black"}
          </div>
          <button onClick={() => setPlayer(player ^ 1)}>Flip Board</button>
          <button onClick={() => takeBack()} disabled={ply < 1}>
            Take Back
          </button>
        </div>
      </div>
    </>
  );
}
