import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import TableList from "./TableList";

const Result = props => {
  console.log(props);
  return (
    <div>
      <Link to="/">Back to Search arrow</Link>
      <br />
      <h5>Movies matching "{props.match.params.term}"</h5>
      <TableList movies={props.movies} />
    </div>
  );
};

export default withRouter(Result);
