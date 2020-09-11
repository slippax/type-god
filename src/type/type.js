import React, { useState, useEffect } from "react";
import { generate } from "./words/words";
import { currentTime } from "./time/time";
import { GiCancel } from "react-icons/gi";
import { GrSave } from "react-icons/gr";
import classes from "./type.module.css";
import TypeHook from "./typehook/typehook";
import Firebase from "firebase";

const Type = (props) => {
  const [leftPadding, setLeftPadding] = useState(
    new Array(20).fill(" ").join("")
  );
  const initialWords = generate();
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
  const userId = Firebase.auth().currentUser.uid;
  let user = null;
  let userHigh = null;

  const readUserData = (userId) => {
    Firebase.database()
      .ref("/" + userId)
      .on("value", (snapshot) => {
        if (snapshot && snapshot.exists) {
          user = snapshot.val();
        }
      });
  };
  readUserData(userId);

  if (user !== null) {
    userHigh = user.wpm;
  }

  useEffect(() => {
    const writeUserData = (userId) => {
      if (userHigh < wpm) {
        Firebase.database()
          .ref("/" + userId)
          .set({ name: userName, wpm: wpm, accuracy: accuracy });
        console.log("DATA SAVED");
      }
    };
    if (startTime) {
      counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
      if (counter === 1) {
        const durationInMinutes = (currentTime() - startTime) / 60000.0;
        setWpm((wordCount / durationInMinutes).toFixed(2));
      }
      if (counter === 0 && !completed) {
        writeUserData(userId);
        setCompleted(true);
      }
    }
  }, [
    counter,
    startTime,
    userName,
    accuracy,
    wpm,
    completed,
    wordCount,
    userId,
    userHigh,
  ]);

  TypeHook((key) => {
    let updatedOutgoingChars = outgoingChars;
    let updatedIncomingChars = incomingChars;
    if (!startTime) {
      setStartTime(currentTime());
    }
    if (key === currentChar && !completed) {
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
        setWpm((wordCount / durationInMinutes).toFixed(2));
      }
    }

    if (key !== currentChar && !completed && counter > 0) {
      document.getElementById("current").style.backgroundColor = "red";
    } else if (key === currentChar && !completed && counter > 0) {
      document.getElementById("current").style.backgroundColor = "lightgreen";
    }

    const updatedTypedChars = typedChars + key;
    if (!completed) {
      setAccuracy(
        (
          (updatedOutgoingChars.length * 100) /
          updatedTypedChars.length
        ).toFixed(2)
      );
    }
    setTypedChars(updatedTypedChars);
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
          <div className={classes.infobox}>
            <h3 className={classes.typeinfo}>
              {wpm === 0 ? (
                <div>WPM: -- | ACC: {accuracy}%</div>
              ) : (
                <div>
                  WPM: {wpm} | ACC: {accuracy}%
                </div>
              )}
            </h3>
            <h4 className={classes.typeinfo}>Countdown: {counter}</h4>
            {!startTime ? (
            <h4 className={classes.description}>Timer will start when you begin typing.</h4>
          ) : (<div></div>)}
            <button className={classes.cancelButton} onClick={props.clicked}>
              <GiCancel />
            </button>
          </div>
        </div>
      ) : (
        <div className={classes.gameBox}>
          <h3 className={classes.typeinfo}>
            Finished. WPM of {wpm}. Accuracy of {accuracy}
          </h3>
          <button className={classes.finishButton} onClick={props.clicked}>
            <GrSave />
          </button>
        </div>
      )}
    </div>
  );
};

export default Type;
