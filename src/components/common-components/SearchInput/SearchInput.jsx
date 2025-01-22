import React from 'react'
import classes from "./SearchInput.module.css"
import search from "../../../assets/Search.svg";


const SearchInput = () => {
  return (
    <div>
         <form action="" className={classes.search_form}>
          <img
            className={classes.search_icon}
            src={search}
            alt="Search"
          />
          <input
            type="text"
            placeholder="Search for Agents"
            className={classes.search_input}
          />
        </form>
    </div>
  )
}

export default SearchInput