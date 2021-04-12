import React from "react";
import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const Filter = (props) => {
  const dispatch = useDispatch();

  return (
    <div>
      <label htmlFor="all">all</label>
      <input
        type="radio"
        name="filter"
        id="all"
        onClick={() => dispatch(filterChange("ALL"))}
      />
      <label htmlFor="notImportant">not important</label>
      <input
        type="radio"
        name="filter"
        id="notImportant"
        onClick={() => dispatch(filterChange("IMPORTANT"))}
      />
      <label htmlFor="important">important</label>
      <input
        type="radio"
        name="filter"
        id="important"
        onClick={() => dispatch(filterChange("NOT_IMPORTANT"))}
      />
    </div>
  );
};

export default Filter;
