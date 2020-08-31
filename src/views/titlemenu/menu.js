import React from "react";
import classes from "./titlemenu.module.css";
import { BiLogOut } from "react-icons/bi";
import Fade from "react-reveal/Slide";
import Typist from "react-typist";
const Menu = (props) => {
  return (
    <div>
      <Fade bottom>
        <button className={classes.button} onClick={props.signout}>
          <BiLogOut />
        </button>
        <Typist>
          <Typist.Delay ms={200} />
          <p className={classes.greeting}>Hello {props.name}</p>
        </Typist>
        <p className={classes.choosing}>Practice or challenge?</p>

        <div className={classes.chooseborder}></div>
        <div className={classes.actions}>
          <p className={classes.practice}>Practice</p>
          <p className={classes.challenge}>Challenge</p>
        </div>
      </Fade>
    </div>
  );
};

export default Menu;
