import { Color, swapColor } from "@aakashkcx/chess-engine";
import { useEffect, useState } from "react";

import { BackButton } from "../components/BackButton";
import { ChessBoard } from "../components/ChessBoard";
import { useChessGame } from "../hooks/useChessGame";

import styles from "./ChessLocal.module.css";

export function ChessLocal() {
  const { board, fen, activeColor, moves, ply, previous, makeMove, takeBack } =
    useChessGame();

  const [viewColor, setViewColor] = useState(Color.White);

  useEffect(() => setViewColor(activeColor), [activeColor]);

  return (
    <>
      <BackButton />
      <div className={styles.chessLocal}>
        <div className={styles.fen}>{fen}</div>
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
        </div>
      </div>
    </>
  );
}
