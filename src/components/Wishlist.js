import React from "react";

import TableList from "./TableList";

const Wishlist = props => {
  return (
    <div>
      <TableList movies={props.wishlist} />
    </div>
  );
};

export default Wishlist;
