import React, { useState } from "react";
import classes from "./titlemenu.module.css";
import { BiLogOut } from "react-icons/bi";
import Fade from "react-reveal/Fade";
import Pulse from "react-reveal/Pulse";
import Typist from "react-typist";
import Type from "../../type/type";
const Menu = (props) => {
  const [practice, setPractice] = useState(false);
  return (
    <div>
        <button className={classes.button} onClick={props.signout}>
          <BiLogOut />
        </button>
        <Typist>
          <p className={classes.greeting}>Hello {props.name}</p>
          </Typist>
        {!practice ? (
          <Fade top>
          <div>
            
            <p className={classes.choosing}>Practice or challenge?</p>

            <div className={classes.chooseborder}></div>
            <div className={classes.actions}>
              <p
                onClick={() => setPractice(!practice)}
                className={classes.practice}
              >
                Practice
              </p>
              <p className={classes.challenge}>Challenge</p>
              
            </div>
            
          </div>
          </Fade>
        ) : (
          <div></div>
        )}

        <Pulse spy={practice}>{practice ? <Type /> : <div></div>}</Pulse>
    </div>
  );
};

export default Menu;
