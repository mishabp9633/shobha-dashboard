import React, { useEffect } from "react";
import classes from "./ToastMessage.module.css";

const ToastMessage = (props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      props.handleToast();
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [props.handleToast]);

  return (
    <div className={classes.toastMessage_card} style={{background: props.background}}>
      <img src={props.icon} alt="Icon" className={classes.toastMessage_icon} />
      {props.message}
    </div>
  );
};

export default ToastMessage;
