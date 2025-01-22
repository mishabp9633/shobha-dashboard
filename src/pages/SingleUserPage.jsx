import React, { useState, useEffect } from "react";
import dot_icon from "../assets/edit_threedots.svg";
import edit from "../assets/edit_lined_pencil.svg";
import classes from "./SingleUserPage.module.css";
import CircleAvatar from "../components/common-components/CircleAvatar/CircleAvatar";
import CustomSelector from "../components/common-components/CustomSelector/CustomSelector";
import AddButton from "../components/common-components/AddButton/AddButton";
import ExportToSheet from "../components/common-components/ExportToSheet/ExportToSheet";
import Useredits from "../components/Modals/Useredits";
import EditDeleteModal from "../components/Modals/EditDeleteModal/EditDeleteModal";
import AddCashModal from "../components/Modals/AddCashModal/AddCashModal";
import ConfirmationModal from "../components/Modals/ConfirmationModal/ConfirmationModal";
import PasswordModal from "../components/Modals/PasswordModal/PasswordModal";
import avatar from "../assets/profileavatar.svg";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserApi,
  showSingleUserApi,
  showSingleUserPageTable,
} from "../Store/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import { passwordVerifyApi } from "../Store/passwordSlice";

const SingleUserPage = () => {
  const [showUserEdit, setShowUserEdit] = useState(false);
  const [showOption, setShowOption] = useState(false);
  const [showAddCash, setShowAddCash] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = params?.id;

  const singleUser = useSelector((state) => state.users.singleuser);
  const singleUserTable = useSelector((state) => state.users.singleUserTable);

  useEffect(() => {
    dispatch(showSingleUserApi(userId));
  }, [userId]);

  useEffect(() => {
    dispatch(showSingleUserPageTable(userId));
  }, [userId]);

  const handleShowEdit = () => {
    setShowUserEdit(!showUserEdit);
  };

  const handleClick = () => {
    setShowOption(!showOption);
  };

  const handleShowCash = () => {
    setShowAddCash(!showAddCash);
  };

  const handleConfirm = () => {
    setShowOption(!showOption);
    setShowConfirm(!showConfirm);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const formatteddateOfBirthDate = (date) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };
  const formattedPayDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const handlePasswordApi = (input) => {
    dispatch(passwordVerifyApi(input)).then((response) => {
      if (response.payload) {
        dispatch(deleteUserApi(singleUser?.user?._id)).then((response) => {
          if (response.payload) {
            navigate("/users");
          }
        });
      }
    });
  };

  return (
    <div className={classes.single_user_container}>
      <div className={classes.header}>
        <div className={classes.profile}>
          <CircleAvatar
            width="5rem"
            height="5rem"
            image={
              singleUser?.user?.profilePhoto?.url
                ? singleUser.user?.profilePhoto?.url
                : avatar
            }
          />
          <div>
            <h4>{singleUser?.user?.name}</h4>
            <p>{singleUser?.user?.phone}</p>
          </div>
        </div>

        <div className={classes.button_section}>
          <button className={classes.button} onClick={handleShowEdit}>
            <span>
              <img className={classes.button_edit_icon} src={edit} alt="edit" />
            </span>
            <p> Edit</p>
          </button>
          <img
            className={classes.button_dots_icon}
            src={dot_icon}
            alt="dot"
            onClick={handleClick}
          />
          {showOption && (
            <EditDeleteModal
              onClose={() => setShowOption(!showOption)}
              deleteClick={handleConfirm}
            />
            // <EditDeleteModal onClose={() => setShowOption(!showOption)} editText="Edit" editClick={handleEditModal} deleteClick={handleConfirm}/>
          )}
        </div>
      </div>
      <div className={classes.single_user_balance_contaioner}>
        <p className={classes.single_user_balance_title}>Balance</p>
        <h2 className={classes.single_user_balance_amount}>
          ₹{singleUser?.totalAmount}
        </h2>
      </div>

      <table className={classes.single_user_details_contaioner}>
        <tbody>
          <tr>
            <td
              className={classes.single_user_details_left_section}
              scope="row"
            >
              Account type
            </td>
            <td className={classes.single_user_details_right_section}>
              {singleUser && singleUser.IsAgent
                ? "Via Agent"
                : "Online Payment"}
            </td>
          </tr>
          {singleUser && singleUser.IsAgent && (
            <tr className={classes.customer_table}>
              <td className={classes.single_user_details_left_section}>
                Agent{" "}
              </td>

              <td className={classes.single_user_details_right_section}>
                {singleUser?.agent?.name}
              </td>
            </tr>
          )}
          <tr className={classes.customer_table}>
            <td className={classes.single_user_details_left_section}>
              Aadhaar number
            </td>
            <td className={classes.single_user_details_right_section}>
              {singleUser.aadhaarNo}
            </td>
          </tr>
          <tr className={classes.customer_table}>
            <td className={classes.single_user_details_left_section}>
              Date of Birth
            </td>
            <td className={classes.single_user_details_right_section}>
              {formatteddateOfBirthDate(
                new Date(singleUser?.user?.dateOfBirth)
              )}
            </td>
          </tr>
          <tr className={classes.customer_table}>
            <td className={classes.single_user_details_left_section}>
              District
            </td>
            <td className={classes.single_user_details_right_section}>
              {singleUser?.address?.district}
            </td>
          </tr>
          <tr className={classes.customer_table}>
            <td className={classes.single_user_details_left_section}>
              Pincode
            </td>
            <td className={classes.single_user_details_right_section}>
              {singleUser?.address?.pinCode}
            </td>
          </tr>
        </tbody>
      </table>
      <div className={classes.single_user_image_section}>
        <h4 className={classes.single_user_image_section_title}>
          Aadhaar Image
        </h4>
        {singleUser?.identityImage && singleUser.identityImage.length > 0 ? (
          <div className={classes.single_user_image_section_images}>
            {singleUser.identityImage.map((image, index) => (
              <img key={index} src={image.url} alt={`Image ${index + 1}`} />
            ))}
          </div>
        ) : (
          <p className={classes.noImages_text}>No images</p>
        )}
      </div>
      <div className={classes.single_user_action_container}>
        <div className={classes.single_user_action_first}>
          <h1 className={classes.single_user_action_table_title}>
            Transactions
          </h1>
          <div className={classes.single_user_action_table_sort}>
            <p className={classes.single_user_action_table_sortBy_text}>
              Sort by
            </p>
            <CustomSelector
              options={["month", "Online Payment", "Via Agent"]}
            />
            <CustomSelector options={["Year", "Online Payment", "Via Agent"]} />
          </div>
        </div>
        <div className={classes.singl_user_updated_action}>
          <div>
            <AddButton text="Add cash" onClick={handleShowCash} />
          </div>
          <div>
            <ExportToSheet />
          </div>
        </div>
      </div>
      <div className={classes.single_user_table_wrapper}>
        <table className={classes.single_user_table}>
          <thead>
            <tr>
              <th className={classes.single_user_table_head}>Name</th>
              <th className={classes.single_user_table_head}>Amount</th>
              <th className={classes.single_user_table_head}>Date</th>
              <th className={classes.single_user_table_head}>Agent</th>
            </tr>
          </thead>
          <tbody>
            {singleUserTable?.map((transaction, key) => (
              <tr key={key}>
                <td className={classes.single_user_table_data}>
                  {transaction.user.name}
                </td>
                <td className={classes.single_user_table_data}>
                  <div className={classes.transactions_amount_data}>
                    <span
                      className={
                        transaction?.status === "success"
                          ? classes.amountText
                          : classes.isFailed
                      }
                    >
                      ₹{transaction?.payAmount}
                    </span>
                    {transaction?.status === "failed" && (
                      <span className={classes.failedText}>Failed</span>
                    )}
                  </div>
                </td>
                <td className={classes.single_user_table_data}>
                  {formattedPayDate(new Date(transaction?.payDate))}
                </td>
                <td className={classes.single_user_table_data}>
                  {transaction.agent.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showUserEdit && (
        <Useredits cancleClick={handleShowEdit} userId={userId} />
      )}
      {showAddCash && (
        <AddCashModal
          cancelText="Cancel"
          acceptText="Add Cash"
          cancleClick={handleShowCash}
        />
      )}
      {showConfirm && (
        <ConfirmationModal
          heading="Delete this account"
          paragraph="Are you sure you want to delete this account?"
          cancelText="Cancel"
          acceptText="Delete"
          cancleClick={handleConfirm}
          acceptClick={handleShowPassword}
        />
      )}
      {showPassword && (
        <PasswordModal
          acceptClick={handlePasswordApi}
          passwordHeading="Account deletion confirmation"
          message="To proceed with deleting the user account, please confirm your action by entering your password below."
          acceptText="Ok"
          cancelText="Cancel"
          cancleClick={handleShowPassword}
        />
      )}
    </div>
  );
};

export default SingleUserPage;
