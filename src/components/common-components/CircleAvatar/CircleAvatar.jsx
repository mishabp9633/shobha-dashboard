import React from "react";
import classes from "./CircleAvatar.module.css";

const CircleAvatar = (props) => {
  return (
    <div>
      <div className={classes.circle_avatar} style={{width:`${props.width}`,height:`${props.height}`}}>
        <img
          src={props.image}
          alt="Profile"
        />
      </div>
    </div>
  );
};

export default CircleAvatar;
