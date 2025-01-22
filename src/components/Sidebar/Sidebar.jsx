import React, { useState } from "react";
import classes from "./sidebar.module.css";
import {
  Link,
  useMatch,
  useResolvedPath,
} from "react-router-dom";
import ConfirmationModal from "../Modals/ConfirmationModal/ConfirmationModal";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logoutApi } from "../../Store/authSlice";

const Sidebar = () => {
  const [showLogout, SetShowLogout] = useState(false);
  const dispatch = useDispatch();

  const handleLogoutModal = () => {
    SetShowLogout(!showLogout);
  };

  const handleLogout = () => {
    dispatch(logoutApi()).then((response) => {
      if (response.payload) {
        handleLogoutModal();
        window.location.reload();
      } else {
        handleLogoutModal();
        toast.error("Logout Failed", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    });
  };

  // const
  return (
    <div className={classes.sidebar_section}>
      <div className={`${classes.home} ${classes.homesub}`}>
        <h3>Home</h3>

        <CustomLink to="/">
          <div className={classes.category}>
            {/* Dashboard Icon image starts here */}
            <svg
              className={classes.icons}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
            >
              <path
                opacity="0.4"
                d="M16.0755 2.01367H19.4615C20.8637 2.01367 22 3.15952 22 4.57364V7.9882C22 9.40231 20.8637 10.5482 19.4615 10.5482H16.0755C14.6732 10.5482 13.537 9.40231 13.537 7.9882V4.57364C13.537 3.15952 14.6732 2.01367 16.0755 2.01367Z"
                fill="#8A92A6"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.53852 2.01367H7.92449C9.32676 2.01367 10.463 3.15952 10.463 4.57364V7.9882C10.463 9.40231 9.32676 10.5482 7.92449 10.5482H4.53852C3.13626 10.5482 2 9.40231 2 7.9882V4.57364C2 3.15952 3.13626 2.01367 4.53852 2.01367ZM4.53852 13.4785H7.92449C9.32676 13.4785 10.463 14.6244 10.463 16.0385V19.453C10.463 20.8662 9.32676 22.013 7.92449 22.013H4.53852C3.13626 22.013 2 20.8662 2 19.453V16.0385C2 14.6244 3.13626 13.4785 4.53852 13.4785ZM19.4615 13.4785H16.0755C14.6732 13.4785 13.537 14.6244 13.537 16.0385V19.453C13.537 20.8662 14.6732 22.013 16.0755 22.013H19.4615C20.8637 22.013 22 20.8662 22 19.453V16.0385C22 14.6244 20.8637 13.4785 19.4615 13.4785Z"
                fill="#8A92A6"
              />
            </svg>
            {/* Dashboard Icon image ends here */}
            <h4>Dashboard</h4>
          </div>
        </CustomLink>
      </div>
      <div className={classes.home}>
        <h3>Pages</h3>
        <CustomLink to="/users">
          <div className={classes.category}>
            {/* Users Icon image starts here */}
            <svg
              className={classes.icons}
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="24"
              viewBox="0 0 18 24"
              fill="none"
            >
              <path
                d="M9 15.5859C4.14605 15.5859 0 16.3512 0 19.4124C0 22.4746 4.12017 23.2669 9 23.2669C13.8539 23.2669 18 22.5028 18 19.4405C18 16.3782 13.881 15.5859 9 15.5859Z"
                fill="#8A92A6"
              />
              <path
                opacity="0.4"
                d="M8.99767 12.6703C12.3042 12.6703 14.9534 10.0199 14.9534 6.71452C14.9534 3.40916 12.3042 0.758789 8.99767 0.758789C5.69231 0.758789 3.04194 3.40916 3.04194 6.71452C3.04194 10.0199 5.69231 12.6703 8.99767 12.6703Z"
                fill="#8A92A6"
              />
            </svg>
            {/* Users Icon image ends here */}

            <h4>Users</h4>
          </div>
        </CustomLink>
        <CustomLink to="/agents">
          <div className={classes.category}>
            {/* Agents Icon image starts here */}
            <svg
              className={classes.icons}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                opacity="0.4"
                d="M0 9.19189C0.050025 11.5311 0.190095 15.5321 0.210105 15.9733C0.281141 16.9168 0.642321 17.8702 1.2046 18.5426C1.98699 19.486 2.95047 19.9072 4.29415 19.9072C6.15107 19.9173 8.1981 19.9173 10.1861 19.9173C12.1821 19.9173 14.1191 19.9173 15.7549 19.9072C17.0795 19.9072 18.073 19.475 18.8454 18.5426C19.4077 17.8702 19.7689 16.9068 19.8199 15.9733C19.8399 15.6021 19.94 11.2589 20 9.19189H0Z"
                fill="#8A92A6"
              />
              <path
                d="M9.24753 13.4999V14.7945C9.24753 15.2087 9.5837 15.5449 9.99791 15.5449C10.4121 15.5449 10.7483 15.2087 10.7483 14.7945V13.4999C10.7483 13.0857 10.4121 12.7495 9.99791 12.7495C9.5837 12.7495 9.24753 13.0857 9.24753 13.4999Z"
                fill="#8A92A6"
              />
              <path
                d="M11.2916 0.108887C12.7934 0.108887 14.025 1.23845 14.2131 2.69118H16.1911C18.2911 2.69118 20 4.40003 20 6.50108V9.96881C20 10.2209 19.8729 10.4561 19.6638 10.5951C17.6008 11.9608 15.1516 12.8703 12.5823 13.2254C12.5473 13.2304 12.5133 13.2324 12.4792 13.2324C12.1401 13.2324 11.8369 13.0033 11.7519 12.6672C11.5498 11.8708 10.8264 11.3135 9.995 11.3135C9.15258 11.3135 8.43722 11.8588 8.21511 12.6712C8.11506 13.0343 7.76588 13.2665 7.38769 13.2164C4.83542 12.8603 2.3962 11.9548 0.337169 10.5951C0.126063 10.4571 0 10.2209 0 9.96881V6.50108C0 4.40003 1.71286 2.69118 3.81891 2.69118H5.78689C5.97499 1.23845 7.2056 0.108887 8.70835 0.108887H11.2916ZM11.2916 1.60964H8.70835C8.03502 1.60964 7.47274 2.06987 7.30465 2.69118H12.6943C12.5263 2.06987 11.964 1.60964 11.2916 1.60964Z"
                fill="#8A92A6"
              />
            </svg>

            {/* Agents Icon image ends here */}
            <h4>Agents</h4>
          </div>
        </CustomLink>
        <CustomLink to="/transactions">
          <div className={classes.category}>
            {/* Transactions Icon image starts here */}
            <svg
              className={classes.icons}
              width="20"
              height="24"
              viewBox="0 0 20 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.4"
                d="M14.6567 0.901855H5.34444C1.96667 0.901855 0 2.87963 0 6.26852V17.7463C0 21.1908 1.96667 23.1241 5.34444 23.1241H14.6567C18.0889 23.1241 20 21.1908 20 17.7463V6.26852C20 2.87963 18.0889 0.901855 14.6567 0.901855Z"
                fill="#8A92A6"
              />
              <path
                d="M5.64448 16.1689H14.3556C14.7989 16.2133 15.1334 16.5911 15.1334 17.0466C15.1334 17.49 14.7989 17.8689 14.3556 17.9133H5.64448C5.31115 17.9577 4.98893 17.7911 4.81115 17.5133C4.63337 17.2244 4.63337 16.8577 4.81115 16.58C4.98893 16.2911 5.31115 16.1355 5.64448 16.1689ZM14.3556 11.1011C14.8334 11.1011 15.2223 11.4911 15.2223 11.9688C15.2223 12.4466 14.8334 12.8355 14.3556 12.8355H5.64448C5.16559 12.8355 4.77781 12.4466 4.77781 11.9688C4.77781 11.4911 5.16559 11.1011 5.64448 11.1011H14.3556ZM8.96559 6.06885C9.44448 6.06885 9.83337 6.45774 9.83337 6.9344C9.83337 7.4244 9.44448 7.81329 8.96559 7.81329H5.64448C5.16559 7.81329 4.77781 7.4244 4.77781 6.94663C4.77781 6.46885 5.16559 6.07996 5.64448 6.07996V6.06885H8.96559Z"
                fill="#8A92A6"
              />
            </svg>
            {/* Transactions Icon image ends here */}
            <h4>Transactions</h4>
          </div>
        </CustomLink>
        <CustomLink to="/pendingpayments">
          <div className={classes.category}>
            {/* Pending Payments Icon image starts here */}
            <svg
              className={classes.icons}
              width="21"
              height="22"
              viewBox="0 0 21 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.4"
                d="M14.4619 0.928223H5.71819C2.29938 0.928223 0 3.32845 0 6.89854V15.138C0 18.698 2.29938 21.0982 5.71819 21.0982H14.4619C17.8807 21.0982 20.17 18.698 20.17 15.138V6.89854C20.17 3.32845 17.8807 0.928223 14.4619 0.928223Z"
                fill="#8A92A6"
              />
              <path
                d="M13.6888 14.8601C13.5567 14.8601 13.4235 14.8258 13.3015 14.7542L9.34214 12.3923C9.11422 12.2551 8.97404 12.008 8.97404 11.7418V6.65188C8.97404 6.23436 9.31289 5.89551 9.73041 5.89551C10.1479 5.89551 10.4868 6.23436 10.4868 6.65188V11.3122L14.077 13.4532C14.4351 13.668 14.5531 14.1319 14.3393 14.491C14.1971 14.728 13.9459 14.8601 13.6888 14.8601Z"
                fill="#8A92A6"
              />
            </svg>
            {/* Pending Payments Icon image ends here */}
            <h4>Pending Payments</h4>
          </div>
        </CustomLink>
        <CustomLink to="/joinRequests">
          <div className={classes.category}>
            {/* Join Requests Icon image starts here */}
            <svg
              className={classes.icons}
              width="17"
              height="22"
              viewBox="0 0 17 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Iconly/Bulk/Arrow---Right-2">
                <g id="Arrow---Right-2">
                  <path
                    id="Fill-1"
                    d="M0.364369 12.9391L12.0062 5.76641C12.2669 5.6066 12.6007 5.6219 12.8448 5.81061C13.9509 6.66235 14.939 7.52599 15.5983 8.25193C15.5983 8.25193 16.1663 8.83336 16.4121 9.20228C16.809 9.7055 17 10.3634 17 11.0027C17 11.7201 16.7907 12.3984 16.3739 12.9408C16.2792 13.0377 15.9189 13.4644 15.5784 13.8129C13.5922 15.9822 8.40733 19.566 5.6804 20.6524C5.28348 20.8275 4.22393 21.193 3.67422 21.2134C3.14445 21.2134 2.63294 21.0978 2.14136 20.8445C1.53685 20.4959 1.06354 19.9553 0.797822 19.3144C0.626766 18.869 0.362708 17.5327 0.362708 17.4936C0.191652 16.5398 0.0637748 15.2002 0.000666723 13.6361C-0.0109585 13.3556 0.130204 13.0836 0.364369 12.9391Z"
                    fill="#8A92A6"
                  />
                  <path
                    id="Fill-4"
                    opacity="0.4"
                    d="M1.14475 9.07607C0.631581 9.39398 -0.0144466 8.98766 0.0104645 8.37733C0.0719119 6.94586 0.178199 5.6844 0.307737 4.74595C0.327666 4.72555 0.591724 3.06117 0.895639 2.49844C1.42541 1.45289 2.46504 0.813655 3.58272 0.813655H3.67572C4.39648 0.832356 5.92934 1.47159 5.92934 1.51069C6.70159 1.83201 7.70965 2.37603 8.79412 3.03057C9.28237 3.32638 9.294 4.05232 8.80574 4.35323L1.14475 9.07607Z"
                    fill="#8A92A6"
                  />
                </g>
              </g>
            </svg>
            {/* Join Requests Icon image ends here */}
            <h4>Join Requests</h4>
          </div>
        </CustomLink>
        <CustomLink to="/productlist">
          <div className={classes.category}>
            {/* Add Product Icon image starts here */}
            <svg
              className={classes.icons}
              width="23"
              height="22"
              viewBox="0 0 23 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.4"
                d="M5.97708 18.4644C6.89062 18.4644 7.63905 19.2128 7.63905 20.1373C7.63905 21.0509 6.89062 21.7993 5.97708 21.7993C5.05254 21.7993 4.30411 21.0509 4.30411 20.1373C4.30411 19.2128 5.05254 18.4644 5.97708 18.4644ZM18.3593 18.4644C19.2728 18.4644 20.0213 19.2128 20.0213 20.1373C20.0213 21.0509 19.2728 21.7993 18.3593 21.7993C17.4348 21.7993 16.6863 21.0509 16.6863 20.1373C16.6863 19.2128 17.4348 18.4644 18.3593 18.4644Z"
                fill="#8A92A6"
              />
              <path
                d="M0.969382 0.235731L3.59441 0.631963C3.96863 0.699102 4.24379 1.00618 4.27681 1.3804L4.48593 3.84584C4.51895 4.19915 4.80512 4.4633 5.15733 4.4633H20.0215C20.6929 4.4633 21.1331 4.69444 21.5734 5.20073C22.0137 5.70703 22.0907 6.43345 21.9916 7.09274L20.946 14.313C20.7479 15.7009 19.5592 16.7234 18.1614 16.7234H6.15341C4.68955 16.7234 3.47885 15.6007 3.35778 14.149L2.34518 2.15085L0.683215 1.86468C0.242958 1.78764 -0.0652217 1.35839 0.0118233 0.91813C0.0888682 0.466866 0.518119 0.169693 0.969382 0.235731ZM16.4004 8.53458H13.3516C12.8893 8.53458 12.5261 8.89779 12.5261 9.36006C12.5261 9.81132 12.8893 10.1855 13.3516 10.1855H16.4004C16.8627 10.1855 17.2259 9.81132 17.2259 9.36006C17.2259 8.89779 16.8627 8.53458 16.4004 8.53458Z"
                fill="#8A92A6"
              />
            </svg>
            {/* Add Product Icon image ends here */}
            <h4>Add Product</h4>
          </div>
        </CustomLink>
        <CustomLink to="/notjoined">
          <div className={classes.category}>
            {/* Not Joined Icon image starts here */}
            <svg
              className={classes.icons}
              width="19"
              height="20"
              viewBox="0 0 19 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.4"
                d="M13.623 0.513184H5.3865C2.166 0.513184 0 2.77418 0 6.13718V13.8987C0 17.2522 2.166 19.5132 5.3865 19.5132H13.623C16.8435 19.5132 19 17.2522 19 13.8987V6.13718C19 2.77418 16.8435 0.513184 13.623 0.513184Z"
                fill="#8A92A6"
              />
              <path
                d="M12.3649 11.6952L10.6749 10.0061L12.364 8.31696C12.6889 7.99301 12.6889 7.46576 12.364 7.14181C12.0391 6.81501 11.5137 6.81596 11.1888 7.14086L9.49876 8.82996L7.80871 7.13896C7.48381 6.81406 6.95751 6.81596 6.63261 7.13896C6.30866 7.46386 6.30866 7.99111 6.63261 8.31506L8.32361 10.0061L6.63641 11.6923C6.31151 12.0172 6.31151 12.5445 6.63641 12.8675C6.79886 13.0309 7.01071 13.1116 7.22351 13.1116C7.43726 13.1116 7.64911 13.0309 7.81156 12.8684L9.49876 11.1812L11.1898 12.8713C11.3522 13.0337 11.5641 13.1145 11.7769 13.1145C11.9897 13.1145 12.2025 13.0328 12.3649 12.8713C12.6898 12.5464 12.6898 12.0201 12.3649 11.6952Z"
                fill="#8A92A6"
              />
            </svg>
            {/* Not Joined Icon image ends here */}
            <h4>Not Joined</h4>
          </div>
        </CustomLink>
        <div className={classes.borderline}></div>
        <div
          className={`${classes.category} ${classes.logout}`}
          onClick={handleLogoutModal}
        >
          {/* Logout Icon image starts here */}
          <svg
            className={classes.icons}
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.4"
              d="M0 5.34958C0 2.40838 2.43629 0.0131836 5.42944 0.0131836H11.3828C14.3698 0.0131836 16.8 2.40118 16.8 5.33758V18.6768C16.8 21.6192 14.3637 24.0132 11.3693 24.0132H5.41845C2.43018 24.0132 0 21.6252 0 18.6888V17.5608V5.34958Z"
              fill="#8A92A6"
            />
            <path
              d="M23.7347 11.3606L20.3197 7.8698C19.9668 7.5098 19.3988 7.5098 19.047 7.8722C18.6964 8.2346 18.6976 8.819 19.0494 9.179L20.9205 11.0906H19.1265H9.05813C8.56143 11.0906 8.15823 11.5046 8.15823 12.0146C8.15823 12.5258 8.56143 12.9386 9.05813 12.9386H20.9205L19.0494 14.8502C18.6976 15.2102 18.6964 15.7946 19.047 16.157C19.2235 16.3382 19.4537 16.4294 19.6851 16.4294C19.9142 16.4294 20.1444 16.3382 20.3197 16.1594L23.7347 12.6698C23.9042 12.4958 24 12.2606 24 12.0146C24 11.7698 23.9042 11.5346 23.7347 11.3606Z"
              fill="#8A92A6"
            />
          </svg>
          {/* Logout Icon image ends here */}
          <h4>Log Out</h4>
        </div>
      </div>
      {showLogout && (
        <ConfirmationModal
          cancleClick={handleLogoutModal}
          acceptClick={handleLogout}
          heading="Log Out"
          paragraph="Are you sure you want to log out from the admin panel?"
          cancelText="Cancel"
          acceptText="Log out"
        />
      )}
      <ToastContainer/>
    </div>
  );
};

export default Sidebar;

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <div className={isActive ? `${classes.active}` : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </div>
  );
}
