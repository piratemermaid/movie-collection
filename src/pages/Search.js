import React from "react";
import { withRouter } from "react-router";

import SearchByYear from "../components/SearchByYear";
import SearchByTag from "../components/SearchByTag";
import SearchByReview from "../components/SearchByReview";

/**
 * @param {string} display: render input for the selected type of display
 * e.g. when user clicks "search by year", display a form
 * where they can enter the year and search options
 */
const Search = props => {
    let cardClass = "card search-section link-hover card-link";

    function renderSearchType(type, text) {
        return (
            <div
                className={
                    props.display === type
                        ? `${cardClass} card-link-active`
                        : cardClass
                }
            >
                {text}
            </div>
        );
    }

    return (
        <div>
            <div className="row">
                <div className="col s12">
                    <div className="col s3 flex center-align">
                        {renderSearchType("tags", "search by tag(s)")}
                    </div>
                    <div className="col s3 flex center-align">
                        {renderSearchType("year", "search by year")}
                    </div>
                    <div className="col s3 flex center-align">
                        {renderSearchType("review", "search by review")}
                    </div>
                    <div className="col s3 flex center-align">
                        <div
                            className={cardClass}
                            onClick={() =>
                                props.history.push("/search/unwatched")
                            }
                        >
                            <h6>view all unwatched</h6>
                            <i className="material-icons small icon-link">
                                arrow_forward
                            </i>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col s12">
                    {props.display === "year" ? <SearchByYear /> : null}
                    {props.display === "tags" ? (
                        <SearchByTag getAllTags={props.getAllTags} />
                    ) : null}
                    {props.display === "review" ? <SearchByReview /> : null}
                </div>
            </div>
        </div>
    );
};

export default withRouter(Search);
