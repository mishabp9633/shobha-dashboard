import React, { useEffect } from "react";
import classes from "./JoinRequests.module.css";
import PageDetail from "../../components/common-components/PageDetail/PageDetail";
import pendingPayments from "../../assets/joinRequests.svg";
import CircleAvatar from "../../components/common-components/CircleAvatar/CircleAvatar";
import AcceptButton from "../../components/common-components/AcceptButton/AcceptButton";
import DeleteButton from "../../components/common-components/DeleteButton/DeleteButton";
import ViewButton from "../../components/common-components/ViewButton/ViewButton";
import { useState } from "react";
import ReviewUserModal from "../../components/Modals/ReviewUserModal/ReviewUserModal";
import ConfirmationModal from "../../components/Modals/ConfirmationModal/ConfirmationModal";
import { useDispatch, useSelector } from "react-redux";
import { joinRequestsApi } from "../../Store/joinRequestSlice";
import profile from "../../assets/profileavatar.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  jointRequestsConfirmApi,
  jointSigleViewApi,
} from "../../Store/dashboardSlice";

const JoinRequest = () => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [acceptConfirmation, setAcceptConfirmation] = useState(false);
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();
  const joinRequests = useSelector((state) => state.joinRequest.joinRequests);
  const singleView = useSelector((state) => state.dashboard.singleView);
  const handleReviewModal = () => {
    setShowReviewModal(!showReviewModal);
  };
  const handleDeleteConfirmation = (id) => {
    console.log(id);
    setUserId(id);
    setDeleteConfirmation(!deleteConfirmation);
  };
  const handleAcceptConfirmation = (id) => {
    setUserId(id);
    setAcceptConfirmation(!acceptConfirmation);
  };

  useEffect(() => {
    dispatch(joinRequestsApi());
  }, []);

  const joinRequest = joinRequests?.Schemes;

  const handleAcceptAgent = () => {
    dispatch(jointRequestsConfirmApi({ status: "approved", id: userId })).then(
      (response) => {
        if (response.payload) {
          toast.success("User Scheme Approved", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          dispatch(joinRequestsApi());
          setAcceptConfirmation(false);
          setShowReviewModal(false);
        }
      }
    );
  };

  const handleDeleteAgent = () => {
    dispatch(jointRequestsConfirmApi({ status: "failed", id: userId })).then(
      (response) => {
        if (response.payload) {
          toast.success("User Scheme Deleted", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          dispatch(joinRequestsApi());
          handleDeleteConfirmation();
          setShowReviewModal(false);
        }
      }
    );
  };

  const handleSingleView = (id) => {
    setUserId(id);
    dispatch(jointSigleViewApi(id)).then((response) => {
      if (response.payload) {
        handleReviewModal();
      }
    });
  };

  const limitPersonName = (prersonName) => {
    const words = prersonName.split(" ");
    if (words.length > 3) {
      return words.slice(0, 3).join(" ") + " ...";
    }
    return prersonName;
  };

  // Formatted DateOfBirth
  const dateOfBirth = singleView?.user?.dateOfBirth;
  const dateArray = dateOfBirth
    ? dateOfBirth.split("-").map((part) => part.trim())
    : [];

  return (
    <>
      <div className={classes.jointRequests_main}>
        <PageDetail
          image={pendingPayments}
          heading="Join Requests"
          count={joinRequests?.total}
        />
        {joinRequests?.total !== 0 ? (
          <div className={classes.jointRequests_card_container}>
            {joinRequest?.map((joinRequest) => (
              <div
                key={joinRequest?._id}
                className={classes.jointRequests_card}
              >
                <div className={classes.jointRequests_card_firstSection}>
                  <CircleAvatar
                    width="3.7rem"
                    height="3.7rem"
                    image={
                      joinRequest?.user?.profilePhoto?.url
                        ? joinRequest?.user?.profilePhoto?.url
                        : profile
                    }
                  />
                  <div className={classes.jointRequests_card_text_container}>
                    <h5 className={classes.jointRequests_card_nameText}>
                      {limitPersonName(joinRequest?.user?.name)}
                    </h5>
                    <p className={classes.jointRequests_card_timeText}>
                      {joinRequest?.user?.phone}
                    </p>
                  </div>
                </div>
                <div className={classes.jointRequests_card_secondSection}>
                  <label
                    htmlFor=""
                    className={classes.jointRequests_card_amount_text}
                  >
                    Payment mode
                  </label>
                  <span className={classes.jointRequests_card_amount}>
                    {joinRequest?.IsAgent ? "Via Agent" : "Online"}
                  </span>
                </div>
                <div className={classes.jointRequests_card_thirdSection}>
                  <AcceptButton
                    onClick={() => handleAcceptConfirmation(joinRequest?._id)}
                  />
                  <DeleteButton
                    onClick={() => handleDeleteConfirmation(joinRequest?._id)}
                  />
                  <ViewButton
                    onClick={() => handleSingleView(joinRequest?._id)}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={classes.noJoinRequest_txt_container}>
            No Join Requests
          </div>
        )}
        <ToastContainer />
      </div>
      {showReviewModal && (
        <ReviewUserModal
          acceptClick={handleAcceptAgent}
          deleteClick={() => handleDeleteConfirmation(userId)}
          handleCancel={handleReviewModal}
          headingText="Review user account"
          image={
            singleView?.user?.profilePhoto?.url
              ? singleView?.user?.profilePhoto?.url
              : profile
          }
          personName={singleView?.user?.name}
          phoneNumber={singleView?.user?.phone}
          accountType={singleView?.IsAgent ? "Via Agent" : "Online"}
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
          paragraph="Are you sure you want to accept this request?"
          cancelText="Cancel"
          acceptText="Accept"
          cancleClick={handleAcceptConfirmation}
          acceptClick={handleAcceptAgent}
        />
      )}
      {deleteConfirmation && (
        <ConfirmationModal
          heading="Delete this join request"
          paragraph="Are you sure you want to delete this request?"
          cancelText="Cancel"
          acceptText="Delete"
          cancleClick={handleDeleteConfirmation}
          acceptClick={handleDeleteAgent}
        />
      )}
    </>
  );
};

export default JoinRequest;
