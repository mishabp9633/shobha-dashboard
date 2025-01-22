import React, { useState } from "react";
import classes from "./FilterByDate.module.css";

const FilterByDate = (props) => {
  const [fromDate, setfromDate] = useState({
    day: "",
    month: "",
    year: "",
  });
  const [toDate, setToDate] = useState({
    day: "",
    month: "",
    year: "",
  });

  const handleFromDateChange = (event) => {
    const { name, value } = event.target;
    setfromDate((prevDate) => ({
      ...prevDate,
      [name]: value.slice(0, name === "year" ? 4 : 2),
    }));
  };

  const handleToDateChange = (event) => {
    const { name, value } = event.target;
    setToDate((prevDate) => ({
      ...prevDate,
      [name]: value.slice(0, name === "year" ? 4 : 2),
    }));
  };

  return (
    <div className={classes.filterByDate_main}>
      <div className={classes.filterByDate_card}>
        <h1 className={classes.filterByDate_heading}>Filter by Date</h1>
        <label htmlFor="" className={classes.filterByDate_labelText}>
          From
        </label>
        <div className={classes.filterByDate_date_wrapper}>
          <input
            type="number"
            name="day"
            placeholder="DD"
            className={classes.filterByDate_input}
            min="1"
            max="31"
            maxLength="2"
            value={fromDate.day}
            onChange={handleFromDateChange}
          />
          <input
            type="number"
            name="month"
            placeholder="MM"
            className={classes.filterByDate_input}
            min="1"
            max="12"
            maxLength="2"
            value={fromDate.month}
            onChange={handleFromDateChange}
          />
          <input
            type="number"
            name="year"
            placeholder="YYYY"
            className={`${classes.filterByDate_input} ${classes.year_input}`}
            min="1900"
            max="2099"
            value={fromDate.year}
            onChange={handleFromDateChange}
          />
        </div>
        <label htmlFor="" className={classes.filterByDate_labelText}>
          To
        </label>
        <div className={classes.filterByDate_date_wrapper}>
          <input
            type="number"
            name="day"
            placeholder="DD"
            className={classes.filterByDate_input}
            min="1"
            max="31"
            maxLength="2"
            value={toDate.day}
            onChange={handleToDateChange}
          />
          <input
            type="number"
            name="month"
            placeholder="MM"
            className={classes.filterByDate_input}
            min="1"
            max="12"
            maxLength="2"
            value={toDate.month}
            onChange={handleToDateChange}
          />
          <input
            type="number"
            name="year"
            placeholder="YYYY"
            className={`${classes.filterByDate_input} ${classes.year_input}`}
            min="1900"
            max="2099"
            value={toDate.year}
            onChange={handleToDateChange}
          />
        </div>
        <button className={classes.apply_btn}>Apply</button>
      </div>
      <div
        className={classes.filterByDate_closer}
        onClick={props.onClick}
      ></div>
    </div>
  );
};

export default FilterByDate;
