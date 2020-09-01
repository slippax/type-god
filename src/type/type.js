import React, { useState, useEffect } from "react";
import { generate } from "./words/words";
import { currentTime } from "./time/time";
import classes from "./type.module.css";
import TypeHook from "./typehook/typehook";

const Type = () => {
  const initialWords = generate();
  const [leftPadding, setLeftPadding] = useState(
    new Array(20).fill(" ").join("")
  );
  const [outgoingChars, setOutgoingChars] = useState("");
  const [currentChar, setCurrentChar] = useState(initialWords.charAt(0));
  const [incomingChars, setIncomingChars] = useState(initialWords.substr(1));
  const [startTime, setStartTime] = useState();
  const [wordCount, setWordCount] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [typedChars, setTypedChars] = useState("");
  const [counter, setCounter] = React.useState(60);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (startTime) {
      counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }
    if (counter === 0) {
      alert("finito");
      setCompleted(true);
    }
  }, [counter, startTime, completed]);

  TypeHook((key) => {
    let input = document.getElementById("inputBox");
    let updatedOutgoingChars = outgoingChars;
    let updatedIncomingChars = incomingChars;

    if (key === currentChar) {
      document.getElementById("current").style.backgroundColor = "#09d3ac";
      if (!startTime) {
        setStartTime(currentTime());
      }
      if (leftPadding.length > 0) {
        setLeftPadding(leftPadding.substring(1));
      }

      updatedOutgoingChars += currentChar;
      setOutgoingChars(updatedOutgoingChars);

      setCurrentChar(incomingChars.charAt(0));

      updatedIncomingChars = incomingChars.substring(1);
      if (updatedIncomingChars.split(" ").length < 10) {
        updatedIncomingChars += " " + generate();
      }
      setIncomingChars(updatedIncomingChars);

      if (incomingChars.charAt(0) === " ") {
        setWordCount(wordCount + 1);
        const durationInMinutes = (currentTime() - startTime) / 60000.0;
        setWpm((wordCount + 1) / durationInMinutes);
      }

      if (key === " ") {
        input.value = "";
      }
    }

    if (key !== currentChar) {
      document.getElementById("current").style.backgroundColor = "red";
    }

    const updatedTypedChars = typedChars + key;
    setTypedChars(updatedTypedChars);
    setAccuracy(
      ((updatedOutgoingChars.length * 100) / updatedTypedChars.length).toFixed(
        2
      )
    );
  });
  return (
    <div className={classes.gameBox}>
      <p className={classes.Character}>
        <span className={classes.Out}>
          {(leftPadding + outgoingChars).slice(-20)}
        </span>
        <span id="current" className={classes.Current}>
          {currentChar}
        </span>
        <span>{incomingChars.substr(0, 20)}</span>
      </p>
      <input id="inputBox"></input>
      <h3>
        WPM : {wpm.toFixed(2)} | ACC: {accuracy}%
      </h3>
      <h4>Countdown: {counter}</h4>
    </div>
  );
};

export default Type;
