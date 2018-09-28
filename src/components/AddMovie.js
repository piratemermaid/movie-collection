import React, { Component } from "react";
import { withRouter } from "react-router";
import { Autocomplete } from "react-materialize";

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

  getTagData() {
    const allTags = this.props.getAllTags();
    let data = {};
    for (let i in allTags) {
      data[allTags[i]] = null;
    }
    return data;
  }

  render() {
    return (
      <div className="row">
        <div className="col s12">
          <div className="row">
            <form onSubmit={e => this.addMovie(e)}>
              <div className="input-field col s12">
                <input
                  id="movie-title"
                  type="text"
                  value={this.state.title}
                  onChange={e => this.onTitleChange(e)}
                />
                <label htmlFor="movie-title">Movie Title</label>
              </div>
              <div className="input-field col s8">
                <input
                  id="movie-year"
                  type="number"
                  value={this.state.year}
                  onChange={e => this.onYearChange(e)}
                />
                <label htmlFor="movie-year">Year</label>
              </div>
              <div className="input-field col s4">
                <input
                  id="movie-watched"
                  type="checkbox"
                  onClick={e => this.onWatchedChange(e)}
                />
                <label htmlFor="movie-watched">Watched?</label>
              </div>
              <div className="input-field col s12">
                <Autocomplete id="movie-tags" data={this.getTagData()} />
                <label htmlFor="movie-tags">Tags</label>
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
        </div>
      </div>
    );
  }
}

export default withRouter(AddMovie);
