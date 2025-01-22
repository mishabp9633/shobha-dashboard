import React, { useEffect } from "react";
import classes from "./Transactions.module.css";
import PageDetail from "../../components/common-components/PageDetail/PageDetail";
import icon from "../../assets/transactions.svg";
import CustomSelector from "../../components/common-components/CustomSelector/CustomSelector";
import ExportToSheet from "../../components/common-components/ExportToSheet/ExportToSheet";
import CircleAvatar from "../../components/common-components/CircleAvatar/CircleAvatar";
import AgentSelector from "../../components/common-components/AgentSelector/AgentSelector";
import profile from "../../assets/profileavatar.svg";
import { useDispatch, useSelector } from "react-redux";
import { transactionsApi } from "../../Store/transactionsSlice";

const Transactions = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.transactions);

  const transaction = transactions?.schemePayments;
  useEffect(() => {
    dispatch(transactionsApi());
  }, []);

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

  return (
    <div className={classes.transactions_main}>
      <PageDetail
        image={icon}
        heading="Transactions"
        count={transactions?.total}
      />
      <div className={classes.transactions_selector_section}>
        <span className={classes.transactions_sortBy_text}>Sort by</span>
        <CustomSelector options={["Date", "Filter by date"]} />
        <CustomSelector
          options={["Account type", "Online Payment", "Via Agent"]}
        />
        <AgentSelector
          options={[
            "Albin Chacko",
            "Buwanesh Kumar",
            "Dinesh Dhamu",
            "Esthapan",
          ]}
        />
        <div className={classes.transactions_exportTosheet_btn}>
          <ExportToSheet />
        </div>
      </div>
      <div className={classes.table_wrapper}>
        <table className={classes.transactions_table}>
          <thead>
            <tr>
              <th className={classes.transactions_table_head}>Name</th>
              <th className={classes.transactions_table_head}>Account type</th>
              <th className={classes.transactions_table_head}>Date</th>
              <th className={classes.transactions_table_head}>Agent</th>
              <th className={classes.transactions_table_head}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transaction?.map((transaction) => (
              <tr key={transaction?._id}>
                <td className={classes.transactions_table_data}>
                  <div className={classes.transactions_name_data}>
                    <CircleAvatar
                      width="2.65rem"
                      height="2.65rem"
                      image={
                        transaction?.user?.profilePhoto?.url
                          ? transaction?.user?.profilePhoto?.url
                          : profile
                      }
                    />{" "}
                    {limitPersonName(transaction?.user?.name)}
                  </div>
                </td>
                <td className={classes.transactions_table_data}>
                  {transaction?.isAgent ? "Via Agent" : "Online Payment"}
                </td>
                <td className={classes.transactions_table_data}>
                  {formatDate(transaction?.payDate)}
                </td>
                <td className={classes.transactions_table_data}>
                  {limitPersonName(transaction?.agent?.name)}
                </td>
                <td className={classes.transactions_table_data}>
                  <div className={classes.transactions_amount_data}>
                    <span
                      className={
                        transaction?.status === "success"
                          ? classes.amountText
                          : classes.isFailed
                      }
                    >
                      ₹{formatNumberWithCommas(transaction?.payAmount)}
                    </span>
                    {transaction?.status === "failed" && (
                      <span className={classes.failedText}>Failed</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
