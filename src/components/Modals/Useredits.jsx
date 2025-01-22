import React, { useEffect, useState } from "react";
import classes from "./Useredits.module.css";
import ConfirmationModal from "./ConfirmationModal/ConfirmationModal";
import PasswordModal from "./PasswordModal/PasswordModal";
import { useDispatch, useSelector } from "react-redux";
import { passwordVerifyApi } from "../../Store/passwordSlice";
import { allAgentsGet } from "../../Store/agentSlice";
import { updateSingleUser } from "../../Store/userSlice";
import uploadImage from "../../assets/upload_image.svg";
import deleteIcon from "../../assets/delete_red.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastMessage from "../common-components/ToastMessage/ToastMessage";

const Useredits = (props) => {
  const dispatch = useDispatch();
  const [selectedImages, setSelectedImages] = useState([]);
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [blurClass, setBlurClass] = useState("blur-none");
  const [getPassword, setGetPassword] = useState();
  const [warningMessage, setWarningMessage] = useState("");
  const [dobInputData, setDobInputData] = useState({
    day: "",
    month: "",
    year: "",
  });
  const [InputData, setInputData] = useState({
    fullName: "",
    aadhaarNumber: "",
    District: "",
    pincode: "",
    balanceamount: "",
    agent: "",
    image: [],
  });

  const singleUser = useSelector((state) => state.users.singleuser);
  const [selectedAgent, setSelectedAgent] = useState(singleUser?.agent?.name);

  const updateInputDataWithDistrict = (newDistrict) => {
    setInputData((prevInputData) => ({
      ...prevInputData,
      District: newDistrict,
    }));
  };

  const handleDistrictChange = (e) => {
    const newDistrict = e.target.value;
    updateInputDataWithDistrict(newDistrict);
  };

  useEffect(() => {
    dispatch(allAgentsGet());
  }, [dispatch]);

  const allAents = useSelector((state) => state.agents.totalAgent?.agents);

  const handlesave = (e) => {
    e.preventDefault();
    setShowSaveConfirmation(!showSaveConfirmation);
  };

  const updateDate = (fieldName, value) => {
    setDobInputData((prevDobInputData) => ({
      ...prevDobInputData,
      [fieldName]: value,
    }));
  };

  const handlePassword = (input) => {
    dispatch(passwordVerifyApi(input)).then(() => {
      handlePasswordModal();
      setBlurClass(isToggled ? "blur" : "blur-none");
      setIsToggled(!isToggled);
    });
  };

  const handleToggle = () => {
    setBlurClass(isToggled ? "blur" : "blur-none");
    setIsToggled(!isToggled);
  };

  const handlePasswordModal = () => {
    setShowPassword(!showPassword);
  };

  const formattedJoiningDate = (date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return date.toLocaleDateString(undefined, options);
  };
  const [day, month, year] = formattedJoiningDate(
    new Date(singleUser?.user?.dateOfBirth)
  ).split("/");

  let selectedDistrictFromUser = singleUser?.address?.district;

  const KeralaDistricts = [
    "Alappuzha",
    "Ernakulam",
    "Idukki",
    "Kannur",
    "Kasaragod",
    "Kollam",
    "Kottayam",
    "Kozhikode",
    "Malappuram",
    "Palakkad",
    "Pathanamthitta",
    "Thiruvananthapuram",
    "Thrissur",
    "Wayanad",
  ];

  const uniqueKeralaDistricts = Array.from(
    new Set([selectedDistrictFromUser, ...KeralaDistricts])
  );
  if (selectedDistrictFromUser) {
    selectedDistrictFromUser =
      selectedDistrictFromUser.charAt(0).toUpperCase() +
      selectedDistrictFromUser.slice(1);
  }
  const filteredKeralaDistricts = KeralaDistricts.filter(
    (district) => district !== selectedDistrictFromUser
  );

  const handleImageSelect = (event) => {
    const files = event.target.files;
    const currentSelectedImagesCount = selectedImages.length;
    const remainingSlots = 2 - currentSelectedImagesCount;

    if (files.length <= remainingSlots) {
      const imageNames = Array.from(files).map((file) => file.name);
      setSelectedImages((prevSelectedImages) => [
        ...prevSelectedImages,
        ...imageNames,
      ]);
      setWarningMessage("");
      const readerPromises = Array.from(files).map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result);
          };
          reader.onerror = (error) => {
            reject(error);
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(readerPromises)
        .then((base64Images) => {
          setInputData((prevInputData) => ({
            ...prevInputData,
            image: [...prevInputData.image, ...base64Images],
          }));
        })
        .catch((error) => {
          console.error("Error reading images:", error);
        });
    } else {
      setWarningMessage(`Select up to ${remainingSlots} more images`);
    }
  };

  const handleImageRemove = (imageName) => {
    setSelectedImages((prevSelectedImages) =>
      prevSelectedImages.filter((name) => name !== imageName)
    );
  };

  useEffect(() => {
    if (singleUser) {
      setInputData({
        fullName: singleUser?.user?.name || "",
        aadhaarNumber: singleUser.aadhaarNo || "",
        District: singleUser?.address?.district || "",
        pincode: singleUser.address?.pinCode || "",
        balanceamount: singleUser?.balanceAmount || "",
        agent: singleUser?.agent?._id || "",
        image: singleUser?.identityImage?.map((img) => img.url) || [],
      });

      setDobInputData({
        day: day || "",
        month: month || "",
        year: year || "",
      });
    }
  }, [singleUser, day, month, year, selectedDistrictFromUser, selectedAgent]);

  const handleSubmitData = async () => {
    setIsLoading(true);
    const data = {
      name: InputData.fullName,
      aadhaarNo: InputData.aadhaarNumber,
      district: InputData.District,
      pinCode: InputData.pincode,
      balanceAmount: InputData.balanceamount,
      agent: singleUser?.agent?._id,
      images: InputData.image,
      dateOfBirth: `${dobInputData.day}-${dobInputData.month}-${dobInputData.year}`,
      userId: singleUser?.user?._id,
      scheme: singleUser?._id,
    };
    await dispatch(updateSingleUser(data)).then((response) => {
      if (response.payload) {
        setIsLoading(false);
        setShowSaveConfirmation(!showSaveConfirmation);
        props.cancleClick();
        toast.success("User Updated Successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        setIsLoading(false);
        setShowSaveConfirmation(!showSaveConfirmation);
        props.cancleClick();
        toast.error("User Updation Failed", {
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
  console.log(InputData);

  return (
    <>
      <div className={classes.userEditModal_main}>
        <div className={classes.userEditModal_card}>
          <div className={classes.userEditModal_heading_section}>
            <h1 className={classes.userEditModal_heading}>Edit user details</h1>
          </div>
          <form action="" className={classes.userEditModal_form}>
            <div className={classes.userEditModal_upper_section}>
              <div className={classes.userEditModal_firstSection}>
                <label htmlFor="" className={classes.userEditModal_label}>
                  Full name
                </label>
                <input
                  type="text"
                  className={classes.userEditModal_inputField}
                  value={InputData.fullName}
                  onChange={(e) =>
                    setInputData({ ...InputData, fullName: e.target.value })
                  }
                />
                <label htmlFor="" className={classes.userEditModal_label}>
                  Aadhaar Number
                </label>
                <input
                  type="text"
                  value={InputData.aadhaarNumber}
                  onChange={(e) =>
                    setInputData({
                      ...InputData,
                      aadhaarNumber: e.target.value,
                    })
                  }
                  maxLength={12}
                  className={`${classes.userEditModal_inputField} ${classes.adarcardwidth}`}
                />
                <label htmlFor="" className={classes.userEditModal_label}>
                  District
                </label>
                <div>
                  <select
                    id="district"
                    value={InputData.District}
                    onChange={handleDistrictChange}
                    // onChange={(e) => setSelectedDistrict(e.target.value)}
                    className={classes.userEditModal_inputField}
                  >
                    {selectedDistrictFromUser && (
                      <option
                        key={selectedDistrictFromUser}
                        value={selectedDistrictFromUser}
                      >
                        {selectedDistrictFromUser}
                      </option>
                    )}
                    {filteredKeralaDistricts.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={classes.userEditModal_firstSection}>
                <div>
                  <label htmlFor="" className={classes.userEditModal_label}>
                    Upload Aadhaar
                  </label>
                  {selectedImages.length < 2 && (
                    <div className={classes.addProductModal_image_container}>
                      <div className={classes.addProductModal_image}>
                        <img
                          className={classes.addProductModal_img}
                          src={uploadImage}
                          alt=""
                        />
                        <h4 className={classes.addProductModal_imgdesc}>
                          Drag & drop images or <span>Browse</span>
                        </h4>
                        <p className={classes.addProductModal_imgcount}>
                          Select exactly 2 images
                        </p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageSelect}
                        className={classes.addProductModal_file_selector}
                      />
                    </div>
                  )}

                  {selectedImages.length > 0 && (
                    <ul className={classes.addProductModal_imageName_container}>
                      {selectedImages.map((imageName, index) => (
                        <li
                          key={index}
                          className={classes.addProductModal_imageName}
                        >
                          {imageName}{" "}
                          <img
                            src={deleteIcon}
                            alt="dele"
                            className={classes.delete_icon}
                            onClick={() => handleImageRemove(imageName)}
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className={classes.date_of_birth}>
                  <label className={classes.userEditModal_label} htmlFor="">
                    Date of birth
                  </label>
                  <div className={classes.date_of_birth_container}>
                    <div className={classes.birth_data}>
                      <input
                        className={`${classes.userEditModal_inputField} ${classes.decreasedWidth}`}
                        type="text"
                        maxLength={2}
                        value={dobInputData.day}
                        onChange={(e) => updateDate("day", e.target.value)}
                      />
                      <label className={classes.userEditModal_label} htmlFor="">
                        Day
                      </label>
                    </div>
                    <div className={classes.birth_data}>
                      <input
                        className={`${classes.userEditModal_inputField} ${classes.decreasedWidth}`}
                        type="text"
                        maxLength={2}
                        value={dobInputData.month}
                        onChange={(e) => updateDate("month", e.target.value)}
                      />
                      <label className={classes.userEditModal_label} htmlFor="">
                        Month
                      </label>
                    </div>
                    <div className={classes.birth_data}>
                      <input
                        type="text"
                        maxLength={4}
                        value={dobInputData.year}
                        onChange={(e) => updateDate("year", e.target.value)}
                        className={`${classes.userEditModal_inputField} ${classes.decreasedWidth}`}
                      />
                      <label className={classes.userEditModal_label} htmlFor="">
                        Year
                      </label>
                    </div>
                  </div>
                </div>
                <div className={classes.pincode}>
                  <label className={classes.userEditModal_label} htmlFor="">
                    Pincode
                  </label>
                  <input
                    className={`${classes.userEditModal_inputField} ${classes.pincodewidth}`}
                    type="text"
                    value={InputData.pincode}
                    onChange={(e) =>
                      setInputData({ ...InputData, pincode: e.target.value })
                    }
                    maxLength={6}
                  />
                </div>
              </div>
            </div>

            <div className={classes.bottom_section}>
              <div className={classes.toggle}>
                <p className={classes.userEditModal_label_edit}>
                  Edit price and agent
                </p>
                <label className={classes.switch}>
                  <input
                    type="checkbox"
                    onChange={isToggled ? handleToggle : handlePasswordModal}
                    checked={isToggled}
                  />
                  <span className={`${classes.slider} ${classes.round}`}></span>
                </label>
              </div>
              <div
                className={`${classes.booooo} ${isToggled ? "" : classes.blur}`}
              >
                <div className={classes.bottom_section_editpart}>
                  <label className={classes.userEditModal_label} htmlFor="">
                    Balance Amount
                  </label>
                  <input
                    className={classes.userEditModal_inputField}
                    type="text"
                    value={InputData.balanceamount}
                    onChange={(e) =>
                      setInputData({
                        ...InputData,
                        balanceamount: e.target.value,
                      })
                    }
                    name=""
                    id=""
                    disabled={isToggled ? false : true}
                  />
                </div>

                {singleUser?.IsAgent && (
                  <div className={classes.bottom_section_agent}>
                    <label className={classes.userEditModal_label} htmlFor="">
                      Agent
                    </label>
                    <select
                      className={classes.userEditModal_inputField}
                      id=""
                      disabled={isToggled ? false : true}
                      onChange={(e)=> setInputData({...InputData,agent:e.target.value})}
                    >
                      {selectedAgent && (
                        <option value={singleUser?.agent?._id} key="selectedAgentKey">
                          {singleUser?.agent?.name}
                        </option>
                      )}
                      {allAents
                        ?.filter((agent) => agent?.name !== InputData.agent)
                        .map((agent) => (
                          <option value={InputData.agent} key={agent?._id}>
                            {agent?.name}
                          </option>
                        ))}
                    </select>
                  </div>
                )}
              </div>
              <div className={classes.actions}>
                <button
                  className={classes.actions_cancel}
                  onClick={props.cancleClick}
                >
                  Cancel
                </button>
                <button className={classes.actions_save} onClick={handlesave}>
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>

        <div
          className={classes.addEditModal_closer}
          onClick={props.cancleClick}
        ></div>
      </div>
      {/* {showSaveConfirmation && (
        <ConfirmationModal
          isLoading={isLoading}
          heading="Save changes"
          paragraph="Are you sure you want to save the changes?"
          cancelText="Don’t save"
          acceptText="Save"
          cancleClick={handlesave}
          acceptClick={handleSubmitData}
        />
      )}
      {showPassword && (
        <PasswordModal
          acceptText="Ok"
          cancelText="Cancel"
          cancleClick={handlePasswordModal}
          acceptClick={handlePassword}
        />
      )}
      {warningMessage && (
        <div className={classes.toast_messager}>
          <ToastMessage
            handleToast={handleToast}
            icon=""
            message={warningMessage}
            background="#FFA500"
          />
        </div>
      )} */}
    </>
  );
};

export default Useredits;
