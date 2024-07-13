import { Color, swapColor } from "@aakashkcx/chess-engine";
import { useEffect, useState } from "react";

import { BackButton } from "../components/BackButton";
import { ChessBoard } from "../components/ChessBoard";
import { useChessGame } from "../hooks/useChessGame";

import "./ChessAI.css";

export function ChessAI() {
  const {
    board,
    fen,
    color,
    moves,
    ply,
    previous,
    makeMove,
    takeBack,
    makeAIMove,
  } = useChessGame();

  const [side, setSide] = useState(Color.White);

  const [player] = useState(Color.White);

  const [time] = useState(1000);

  useEffect(() => {
    if (color !== player) setTimeout(makeAIMove, 0, time);
  }, [color]);

  return (
    <>
      <BackButton />
      <div className="chess-ai">
        <div className="fen">{fen}</div>
        <ChessBoard
          board={board}
          side={side}
          color={player}
          moves={moves}
          previous={previous}
          makeMove={makeMove}
        />
        <div className="controls">
          <div className="color">
            {color === Color.White ? "White" : "Black"}
            {color !== player && " (AI)"}
          </div>
          <button onClick={() => setSide(swapColor(side))}>Flip Board</button>
          <button onClick={() => takeBack(true)} disabled={ply < 2}>
            Take Back
          </button>
        </div>
      </div>
    </>
  );
}
