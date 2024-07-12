import {
  Color,
  ColorPiece,
  Index64,
  Move,
  NO_MOVE,
  getColor,
  getStart,
  getTarget,
  index120To64,
  index64To120,
} from "@aakashkcx/chess-engine";
import clsx from "clsx";
import { useMemo, useState } from "react";

import { ChessSquare } from "./ChessSquare";

import "./ChessBoard.css";

interface ChessBoardProps {
  board: ColorPiece[];
  player: Color;
  color: Color;
  moves: Move[];
  previous?: Move;
  makeMove: (start: Index64, target: Index64) => boolean;
}

export function ChessBoard({
  board,
  player,
  color,
  moves,
  previous,
  makeMove,
}: ChessBoardProps) {
  const [selected, setSelected] = useState<Index64>();

  const moveSquares = useMemo<Set<Index64>>(() => {
    if (selected === undefined) return new Set();
    const targets = moves
      .filter((move) => getStart(move) === index64To120(selected))
      .map(getTarget)
      .map(index120To64);
    return new Set(targets);
  }, [selected, moves]);

  const previousSquares = useMemo<Set<Index64>>(() => {
    if (!previous || previous === NO_MOVE) return new Set();
    return new Set([getStart(previous), getTarget(previous)].map(index120To64));
  }, [previous]);

  function selectSquare(index: Index64) {
    return function () {
      const piece = board[index];
      if (selected === undefined) {
        if (getColor(piece) === color) return setSelected(index);
      } else {
        if (selected === index) return setSelected(undefined);
        if (getColor(piece) === color) return setSelected(index);
        if (moveSquares.has(index)) makeMove(selected, index);
        setSelected(undefined);
      }
    };
  }

  const className = clsx("chess-board", player === Color.Black && "flipped");

  return (
    <div className={className}>
      {board.map((piece, index) => (
        <ChessSquare
          key={index}
          index={index}
          piece={piece}
          selected={index == selected}
          move={moveSquares.has(index)}
          previous={previousSquares.has(index)}
          onClick={selectSquare(index)}
        />
      ))}
    </div>
  );
}
