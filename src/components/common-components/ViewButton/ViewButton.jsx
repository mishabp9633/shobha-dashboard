import React from "react";
import classes from "./ViewButton.module.css";

const ViewButton = (props) => {
  return (
    <div>
      <button className={classes.view_button} onClick={props.onClick}>
      View
      </button>
    </div>
  );
};

export default ViewButton;
