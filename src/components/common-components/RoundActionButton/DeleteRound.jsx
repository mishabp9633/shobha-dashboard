import React from "react";
import classes from "./RoundActionButton.module.css";
import deleteIcon from "../../../assets/delete-gray.svg";

const DeleteRound = (props) => {
  return (
    <div className={classes.deleteRound_card} onClick={props.onClick}>
      <img
        src={deleteIcon}
        className={classes.deleteRound_icon}
        alt="delete"
      />
    </div>
  );
};

export default DeleteRound;
