import React from 'react'
import classes from "./AcceptButton.module.css"

const AcceptButton = (props) => {
  return (
    <div>
        <button className={classes.accept_button} onClick={props.onClick}>Accept</button>
    </div>
  )
}

export default AcceptButton