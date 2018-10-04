import React, { Component } from "react";
import { withRouter } from "react-router";

class SearchByYear extends Component {
  constructor(props) {
    super(props);

    this.state = {
      range: false,
      before: false,
      after: false,
      fromYear: 2017,
      toYear: 2018,
      yearErr: ""
    };
  }

  onFromYearChange(e) {
    this.setState({ fromYear: e.target.value });
  }

  onToYearChange(e) {
    this.setState({ toYear: e.target.value });
  }

  onRangeChange(e) {
    this.setState({ range: e.target.checked });
  }

  onBeforeChange(e) {
    this.setState({ before: e.target.checked, after: false, range: false });
  }

  onAfterChange(e) {
    this.setState({ after: e.target.checked, before: false, range: false });
  }

  searchByYear(e) {
    let options = "options=";
    if (this.state.range) {
      options += `range_from_${this.state.fromYear}`;
    } else if (this.state.after) {
      options += `after`;
    } else if (this.state.before) {
      options += "before";
    } else {
      options += "none";
    }

    let url = `/search/year/${this.state.toYear}/${options}`;
    this.props.history.push(url);

    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={e => this.searchByYear(e)}>
        {this.state.range ? (
          <div className="input-field col s6">
            <p className="form-label">
              {this.state.range ? "From Year" : "Year"}
            </p>
            <input
              type="number"
              value={this.state.fromYear}
              onChange={e => this.onFromYearChange(e)}
            />
            <div className="form-err">{this.state.yearErr}</div>
          </div>
        ) : null}
        <div className="input-field col s6">
          <p className="form-label">{this.state.range ? "To Year" : "Year"}</p>
          <input
            type="number"
            value={this.state.toYear}
            onChange={e => this.onToYearChange(e)}
          />
          <div className="form-err">{this.state.yearErr}</div>
        </div>
        <div className="row col s12">
          <p className="info">Additional options:</p>
        </div>
        <div className="input-field col s12" style={{ marginBottom: "20px" }}>
          <input
            id="year-range"
            type="checkbox"
            checked={this.state.range}
            onChange={e => this.onRangeChange(e)}
            className="checkbox-blue"
          />
          <label htmlFor="year-range">Search a range of years</label>
        </div>
        {this.state.range ? null : (
          <div className="input-field col s6" style={{ marginBottom: "20px" }}>
            <input
              id="year-before"
              type="checkbox"
              checked={this.state.before}
              onChange={e => this.onBeforeChange(e)}
              className="checkbox-blue"
            />
            <label htmlFor="year-before">Before {this.state.toYear}</label>
          </div>
        )}
        {this.state.range ? null : (
          <div className="input-field col s6" style={{ marginBottom: "20px" }}>
            <input
              id="year-after"
              type="checkbox"
              checked={this.state.after}
              onChange={e => this.onAfterChange(e)}
              className="checkbox-blue"
            />
            <label htmlFor="year-after">After {this.state.toYear}</label>
          </div>
        )}
        <div className="input-field col s12">
          <button
            className="btn waves-effect waves-light blue lighten-2"
            onClick={e => this.searchByYear(e)}
          >
            Search
            <i className="material-icons right">search</i>
          </button>
        </div>
      </form>
    );
  }
}

export default withRouter(SearchByYear);
