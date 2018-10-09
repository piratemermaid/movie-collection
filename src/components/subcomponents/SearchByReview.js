import React, { Component } from "react";
import { withRouter } from "react-router";

/**
 * Options:
 * exact: searching for exact number of stars.
 * up: *number* and up stars aka good movies
 * down: *number* and down aka bad movies
 */
class SearchByReview extends Component {
  constructor(props) {
    super(props);

    this.state = { option: "exact", review: false, formErr: "" };
  }

  searchByReview(e) {
    e.preventDefault();
    if (!this.state.option) {
      this.setState({ formErr: "Please choose a search option" });
    } else {
      //   '/search/reviews/:review/:option'
      let url = `/search/reviews/${this.state.review}/${this.state.option}`;
      this.props.history.push(url);
    }
  }

  onOptionChange(option) {
    if (option === this.state.option) {
      // 'exact' by default
      this.setState({ option: "exact" });
    } else {
      this.setState({ option });
    }
  }

  onReviewChange(num) {
    if (num === this.state.review) {
      this.setState({ review: false });
    } else {
      this.setState({ review: num });
    }
  }

  getStarClass(num) {
    let starClass = "material-icons small icon-link review-star";
    if (this.state.review && this.state.review >= num) {
      starClass += " review-star-active";
    }
    return starClass;
  }

  render() {
    return (
      <form onSubmit={e => this.searchByReview(e)}>
        <div className="input-field col s12">
          <p className="form-label">Your review</p>
          <i
            className={this.getStarClass(1)}
            onClick={() => this.onReviewChange(1)}
          >
            star
          </i>
          <i
            className={this.getStarClass(2)}
            onClick={() => this.onReviewChange(2)}
          >
            star
          </i>
          <i
            className={this.getStarClass(3)}
            onClick={() => this.onReviewChange(3)}
          >
            star
          </i>
          <i
            className={this.getStarClass(4)}
            onClick={() => this.onReviewChange(4)}
          >
            star
          </i>
          <i
            className={this.getStarClass(5)}
            onClick={() => this.onReviewChange(5)}
          >
            star
          </i>
        </div>
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
            id="review-up"
            type="checkbox"
            checked={this.state.option === "up"}
            onChange={() => this.onOptionChange("up")}
            className="checkbox-blue"
          />
          <label htmlFor="review-up">Chosen star number and up</label>
        </div>
        <div className="input-field col s12" style={{ marginBottom: "20px" }}>
          <input
            id="review-down"
            type="checkbox"
            checked={this.state.option === "down"}
            onChange={() => this.onOptionChange("down")}
            className="checkbox-blue"
          />
          <label htmlFor="review-down">Chosen star number and down</label>
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

export default withRouter(SearchByReview);
