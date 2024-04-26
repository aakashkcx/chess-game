import { ChessGame, Move } from "@aakashkcx/chess-engine";
import { useRef, useState } from "react";

export function useChessGame() {
  const ref = useRef(new ChessGame());
  const gameRef = ref.current;

  const [board, setBoard] = useState(gameRef.getBoard());

  function makeMove(move: Move) {
    gameRef.makeMove(move);
    setBoard(gameRef.getBoard());
  }

  function takeBack() {
    gameRef.takeBack();
    setBoard(gameRef.getBoard());
  }

  return { gameRef, board, makeMove, takeBack };
}
