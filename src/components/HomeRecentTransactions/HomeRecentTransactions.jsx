import React, { useEffect } from "react";
import classes from "./homerecenttransactions.module.css";
import { useDispatch, useSelector } from "react-redux";
import { recentTransactionsApi } from "../../Store/dashboardSlice";
import UserDetail from "../common-components/UserDetail/UserDetail";
import profile from "../../assets/profileavatar.svg";
import { useNavigate } from "react-router-dom";

const HomeRecentTransactions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const recentTransactions = useSelector(
    (state) => state.dashboard.recentTransactions
  );
  useEffect(() => {
    dispatch(recentTransactionsApi());
  }, []);

  const transactions = recentTransactions?.schemePayments;

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

  const limitPersonName = (personName) => {
    if (!personName) {
      return ""; 
    }
  
    const words = personName.split(" ");
    if (words.length > 3) {
      return words.slice(0, 3).join(" ") + " ...";
    }
    return personName;
  };

  const formatNumberWithCommas = (number) => {
    if (number === null || number === undefined) {
      return "";
    }
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className={classes.customer_container}>
      <h2 className={classes.customer_title}>Recent Transactions</h2>
      {transactions?.map((transaction, key) => (
        <div key={key} className={classes.custdetails}>
          <UserDetail
            image={
              transaction?.user?.profilePhoto?.url
                ? transaction?.user?.profilePhoto?.url
                : profile
            }
            name={limitPersonName(transaction?.user?.name)}
            number={formatDate(transaction?.payDate)}
          />
          <div className={classes.amount_section}>
            <p
              className={
                transaction?.status === "success"
                  ? classes.amount
                  : classes.isFailed
              }
            >
              ₹{formatNumberWithCommas(transaction?.payAmount)}
            </p>
            {transaction?.status === "failed" && (
              <span className={classes.failedText}>Failed</span>
            )}
          </div>
        </div>
      ))}
      <span
        className={classes.viewMore_text}
        onClick={() => navigate("/transactions")}
      >
        View more
      </span>
    </div>
  );
};

export default HomeRecentTransactions;
