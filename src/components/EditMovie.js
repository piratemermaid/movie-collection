import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

class EditMovie extends Component {
  constructor(props) {
    super(props);

    this.state = { type: "" };
  }

  onTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  onYearChange(e) {
    this.setState({ year: e.target.value });
  }

  onWatchedChange(e) {
    this.setState({ watched: e.target.checked });
  }

  onTagsChange(e) {
    // TODO: better way to input than separating by spaces
    this.setState({ tags: e.target.value, tagsErr: "" });
  }

  onAddedChange(e) {
    this.setState({ added: e.target.value });
  }

  onReleaseDateChange(e) {
    this.setState({ releaseDate: e.target.value });
  }

  updateMovie(e) {
    e.preventDefault();

    let tags;

    if (String(this.state.tags.length) > 0) {
      tags = this.state.tags.split(" ");
      tags = tags.filter(val => val); // get rid of empty values
    } else {
      tags = [];
    }
    const info = {
      title: this.state.title,
      year: this.state.year,
      tags,
      watched: this.state.watched,
      added: this.state.added
    };

    if (this.state.type === "wishlist") {
      info.releaseDate = this.state.releaseDate || "Unknown";
    }

    this.props.editMovie(info, this.props.match.params.title, this.state.type);
    this.props.history.push(`/${this.state.type}`);
  }

  componentWillMount() {
    const title = this.props.match.params.title;
    let obj;
    const findInCollection = this.props.movies.collection.filter(movie => {
      return movie.title === title;
    });
    if (findInCollection.length > 0) {
      this.setState({ type: "collection" });
      obj = this.props.movies.collection;
    } else {
      this.setState({ type: "wishlist" });
      obj = this.props.movies.wishlist;
    }

    const info = obj.filter(movie => {
      return movie.title === title;
    })[0];

    if (typeof info.tags !== "string") {
      let tagStr = "";
      for (let i in info.tags) {
        tagStr += info.tags[i];
        if (i < info.tags.length - 1) {
          tagStr += " ";
        }
      }
      info.tags = tagStr;
    }

    this.setState(info);
  }

  render() {
    return (
      <div>
        <Link to={`/${this.state.type}`}>
          <i className="material-icons small icon-link">arrow_back</i>
        </Link>
        <Link to={`/${this.state.type}`}>
          <i
            className="material-icons small icon-link float-right"
            onClick={() =>
              this.props.deleteMovie(this.state.title, this.state.type)
            }
          >
            delete
          </i>
        </Link>
        <h5>edit {this.state.title}</h5>
        <div className="row">
          <form onSubmit={e => this.updateMovie(e)}>
            <div className="input-field col s12">
              <p className="form-label">Title</p>
              <input
                id="input-title"
                type="text"
                value={this.state.title}
                onChange={e => this.onTitleChange(e)}
              />
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
                checked={this.state.watched ? "checked" : ""}
                onChange={e => this.onWatchedChange(e)}
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
                Added to {this.state.type} (defaults to now)
              </p>
              <input
                id="input-added"
                type="text"
                value={this.state.added}
                onChange={e => this.onAddedChange(e)}
              />
              <div className="form-err">{this.state.titleErr}</div>
            </div>
            {this.state.type === "wishlist" ? (
              <div className="input-field col s12">
                <p className="form-label">
                  Release date if known, or can put "released" if already
                  released
                </p>
                <input
                  id="input-release"
                  type="text"
                  value={this.state.releaseDate}
                  onChange={e => this.onReleaseDateChange(e)}
                />
              </div>
            ) : null}
            <div className="input-field col s12">
              <button
                className="btn waves-effect waves-light blue lighten-2"
                onClick={e => this.updateMovie(e)}
              >
                Update
                <i className="material-icons right" />
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(EditMovie);
