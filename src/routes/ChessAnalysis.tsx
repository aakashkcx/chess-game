import { Color, swapColor } from "@aakashkcx/chess-engine";
import { KeyboardEvent, useEffect, useState } from "react";

import { BackButton } from "../components/BackButton";
import { ChessBoard } from "../components/ChessBoard";
import { useChessGame } from "../hooks/useChessGame";

import styles from "./ChessAnalysis.module.css";

export function ChessAnalysis() {
  const {
    board,
    fen,
    activeColor,
    moves,
    ply,
    previous,
    makeMove,
    takeBack,
    newGame,
  } = useChessGame();

  const [viewColor, setViewColor] = useState(Color.White);

  const [fenInput, setFenInput] = useState(fen);

  useEffect(() => setFenInput(fen), [fen]);

  function fenInputDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter") return;
    try {
      newGame(fenInput);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  }

  return (
    <>
      <BackButton />
      <div className={styles.chessAnalysis}>
        <input
          type="text"
          className={styles.fen}
          value={fenInput}
          onChange={(e) => setFenInput(e.target.value)}
          onKeyDown={fenInputDown}
        />
        <ChessBoard
          board={board}
          viewColor={viewColor}
          activeColor={activeColor}
          moves={moves}
          previous={previous}
          makeMove={makeMove}
        />
        <div className={styles.controls}>
          <div className={styles.color}>
            {activeColor === Color.White ? "White" : "Black"}
          </div>
          <button onClick={() => setViewColor(swapColor(viewColor))}>
            Flip Board
          </button>
          <button onClick={() => takeBack()} disabled={ply < 1}>
            Take Back
          </button>
          <button onClick={() => newGame()}>Reset</button>
        </div>
      </div>
    </>
  );
}
