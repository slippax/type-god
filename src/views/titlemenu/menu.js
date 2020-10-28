import React, { useState } from "react";
import classes from "./titlemenu.module.css";
import { FiLogOut, FiEdit, FiAward } from "react-icons/fi";
import LightSpeed from "react-reveal/Zoom";
import Flip from 'react-reveal/Slide';
import Typist from "react-typist";
import Type from "../../type/type";
import Leaderboard from "../leaderboard/leaderboard";
const Menu = (props) => {
  const [challenge, setChallenge] = useState(false);
  const [leaderboard, showLeaderboard] = useState(true);
  return (
<div className={classes.menuwrap}>
  <Flip top>
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
                  <FiEdit/>
                  <div className={classes.buttontext}>Edit Name</div>
                </button>
                <button
                  className={classes.leaderboardbutton}
                  onClick={() => showLeaderboard(!leaderboard)}
                >
                  <FiAward/>
                  <div className={classes.buttontext}>Toggle Leaderboard</div>
                </button>
                <button
                  className={classes.signoutbutton}
                  onClick={props.signout}
                >
                  <FiLogOut/>
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
                
                <p className={classes.challenge}
                onClick={() => alert('Practice mode is currently under construction')}>Practice</p>
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
      </Flip>
      </div>
  );
};

export default Menu;
