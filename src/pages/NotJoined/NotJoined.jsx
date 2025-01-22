import React, { useEffect } from "react";
import classes from "./NotJoined.module.css";
import PageDetail from "../../components/common-components/PageDetail/PageDetail";
import icon from "../../assets/notJoint_icon.svg";
import UserDetail from "../../components/common-components/UserDetail/UserDetail";
import profile from "../../assets/profileavatar.svg";
import { useDispatch, useSelector } from "react-redux";
import { notJoinedApi } from "../../Store/notJoinedSlice";

const NotJoined = () => {
  const dispatch = useDispatch();
  const notJoined = useSelector((state) => state.notJoined.notJoined);

  useEffect(() => {
    dispatch(notJoinedApi());
  }, []);

  const users = notJoined?.findUser;

  return (
    <div className={classes.notJoined_main}>
      <PageDetail
        image={icon}
        heading="Not Joined"
        count={notJoined?.notJoinedCount}
      />
      {notJoined?.notJoinedCount !== 0 ? (
        <div className={classes.notJoinedCard_section}>
          {users?.map((user, key) => (
            <div key={key} className={classes.notJoinedCard}>
              <UserDetail
                image={
                  user?.profilePhoto?.url ? user?.profilePhoto?.url : profile
                }
                name={user?.name}
                number={user?.phone}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className={classes.notJoined_txt_container}>
          Not Joined is Empty
        </div>
      )}
    </div>
  );
};

export default NotJoined;
