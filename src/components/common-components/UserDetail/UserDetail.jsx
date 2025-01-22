import React from "react";
import classes from "./UserDetail.module.css";
import CircleAvatar from "../CircleAvatar/CircleAvatar";

const UserDetail = (props) => {
  return (
    <div className={classes.userDetail_main}>
      <CircleAvatar width="3.1rem" height="3.1rem" image={props.image} />
      <div className={classes.userDetail_text_container}>
        <h2 className={classes.userDetail_agentName}>{props.name}</h2>
        <span className={classes.userDetail_agentNumber}>{props.number}</span>
      </div>
    </div>
  );
};

export default UserDetail;
