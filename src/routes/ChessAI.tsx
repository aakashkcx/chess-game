import { Color, swapColor } from "@aakashkcx/chess-engine";
import { useEffect, useState } from "react";

import { BackButton } from "../components/BackButton";
import { ChessBoard } from "../components/ChessBoard";
import { useChessGame } from "../hooks/useChessGame";

import "./ChessAI.css";

const TIME_DELAY_MS = 250;

export function ChessAI() {
  const {
    board,
    fen,
    activeColor,
    moves,
    ply,
    previous,
    makeMove,
    takeBack,
    makeAIMove,
  } = useChessGame();

  const [viewColor, setViewColor] = useState(Color.White);

  const [playerColor] = useState(Color.White);

  const [timeMS] = useState(1000);

  useEffect(() => {
    if (activeColor !== playerColor)
      setTimeout(makeAIMove, TIME_DELAY_MS, timeMS);
  }, [activeColor]);

  return (
    <>
      <BackButton />
      <div className="chess-ai">
        <div className="fen">{fen}</div>
        <ChessBoard
          board={board}
          viewColor={viewColor}
          activeColor={playerColor}
          moves={moves}
          previous={previous}
          makeMove={makeMove}
        />
        <div className="controls">
          <div className="color">
            {activeColor === Color.White ? "White" : "Black"}
            {activeColor !== playerColor && " (AI)"}
          </div>
          <button onClick={() => setViewColor(swapColor(viewColor))}>
            Flip Board
          </button>
          <button onClick={() => takeBack(true)} disabled={ply < 2}>
            Take Back
          </button>
        </div>
      </div>
    </>
  );
}
