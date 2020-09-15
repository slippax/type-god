import React, { useState } from "react";
import Firebase from "firebase";
import classes from "./leaderboard.module.css";
import Zoom from "react-reveal/Zoom";

const Leaderboard = () => {
  const [board, setBoard] = useState(false);
  let userData = null;

  function getLeaderboard() {
    return new Promise((resolve, reject) => {
      let ref = Firebase.database().ref("/");
      if (ref !== null) {
        ref.on("value", (snapshot) => {
          userData = Object.values(snapshot.val()).sort(
            (a, b) => b.wpm - a.wpm
          );
          resolve("leaderboard fetched");
        });
      } else {
        reject("leaderboard not fetched");
      }
    })
      .then(() => {
        setBoard(true);
      })
      .catch((value) => {
        console.log(value);
      });
  }

  getLeaderboard();

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
