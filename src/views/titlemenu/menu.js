import React, { useState } from "react";
import classes from "./titlemenu.module.css";
import { BiLogOut } from "react-icons/bi";
import { FaUserEdit } from "react-icons/fa";
import { GrAchievement } from "react-icons/gr";
import LightSpeed from "react-reveal/Zoom";
import Typist from "react-typist";
import Type from "../../type/type";
import Leaderboard from "../leaderboard/leaderboard";
const Menu = (props) => {
  const [challenge, setChallenge] = useState(false);
  const [leaderboard, showLeaderboard] = useState(true);
  return (
    <LightSpeed>
      <LightSpeed opposite when={!challenge}>
        {!challenge ? (
          <div>
            <div className={classes.userbox}>
              <div className={classes.greetingbox}>
                <Typist>
                  <span className={classes.greeting}>Hello <span id='name'>{props.name}</span></span>
                </Typist>
              </div>
              <div className={classes.buttonbox}>
                <button className={classes.editbutton} onClick={props.editname}>
                  <FaUserEdit />
                  <div className={classes.buttontext}>Edit Name</div>
                </button>
                <button
                  className={classes.leaderboardbutton}
                  onClick={() => showLeaderboard(!leaderboard)}
                >
                  <GrAchievement />
                  <div className={classes.buttontext}>Toggle Leaderboard</div>
                </button>
                <button
                  className={classes.signoutbutton}
                  onClick={props.signout}
                >
                  <BiLogOut />
                  <div className={classes.buttontext}>Sign-out</div>
                </button>
              </div>
            </div>
            <div className={classes.boxwrapper}>
              <p className={classes.choosing}>Challenge or Practice?</p>

              <div className={classes.chooseborder}></div>
              <div className={classes.actions}>
                <p
                  onClick={() => setChallenge(!challenge)}
                  className={classes.practice}
                >
                  Challenge
                </p>
                <p className={classes.challenge}>Practice</p>
              </div>
            </div>
            <LightSpeed opposite when={leaderboard}>
              {leaderboard ? (
                <Leaderboard clicked={props.clicked} />
              ) : (
                <div></div>
              )}
            </LightSpeed>
          </div>
        ) : (
          <div></div>
        )}
      </LightSpeed>
      <LightSpeed opposite when={challenge}>
        {challenge ? <Type clicked={() => setChallenge(false)} /> : <div></div>}
      </LightSpeed>
    </LightSpeed>
  );
};

export default Menu;
