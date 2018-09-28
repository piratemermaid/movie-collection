import React from "react";

import TableList from "./TableList";

const Collection = props => {
  return (
    <div>
      <TableList movies={props.movies} />
    </div>
  );
};

export default Collection;
