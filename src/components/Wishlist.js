import React from "react";
import { Link } from "react-router-dom";
import TableList from "./TableList";

const Wishlist = props => {
  let myProps = props.wishlist;
  for (let i in props.wishlist) {
    if (typeof props.wishlist[i].tags === "string") {
      let tags;
      if (props.wishlist[i].tags.length > 0) {
        tags = props.wishlist[i].tags.split(" ");
        tags = tags.filter(val => val); // get rid of empty values
      } else {
        tags = [];
      }
      myProps[i].tags = tags;
    }
  }

  return (
    <div>
      <Link to="/add/wishlist">
        <i className="material-icons small icon-link float-right">add_circle</i>
      </Link>
      <TableList movies={props.wishlist} editable={true} deletable={false} />
      <div className="dev-options">
        <a className="dev-option" onClick={() => props.deleteAll("wishlist")}>
          Delete wishlist
        </a>
        <a
          className="dev-option"
          onClick={() => props.devFillMovies("wishlist")}
        >
          Fill movies
        </a>
      </div>
    </div>
  );
};

export default Wishlist;
