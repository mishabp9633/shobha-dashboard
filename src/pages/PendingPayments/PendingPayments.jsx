import React, { useEffect, useState } from "react";
import classes from "./PendingPayaments.module.css";
import PageDetail from "../../components/common-components/PageDetail/PageDetail";
import SearchInput from "../../components/common-components/SearchInput/SearchInput";
import pendingPayments_image from "../../assets/pendingPayments.svg";
import logoIcon from "../../assets/logo-white.svg";
import UserDetail from "../../components/common-components/UserDetail/UserDetail";
import CircleAvatar from "../../components/common-components/CircleAvatar/CircleAvatar";
import AcceptButton from "../../components/common-components/AcceptButton/AcceptButton";
import DeleteButton from "../../components/common-components/DeleteButton/DeleteButton";
import ConfirmationModal from "../../components/Modals/ConfirmationModal/ConfirmationModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  pendingPaymentsApi,
  pendingPaymentsSingleApi,
  pendingpaymentsAcceptAllApi,
  pendingpaymentsConfirmationApi,
} from "../../Store/pendingPaymentSlice";
import profile from "../../assets/profileavatar.svg";
import orangeProfile from "../../assets/profileAvatar_orange.svg";

const PendingPayments = () => {
  const [deleteConfirmation, setDeleteConformation] = useState(false);
  const [acceptConfirmation, setAcceptConfirmation] = useState(false);
  const [agentId, setAgentId] = useState("");
  const [userId, setUserId] = useState("");
  const [activeCardIndex, setActiveCardIndex] = useState(null);
  const dispatch = useDispatch();
  const pendingPayments = useSelector(
    (state) => state.pendingPayments.pendingPayments
  );

  const pendingPaymentsSingle = useSelector(
    (state) => state.pendingPayments.pendingPaymentsSingle
  );

  const handleDeleteConformationModal = (id) => {
    setUserId(id);
    setDeleteConformation(!deleteConfirmation);
  };
  const handleAcceptConformationModal = () => {
    setAcceptConfirmation(!acceptConfirmation);
  };

  useEffect(() => {
    dispatch(pendingPaymentsApi());
  }, []);

  const pendingPayment = pendingPayments?.agentsInfoArray;

  const handlependingPayemtSingle = (id) => {
    setActiveCardIndex(id);
    setAgentId(id);
    dispatch(pendingPaymentsSingleApi(id));
  };

  const pendingPayementSingle = pendingPaymentsSingle?.schemePayments;

  const limitPersonName = (prersonName) => {
    const words = prersonName.split(" ");
    if (words.length > 2) {
      return words.slice(0, 3).join(" ") + " ...";
    }
    return prersonName;
  };

  const formatNumberWithCommas = (number) => {
    if (number === null || number === undefined) {
      return "";
    }
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const currentDate = new Date();

    if (
      date.getDate() === currentDate.getDate() &&
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear()
    ) {
      const result = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      const time = result.format(date);
      return `Today at ${time}`;
    } else {
      const month = date.toLocaleString("en-US", { month: "short" });
      const day = date.getDate();
      const year = date.getFullYear();
      const result = new Intl.DateTimeFormat("en-US", {
        timeStyle: "short",
      });
      const time = result.format(date);
      return `${day} ${month} ${year} at ${time}`;
    }
  }

  const handleAcceptConfirmation = (personId) => {
    dispatch(
      pendingpaymentsConfirmationApi({ status: "success", personId: personId })
    ).then((response) => {
      if (response.payload) {
        toast.success("Payment Accepted Successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        dispatch(pendingPaymentsSingleApi(agentId));
        dispatch(pendingPaymentsApi());
      }
    });
  };
  const handleDeleteConfirmation = () => {
    dispatch(
      pendingpaymentsConfirmationApi({ status: "failed", personId: userId })
    ).then((response) => {
      if (response.payload) {
        toast.success("Payment Deleted Successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        dispatch(pendingPaymentsSingleApi(agentId));
        handleDeleteConformationModal();
        dispatch(pendingPaymentsApi());
      }
    });
  };

  const handleAcceptAll = () => {
    dispatch(pendingpaymentsAcceptAllApi(agentId)).then((response) => {
      if (response.payload) {
        toast.success("AllPayment Accepted Successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        dispatch(pendingPaymentsApi());
        dispatch(pendingPaymentsSingleApi(agentId));
        handleAcceptConformationModal();
      }
    });
  };

  return (
    <>
      <div className={classes.pendingPayments_main}>
        <div className={classes.pendingPayments_first_section}>
          <PageDetail
            image={pendingPayments_image}
            heading="Pending Payments"
            count={pendingPayments?.total}
          />
          {pendingPayment && pendingPayment.length !== 0 && (
            <>
              <div className={classes.pendingPayments_search_section}>
                <SearchInput />
              </div>
              <div className={classes.pendingPayments_card_section}>
                {pendingPayment?.map((pendingPayment) => (
                  <div
                    key={pendingPayment?.agent?._id}
                    className={`${classes.pendingPayments_card} ${
                      activeCardIndex === pendingPayment?.agent?._id
                        ? classes.activeCard
                        : ""
                    }`}
                    onClick={() =>
                      handlependingPayemtSingle(pendingPayment?.agent?._id)
                    }
                  >
                    <UserDetail
                      image={
                        pendingPayment?.agent?.profilePhoto?.url
                          ? pendingPayment?.agent?.profilePhoto?.url
                          : orangeProfile
                      }
                      name={limitPersonName(pendingPayment?.agent?.name)}
                      number={pendingPayment?.agent?.phone}
                    />
                    <p className={classes.pendingPayments_count}>
                      {pendingPayment?.transactionCount}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        {pendingPayment && pendingPayment.length !== 0 ? (
          <div className={classes.pendingPayments_second_section}>
            {!pendingPayementSingle || pendingPayementSingle.length === 0 ? (
              <div className={classes.pendingPayments_blankMessage_container}>
                <img
                  src={logoIcon}
                  alt="Image"
                  className={classes.pendingPayments_blankMessage_image}
                />
                <p className={classes.pendingPayments_blankMessage_para}>
                  Click on an Agent to Display Pending Payments.
                </p>
              </div>
            ) : (
              <>
                {pendingPayementSingle &&
                  Array.isArray(pendingPayementSingle) &&
                  pendingPayementSingle.length > 0 && (
                    <div
                      className={classes.pendingPayments_totalAmountContainer}
                    >
                      <p className={classes.pendingPayments_totalAmount_text}>
                        Total Amount
                      </p>
                      <h2 className={classes.pendingPayments_totalAmount}>
                        ₹{" "}
                        {formatNumberWithCommas(
                          pendingPaymentsSingle?.totalPendingAmount
                        )}
                      </h2>
                      <button
                        className={classes.acceptAll_btn}
                        onClick={handleAcceptConformationModal}
                      >
                        Accept All
                      </button>
                    </div>
                  )}

                <div className={classes.pendingPayments_pendingCard_container}>
                  {pendingPayementSingle?.map((item, key) => (
                    <div
                      key={key}
                      className={classes.pendingPayments_pendingCard}
                    >
                      <div
                        className={
                          classes.pendingPayments_pendingCard_firstSection
                        }
                      >
                        <CircleAvatar
                          width="3.7rem"
                          height="3.7rem"
                          image={
                            item?.user?.profilePhoto?.url
                              ? item?.user?.profilePhoto?.url
                              : profile
                          }
                        />
                        <div
                          className={
                            classes.pendingPayments_pendingCard_text_container
                          }
                        >
                          <h5
                            className={
                              classes.pendingPayments_pendingCard_nameText
                            }
                          >
                            {limitPersonName(item?.user?.name)}
                          </h5>
                          <p
                            className={
                              classes.pendingPayments_pendingCard_timeText
                            }
                          >
                            {formatDate(item?.payDate)}
                          </p>
                        </div>
                      </div>
                      <div
                        className={
                          classes.pendingPayments_pendingCard_secondSection
                        }
                      >
                        <label
                          htmlFor=""
                          className={
                            classes.pendingPayments_pendingCard_amount_text
                          }
                        >
                          Amount
                        </label>
                        <span
                          className={classes.pendingPayments_pendingCard_amount}
                        >
                          ₹{formatNumberWithCommas(item?.payAmount)}
                        </span>
                      </div>
                      <div
                        className={
                          classes.pendingPayments_pendingCard_thirdSection
                        }
                      >
                        <AcceptButton
                          onClick={() => handleAcceptConfirmation(item?._id)}
                        />
                        <DeleteButton
                          onClick={() =>
                            handleDeleteConformationModal(item?._id)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className={classes.noPendingPayment_container}>
            <p className={classes.noPendingPayment_text}>No Pending Payments</p>
          </div>
        )}
        <ToastContainer />
      </div>
      {acceptConfirmation && (
        <ConfirmationModal
          heading="Accepting All Payments"
          paragraph="Are you sure you want to accept all the payments?"
          cancelText="Cancel"
          acceptText="Accept"
          cancleClick={handleAcceptConformationModal}
          acceptClick={handleAcceptAll}
        />
      )}
      {deleteConfirmation && (
        <ConfirmationModal
          heading="Delete this payment"
          paragraph="Are you sure you want to delete this payment?"
          cancelText="Cancel"
          acceptText="Delete"
          cancleClick={handleDeleteConformationModal}
          acceptClick={handleDeleteConfirmation}
        />
      )}
    </>
  );
};

export default PendingPayments;
