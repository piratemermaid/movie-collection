import React from "react";
import { Link } from "react-router-dom";
import dotProp from "dot-prop";

const TableList = props => {
  function removeFromList(title) {
    const rows = document.querySelectorAll(".table-list-row");
    let val;
    for (let i in rows) {
      if (rows[i].classList) {
        val = rows[i].classList.value;
        if (val.substr(val.indexOf(" ") + 1) === title) {
          rows[i].classList.add("hidden");
        }
      }
    }
  }

  function renderMovies(movies) {
    let rows = [];

    for (let i in movies) {
      const movie = movies[i];
      rows.push(
        <tr
          key={i}
          className={`table-list-row ${movie.title}`}
          title={movie.title}
        >
          <td>
            {movie.title}
            {props.deletable ? (
              <i
                className="material-icons tiny icon-link"
                onClick={() => removeFromList(movie.title)}
              >
                delete
              </i>
            ) : null}
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
    let renderTagArr = [];
    let tagClass;
    let tagsArr = [];
    if (props.tags) {
      tagsArr = props.tags.split("&");
    }

    for (let i in tags) {
      tagClass = "tag-result";
      if (tagsArr.includes(tags[i])) {
        tagClass += " tag-match";
      }
      renderTagArr.push(
        <span className={tagClass} key={i}>
          {tags[i]}
        </span>
      );
    }
    return renderTagArr;
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
