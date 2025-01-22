import React from "react";
import classes from "./AddButton.module.css";

const AddButton = (props) => {
  return (
    <div>
      <button className={classes.add_button} onClick={props.onClick}>
        <span>+</span> {props.text}
      </button>
    </div>
  );
};

export default AddButton;
