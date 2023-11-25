import { useState } from "react";

export default function Calc() {
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
