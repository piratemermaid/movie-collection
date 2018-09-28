import React from "react";

const TableList = props => {
  function renderMovies(movies) {
    let rows = [];

    for (let i in movies) {
      const movie = movies[i];
      rows.push(
        <tr key={i}>
          <td>{movie.title}</td>
          <td>{renderTags(movie.tags)}</td>
          <td>{movie.year}</td>
          <td>{movie.watched ? "Yes" : "No"}</td>
        </tr>
      );
    }

    return rows;
  }

  function renderTags(tags) {
    let tagStr = "";
    for (let i in tags) {
      tagStr += tags[i];
      if (i < tags.length - 1) {
        tagStr += ", ";
      }
    }
    return tagStr;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Tags</th>
          <th>Year</th>
          <th>Watched?</th>
        </tr>
      </thead>
      <tbody>{renderMovies(props.movies)}</tbody>
    </table>
  );
};

export default TableList;
