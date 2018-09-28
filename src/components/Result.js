import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import TableList from "./TableList";

const Result = props => {
  const tag = props.match.params.tag;
  const matches = props.movies.filter(movie => {
    if (movie.tags.includes(tag)) {
      return movie.title;
    } else {
      return null;
    }
  });

  return (
    <div>
      <Link to="/">Back to Search arrow</Link>
      <br />
      <h5>Movies matching "{props.match.params.tag}"</h5>
      <TableList movies={matches} />
    </div>
  );
};

export default withRouter(Result);
