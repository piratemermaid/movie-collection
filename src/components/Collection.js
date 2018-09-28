import React from "react";
import { Link } from "react-router-dom";
import TableList from "./TableList";

const Collection = props => {
  return (
    <div>
      <Link to="/add/collection">
        <i className="material-icons small icon-link float-right">add_circle</i>
      </Link>
      <TableList movies={props.movies} editable={true} />
    </div>
  );
};

export default Collection;
