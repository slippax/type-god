import React, { useState } from "react";
import classes from "./titlemenu.module.css";
import { BiLogOut } from "react-icons/bi";
import { FaUserEdit } from "react-icons/fa";
import Fade from "react-reveal/Fade";
import Pulse from "react-reveal/Pulse";
import Typist from "react-typist";
import Type from "../../type/type";
import Leaderboard from "../leaderboard/leaderboard";
const Menu = (props) => {
  const [challenge, setChallenge] = useState(false);
  return (
    <div>
      
        <div className={classes.greetingbox}>
      <Typist>
        <span className={classes.greeting}>Hello {props.name}</span>
      </Typist>
      </div>
      <div className={classes.buttonbox}>
          <button className={classes.editbutton} onClick={props.editname}>
            <FaUserEdit /><div className={classes.buttontext}>Edit Name</div> 
          </button>
          <button className={classes.signoutbutton} onClick={props.signout}>
            <BiLogOut /><div className={classes.buttontext}>Sign-out</div>
          </button>
        </div>
        <Fade top>
      <div className={classes.boxwrapper}>
      
      {!challenge ? (
        
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
        
      ) : (
        <div></div>
      )}
      <Pulse spy={challenge}>
        {challenge ? <Type clicked={() => setChallenge(false)} /> : <div></div>}
      </Pulse>
      </div>
      
      <Leaderboard />
      </Fade>
    </div>
  );
};

export default Menu;
