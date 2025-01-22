import React, { useState } from "react";
import classes from "./EditDeleteModal.module.css";
import pencil from "../../../assets/edit_pencil.svg";
import deleteIcon from "../../../assets/delete_red.svg";

const EditDeleteModal = (props) => {
  return (
    <>
      <div className={classes.addEditModal_card}>
        {props.editText && (
          <div className={classes.addEditModal_row} onClick={props.editClick}>
            <img
              src={pencil}
              alt="Pencil"
              className={classes.addEditModal_icon}
            />
            <span className={classes.addEditModal_text}>{props.editText}</span>
          </div>
        )}
        <div className={classes.addEditModal_row} onClick={props.deleteClick}>
          <img
            src={deleteIcon}
            alt="Trash"
            className={classes.addEditModal_icon}
          />
          <span className={classes.addEditModal_text}>Delete account</span>
        </div>
      </div>
      <div
        className={classes.addEditModal_closer}
        onClick={props.onClose}
      ></div>
    </>
  );
};

export default EditDeleteModal;
