import React from "react";
import classes from "./titlemenu.module.css";
import Fade from "react-reveal/Fade";
const Title = () => {
  return (
    <Fade top>
      <div className={classes.titlebox}>
        <h1 className={classes.title}>TYPE GOD</h1>
        <div className={classes.titleborder}></div>
      </div>
    </Fade>
  );
};

export default Title;
