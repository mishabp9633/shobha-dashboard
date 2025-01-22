import React from "react";
import classes from "./ConfirmationModal.module.css";
import ButtonLoading from "../../Loading/ButtonLoading";

const ConfirmationModal = (props) => {
  return (
    <div className={classes.confirmationModal_main}>
      <div className={classes.confirmationModal_card}>
        <h1 className={classes.confirmationModal_heading}>{props.heading}</h1>
        <p className={classes.confirmationModal_paragraph}>{props.paragraph}</p>
        <span className={classes.confirmationModal_warningText}>
          {props.warningText}
        </span>
        <div className={classes.confirmationModal_button_container}>
          <button
            className={classes.confirmationModal_cancelBtn}
            onClick={props.cancleClick}
          >
            {props.cancelText}
          </button>
          <button
            onClick={props.acceptClick}
            className={classes.confirmationModal_acceptBtn}
          >
            {props.isLoading ? <ButtonLoading /> : props.acceptText}
          </button>
        </div>
      </div>
      <div
        className={classes.confirmationModal_closer}
        onClick={props.cancleClick}
      ></div>
    </div>
  );
};

export default ConfirmationModal;
