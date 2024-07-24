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

import styles from "./ChessBoard.module.css";

interface ChessBoardProps {
  board: ColorPiece[];
  viewColor: Color;
  activeColor: Color;
  moves: Move[];
  previous?: Move;
  makeMove: (start: Index64, target: Index64) => boolean;
}

export function ChessBoard({
  board,
  viewColor,
  activeColor,
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
        if (getColor(piece) === activeColor) return setSelected(index);
      } else {
        if (selected === index) return setSelected(undefined);
        if (getColor(piece) === activeColor) return setSelected(index);
        if (moveSquares.has(index)) makeMove(selected, index);
        setSelected(undefined);
      }
    };
  }

  const className = clsx(
    styles.chessBoard,
    viewColor === Color.Black && styles.flipped
  );

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
