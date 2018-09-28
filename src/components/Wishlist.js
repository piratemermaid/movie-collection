import React from "react";
import { Link } from "react-router-dom";
import TableList from "./TableList";

const Wishlist = props => {
  return (
    <div>
      <Link to="/add/wishlist">
        <i className="material-icons small icon-link float-right">add_circle</i>
      </Link>
      <TableList movies={props.wishlist} />
    </div>
  );
};

export default Wishlist;
