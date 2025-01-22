import React, { useEffect, useState } from "react";
import classes from "./customer.module.css";
import AcceptButton from "../common-components/AcceptButton/AcceptButton";
import DeleteButton from "../common-components/DeleteButton/DeleteButton";
import UserDetail from "../common-components/UserDetail/UserDetail";
import { useDispatch, useSelector } from "react-redux";
import {
  jointRequestsApi,
  jointRequestsConfirmApi,
  jointSigleViewApi,
} from "../../Store/dashboardSlice";
import ViewButton from "../common-components/ViewButton/ViewButton";
import ReviewUserModal from "../Modals/ReviewUserModal/ReviewUserModal";
import ConfirmationModal from "../Modals/ConfirmationModal/ConfirmationModal";
import profile from "../../assets/profileavatar.svg";
import { useNavigate } from "react-router-dom";

const Customer = () => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [acceptConfirmation, setAcceptConfirmation] = useState(false);
  const [personId, setPersonId] = useState("");
  const dispatch = useDispatch();
  const jointRequests = useSelector((state) => state.dashboard.jointRequests);
  const singleView = useSelector((state) => state.dashboard.singleView);
  const navigate = useNavigate();

  const handleReviewModal = () => {
    setShowReviewModal(!showReviewModal);
  };

  const handleAcceptConfirmation = (id) => {
    setPersonId(id);
    setAcceptConfirmation(!acceptConfirmation);
  };

  const handleDeleteConfirmation = (id) => {
    setPersonId(id);
    setDeleteConfirmation(!deleteConfirmation);
  };

  useEffect(() => {
    dispatch(jointRequestsApi());
  }, []);

  const handleAccept = (id) => {
    dispatch(jointRequestsConfirmApi({ status: "approved", id }))
      .then(() => {
        dispatch(jointRequestsApi());
        handleAcceptConfirmation();
      })
      .catch((error) => {
        console.error("Error updating Join Request", error);
      });
  };
  const handleDelete = (id) => {
    dispatch(jointRequestsConfirmApi({ status: "failed", id }))
      .then(() => {
        dispatch(jointRequestsApi());
        handleDeleteConfirmation();
        setShowReviewModal(false);
      })
      .catch((error) => {
        console.error("Error updating Join Request", error);
      });
  };

  const handleRequestAccept = (id) => {
    dispatch(jointRequestsConfirmApi({ status: "approved", id })).then(() => {
      dispatch(jointRequestsApi());
      handleReviewModal();
    });
  };

  const handleSigleView = (id) => {
    dispatch(jointSigleViewApi(id));
    handleReviewModal();
  };

  const dateOfBirth = singleView?.user?.dateOfBirth;
  const dateArray = dateOfBirth
    ? dateOfBirth.split("-").map((part) => part.trim())
    : [];

  const limitPersonName = (prersonName) => {
    const words = prersonName.split(" ");
    if (words.length > 2) {
      return words.slice(0, 2).join(" ") + " ...";
    }
    return prersonName;
  };

  return (
    <>
      <div className={classes.customer_container}>
        <h2 className={classes.customer_title}>Join Requests</h2>
        {jointRequests.length !== 0 ? (
          <>
            {jointRequests?.map((jointRequest, key) => (
              <div key={key} className={classes.custdetails}>
                <UserDetail
                  image={
                    jointRequest?.user?.profilePhoto?.url
                      ? jointRequest?.user?.profilePhoto?.url
                      : profile
                  }
                  name={limitPersonName(jointRequest?.user?.name)}
                  number={jointRequest?.user?.phone}
                />
                <div className={classes.vertical_line}></div>
                <div className={classes.payment}>
                  <p>Payment mode</p>
                  <h5>
                    {jointRequest?.IsAgent === true ? "Via Agent" : "Online"}
                  </h5>
                </div>
                <div className={classes.vertical_line}></div>
                <div className={classes.button_section}>
                  <AcceptButton
                    onClick={() => handleAcceptConfirmation(jointRequest?._id)}
                  />
                  <DeleteButton
                    onClick={() => handleDeleteConfirmation(jointRequest?._id)}
                  />
                  <ViewButton
                    onClick={() => handleSigleView(jointRequest?._id)}
                  />
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className={classes.noJoinRequest_txt_container}>
            No Join Requests
          </div>
        )}

        <span
          className={classes.viewMore_text}
          onClick={() => navigate("/joinRequests")}
        >
          View more
        </span>
      </div>
      {showReviewModal && (
        <ReviewUserModal
          acceptClick={() => handleRequestAccept(singleView?._id)}
          deleteClick={() => handleDeleteConfirmation(singleView?._id)}
          handleCancel={handleReviewModal}
          headingText="Review user account"
          image={
            singleView?.user?.profilePhoto?.url
              ? singleView?.user?.profilePhoto?.url
              : profile
          }
          personName={singleView?.user?.name}
          phoneNumber={singleView?.user?.phone}
          accountType={singleView?.IsAgent === true ? "Via Agent" : "Online"}
          agentName={singleView?.agent?.name}
          adharNumber={singleView?.aadhaarNo}
          dateOfBirth={dateArray}
          district={singleView?.address?.district}
          pincode={singleView?.address?.pinCode}
          adharImage1={singleView?.identityImage?.[0]?.url}
          adharImage2={singleView?.identityImage?.[1]?.url}
        />
      )}
      {acceptConfirmation && (
        <ConfirmationModal
          heading="Accept this join request"
          paragraph="Are you sure you want to Accept this request?"
          cancelText="Cancel"
          acceptText="Accept"
          cancleClick={handleAcceptConfirmation}
          acceptClick={() => handleAccept(personId)}
        />
      )}
      {deleteConfirmation && (
        <ConfirmationModal
          heading="Delete this join request"
          paragraph="Are you sure you want to delete this request?"
          cancelText="Cancel"
          acceptText="Delete"
          cancleClick={handleDeleteConfirmation}
          acceptClick={() => handleDelete(personId)}
        />
      )}
    </>
  );
};

export default Customer;
