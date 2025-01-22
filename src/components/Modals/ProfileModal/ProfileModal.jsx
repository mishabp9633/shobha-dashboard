import React, { useState } from "react";
import removeIcon from "../../../assets/remove_icon.svg";

import classes from "./ProfileModal.module.css";

const ProfileModal = (props) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImage(imageURL);
    }
  };
  return (
    <div className={classes.profileModal_main}>
      <div className={classes.profileModal_card}>
        <div className={classes.profileModal_heading_section}>
          <h1 className={classes.profileModal_heading}>Edit Profile info</h1>
        </div>
        <form action="" className={classes.profileModal_form}>
          <label htmlFor="" className={classes.profileModal_label}>
            Profile picture
          </label>
          <div className={classes.profileModal_image_container}>
            <img
              src={selectedImage}
              alt="Profile"
              className={classes.profileModal_profile_image}
            />
            {selectedImage && (
              <img
                src={removeIcon}
                alt="Remove"
                className={classes.profileModal_removeIcon}
                onClick={() => setSelectedImage(null)}
              />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className={classes.profileModal_imagePicker}
          />
          <label htmlFor="" className={classes.profileModal_label}>
            Full name
          </label>
          <input type="text" className={classes.profileModal_inputField} />
          <div className={classes.profileModal_button_section}>
            <button className={classes.profileModal_button}>Save</button>
          </div>
        </form>
      </div>
      <div
        className={classes.profileModal_modal_closer}
        onClick={props.handleCancel}
      ></div>
    </div>
  );
};

export default ProfileModal;
