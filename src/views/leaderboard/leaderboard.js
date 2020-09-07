import React, { useState, useEffect } from "react";
import Firebase from "firebase";
import classes from "./leaderboard.module.css";
import Zoom from "react-reveal/Zoom";
const Leaderboard = () => {
  const [board, setBoard] = useState(false);
  let userData = null;
  let ref = Firebase.database().ref("/");
  ref.on("value", (snapshot) => {
    userData = Object.values(snapshot.val()).sort((a, b) => b.wpm - a.wpm);
  });
useEffect(() => {
  setTimeout(() => {
    if (userData!==null) {
      setBoard(true);
    }
  }, 500);

}, [userData])
  return (
    <div className={classes.leadbox}>
      <div className={classes.leaderboardheader}>
        <p className={classes.title}>Leaderboard</p>
      </div>
      <Zoom cascade opposite when={board}>
        <div className={classes.leaderboardBox}>
          {board
            ? userData.map((el, key) => {
                return (
                  <ul className={classes.namebox} key={key}>
                    <li className={classes.name}>
                      {key + 1}. {el.name}
                    </li>
                    <li className={classes.wpm}>
                      {el.wpm} ({el.accuracy}%)
                    </li>
                    <li className={classes.accuracy}></li>
                  </ul>
                );
              })
            : null}
        </div>
      </Zoom>
    </div>
  );
};

export default Leaderboard;
