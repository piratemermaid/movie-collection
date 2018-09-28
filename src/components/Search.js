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
          to={`/search/tags/${tagList[i]}`}
        >
          {tagList[i]}
        </Link>
      );
    }

    return tagsRender;
  }

  return (
    <div className="row">
      <div className="search-section">
        <h5>view all unwatched</h5>
        <Link to="/search/unwatched">
          <i className="material-icons small icon-link">arrow_forward</i>
        </Link>
      </div>
      <hr />
      <div className="search-section">
        <h5>search by year</h5>
      </div>
      <hr />
      <div className="search-section">
        <h5>search by tag(s)</h5>
        <p>Click 1 or more tags you want to search for and hit "Search"</p>
        {renderAllTags()}
      </div>
    </div>
  );
};

export default Search;
