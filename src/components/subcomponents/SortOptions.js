import React from "react";

const SortOptions = props => {
  return (
    <div id="sort-options">
      Sort options:{" "}
      <a
        onClick={() => props.changeSortMethod("dateAdded")}
        className={
          props.sortBy === "dateAdded"
            ? "sort-option sort-option-active"
            : "sort-option"
        }
      >
        date added
      </a>
      {props.getSortOption("dateAdded")}
      {" | "}
      <a
        onClick={() => props.changeSortMethod("title")}
        className={
          props.sortBy === "title"
            ? "sort-option sort-option-active"
            : "sort-option"
        }
      >
        title
        {props.getSortOption("title")}
      </a>
      {" | "}
      <a
        onClick={() => props.changeSortMethod("year")}
        className={
          props.sortBy === "year"
            ? "sort-option sort-option-active"
            : "sort-option"
        }
      >
        year
      </a>
      {props.getSortOption("year")}
    </div>
  );
};

export default SortOptions;
