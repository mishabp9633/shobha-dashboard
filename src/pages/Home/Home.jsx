import React, { useEffect } from "react";
import StatusCard from "../../components/Status/Status";
import user from "../../assets/total_user.svg";
import agent from "../../assets/total_agent.svg";
import transaction from "../../assets/total_transaction.svg";
import people from "../../assets/total_notJoined.svg";
import sms from "../../assets/total_sms.svg";
import classes from "./home.module.css";
import Chart from "../../components/Chart/Chart";
import PriceTag from "../../components/PriceTag/PriceTag";
import Customer from "../../components/Customer/Customer";
import HomeRecentTransactions from "../../components/HomeRecentTransactions/HomeRecentTransactions";
import { useDispatch, useSelector } from "react-redux";
import { dashboardCountApi } from "../../Store/dashboardSlice";

const Home = () => {
  const dispatch = useDispatch();

  const totalCounts = useSelector((state) => state.dashboard.totalCounts);

  useEffect(() => {
    dispatch(dashboardCountApi());
  }, []);

  return (
    <div className={classes.home_container}>
      <div className={classes.card_container}>
        <StatusCard
          cardText={"Total Users"}
          cardNumber={totalCounts?.usersCount}
          cardImage={user}
        />
        <StatusCard
          cardText={"Total Agents"}
          cardNumber={totalCounts?.agentCount}
          cardImage={agent}
        />
        <StatusCard
          cardText={"Today’s Transactions"}
          cardNumber={totalCounts?.todayPenddingTransactions}
          cardImage={transaction}
        />
        <StatusCard
          cardText={"People Not Joined"}
          cardNumber={totalCounts?.notSchemeJoinedUsersCount}
          cardImage={people}
        />
        <StatusCard cardText={"SMS Count"} cardNumber={347} cardImage={sms} />
      </div>
      <div className={classes.map}>
        <Chart />
        <PriceTag />
      </div>
      <div className={classes.party_section}>
        <Customer />
        <HomeRecentTransactions />
      </div>
    </div>
  );
};

export default Home;
