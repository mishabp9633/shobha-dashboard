import React from 'react'
import classes from "./ImageViewer.module.css"

const ImageViewer = (props) => {
  return (
    <div className={classes.imageViewer_main}>
           <span
            className={classes.imageViewer_closer}
            onClick={props.handleCancel}
          >
            &times;
          </span>
          <img
            src={props.image}
            alt="Item Image"
            className={classes.imageViewer_singleImage}
          />
    </div>
  )
}

export default ImageViewer