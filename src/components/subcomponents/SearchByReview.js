import React, { Component } from "react";
import { withRouter } from "react-router";

/**
 * Options:
 * exact: searching for exact number of stars.
 * andUp: *number* and up stars aka good movies
 * andDown: *number* and down aka bad movies
 */
class SearchByReview extends Component {
  constructor(props) {
    super(props);

    this.state = { option: "exact", stars: false, formErr: "" };
  }

  searchByReview(e) {
    e.preventDefault();
    if (!this.state.option) {
      this.setState({ formErr: "Please choose a search option" });
    }
    if (!this.state.stars) {
      this.setState({ formErr: "Please choose a star amount" });
    }
    console.log(this.state.option, this.state.stars);
  }

  onOptionChange(option) {
    if (option === this.state.option) {
      // 'exact' by default
      this.setState({ option: "exact" });
    } else {
      this.setState({ option });
    }
  }

  render() {
    return (
      <form onSubmit={e => this.searchByReview(e)}>
        <div className="input-field col s12">row of stars</div>
        <div className="row col s12">
          <p className="info">Options:</p>
        </div>
        <div className="input-field col s12" style={{ marginBottom: "20px" }}>
          <input
            id="review-exact"
            type="checkbox"
            checked={this.state.option === "exact"}
            onChange={() => this.onOptionChange("exact")}
            className="checkbox-blue"
          />
          <label htmlFor="review-exact">Exact amount of stars</label>
        </div>
        <div className="input-field col s12" style={{ marginBottom: "20px" }}>
          <input
            id="review-andUp"
            type="checkbox"
            checked={this.state.option === "andUp"}
            onChange={() => this.onOptionChange("andUp")}
            className="checkbox-blue"
          />
          <label htmlFor="review-andUp">Chosen star number and up</label>
        </div>
        <div className="input-field col s12" style={{ marginBottom: "20px" }}>
          <input
            id="review-andDown"
            type="checkbox"
            checked={this.state.option === "andDown"}
            onChange={() => this.onOptionChange("andDown")}
            className="checkbox-blue"
          />
          <label htmlFor="review-andDown">Chosen star number and down</label>
        </div>
        <br />
        <div className="row col s12" style={{ marginTop: "20px" }}>
          <p className="form-err">{this.state.formErr}</p>
        </div>
        <div className="input-field col s12">
          <button
            className="btn waves-effect waves-light blue lighten-2"
            onClick={e => this.searchByReview(e)}
          >
            Search
            <i className="material-icons right">search</i>
          </button>
        </div>
      </form>
    );
  }
}

export default SearchByReview;
