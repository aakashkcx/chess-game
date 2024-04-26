import { useChessGame } from "../hooks/useChessGame";

import { ChessBoard } from "./ChessBoard";

import "./ChessGame.css";

export function ChessGame() {
  const { board } = useChessGame();

  return <ChessBoard board={board} />;
}
