import React from "react";
import classes from "./DeleteButton.module.css";

const DeleteButton = (props) => {
  return (
    <div>
      <button className={classes.delete_button} onClick={props.onClick}>Delete</button>
    </div>
  );
};

export default DeleteButton;
