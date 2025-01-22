import React, { useEffect, useRef, useState } from "react";
import classes from "./AgentSelector.module.css";
import search from "../../../assets/Search.svg"

const AgentSelector = (props) => {
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(props.selectedItem || "Agent");

  let menuRef = useRef();

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShow(!show);
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

  return (
    <div className={classes.select_box} ref={menuRef}>
      <div className={classes.selected} onClick={() => setShow(!show)}>
        {selectedItem}
      </div>
      {show && (
        <div className={classes.option_container}>
            <form action="" name="search" className={classes.search_container}>
                <img src={search} alt="Icon"  className={classes.search_icon}/>
                <input type="search" placeholder="Search for agent"  className={classes.search_inputField}/>
            </form>
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
          <span className={classes.viewMore_text}>Search to view more</span>
          <button className={classes.clearAll_btn} onClick={() => handleItemClick("Agent")}>Clear all</button>
        </div>
      )}
    </div>
  );
};

export default AgentSelector;
