import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

class EditMovie extends Component {
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

  updateMovie(e) {
    e.preventDefault();
    this.props.editMovie(this.state);
    this.props.history.push("/collection");
  }

  componentWillMount() {
    const title = this.props.match.params.title;
    const info = this.props.movies.collection.filter(movie => {
      return movie.title === title;
    })[0];
    let tagStr = "";
    for (let i in info.tags) {
      tagStr += info.tags[i];
      if (i < info.tags.length - 1) {
        tagStr += " ";
      }
    }
    info.tags = tagStr;
    this.setState(info);
  }

  render() {
    return (
      <div>
        <Link to="/collection">
          <i className="material-icons small icon-link">arrow_back</i>
        </Link>
        <Link to="/collection">
          <i
            className="material-icons small icon-link float-right"
            onClick={() => this.props.deleteMovie(this.state.title)}
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
                Added to collection (defaults to now)
              </p>
              <input
                id="input-added"
                type="date"
                value={this.state.added}
                onChange={e => this.onAddedChange(e)}
              />
              <div className="form-err">{this.state.titleErr}</div>
            </div>
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
