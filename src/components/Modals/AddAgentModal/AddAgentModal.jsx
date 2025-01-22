import React, { useState } from "react";
import classes from "./AddAgentModal.module.css";
import profile from "../../../assets/profilePic.png";
import removeIcon from "../../../assets/remove_icon.svg";
import ButtonLoading from "../../Loading/ButtonLoading";

const AddAgentModal = (props) => {
  const [details, setDetails] = useState({
    fullName: props.fullName || "",
    phoneNumber: props.phoneNumber || "",
    image: props.image || "",
  });
  const [selectedImage, setSelectedImage] = useState(props.image);

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImage(imageURL);
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Image = reader.result;
        setDetails({ ...details, image: base64Image });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    props.confirmClick(details);
  };

  const handleAgentCreateKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleConfirm(e);
    }
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    const numericValue = value.replace(/\D/g, "");
    const limitedValue = numericValue.slice(0, 10);
    setDetails({ ...details, phoneNumber: limitedValue });
  };

  return (
    <>
      <div className={classes.addAgentModal_main}>
        <div className={classes.addAgentModal_card}>
          <h1 className={classes.addAgentModal_heading}>{props.heading}</h1>
          <form
            action=""
            onKeyDown={handleAgentCreateKeyPress}
            className={classes.addAgentModal_form}
          >
            <label htmlFor="" className={classes.addAgentModal_label}>
              {props.firstInputLabel}
            </label>
            <input
              type="text"
              value={details.fullName}
              onChange={(e) =>
                setDetails({ ...details, fullName: e.target.value })
              }
              className={classes.addAgentModal_inputField}
              onKeyDown={handleAgentCreateKeyPress}
            />
            {props.role && (
              <>
                <label htmlFor="" className={classes.addAgentModal_label}>
                  Role
                </label>
                <div className={classes.addAgentModal_roleBox}>
                  {props.role}
                </div>
              </>
            )}
            {props.numberInputLabel && (
              <>
                <label htmlFor="" className={classes.addAgentModal_label}>
                  {props.numberInputLabel}
                </label>
                <div className={classes.addAgentModal_numberField_container}>
                  <span className={classes.addAgentModal_country_code}>
                    +91
                  </span>
                  <input
                    type="text"
                    value={details.phoneNumber}
                    onChange={handlePhoneNumberChange}
                    className={`${classes.addAgentModal_inputField} ${classes.addAgentModal_numberField}`}
                    onKeyDown={handleAgentCreateKeyPress}
                  />
                </div>
              </>
            )}
            {props.imagePickerLabel && (
              <>
                <label htmlFor="" className={classes.addAgentModal_label}>
                  {props.imagePickerLabel}
                </label>
                <div className={classes.addAgentModal_image_container}>
                  <img
                    src={selectedImage || profile}
                    alt="Profile"
                    className={classes.addAgentModal_profile_image}
                  />
                  {selectedImage && (
                    <img
                      src={removeIcon}
                      alt="Remove"
                      className={classes.addAgentModal_removeIcon}
                      onClick={() => {
                        setSelectedImage(null);
                        setDetails({ ...details, image: null });
                      }}
                    />
                  )}
                </div>
                <input
                  type="file"
                  accept="images/*"
                  onChange={handleImageSelect}
                  className={classes.addAgentModal_imagePicker}
                />
              </>
            )}
            <div className={classes.addAgentModal_bottom_section}>
              <button
                className={classes.addAgentModal_cancelButton}
                onClick={props.handleModal}
              >
                Cancel
              </button>
              <button
                className={classes.addAgentModal_addButton}
                onClick={handleConfirm}
              >
                {props.isLoading ? <ButtonLoading /> : props.confirmText}
              </button>
            </div>
          </form>
        </div>
        <div
          className={classes.addAgentModal_modal_closer}
          onClick={props.handleModal}
        ></div>
      </div>
    </>
  );
};

export default AddAgentModal;
