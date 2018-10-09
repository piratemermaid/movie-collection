import React, { Component } from "react";
import { withRouter } from "react-router";

import SearchByYear from "./subcomponents/SearchByYear";
import SearchByTag from "./subcomponents/SearchByTag";
import SearchByReview from "./subcomponents/SearchByReview";

/**
 * @param {string} display: render input for the selected type of display
 * e.g. when user clicks "search by year", display a form
 * where they can enter the year and search options
 */
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { display: "review" }; //TODO: change back to 'tags'
  }

  render() {
    let cardClass = "card search-section link-hover card-link";

    return (
      <div className="row flex">
        <div className="col s3 flex center-align">
          <div
            className={
              this.state.display === "tags"
                ? `${cardClass} card-link-active`
                : cardClass
            }
            onClick={() => this.setState({ display: "tags" })}
          >
            <h6>search by tag(s)</h6>
          </div>
        </div>
        <div className="col s3 flex center-align">
          <div
            className={
              this.state.display === "year"
                ? `${cardClass} card-link-active`
                : cardClass
            }
            onClick={() => this.setState({ display: "year" })}
          >
            <h6>search by year</h6>
          </div>
        </div>
        <div className="col s3 flex center-align">
          <div
            className={cardClass}
            onClick={() => this.props.history.push("/search/unwatched")}
          >
            <h6>view all unwatched</h6>
            <i className="material-icons small icon-link">arrow_forward</i>
          </div>
        </div>
        <div className="col s3 flex center-align">
          <div
            className={
              this.state.display === "review"
                ? `${cardClass} card-link-active`
                : cardClass
            }
            onClick={() => this.setState({ display: "review" })}
          >
            <h6>search by review</h6>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            {this.state.display === "year" ? <SearchByYear /> : null}
            {this.state.display === "tags" ? (
              <SearchByTag getAllTags={this.props.getAllTags} />
            ) : null}
            {this.state.display === "review" ? <SearchByReview /> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Search);
