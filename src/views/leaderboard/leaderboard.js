import React, { useState } from "react";
import Firebase from "firebase";
import classes from "./leaderboard.module.css";
const Leaderboard = () => {
  const [completed, setCompleted] = useState(false);
  let listData = null;
  let ref = Firebase.database().ref("/");
  ref.on("value", (snapshot) => {
    const userData = snapshot.val();
    listData = Object.values(userData);
    console.log(listData);
  });

  return (
    <div className={classes.leaderboard}>
      <p>Leaderboard</p>
      <button onClick={() => setCompleted(true)}></button>
      {completed
        ? listData.map((el, key) => {
            return (
              <ul key={key}>
                <li>{el.name}</li>
                <li>{el.accuracy}</li>
                <li>{el.wpm}</li>
              </ul>
            );
          })
        : null}
    </div>
  );
};

export default Leaderboard;
