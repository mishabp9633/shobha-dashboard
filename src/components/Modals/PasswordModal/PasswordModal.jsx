import React, { useState } from "react";
import classes from "./PasswordModal.module.css";

const PasswordModal = (props) => {
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    props.acceptClick(password);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className={classes.passwordModal_main}>
      <div className={classes.passwordModal_card}>
        {props.passwordHeading && (
          <>
            <h1 className={classes.passwordModal_heading}>
              {props.passwordHeading}
            </h1>
            <p className={classes.passwordModal_paragraph}>{props.message}</p>
          </>
        )}
        <label className={classes.passwordModal_warningText}>Password</label>
        <input
          className={classes.passwordModal_password}
          type="text"
          maxLength={10}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <div className={classes.passwordModal_button_container}>
          <button
            className={classes.passwordModal_cancelBtn}
            onClick={props.cancleClick}
          >
            {props.cancelText}
          </button>
          <button
            className={classes.passwordModal_acceptBtn}
            onClick={handleSubmit}
          >
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

export default PasswordModal;
