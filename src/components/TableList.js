import React, { Component } from "react";
import { Link } from "react-router-dom";

/**
 * @param {string} sortBy: 'dateAdded', 'year', 'title'
 * @param {boolean} ascending: true or false
 * e.g. sortBy: 'title', ascending: true = alphabetical order,
 *      sortBy: 'title', ascending: false = reverse alphabetical order
 */
class TableList extends Component {
  constructor(props) {
    super(props);
    this.state = { sortBy: "dateAdded", ascending: true };
  }

  removeFromList(title) {
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

  renderMovies(movies) {
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
            {this.props.deletable ? (
              <i
                className="material-icons tiny icon-link"
                onClick={() => this.removeFromList(movie.title)}
              >
                delete
              </i>
            ) : null}
            {this.props.editable ? (
              <Link to={`/edit/${movie.title}`}>
                <i className="material-icons tiny icon-link">edit</i>
              </Link>
            ) : null}
          </td>
          <td>{this.renderTags(movie.tags)}</td>
          <td>{movie.year}</td>
          <td>{movie.watched ? "Yes" : "No"}</td>
        </tr>
      );
    }

    // TODO: use state to sort rows
    let sortedRows = rows;

    return sortedRows;
  }

  renderTags(tags) {
    let renderTagArr = [];
    let tagClass;
    let tagsArr = [];
    if (this.props.tags) {
      tagsArr = this.props.tags.split("&");
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

  changeSortMethod(type) {
    if (this.state.sortBy === type) {
      if (this.state.ascending) {
        this.setState({ ascending: false });
      } else {
        this.setState({ ascending: true });
      }
    } else {
      this.setState({ sortBy: type, ascending: true });
    }
  }

  render() {
    const { sortBy, ascending } = this.state;
    return (
      <div>
        <div id="sort-options">
          Sort options:{" "}
          <a
            onClick={() => this.changeSortMethod("dateAdded")}
            className={
              sortBy === "dateAdded"
                ? "sort-option sort-option-active"
                : "sort-option"
            }
          >
            date added
          </a>
          {sortBy === "dateAdded" && ascending === true ? (
            <i className="material-icons tiny icon-link">arrow_drop_up</i>
          ) : null}
          {sortBy === "dateAdded" && ascending === false ? (
            <i className="material-icons tiny icon-link">arrow_drop_down</i>
          ) : null}
          {" | "}
          <a
            onClick={() => this.changeSortMethod("title")}
            className={
              sortBy === "title"
                ? "sort-option sort-option-active"
                : "sort-option"
            }
          >
            title
          </a>
          {sortBy === "title" && ascending === true ? (
            <i className="material-icons tiny icon-link">arrow_drop_up</i>
          ) : null}
          {sortBy === "title" && ascending === false ? (
            <i className="material-icons tiny icon-link">arrow_drop_down</i>
          ) : null}
          {" | "}
          <a
            onClick={() => this.changeSortMethod("year")}
            className={
              sortBy === "year"
                ? "sort-option sort-option-active"
                : "sort-option"
            }
          >
            year
          </a>
          {sortBy === "year" && ascending === true ? (
            <i className="material-icons tiny icon-link">arrow_drop_up</i>
          ) : null}
          {sortBy === "year" && ascending === false ? (
            <i className="material-icons tiny icon-link">arrow_drop_down</i>
          ) : null}
        </div>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Tags</th>
              <th>Year</th>
              <th>Watched?</th>
            </tr>
          </thead>
          <tbody>{this.renderMovies(this.props.movies)}</tbody>
        </table>
      </div>
    );
  }
}

export default TableList;
