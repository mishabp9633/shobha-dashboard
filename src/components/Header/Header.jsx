import React, { useState } from "react";
import search from "../../assets/Search.svg";
import logo from "../../assets/Shobha Logo.svg";
import notofication from "../../assets/Notification.svg";
import classes from "./header.module.css";
import CircleAvatar from "../common-components/CircleAvatar/CircleAvatar";
import NotificationModal from "../Modals/NotificationModal/NotificationModal";
import ProfileModal from "../Modals/ProfileModal/ProfileModal";

const Header = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const handleNotification = () => {
    setShowNotification(!showNotification);
  };

  const handleProfile =()=>{
    setShowProfile(!showProfile)
  }
  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <img src={logo} className={classes.logo} alt="logo" />

        <div className={classes.search}>
          <img
            src={search}
            className={classes.search_icon}
            alt="header search"
          />
          <input type="text" placeholder="Search...." />
        </div>
      </div>
      <div className={classes.account}>
        <div className={classes.notification_container}>
          <img
            src={notofication}
            className={classes.notification_icon}
            alt="Notification"
            onClick={handleNotification}
          />
          <span className={classes.notification_reminder}></span>
        </div>
        <div className={classes.profile} onClick={handleProfile}>
          <CircleAvatar 
            width="1.8rem"
            height="1.8rem"
            image="https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=1600"
          />
          <div className={classes.name}>
            <p>John Tiffeny</p>
            <span>Admin</span>
          </div>
        </div>
      </div>
      {showNotification && <NotificationModal handleCancel={handleNotification} />}
      {showProfile && <ProfileModal handleCancel={handleProfile} />}
    </header>
  );
};

export default Header;
