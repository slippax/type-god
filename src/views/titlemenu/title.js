import React from "react";
import classes from "./titlemenu.module.css";
import Pulse from "react-reveal/Zoom";
const Title = () => {
  return (
    <Pulse cascade>
      <div className={classes.titlebox}>
        <h3 className={classes.title}>TYPE KING</h3>
        <div className={classes.titleborder}></div>
      </div>
    </Pulse>
  );
};

export default Title;
