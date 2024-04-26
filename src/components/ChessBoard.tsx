import { ColorPiece } from "@aakashkcx/chess-engine";

import { ChessSquare } from "./ChessSquare";

import "./ChessBoard.css";

interface ChessBoardProps {
  board: ColorPiece[];
}

export function ChessBoard({ board }: ChessBoardProps) {
  return (
    <div className="chess-board">
      {board.map((piece, index) => (
        <ChessSquare key={index} index={index} piece={piece} />
      ))}
    </div>
  );
}
