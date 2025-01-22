import React from "react";
import classes from "./NotificationModal.module.css";

const NotificationModal = (props) => {
  return (
    <div className={classes.notificationModal_main}>
      <div className={classes.notificationModal_card}>
        <div className={classes.notificationModal_heading_section}>
          <h1 className={classes.notificationModal_heading}>
            Custom Notification Sender
          </h1>
        </div>
        <textarea
          placeholder="Enter your custom notification to your users here"
          name=""
          id=""
          cols="35"
          rows="8"
          style={{ resize: "none" }}
          className={classes.notificationModal_inputField}
        ></textarea>
        <div className={classes.notificationModal_button_section}>
          <button className={classes.notificationModal_button}>Send</button>
        </div>
      </div>
      <div
        className={classes.notificationModal_modal_closer}
        onClick={props.handleCancel}
      ></div>
    </div>
  );
};

export default NotificationModal;
