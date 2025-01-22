import React from "react";
import classes from "./AddCashModal.module.css";

const AddCashModal = (props) => {
  return (
    <div className={classes.passwordModal_main}>
      <div className={classes.passwordModal_card}>
        <h1 className={classes.passwordModal_heading}>Add Cash</h1>
        <label className={classes.passwordModal_warningText}>Amount</label>
        <div className={classes.addAgentModal_numberField_container}>
          <span className={classes.addAgentModal_country_code}>&#8377;</span>
          <input
            type="number"
            className={`${classes.addAgentModal_inputField} ${classes.addAgentModal_numberField}`}
          />
        </div>
        <div className={classes.toggle}>
                <p className={classes.userEditModal_label_edit}>
                I'm aware of adding cash to this account
                </p>
                <label className={classes.switch}>
                  <input
                    type="checkbox"
                    // onChange={handleToggle}
                    // checked={isToggled}
                  />
                  <span className={`${classes.slider} ${classes.round}`}></span>
                </label>
              </div>
        <div className={classes.passwordModal_button_container}>
          <button
            className={classes.passwordModal_cancelBtn}
            onClick={props.cancleClick}
          >
            {props.cancelText}
          </button>
          <button className={classes.passwordModal_acceptBtn}>
            {props.acceptText}
          </button>
        </div>
      </div>
      <div
        className={classes.passwordModal_closer}
        onClick={props.cancleClick}
      ></div>
    </div>
  );
};

export default AddCashModal;
