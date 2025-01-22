import React from "react";
import classes from "./RoundActionButton.module.css";
import updateIcon from "../../../assets/edit_pencil.svg";

const EditRound = (props) => {
  return (
    <div className={classes.deleteRound_card} onClick={props.onClick}>
      <img src={updateIcon} className={classes.deleteRound_icon} alt="delete" />
    </div>
  );
};

export default EditRound;
