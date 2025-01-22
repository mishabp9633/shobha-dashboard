import React, { useState, useEffect } from "react";
import userpage from "../../assets/Frame 35312.svg";
import classes from "./userpage.module.css";
import PageDetail from "../../components/common-components/PageDetail/PageDetail";
import SearchInput from "../../components/common-components/SearchInput/SearchInput";
import ExportToSheet from "../../components/common-components/ExportToSheet/ExportToSheet";
import AddButton from "../../components/common-components/AddButton/AddButton";
import CustomSelector from "../../components/common-components/CustomSelector/CustomSelector";
import CircleAvatar from "../../components/common-components/CircleAvatar/CircleAvatar";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { createUserApi, showTotalUserApi } from "../../Store/userSlice";
import avatar from "../../assets/profileavatar.svg";
import AddUserModal from "../../components/Modals/AddUserModal/AddUserModal";

const UserPage = () => {
  const [showAddUser, setShowAddUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalUser = useSelector((state) => state.users.totalUser);
  const aadhaarNoChecked = useSelector((state) => state.users.aadhaarNoUsed);
  const phoneNoChecked = useSelector((state) => state.users.phoneNumberUsed);

  useEffect(() => {
    dispatch(showTotalUserApi());
  }, []);

  const handleShowAddUser = () => {
    setShowAddUser(!showAddUser);
  };

  const formattedJoiningDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const handleCreateUser = (input) => {
    if (
      !input.name.trim() ||
      !input.dateOfBirth.trim() ||
      !input.phone.trim() ||
      !input.aadhaarNo ||
      !String(input.aadhaarNo).trim() ||
      !input.district.trim() ||
      !input.pinCode ||
      !String(input.pinCode).trim() ||
      input.images.length === 0
    ) {
      toast.error("Please fill in all required fields", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      return;
    }
    if (!aadhaarNoChecked.isAdhaarUsed && !phoneNoChecked.isPhoneUsed) {
      setIsLoading(true);
      dispatch(createUserApi(input)).then((response) => {
        if (response.payload) {
          handleShowAddUser();
          setIsLoading(false);
          toast.success("User Created Successfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          dispatch(showTotalUserApi());
        } else {
          handleShowAddUser();
          setIsLoading(false);
          toast.error("User Creation Failed", {
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
    } else {
      toast.error("Aadhaar number or phone number is already used", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.user_container}>
      <div className={classes.user_title}>
        <PageDetail image={userpage} heading="Users" count={totalUser.length} />
      </div>
      <div className={classes.user_action_container}>
        <div className={classes.user_action_first}>
          <div className={classes.search}>
            <SearchInput />
          </div>
          <div className={classes.user_sort}>
            <p className={classes.user_sortBy_text}>Sort by</p>
            <CustomSelector
              options={["Recently Joined", "Online Payment", "Via Agent"]}
            />
            <CustomSelector
              options={["Account type", "Online Payment", "Via Agent"]}
            />
          </div>
        </div>
        <div className={classes.updated_action}>
          <div className={classes.add}>
            <AddButton onClick={handleShowAddUser} text="Add User" />
          </div>
          <div className={classes.export}>
            <ExportToSheet />
          </div>
        </div>
      </div>
      <div className={classes.table_wrapper}>
        <table className={classes.users_table}>
          <thead>
            <tr>
              <th className={classes.users_table_head}>Name</th>
              <th className={classes.users_table_head}>Account</th>
              <th className={classes.users_table_head}>Joined</th>
              <th className={classes.users_table_head}>Agent</th>
            </tr>
          </thead>
          <tbody>
            {totalUser?.map((schemeUser, key) => (
              <tr
                key={key}
                onClick={() => navigate(`/users/singleuser/${schemeUser?._id}`)}
              >
                <td className={classes.userPage_table_data}>
                  <div className={classes.user_details}>
                    <CircleAvatar
                      width="2.65rem"
                      height="2.65rem"
                      image={
                        schemeUser?.user?.profilePhoto?.url
                          ? schemeUser?.user?.profilePhoto?.url
                          : avatar
                      }
                    />
                    <div className={classes.user_address}>
                      <h5>{schemeUser?.user?.name}</h5>
                      <p>{schemeUser?.user?.phone}</p>
                    </div>
                    <div className={classes.users_amount_data}>
                      <span className={classes.amountText}>
                        {" "}
                        ₹{schemeUser?.totalAmount}
                      </span>
                    </div>
                  </div>
                </td>
                <td className={classes.userPage_table_data}>
                  {schemeUser && schemeUser.IsAgent
                    ? "Via Agent"
                    : "Online Payment"}
                </td>
                <td className={classes.userPage_table_data}>
                  {formattedJoiningDate(new Date(schemeUser?.updatedAt))}
                </td>
                <td className={classes.userPage_table_data}>
                  {schemeUser && schemeUser.IsAgent
                    ? schemeUser?.agent?.name
                    : "No agent"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ToastContainer />
      </div>
      {showAddUser && (
        <AddUserModal
          handleCreate={handleCreateUser}
          isLoading={isLoading}
          handlemodal={handleShowAddUser}
        />
      )}
    </div>
  );
};

export default UserPage;
