import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import TableList from "./TableList";

const Result = props => {
  let title, matches, tag;
  console.log(props);
  if (props.match.params.tag) {
    title = tag;
    tag = props.match.params.tag;
    matches = props.movies.filter(movie => {
      if (movie.tags.includes(tag)) {
        return movie.title;
      } else {
        return null;
      }
    });
  } else {
    title = String(props.match.path.substring(props.match.path.length, 8));
    if (title === "unwatched") {
      matches = props.movies.filter(movie => {
        if (!movie.watched) {
          return movie.title;
        } else return null;
      });
    }
  }

  return (
    <div>
      <Link to="/">
        <i className="material-icons small icon-link">arrow_back</i>
      </Link>
      <br />
      <h5>Movies matching "{title}"</h5>
      <TableList movies={matches} tag={tag} />
    </div>
  );
};

export default withRouter(Result);
