import React, { useEffect, useState } from "react";
import classes from "./pricetag.module.css";
import { useDispatch, useSelector } from "react-redux";
import { goldRateGetApi, goldRateUpdateApi } from "../../Store/dashboardSlice";

const PriceTag = () => {
  const [gramRate, setGramRate] = useState("");
  const dispatch = useDispatch();
  const goldRate = useSelector((state) => state.dashboard.goldRate);

  const formatNumberWithCommas = (number) => {
    if (number === null || number === undefined) {
      return "";
    }
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    dispatch(goldRateGetApi());
  }, []);

  const goldRateId = goldRate?._id;

  const handleGramRate = () => {
    const gramRateAsNumber = parseInt(gramRate, 10);
    if (!isNaN(gramRateAsNumber)) {
      dispatch(goldRateUpdateApi({ goldRateId, gramRateAsNumber }))
        .then(() => {
          setTimeout(() => {
            setGramRate("");
          }, 100);
          dispatch(goldRateGetApi());
        })
        .catch((error) => {
          console.error("Error updating gram rate:", error);
        });
    }
  };

  const handleGramRateKeyPress = (e) => {
    if (e.key === "Enter") {
      handleGramRate(e);
    }
  };

  return (
    <div className={classes.price_tag_container}>
      <div className={classes.price_heading}>
        <h4 className={classes.price_title}>Gold price now</h4>
      </div>

      <div className={classes.price}>
        <span>₹{formatNumberWithCommas(goldRate?.gramRate)}</span>
        <p>Gram</p>
      </div>
      <div className={`${classes.price} ${classes.gram}`}>
        <span>₹{formatNumberWithCommas(goldRate?.pavanRate)}</span>
        <p>Pavan</p>
      </div>
      <div className={classes.input_section}>
        <p className={classes.input_title}>Gram rate</p>
        <input
          className={classes.input_placeholder}
          type="number"
          placeholder="Gram rate"
          value={gramRate}
          onChange={(e) => setGramRate(e.target.value)}
          onKeyDown={handleGramRateKeyPress}
        />
      </div>
      <button className={classes.btn} onClick={handleGramRate}>
        Save
      </button>
    </div>
  );
};

export default PriceTag;
