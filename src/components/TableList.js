import _ from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";

import SortOptions from "./subcomponents/SortOptions";

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
    this.changeSortMethod = this.changeSortMethod.bind(this);
    this.getSortOption = this.getSortOption.bind(this);
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

  sortByMethod(sortBy, movies) {
    let sorted = [];
    for (let i in movies) {
      let first = movies[i];
      let firstInArr = _.some(sorted, { title: movies[i].title });
      for (let j in movies) {
        let inArr = _.some(sorted, { title: movies[j].title });
        if (movies[j][sortBy] < first[sortBy]) {
          if (!inArr) {
            first = movies[j];
            firstInArr = _.some(sorted, { title: first.title });
          }
        } else if (movies[j][sortBy] === first[sortBy]) {
          // If same year, put in alphabetical order
          if (sortBy === "year") {
            if (movies[j].title < first.title && !inArr) {
              first = movies[j];
              firstInArr = false;
            } else {
              if (firstInArr) {
                first = movies[j];
                firstInArr = _.some(sorted, { title: first.title });
              }
            }
          }
          // TODO: if same title, put in order of year
          // e.g. Cinderella original vs 2015 Cinderella
        } else {
          if (firstInArr && !inArr) {
            first = movies[j];
            firstInArr = false;
          }
        }
      }

      sorted.push(first);
    }

    if (sortBy === "review" || sortBy === "added") {
      sorted.reverse();
    }

    return sorted;
  }

  renderMovies(movies) {
    let rows = [];

    // TODO: use state to sort movies
    const { sortBy, ascending } = this.state;

    let sortedMovies;
    sortBy === "dateAdded"
      ? (sortedMovies = this.sortByMethod("added", movies))
      : (sortedMovies = this.sortByMethod(sortBy, movies));

    if (!ascending) {
      sortedMovies.reverse();
    }

    for (let i in sortedMovies) {
      const movie = sortedMovies[i];
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
                className="material-icons tiny icon-link icon-link-blue"
                onClick={() => this.removeFromList(movie.title)}
              >
                delete
              </i>
            ) : null}
            {this.props.editable ? (
              <Link to={`/edit/${movie.title}`}>
                <i className="material-icons tiny icon-link icon-link-blue">
                  edit
                </i>
              </Link>
            ) : null}
          </td>
          <td>{this.renderTags(movie.tags)}</td>
          <td>{movie.year}</td>
          <td style={{ textAlign: "center" }}>
            {movie.watched ? "Yes" : "No"}
          </td>
          {this.props.type === "wishlist" ? <td>{movie.releaseDate}</td> : null}
          {this.props.type !== "wishlist" ? (
            <td>{this.getStars(movie.review)}</td>
          ) : null}
        </tr>
      );
    }

    return rows;
  }

  getStars(num) {
    let starsArr = [];
    for (let i = 0; i < num; i++) {
      starsArr.push(
        <i key={i} className="material-icons tiny icon-link icon-link-blue">
          star
        </i>
      );
    }
    return starsArr;
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

  getSortOption(type) {
    let icon;
    let iconClass = "material-icons tiny icon-link";
    if (this.state.sortBy === type) {
      iconClass += " icon-link-blue";
      if (this.state.ascending) {
        icon = "up";
      } else {
        icon = "down";
      }
    } else {
      icon = "up";
    }

    return <i className={iconClass}>{`arrow_drop_${icon}`}</i>;
  }

  render() {
    const { sortBy } = this.state;
    return (
      <div>
        <SortOptions
          sortBy={sortBy}
          changeSortMethod={this.changeSortMethod}
          getSortOption={this.getSortOption}
        />
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Tags</th>
              <th>Year</th>
              <th>Watched?</th>
              {this.props.type === "wishlist" ? <th>Release Date</th> : null}
              {this.props.type !== "wishlist" ? <th>Your Review</th> : null}
            </tr>
          </thead>
          <tbody>{this.renderMovies(this.props.movies)}</tbody>
        </table>
      </div>
    );
  }
}

export default TableList;
