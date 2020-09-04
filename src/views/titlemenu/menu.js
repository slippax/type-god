import React, { useState } from "react";
import classes from "./titlemenu.module.css";
import { BiLogOut } from "react-icons/bi";
import { FaUserEdit } from 'react-icons/fa';
import Fade from "react-reveal/Fade";
import Pulse from "react-reveal/Pulse";
import Typist from "react-typist";
import Type from "../../type/type";
import Leaderboard from "../leaderboard/leaderboard";
const Menu = (props) => {
  const [challenge, setChallenge] = useState(false);
  return (
    <div>
      <button className={classes.signoutbutton} onClick={props.signout}>
        <BiLogOut />
      </button>
      <Typist>
        <p className={classes.greeting}>Hello {props.name}</p>
      </Typist>
      <Fade top>
      <div className={classes.editbuttonbox}>
      <button className={classes.editbutton} onClick={props.editname}><FaUserEdit/></button>
      </div>
      </Fade>
      {!challenge ? (
        <Fade top>
          <div>
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
        </Fade>
      ) : (
        <div></div>
      )}
      <Pulse spy={challenge}>
        {challenge ? <Type clicked={() => setChallenge(false)} /> : <div></div>}
      </Pulse>
      <Leaderboard />
    </div>
  );
};

export default Menu;
