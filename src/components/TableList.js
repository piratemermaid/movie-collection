import React from "react";
import { Link } from "react-router-dom";

const TableList = props => {
  function renderMovies(movies) {
    let rows = [];

    for (let i in movies) {
      const movie = movies[i];
      rows.push(
        <tr key={i}>
          <td>
            {movie.title}
            {props.editable ? (
              <Link to={`/edit/${movie.title}`}>
                <i className="material-icons tiny icon-link">edit</i>
              </Link>
            ) : null}
          </td>
          <td>{renderTags(movie.tags)}</td>
          <td>{movie.year}</td>
          <td>{movie.watched ? "Yes" : "No"}</td>
        </tr>
      );
    }

    return rows;
  }

  function renderTags(tags) {
    let tagArr = [];
    let tagClass;
    for (let i in tags) {
      tagClass = "tag-result";
      if (tags[i] === props.tag) {
        tagClass += " tag-match";
      }
      tagArr.push(
        <span className={tagClass} key={i}>
          {tags[i]}
        </span>
      );
    }
    return tagArr;
  }

  //   function renderTags(tags) {
  //     let tagStr = [""];
  //     for (let i in tags) {
  //       tagStr += tags[i];
  //       if (i < tags.length - 1) {
  //         tagStr += ", ";
  //       }
  //     }
  //     return <span>tagStr</span>;
  //   }
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
