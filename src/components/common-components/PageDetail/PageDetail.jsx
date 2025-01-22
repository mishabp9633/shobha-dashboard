import React from "react";
import classes from "./PageDetail.module.css";

const PageDetail = (props) => {
  return (
    <div className={classes.pageDetail_main}>
      <div className={classes.pageIcon_container}>
        <img src={props.image} alt="Icon" />
      </div>
      <h1 className={classes.pageDetail_headingText}>
        {props.heading} <span>({props.count})</span>
      </h1>
    </div>
  );
};

export default PageDetail;
