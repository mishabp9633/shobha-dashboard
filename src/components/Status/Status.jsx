import React from 'react'
import classes from './status.module.css';

const StatusCard = (props) => {
  return (
    <div className={classes.status}>
      <div className={classes.textcontainer}>
        <span className={classes.text}>{props.cardText}</span>
        <p className={classes.count}>{props.cardNumber}</p>
      </div>
      <div className={classes.imgcontainer}>
        <img src={props.cardImage} className={classes.img} alt="user" />
      </div>
    </div>
  )
}

export default StatusCard
