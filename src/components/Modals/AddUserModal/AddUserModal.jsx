import React, { useEffect, useState } from "react";
import classes from "./AddUserModal.module.css";
import uploadImage from "../../../assets/upload_image.svg";
import deleteIcon from "../../../assets/delete_red.svg";
import warningIcon from "../../../assets/warning_icon.png";
import { useDispatch, useSelector } from "react-redux";
import { allAgentsGet } from "../../../Store/agentSlice";
import ButtonLoading from "../../Loading/ButtonLoading";
import ToastMessage from "../../common-components/ToastMessage/ToastMessage";
import PasswordModal from "../PasswordModal/PasswordModal";
import { passwordVerifyApi } from "../../../Store/passwordSlice";
import {
  aadharNumberCheckApi,
  phoneNumberCheckApi,
} from "../../../Store/userSlice";

const AddProduct = (props) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [warningMessage, setWarningMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [nameChecker, setNameChecker] = useState(false);
  const [phoneNumberUsed, setPhoneNumberUsed] = useState(false);
  const [aadhaarNumberUsed, setAadhaarNumberUsed] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [blurClass, setBlurClass] = useState("blur-none");
  const [isToggled, setIsToggled] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState({
    day: "",
    month: "",
    year: "",
  });
  const [inputData, setInputData] = useState({
    name: "",
    phone: "",
    dateOfBirth: "",
    accountType: "",
    agent: "",
    aadhaarNo: "",
    district: "",
    pinCode: "",
    images: [],
    balanceAmount: "",
  });
  const dispatch = useDispatch();
  const agents = useSelector((state) => state.agents.totalAgent);
  const usedPhoneNumber = useSelector((state) => state.users.phoneNumberUsed);

  useEffect(() => {
    dispatch(allAgentsGet());
  }, [dispatch]);

  const keralaDistricts = [
    "Thiruvananthapuram",
    "Kollam",
    "Pathanamthitta",
    "Alappuzha",
    "Kottayam",
    "Idukki",
    "Ernakulam",
    "Thrissur",
    "Palakkad",
    "Malappuram",
    "Kozhikode",
    "Wayanad",
    "Kannur",
    "Kasaragod",
  ];

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
          setInputData({
            ...inputData,
            images: [...inputData.images, ...base64Images],
          });
        })
        .catch((error) => {
          console.error("Error reading images:", error);
        });
    } else {
      setWarningMessage(`Select only ${remainingSlots} images`);
    }
  };

  const handleImageRemove = (imageName) => {
    setSelectedImages((prevSelectedImages) =>
      prevSelectedImages.filter((name) => name !== imageName)
    );

    setInputData((prevInputData) => {
      const updatedImages = prevInputData.images.filter((_, index) => {
        return index !== selectedImages.indexOf(imageName);
      });

      return {
        ...prevInputData,
        images: updatedImages,
      };
    });
  };

  const handleToggle = () => {
    setBlurClass(isToggled ? "blur" : "blur-none");
  };

  const handlePasswordModal = () => {
    setPasswordModal(!passwordModal);
  };

  const handleToast = () => {
    setShowToast(!showToast);
    setWarningMessage("");
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    const aadhaarNoWithoutSpaces = inputData.aadhaarNo.replace(/\s/g, "");
    const data = {
      name: inputData.name,
      dateOfBirth: `${dateOfBirth.day}-${dateOfBirth.month}-${dateOfBirth.year}`,
      phone: `+91${inputData.phone}`,
      aadhaarNo: parseInt(aadhaarNoWithoutSpaces),
      district: inputData.district,
      pinCode: parseInt(inputData.pinCode),
      images: inputData.images,
      balanceAmount: parseInt(inputData.balanceAmount),
    };
    if (inputData.agent) {
      data.agent = inputData.agent;
    }
    props.handleCreate(data);
  };

  const handlePasswordVerification = (input) => {
    dispatch(passwordVerifyApi(input)).then((response) => {
      if (response.payload) {
        handlePasswordModal();
        setIsToggled(true);
      } else {
      }
    });
  };

  const handleNameChange = (e) => {
    const formattedName = e.target.value.slice(0, 25);
    setInputData({ ...inputData, name: formattedName });
    if (formattedName.length < 3) {
      setNameChecker(true);
    } else {
      setNameChecker(false);
    }
  };

  const handlePhoneNumberChange = (e) => {
    const formattedPhoneNumber = e.target.value.replace(/\D/g, "");

    if (formattedPhoneNumber.length <= 10) {
      setInputData({ ...inputData, phone: formattedPhoneNumber });
    }
    if (formattedPhoneNumber.length === 10) {
      dispatch(phoneNumberCheckApi(`+91${formattedPhoneNumber}`)).then(
        (response) => {
          if (response.payload.isPhoneUsed === true) {
            setPhoneNumberUsed(true);
          } else {
            setPhoneNumberUsed(false);
          }
        }
      );
    }
  };

  const handleFromDateChange = (event) => {
    const { name, value } = event.target;
    setDateOfBirth((prevDate) => ({
      ...prevDate,
      [name]: value.slice(0, name === "year" ? 4 : 2),
    }));
  };

  const handleAdharNumberChange = (e) => {
    const formattedAdharNumber = e.target.value.replace(/\D/g, "");
    let spacedAdharNumber = "";

    for (let i = 0; i < formattedAdharNumber.length; i++) {
      if (i > 0 && i % 4 === 0) {
        spacedAdharNumber += " ";
      }
      spacedAdharNumber += formattedAdharNumber[i];
    }

    setInputData({ ...inputData, aadhaarNo: spacedAdharNumber });
    if (formattedAdharNumber.length === 12) {
      dispatch(aadharNumberCheckApi(formattedAdharNumber)).then((response) => {
        if (response.payload.isAdhaarUsed === true) {
          setAadhaarNumberUsed(true);
        } else {
          setAadhaarNumberUsed(false);
        }
      });
    }
  };

  const handlePincodeChange = (e) => {
    const formattedPincode = e.target.value.replace(/\D/g, "");

    if (formattedPincode.length <= 6) {
      setInputData({ ...inputData, pinCode: formattedPincode });
    }
  };

  return (
    <>
      <div className={classes.addProductModal_main}>
        <div className={classes.addProductModal_card}>
          <div className={classes.addProductModal_heading_section}>
            <h1 className={classes.addProductModal_heading}>Add user</h1>
          </div>
          <form action="" className={classes.addProductModal_form}>
            <div className={classes.addProductModal_firstSection}>
              <label htmlFor="" className={classes.addProductModal_label}>
                Full name
              </label>
              <input
                type="text"
                className={`${classes.addProductModal_inputField} ${
                  nameChecker && classes.warning_input
                }`}
                value={inputData.name}
                onChange={handleNameChange}
                maxLength={25}
              />
              {nameChecker && (
                <p className={classes.warnig_text}>
                  Name should be more than 3 letters
                </p>
              )}

              <label htmlFor="" className={classes.addProductModal_label}>
                Date of birth
              </label>

              <div className={classes.date_of_birth_container}>
                <div className={classes.birth_data}>
                  <input
                    className={`${classes.addProductModal_inputField} ${classes.date_decreasedWidth}`}
                    type="number"
                    name="day"
                    placeholder="DD"
                    min="1"
                    max="31"
                    maxLength={2}
                    value={dateOfBirth.day}
                    onChange={handleFromDateChange}
                  />
                  <label className={classes.addProductModal_label} htmlFor="">
                    Day
                  </label>
                </div>
                <div className={classes.birth_data}>
                  <input
                    className={`${classes.addProductModal_inputField} ${classes.date_decreasedWidth}`}
                    type="number"
                    name="month"
                    placeholder="MM"
                    min={1}
                    max={12}
                    maxLength={2}
                    value={dateOfBirth.month}
                    onChange={handleFromDateChange}
                  />
                  <label className={classes.addProductModal_label} htmlFor="">
                    Month
                  </label>
                </div>
                <div className={classes.birth_data}>
                  <input
                    type="number"
                    name="year"
                    min={1900}
                    max={2099}
                    placeholder="YYYY"
                    maxLength={4}
                    value={dateOfBirth.year}
                    onChange={handleFromDateChange}
                    className={`${classes.addProductModal_inputField} ${classes.decreasedWidth}`}
                  />
                  <label className={classes.addProductModal_label} htmlFor="">
                    Year
                  </label>
                </div>
              </div>

              <label htmlFor="" className={classes.addProductModal_label}>
                Phone number
              </label>
              <div className={classes.number_container}>
                <span className={classes.country_code}>+91</span>
                <input
                  type="text"
                  value={inputData.phone}
                  maxLength={10}
                  onChange={handlePhoneNumberChange}
                  className={`${classes.addProductModal_inputField} ${
                    phoneNumberUsed && classes.error_inputField
                  }`}
                />
              </div>
              {phoneNumberUsed && (
                <p className={classes.inputField_helper_text}>
                  phone number already used
                </p>
              )}
              <label htmlFor="" className={classes.addProductModal_label}>
                Account type
              </label>
              <div>
                <select
                  id="accountType"
                  className={classes.addProductModal_inputField}
                  value={inputData.accountType}
                  onChange={(e) =>
                    setInputData({ ...inputData, accountType: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  <option value="Via agent">Via Agent</option>
                  <option value="Online">Online</option>
                </select>
              </div>
              {inputData.accountType === "Via agent" && (
                <>
                  <label htmlFor="" className={classes.addProductModal_label}>
                    Agent
                  </label>
                  <div>
                    <select
                      id="agent"
                      className={classes.addProductModal_inputField}
                      value={inputData.agent}
                      onChange={(e) =>
                        setInputData({ ...inputData, agent: e.target.value })
                      }
                    >
                      <option value="">Select an agent</option>
                      {agents?.agents?.map((agent) => (
                        <option key={agent._id} value={agent._id}>
                          {agent.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}
            </div>

            <div className={classes.addProductModal_firstSection}>
              <label htmlFor="" className={classes.addProductModal_label}>
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

              <label
                htmlFor="Adhar number"
                className={classes.addProductModal_label}
              >
                Aadhaar number
              </label>
              <div className={classes.addProductModal_dimension}>
                <input
                  type="text"
                  value={inputData.aadhaarNo}
                  onChange={handleAdharNumberChange}
                  maxLength={14}
                  className={`${classes.addProductModal_inputField} ${
                    classes.adhar_decreasedWidth
                  } ${aadhaarNumberUsed && classes.error_aadhaarField}`}
                />
              </div>
              {aadhaarNumberUsed && (
                <p className={classes.inputField_helper_text}>
                  aadhaar number already used
                </p>
              )}
              <label
                htmlFor="District"
                className={classes.addProductModal_label}
              >
                District
              </label>
              <div>
                <select
                  id="cars"
                  className={classes.addProductModal_inputField}
                  value={inputData.district}
                  onChange={(e) =>
                    setInputData({ ...inputData, district: e.target.value })
                  }
                >
                  <option value="">Select a district</option>
                  {keralaDistricts.map((district, index) => (
                    <option key={index} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>
              <label
                htmlFor="Pincode"
                className={classes.addProductModal_label}
              >
                Pincode
              </label>
              <input
                type="number"
                value={inputData.pinCode}
                onChange={handlePincodeChange}
                className={`${classes.addProductModal_inputField} ${classes.decreasedWidth}`}
              />
            </div>
          </form>
          <div className={classes.bottom_section}>
            <div className={classes.toggle}>
              <p className={classes.userEditModal_label_edit}>
                Set custom amount
              </p>
              <label className={classes.switch}>
                <input
                  type="checkbox"
                  onClick={isToggled ? handleToggle : handlePasswordModal}
                />
                <span className={`${classes.slider} ${classes.round}`}></span>
              </label>
            </div>
            <div
              className={`${classes.booooo} ${isToggled ? "" : classes.blur}`}
            >
              <div className={classes.bottom_section_editpart}>
                <label className={classes.addProductModal_label} htmlFor="">
                  Balance Amount
                </label>
                <input
                  className={classes.addProductModal_inputField}
                  type="number"
                  name=""
                  onChange={(e) =>
                    setInputData({
                      ...inputData,
                      balanceAmount: e.target.value,
                    })
                  }
                  id=""
                  defaultValue={"\u20B9"}
                  disabled={isToggled ? false : true}
                />
              </div>
            </div>
          </div>
          <div className={classes.addProductModal_bottom_section}>
            <button
              className={classes.addProductModal_cancelButton}
              onClick={props.handlemodal}
            >
              Cancel
            </button>
            <button
              className={classes.addProductModal_addButton}
              onClick={handleCreateUser}
            >
              {props.isLoading ? <ButtonLoading /> : "Add"}
            </button>
          </div>
        </div>
        <div
          className={classes.addCategoryModal_modal_closer}
          onClick={props.handlemodal}
        ></div>
        {warningMessage && (
          <div className={classes.toast_message}>
            <ToastMessage
              handleToast={handleToast}
              icon={warningIcon}
              message={warningMessage}
              background="#FFA500"
            />
          </div>
        )}
      </div>
      {passwordModal && (
        <PasswordModal
          passwordHeading="Enter your password"
          acceptText="ok"
          cancelText="cancel"
          acceptClick={handlePasswordVerification}
          cancleClick={handlePasswordModal}
        />
      )}
    </>
  );
};

export default AddProduct;
