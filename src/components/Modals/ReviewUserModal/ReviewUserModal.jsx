import React, { useState } from "react";
import classes from "./ReviewUserModal.module.css";
import AcceptButton from "../../common-components/AcceptButton/AcceptButton";
import DeleteButton from "../../common-components/DeleteButton/DeleteButton";
import CircleAvatar from "../../common-components/CircleAvatar/CircleAvatar";
import ImageViewer from "../ImageViewer/ImageViewer";

const ReviewUserModal = (props) => {
  const [showSingleImage, setShowSingleImage] = useState(false);
  const [singleImageUrl, setSingleImageUrl] = useState("");

  const handleSingleImage = (imageUrl) => {
    setSingleImageUrl(imageUrl);
    setShowSingleImage(!showSingleImage);
  };
  return (
    <>
      <div className={classes.reviewUserModal_main}>
        <div className={classes.reviewUserModal_card}>
          <div className={classes.reviewUserModal_heading_section}>
            <h2 className={classes.reviewUserModal_heading}>
              {props.headingText}
            </h2>
            <AcceptButton onClick={props.acceptClick} />
            <DeleteButton onClick={props.deleteClick} />
          </div>
          <div className={classes.reviewUserModal_avatar_section}>
            <CircleAvatar width="5rem" height="5rem" image={props.image} />
            <div className={classes.reviewUserModal_about_section}>
              <h5 className={classes.reviewUserModal_nameText}>
                {props.personName}
              </h5>
              <p className={classes.reviewUserModal_numberText}>
                {props.phoneNumber}
              </p>
            </div>
          </div>
          <div className={classes.reviewUserModal_details_section}>
            <div className={classes.reviewUserModal_readOnly_section}>
              <label htmlFor="" className={classes.reviewUserModal_labelText}>
                Account type
              </label>
              <div className={classes.reviewUserModal_readOnly_container}>
                {props.accountType}
              </div>
              <label htmlFor="" className={classes.reviewUserModal_labelText}>
                Agent
              </label>
              <div className={classes.reviewUserModal_readOnly_container}>
                {props.agentName}
              </div>
              <label htmlFor="" className={classes.reviewUserModal_labelText}>
                Aadhaar number
              </label>
              <div className={classes.reviewUserModal_readOnly_container}>
                {props.adharNumber}
              </div>
            </div>

            <div className={classes.reviewUserModal_readOnly_section}>
              <label htmlFor="" className={classes.reviewUserModal_labelText}>
                Date of birth
              </label>
              <div className={classes.reviewUserModal_dates_container}>
                <div className={classes.reviewUserModal_date_container}>
                  <div className={classes.reviewUserModal_readOnly_container}>
                    {props.dateOfBirth[0]}
                  </div>
                  <label
                    htmlFor=""
                    className={classes.reviewUserModal_labelText}
                  >
                    Day
                  </label>
                </div>
                <div className={classes.reviewUserModal_date_container}>
                  <div className={classes.reviewUserModal_readOnly_container}>
                    {props.dateOfBirth[1]}
                  </div>
                  <label
                    htmlFor=""
                    className={classes.reviewUserModal_labelText}
                  >
                    Month
                  </label>
                </div>
                <div className={classes.reviewUserModal_date_container}>
                  <div className={classes.reviewUserModal_readOnly_container}>
                    {props.dateOfBirth[2]}
                  </div>
                  <label
                    htmlFor=""
                    className={classes.reviewUserModal_labelText}
                  >
                    Year
                  </label>
                </div>
              </div>
              <label htmlFor="" className={classes.reviewUserModal_labelText}>
                District
              </label>
              <div className={classes.reviewUserModal_readOnly_container}>
                {props.district}
              </div>
              <label htmlFor="" className={classes.reviewUserModal_labelText}>
                Pincode
              </label>
              <div
                className={`${classes.reviewUserModal_readOnly_container} ${classes.reviewUserModal_pincode_container}`}
              >
                {props.pincode}
              </div>
            </div>
          </div>

          <div className={classes.reviewUserModal_images_section}>
            <label htmlFor="" className={classes.reviewUserModal_labelText}>
              Images
            </label>
            <div className={classes.reviewUserModal_images_container}>
              {props.adharImage1 ? (
                <img
                  src={props.adharImage1}
                  alt=""
                  className={classes.reviewUserModal_image}
                  onClick={() => handleSingleImage(props.adharImage1)}
                />
              ) : (
                "No image Found"
              )}
              {props.adharImage2 && (
                <img
                  src={props.adharImage2}
                  alt=""
                  className={classes.reviewUserModal_image}
                  onClick={() => handleSingleImage(props.adharImage2)}
                />
              )}
            </div>
          </div>
        </div>
        <div
          className={classes.reviewUserModal_closer}
          onClick={props.handleCancel}
        ></div>
      </div>
      {showSingleImage && (
        <ImageViewer image={singleImageUrl} handleCancel={handleSingleImage} />
      )}
    </>
  );
};

export default ReviewUserModal;
