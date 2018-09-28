import React from "react";
import { Link } from "react-router-dom";

const Search = props => {
  function renderAllTags() {
    const tagList = props.getAllTags();
    let tagsRender = [];
    for (let i in tagList) {
      tagsRender.push(
        <Link
          className="search-tag col s2"
          key={i}
          to={`/search/${tagList[i]}`}
        >
          {tagList[i]}
        </Link>
      );
    }

    return tagsRender;
  }

  return <div className="row">{renderAllTags()}</div>;
};

export default Search;
