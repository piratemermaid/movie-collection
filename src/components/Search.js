import React, { Component } from "react";
import { withRouter } from "react-router";

import SearchByYear from "./subcomponents/SearchByYear";
import SearchByTag from "./subcomponents/SearchByTag";

/**
 * @param {string} display: render input for the selected type of display
 * e.g. when user clicks "search by year", display a form
 * where they can enter the year and search options
 */
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { display: "tags" }; //TODO: change back to 'unwatched'
  }

  render() {
    let cardClass = "card search-section link-hover card-link";

    return (
      <div className="row flex">
        <div className="col s4 flex center-align">
          <div
            className={
              this.state.display === "tags"
                ? `${cardClass} card-link-active`
                : cardClass
            }
            onClick={() => this.setState({ display: "tags" })}
          >
            <h5>search by tag(s)</h5>
          </div>
        </div>
        <div className="col s4 flex center-align">
          <div
            className={
              this.state.display === "year"
                ? `${cardClass} card-link-active`
                : cardClass
            }
            onClick={() => this.setState({ display: "year" })}
          >
            <h5>search by year</h5>
          </div>
        </div>
        <div className="col s4 flex center-align">
          <div
            className={cardClass}
            onClick={() => this.props.history.push("/search/unwatched")}
          >
            <h5>view all unwatched</h5>
            <i className="material-icons small icon-link">arrow_forward</i>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            {this.state.display === "year" ? <SearchByYear /> : null}
            {this.state.display === "tags" ? (
              <SearchByTag getAllTags={this.props.getAllTags} />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Search);
