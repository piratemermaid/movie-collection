import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import { formatTodaysDate } from "../utils";

class AddMovie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      year: "",
      tags: [],
      watched: false,
      added: "",
      formErr: "",
      titleErr: "",
      yearErr: "",
      tagsErr: "",
      releaseDate: ""
    };
  }

  addMovie(e) {
    e.preventDefault();
    let errors = false;

    if (!this.state.title) {
      this.setState({ titleErr: "Please enter a title." });
      errors = true;
    }
    if (this.state.year && this.state.year.length !== 4) {
      this.setState({ yearErr: "Please enter a valid year." });
      errors = true;
    }

    // not doing tags error for now because I think
    // it's OK not to have tags
    let tags;
    if (this.state.tags.length > 0) {
      tags = this.state.tags.split(" ");
      tags = tags.filter(val => val); // get rid of empty values
    } else {
      tags = [];
    }

    const type = this.props.match.params.type;
    const movies = this.props.movies[type];

    /**
     * If the movie title is already in the list,
     * and the year is different, add the year
     * to both movie titles (to differentiate remakes)
     */
    let newAddTitle;
    for (let i in movies) {
      if (movies[i].title === this.state.title) {
        if (movies[i].year !== this.state.year) {
          newAddTitle = `${this.state.title} (${this.state.year})`;
          let newEditTitle = `${movies[i].title} (${movies[i].year})`;
          movies[i].title = newEditTitle;
          this.props.editMovie(movies[i].title, "", type);
          break;
        } else {
          this.setState({ formErr: `Movie is already in ${type}` });
          errors = true;
        }
      }
    }

    if (!errors) {
      const info = {
        title: newAddTitle || this.state.title,
        year: this.state.year,
        tags,
        watched: this.state.watched,
        added: this.state.added
      };
      if (!this.state.added) {
        // TODO: check date format
        info.added = formatTodaysDate();
      }

      if (type === "wishlist") {
        info.releaseDate = this.state.releaseDate || "unknown";
      }
      this.props.addMovie(info, type);
      this.props.history.push(`/${type}`);
    }
  }

  onTitleChange(e) {
    this.setState({ title: e.target.value, titleErr: "", formErr: "" });
  }

  onYearChange(e) {
    this.setState({ year: e.target.value, yearErr: "", formErr: "" });
  }

  onWatchedChange(e) {
    this.setState({ watched: e.target.checked, formErr: "" });
  }

  onTagsChange(e) {
    // TODO: better way to input than separating by spaces
    this.setState({ tags: e.target.value, tagsErr: "", formErr: "" });
  }

  onAddedChange(e) {
    this.setState({ added: e.target.value, formErr: "" });
  }

  onReleaseDateChange(e) {
    this.setState({ releaseDate: e.target.value, formErr: "" });
  }

  updateTags(tag) {
    let tagStr = this.state.tags;
    if (tagStr.includes(tag) || tag === "") {
      return;
    }
    if (tagStr !== "") {
      tagStr += " ";
    }
    tagStr += tag;
    this.setState({ tags: tagStr });
  }

  renderTags() {
    const allTags = this.props.getAllTags();
    let tagArr = [];
    for (let i in allTags) {
      let tagClass = "search-tag col s2";
      if (this.state.tags.includes(allTags[i])) {
        tagClass += " tag-match";
      }
      tagArr.push(
        <div
          className={tagClass}
          key={i}
          onClick={() => this.updateTags(allTags[i])}
        >
          {allTags[i]}
        </div>
      );
    }
    return tagArr;
  }

  componentWillMount() {
    const today = formatTodaysDate();
    this.setState({ added: today });
  }

  render() {
    const type = this.props.match.params.type;
    return (
      <div className="row">
        <div className="col s12">
          <Link to={`/${type}`}>
            <i className="material-icons small icon-link">arrow_back</i>
          </Link>
          <h5>Add to {type === "collection" ? "Collection" : "Wishlist"}</h5>
          <div className="row">
            <form onSubmit={e => this.addMovie(e)}>
              <div className="input-field col s12">
                <p className="form-label">Title</p>
                <input
                  id="input-title"
                  type="text"
                  value={this.state.title}
                  onChange={e => this.onTitleChange(e)}
                />
                <div className="form-err">{this.state.titleErr}</div>
              </div>
              <div className="input-field col s8">
                <p className="form-label">Year</p>
                <input
                  id="input-year"
                  type="number"
                  value={this.state.year}
                  onChange={e => this.onYearChange(e)}
                />
                <div className="form-err">{this.state.yearErr}</div>
              </div>
              <div className="input-field col s4">
                <input
                  id="input-movie"
                  type="checkbox"
                  onClick={e => this.onWatchedChange(e)}
                  className="checkbox-blue"
                />
                <label htmlFor="input-movie">Watched?</label>
              </div>
              <div className="input-field col s12">
                <p className="form-label">
                  Tags, separated by spaces (e.g. nerdy comedy romantic
                  girlsnight)
                </p>
                <input
                  id="input-tags"
                  type="text"
                  value={this.state.tags}
                  onChange={e => this.onTagsChange(e)}
                />
                <div className="form-err">{this.state.tagsErr}</div>
              </div>
              <div className="input-field col s12">
                <p className="form-label">
                  Added to collection (defaults to today, format MM/DD/YYYY)
                </p>
                <input
                  id="input-added"
                  type="text"
                  value={this.state.added}
                  onChange={e => this.onAddedChange(e)}
                />
                <div className="form-err">{this.state.dateErr}</div>
              </div>
              {type === "wishlist" ? (
                <div className="input-field col s12">
                  <p className="form-label">
                    Release date if known, or can put "released" if already
                    released
                  </p>
                  <input
                    id="input-release"
                    type="text"
                    value={this.state.release}
                    onChange={e => this.onReleaseDateChange(e)}
                  />
                </div>
              ) : null}
              <div className="input-field col s12">
                <p className="form-err">{this.state.formErr}</p>{" "}
                <button
                  className="btn waves-effect waves-light blue lighten-2"
                  onClick={e => this.addMovie(e)}
                >
                  Add
                  <i className="material-icons right" />
                </button>
              </div>
            </form>
          </div>
          <div className="row">
            <div className="card">
              <div className="card-content">
                <div className="card-title" style={{ marginBottom: "28px" }}>
                  Existing tags (click to add)
                </div>
                <div className="row">{this.renderTags()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(AddMovie);
