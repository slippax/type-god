import React, { useState } from "react";
import Firebase from "firebase";
import classes from "./leaderboard.module.css";
import { CgCrown } from "react-icons/cg";
const Leaderboard = () => {
  const [board, setBoard] = useState(false);
  let userData = null;
  let ref = Firebase.database().ref("/");
  ref.on("value", (snapshot) => {
    userData = Object.values(snapshot.val()).sort((a, b) => b.wpm - a.wpm);
  });

  return (
    <div>
      <div className={classes.leaderboardheader}>
        <p>Leaderboard</p>
        <button className={classes.leadButton} onClick={() => setBoard(!board)}>
          <CgCrown />
        </button>
      </div>
      <div className={classes.leaderboardBox}>
        {board
          ? userData.map((el, key) => {
              return (
                <ul className={classes.namebox} key={key}>
                  <li className={classes.name}>{key+1}. {el.name}</li>
                  <li className={classes.wpm}>{el.wpm} ({el.accuracy}%)</li>
                  <li className={classes.accuracy}></li>
                </ul>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Leaderboard;
