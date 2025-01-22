import React from 'react'
import classes from "./ExportToSheet.module.css"
import icon from "../../../assets/border_all.svg"

const ExportToSheet = (props) => {
  return (
    <div className={classes.exportToSheet_button} onClick={props.onclick}>
        <img src={icon} alt="Icon" className={classes.exportToSheet_icon}/>
        Export to Sheet
    </div>
  )
}

export default ExportToSheet