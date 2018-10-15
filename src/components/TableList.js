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
    this.state = {};
    this.getSortOption = this.getSortOption.bind(this);
    this.changeSortMethod = this.changeSortMethod.bind(this);
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

  sortByMethod(method, movies) {
    if (method === "year" || method === "review") {
      return movies.sort(function(a, b) {
        // If same year or review or no year or review, sort by title
        if (a[method] === b[method]) {
          const titleA = a.title.toLowerCase();
          const titleB = b.title.toLowerCase();
          if (titleA < titleB) {
            return -1;
          }
          if (titleA > titleB) {
            return 1;
          }
        }
        // If no value, put at end
        if (!a[method] || a[method] === "?") {
          return 1;
        }
        if (!b[method] || b[method] === "?") {
          return -1;
        }
        return b[method] - a[method];
      });
    } else if (method === "title") {
      return movies.sort(function(a, b) {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        if (titleA < titleB) {
          return -1;
        }
        if (titleA > titleB) {
          return 1;
        }
        // If same title, sort by year
        if (titleA === titleB) {
          return a.year - b.year;
        }
        return 0;
      });
    } else if (method === "dateAdded") {
      // Split mm/dd/yyyy string into parts and compare each,
      // first compare year (2), then month (0), then day (1)
      return movies.sort(function(a, b) {
        let dateA = a.added.split("/");
        let dateB = b.added.split("/");

        // Temp fix for yy formatted string
        // TODO: make sure movies have 4 digits for year
        if (dateA[2].length === 2) {
          dateA[2] = "20" + dateA[2];
        }
        if (dateB[2].length === 2) {
          dateB[2] = "20" + dateB[2];
        }

        if (dateA[2] > dateB[2]) {
          return -1;
        }
        if (dateA[2] < dateB[2]) {
          return 1;
        }
        if (dateA[2] === dateB[2]) {
          if (dateA[0] > dateB[0]) {
            return -1;
          }
          if (dateA[0] < dateB[0]) {
            return 1;
          }
          if (dateA[0] === dateB[0]) {
            if (dateA[1] > dateB[1]) {
              return -1;
            }
            if (dateA[1] < dateB[1]) {
              return 1;
            }
            // If date is exactly the same, go by title
            if (dateA[1] === dateB[1]) {
              const titleA = a.title.toLowerCase();
              const titleB = b.title.toLowerCase();
              if (titleA < titleB) {
                return -1;
              }
              if (titleA > titleB) {
                return 1;
              }
              if (titleA === titleB) {
                // TODO: show most recent first
              }
              return 0;
            }
            return 0;
          }
          return 0;
        }
        return 0;
      });
    }
  }

  renderMovies(movies) {
    let rows = [];
    const { method, ascending } = this.props.sortOption;
    let sortedMovies = this.sortByMethod(method, movies);
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
          <td>
            <ul className="tags-ul">{this.renderTags(movie.tags)}</ul>
          </td>
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
        <li className={tagClass} key={i}>
          {tags[i]}
        </li>
      );
    }
    return renderTagArr;
  }

  changeSortMethod(type) {
    if (this.props.sortOption.method === type) {
      if (this.props.sortOption.ascending) {
        this.props.changeSortOption({ method: type, ascending: false });
      } else {
        this.props.changeSortOption({ method: type, ascending: true });
      }
    } else {
      this.props.changeSortOption({ method: type, ascending: true });
    }
  }

  getSortOption(type) {
    let icon;
    let iconClass = "material-icons tiny icon-link";
    if (this.props.sortOption.method === type) {
      iconClass += " icon-link-blue";
      if (this.props.sortOption.ascending) {
        icon = "up";
      } else {
        icon = "down";
      }
    } else {
      icon = "up";
    }

    return <i className={iconClass}>{`arrow_drop_${icon}`}</i>;
  }

  componentWillMount() {
    if (
      this.props.type === "wishlist" &&
      this.props.sortOption.method === "review"
    ) {
      this.changeSortMethod("dateAdded");
    }
  }

  render() {
    return (
      <div>
        <SortOptions
          sortBy={this.props.sortOption.method}
          changeSortMethod={this.changeSortMethod}
          getSortOption={this.getSortOption}
          type={this.props.type}
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
