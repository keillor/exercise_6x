import React from "react";
import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (squares[i]) {
      return;
    }
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }
}

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <>
      <h1>TIC-TAC-TOE</h1>
      <div className="game">
        <div className="game-board">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
          />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  );
}

export function Calc() {
  function CalcButton({ value, clickHandler, styleClass }) {
    return (
      <>
        <button onClick={() => clickHandler({ value })} className={styleClass}>
          {value}
        </button>
      </>
    );
  }

  function CalcWindow({ value, header }) {
    return (
      <>
        <h1>{header}</h1>
        <div className="window-div">{value}</div>
      </>
    );
  }

  function ButtonHolder({ children }) {
    return <div className="button-holder">{children}</div>;
  }

  const [numberA, setNumA] = useState(null);
  const [numberB, setNumB] = useState(null);
  const [operation, setOperation] = useState(null);
  const [window, setWindow] = useState(0);
  const [step, setStep] = useState(0);

  function handleClick({ value }) {
    //calc cleared and setting first number
    if (step === 0 && typeof value === "number") {
      if (numberA === null) {
        //no number present
        setNumA(value);
        setStep(1);
        setWindow(value);
      }
    }
    //num a present, adjusting num
    else if (step === 1 && typeof value === "number") {
      let newNum = numberA * 10;
      newNum = newNum + value;
      setNumA(newNum);
      setWindow(newNum);
    }
    //num a present, adding operator
    else if (
      step === 1 &&
      (value === "+" || value === "-" || value === "*" || value === "/")
    ) {
      setOperation(value);
      setStep(2);
      setWindow(numberA + " " + value);
      //step = 2;
    }

    //num a present, operator present, adjusting operator
    else if (
      step === 2 &&
      (value === "+" || value === "-" || value === "*" || value === "/")
    ) {
      setOperation(value);
      setWindow(numberA + " " + value);
    } else if (step === 2 && typeof value === "number") {
      setNumB(value);
      setStep(3);
      setWindow(numberA + " " + operation + " " + value);
    } else if (step === 3 && typeof value === "number") {
      let newNum = numberB * 10;
      newNum = newNum + value;
      setNumB(newNum);
      setWindow(numberA + " " + operation + " " + newNum);
    } else if (step === 3 && value === "=") {
      let newNum;
      switch (operation) {
        case "+":
          newNum = numberA + numberB;
          break;

        case "-":
          newNum = numberA - numberB;
          break;

        case "*":
          newNum = numberA * numberB;
          break;

        case "/":
          newNum = numberA / numberB;
          break;
      }

      setNumB(null);
      setStep(1);
      setOperation(null);
      setWindow(newNum);
      setNumA(newNum);
    }
  }

  function clearAll({ value }) {
    setNumA(null);
    setNumB(null);
    setOperation(null);
    setWindow(0);
    setStep(0);
  }

  return (
    <>
      <CalcWindow value={window} header={"CALCULATOR"} />
      <ButtonHolder>
        <div className="button-row">
          <CalcButton
            styleClass={"calc-button"}
            clickHandler={handleClick}
            value={1}
          />
          <CalcButton
            styleClass={"calc-button"}
            clickHandler={handleClick}
            value={2}
          />
          <CalcButton
            styleClass={"calc-button"}
            clickHandler={handleClick}
            value={3}
          />
          <CalcButton
            styleClass={"operator-button"}
            clickHandler={handleClick}
            value={"+"}
          />
        </div>
        <div className="button-row">
          <CalcButton
            styleClass={"calc-button"}
            clickHandler={handleClick}
            value={4}
          />
          <CalcButton
            styleClass={"calc-button"}
            clickHandler={handleClick}
            value={5}
          />
          <CalcButton
            styleClass={"calc-button"}
            clickHandler={handleClick}
            value={6}
          />
          <CalcButton
            styleClass={"operator-button"}
            clickHandler={handleClick}
            value={"-"}
          />
        </div>
        <div className="button-row">
          <CalcButton
            styleClass={"calc-button"}
            clickHandler={handleClick}
            value={7}
          />
          <CalcButton
            styleClass={"calc-button"}
            clickHandler={handleClick}
            value={8}
          />
          <CalcButton
            styleClass={"calc-button"}
            clickHandler={handleClick}
            value={9}
          />
          <CalcButton
            styleClass={"operator-button"}
            clickHandler={handleClick}
            value={"*"}
          />
        </div>
        <div className="button-row">
          <CalcButton
            styleClass={"clear-button"}
            clickHandler={clearAll}
            value={"C"}
          />
          <CalcButton
            styleClass={"calc-button"}
            clickHandler={handleClick}
            value={0}
          />
          <CalcButton
            styleClass={"equal-button"}
            clickHandler={handleClick}
            value={"="}
          />
          <CalcButton
            styleClass={"operator-button"}
            clickHandler={handleClick}
            value={"/"}
          />
        </div>
      </ButtonHolder>
    </>
  );
}
