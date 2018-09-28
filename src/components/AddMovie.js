import React, { Component } from "react";
import { withRouter } from "react-router";

class AddMovie extends Component {
  constructor(props) {
    super(props);

    this.state = { title: "", year: "", tags: [], watched: false };
  }

  addMovie(e) {
    e.preventDefault();

    const info = {
      title: this.state.title,
      year: this.state.year,
      tags: this.state.tags,
      watched: this.state.watched
    };
    const type = this.props.match.params.type;
    this.props.addMovie(info, type);
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
    this.setState({ tags: e.target.value });
  }

  updateTags(tag) {
    let tagStr = this.state.tags;
    if (tagStr.includes(tag)) {
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

  render() {
    return (
      <div className="row">
        <div className="col s12">
          <div className="row">
            <form onSubmit={e => this.addMovie(e)}>
              <div className="input-field col s12">
                <input
                  id="input-title"
                  type="text"
                  value={this.state.title}
                  onChange={e => this.onTitleChange(e)}
                />
                <label htmlFor="input-title">Title</label>
              </div>
              <div className="input-field col s8">
                <input
                  id="input-year"
                  type="number"
                  value={this.state.year}
                  onChange={e => this.onYearChange(e)}
                />
                <label htmlFor="input-year">Year</label>
              </div>
              <div
                className="input-field col s4"
                style={{ paddingTop: "46px" }}
              >
                <input
                  id="input-movie"
                  type="checkbox"
                  onClick={e => this.onWatchedChange(e)}
                  className="checkbox-blue"
                />
                <label htmlFor="input-movie">Watched?</label>
              </div>
              <div className="input-field col s12">
                <input
                  id="input-tags"
                  type="text"
                  value={this.state.tags}
                  onChange={e => this.onTagsChange(e)}
                />
                <label htmlFor="input-tags">
                  Tags, separated by spaces (e.g. nerdy comedy romantic
                  girlsnight)
                </label>
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
