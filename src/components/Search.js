import React from "react";

const Search = props => {
  function getAllTags() {
    let tagList = [];
    let tags;
    for (let i in props.movies) {
      tags = props.movies[i].tags;
      for (let j in tags) {
        if (!tagList.includes(tags[j])) {
          tagList.push(tags[j]);
        }
      }
    }
    tagList = tagList.sort();

    let tagsRender = [];
    for (let i in tagList) {
      tagsRender.push(
        <div className="search-tag col s2" key={i}>
          {tagList[i]}
        </div>
      );
    }

    return tagsRender;
  }

  return <div className="row">{getAllTags()}</div>;
};

export default Search;
