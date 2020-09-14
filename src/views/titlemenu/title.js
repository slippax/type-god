import React from "react";
import classes from "./titlemenu.module.css";
import Pulse from "react-reveal/Pulse";
const Title = () => {
  return (
    <Pulse>
      <div className={classes.titlebox}>
        <h1 className={classes.title}>TYPE KING</h1>
        <div className={classes.titleborder}></div>
      </div>
    </Pulse>
  );
};

export default Title;
