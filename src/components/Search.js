import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

/**
 * @param {string} display: render input for the selected type of display
 * e.g. when user clicks "search by year", display a form
 * where they can enter the year and search options
 */
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { display: "unwatched" };
  }

  renderAllTags() {
    const tagList = this.props.getAllTags();
    let tagsRender = [];
    for (let i in tagList) {
      tagsRender.push(
        <Link
          className="search-tag col s2"
          key={i}
          to={`/search/tags/${tagList[i]}`}
        >
          {tagList[i]}
        </Link>
      );
    }

    return tagsRender;
  }
  render() {
    let cardClass = "card search-section link-hover card-link";

    return (
      <div className="row flex">
        <div className="col s4 flex center-align">
          <div
            className={cardClass}
            onClick={() => this.props.history.push("/search/unwatched")}
          >
            <h5>view all unwatched</h5>
            <i className="material-icons small icon-link">arrow_forward</i>
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
        <div className="row">
          <div className="col s12">
            {this.state.display === "year" ? <div>search by year</div> : null}
            {this.state.display === "tags" ? (
              <div>
                <p>
                  Click 1 or more tags you want to search for and hit "Search"
                </p>
                {this.renderAllTags()}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Search);
