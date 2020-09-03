import React, { useState, useEffect } from "react";
import { generate } from "./words/words";
import { currentTime } from "./time/time";
import classes from "./type.module.css";
import TypeHook from "./typehook/typehook";
import Firebase from "firebase";

const Type = (props) => {
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

  const userName = Firebase.auth().currentUser.displayName;

  useEffect(() => {
    if (startTime) {
      counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
      if (counter === 0 && !completed) {
        const writeUserData = (userID) => {
          Firebase.database()
            .ref("/")
            .push({ name: userID, wpm: wpm, accuracy: accuracy });
          console.log("DATA SAVED");
        };
        writeUserData(userName);
        setCompleted(true);
      }
    }
  }, [counter, startTime, userName, accuracy, wpm, completed]);

  TypeHook((key) => {
    let updatedOutgoingChars = outgoingChars;
    let updatedIncomingChars = incomingChars;
    if (!startTime) {
      setStartTime(currentTime());
    }
    if (key === currentChar && !completed) {
      document.getElementById("current").style.backgroundColor = "#09d3ac";

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
        setWpm(((wordCount + 1) / durationInMinutes).toFixed(2));
      }
    }

    if (key !== currentChar && !completed && counter > 0) {
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
    <div>
      {!completed ? (
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
          <h3>
            {wpm === 0 ? (
              <div>WPM: -- | ACC: {accuracy}%</div>
            ) : (
              <div>
                WPM: {wpm} | ACC: {accuracy}%
              </div>
            )}
          </h3>
          <h4>Countdown: {counter}</h4>
        </div>
      ) : (
        <div className={classes.gameBox}>
          <h3>
            Finished. WPM of {wpm}. Accuracy of {accuracy}
          </h3>
          <button onClick={props.clicked}>Finish & Submit</button>
        </div>
      )}
    </div>
  );
};

export default Type;
