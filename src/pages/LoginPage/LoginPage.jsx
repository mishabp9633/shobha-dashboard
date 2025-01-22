import React, { useEffect, useState } from "react";
import classes from "./LoginPage.module.css";
import logo from "../../assets/text-logo.svg";
import rightArrow from "../../assets/right-green-arrow.svg";
import { useDispatch, useSelector } from "react-redux";
import { signInApi, signInOTPApi } from "../../Store/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpNumber, setOtpNumber] = useState("");

  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.userId);

  const handleOTP = (e) => {
    e.preventDefault();
    const formattedPhoneNumber =
      phoneNumber.startsWith("+91") || phoneNumber.startsWith("91")
        ? phoneNumber
        : "+91" + phoneNumber;
    dispatch(signInOTPApi(formattedPhoneNumber))
      .then((response) => {
        if (response.payload) {
          toast.success("OTP sent", {
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
          toast.error("Invalid Phone Number", {
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
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
        toast.error("Failed to send OTP. Please try again.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const otpAsNumber = parseInt(otpNumber, 10);

    try {
      const response = await dispatch(
        signInApi({ userId: userId, otp: otpAsNumber })
      );

      if (response.payload) {
        toast.success("Login successful", {
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
        toast.error("Invalid OTP", {
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
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Failed to log in. Please try again.", {
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
  };

  const handlePhoneNumberKeyPress = (e) => {
    if (e.key === "Enter") {
      handleOTP(e);
    }
  };

  const handlePhoneNumberChange = (e) => {
    const formattedPhoneNumber = e.target.value.replace(/\D/g, "");

    if (formattedPhoneNumber.length <= 10) {
      setPhoneNumber(formattedPhoneNumber);
    }
  };

  const handleOTPChange = (e) => {
    const formattedOTP = e.target.value.replace(/\D/g, "");

    if (formattedOTP.length <= 6) {
      setOtpNumber(formattedOTP);
    }
  };

  return (
    <div className={classes.loginPage_main}>
      <div className={classes.first_section}>
        <img className={classes.logo_image} src={logo} alt="Logo" />
        <form action="" className={classes.loginForm}>
          <h1 className={classes.headingText}>Login to your account</h1>
          <label htmlFor="" className={classes.labelText}>
            Phone number
          </label>
          <div className={classes.phoneNumber_container}>
            <span className={classes.country_code}>+91</span>
            <input
              type="text"
              placeholder="Phone number"
              className={classes.inputField}
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              onKeyDown={handlePhoneNumberKeyPress}
            />
            <div className={classes.arrowContainer} onClick={handleOTP}>
              <img
                className={classes.arrow_image}
                src={rightArrow}
                alt="Arrow"
              />
            </div>
          </div>
          <label htmlFor="" className={classes.labelText}>
            OTP
          </label>
          <input
            type="text"
            placeholder="Enter your OTP"
            className={classes.inputField}
            value={otpNumber}
            onChange={handleOTPChange}
          />
          <p className={classes.paraText}>
            Enter the phone number and click send button to receive the OTP to
            your phone number
          </p>
          <button className={classes.loginBtn} onClick={handleLogin}>
            Log in
          </button>
        </form>
        <ToastContainer />
      </div>
      <div className={classes.second_section}></div>
    </div>
  );
};

export default LoginPage;
