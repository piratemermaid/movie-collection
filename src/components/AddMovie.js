import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

class AddMovie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      year: "",
      tags: [],
      watched: false,
      added: "",
      titleErr: "",
      yearErr: "",
      tagsErr: ""
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
    if (!errors) {
      const info = {
        title: this.state.title,
        year: this.state.year,
        tags,
        watched: this.state.watched,
        added: this.state.added
      };
      const type = this.props.match.params.type;
      this.props.addMovie(info, type);
      this.props.history.push(`/${type}`);
    }
  }

  onTitleChange(e) {
    this.setState({ title: e.target.value, titleErr: "" });
  }

  onYearChange(e) {
    this.setState({ year: e.target.value, yearErr: "" });
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

  renderTags() {
    const allTags = this.props.getAllTags();
    let tagArr = [];
    for (let i in allTags) {
      tagArr.push(
        <div
          className="search-tag col s2"
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
    const now = new Date();
    let day = now.getDay();
    if (day < 10) {
      day = "0" + String(day);
    }
    let month = now.getMonth() + 1;
    if (month < 10) {
      month = "0" + String(month);
    }
    const year = now.getFullYear();
    this.setState({ added: `${year}-${day}-${month}` });
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
