import React, { useEffect, useRef, useState } from "react";
import classes from "./CustomSelector.module.css";
import FilterByDate from "../../Modals/FilterByDate/FilterByDate";

const CustomSelector = (props) => {
  const [show, setShow] = useState(false);
  const [showFilterBydate, setShowFilterBydate] = useState(false);
  const [selectedItem, setSelectedItem] = useState(props.options[0]);


  let menuRef = useRef();

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShow(!show);

    if (item === "Filter by date") {
      setShowFilterBydate(true);
    } else {
      setShowFilterBydate(false);
    }
  };

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

const handleFilterByDate = () => {
  setShowFilterBydate(!showFilterBydate);
}

  return (
    <>
    <div className={classes.select_box} ref={menuRef}>
      <div className={classes.selected} onClick={() => setShow(!show)}>
        {selectedItem}
      </div>
      {show && (
        <div className={classes.option_container}>
          {props.options.map((option, index) => (
            <div
              key={index}
              className={
                option === selectedItem ? classes.highLightText : classes.option
              }
              onClick={() => handleItemClick(option)}
            >
              <label htmlFor={option}>{option}</label>
            </div>
          ))}
        </div>
      )}
    </div>
    {showFilterBydate && <FilterByDate onClick={handleFilterByDate}/>}
    </>
  );
};

export default CustomSelector;
