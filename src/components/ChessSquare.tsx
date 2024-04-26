import { ColorPiece } from "@aakashkcx/chess-engine";
import { clsx } from "clsx";

import "./ChessSquare.css";

import BD from "../assets/bdt.svg";
import BL from "../assets/blt.svg";
import KD from "../assets/kdt.svg";
import KL from "../assets/klt.svg";
import ND from "../assets/ndt.svg";
import NL from "../assets/nlt.svg";
import PD from "../assets/pdt.svg";
import PL from "../assets/plt.svg";
import QD from "../assets/qdt.svg";
import QL from "../assets/qlt.svg";
import RD from "../assets/rdt.svg";
import RL from "../assets/rlt.svg";

interface ChessSquareProps {
  index: number;
  piece: ColorPiece;
}

export function ChessSquare({ index, piece }: ChessSquareProps) {
  const className = clsx("chess-square", isDark(index) ? "dark" : "light");
  const svg = getPieceSVG(piece);

  return (
    <div className={className}>
      {svg && <img src={svg} className="chess-piece" />}
    </div>
  );
}

function isDark(index: number): boolean {
  return ((Math.floor(index / 8) % 2) + index) % 2 === 0;
}

function getPieceSVG(piece: ColorPiece): string | undefined {
  if (piece === ColorPiece.WhitePawn) return PL;
  if (piece === ColorPiece.WhiteKnight) return NL;
  if (piece === ColorPiece.WhiteBishop) return BL;
  if (piece === ColorPiece.WhiteRook) return RL;
  if (piece === ColorPiece.WhiteQueen) return QL;
  if (piece === ColorPiece.WhiteKing) return KL;
  if (piece === ColorPiece.BlackPawn) return PD;
  if (piece === ColorPiece.BlackKnight) return ND;
  if (piece === ColorPiece.BlackBishop) return BD;
  if (piece === ColorPiece.BlackRook) return RD;
  if (piece === ColorPiece.BlackQueen) return QD;
  if (piece === ColorPiece.BlackKing) return KD;
}
