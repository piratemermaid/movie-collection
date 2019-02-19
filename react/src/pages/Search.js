import React from "react";
import { withRouter } from "react-router";

import TagSelect from "../components/TagSelect";

// TODO: error check include & exclude same tag
const Search = props => {
    const { searchOptions } = props;
    const { reviewFilter } = searchOptions;

    function getTagsFromSelect(tags, type) {
        if (type === "search_option_include") {
            props.changeSearchOptions("includeTags", tags);
        } else {
            props.changeSearchOptions("excludeTags", tags);
        }
    }

    function onUnwatchedOnlyChange() {
        // If becoming true, make sure watchedOnly is false
        if (!props.searchOptions.unwatchedOnly) {
            props.changeSearchOptions("watchedOnly", false);
        }
        // Toggle unwatchedOnly option
        props.changeSearchOptions(
            "unwatchedOnly",
            !props.searchOptions.unwatchedOnly
        );
    }

    function onWatchedOnlyChange() {
        // If becoming true, make sure watchedOnly is false
        if (!props.searchOptions.watchedOnly) {
            props.changeSearchOptions("unwatchedOnly", false);
        }
        // Toggle unwatchedOnly option
        props.changeSearchOptions(
            "watchedOnly",
            !props.searchOptions.watchedOnly
        );
    }

    function onStarClick(i) {
        if (reviewFilter.length === 0) {
            props.changeSearchOptions("reviewFilter", [i]);
        } else if (reviewFilter.length === 1) {
            // If there's only one review filter, add another value
            // which makes a min & max
            const current = reviewFilter[0];
            if (i === current) {
                // If clicked review is already there, remove filter
                props.changeSearchOptions("reviewFilter", []);
            } else if (i < current) {
                // If clicked review is less than what's there, add it as the min
                props.changeSearchOptions("reviewFilter", [i, current]);
            } else {
                // If clicked review is greater than what's there, add it as the max
                props.changeSearchOptions("reviewFilter", [current, i]);
            }
        } else {
            const currentMin = reviewFilter[0];
            const currentMax = reviewFilter[1];
            if (i === currentMin) {
                // If clicked review equals the minimum, remove the minimum
                props.changeSearchOptions("reviewFilter", [currentMax]);
            } else if (i === currentMax) {
                // If clicked review equals the maximum, remove the maximum
                props.changeSearchOptions("reviewFilter", [currentMin]);
            } else if (i < currentMin) {
                // If clicked review is less than the minimum,
                // make it the new minimum
                props.changeSearchOptions("reviewFilter", [i, currentMax]);
            } else if (i > currentMax) {
                // If clicked review is greater than the maximum,
                // make it the new maximum
                props.changeSearchOptions("reviewFilter", [currentMin, i]);
            } else if (i > currentMin && i < currentMax) {
                // If clicked review is between the min and max,
                // set it to the closest one or to the new min,
                // assuming users want to see higher rated movies
                const diffMin = i - currentMin;
                const diffMax = currentMax - i;
                if (diffMin > diffMax) {
                    props.changeSearchOptions("reviewFilter", [currentMin, i]);
                } else {
                    props.changeSearchOptions("reviewFilter", [i, currentMax]);
                }
            }
        }
    }

    function getStarClass(i) {
        let starClass = "material-icons small icon-link review-star";
        // If this number is in the reviewFilter,
        // or between 2 reviewFilter numbers, add active class
        if (reviewFilter.includes(i)) {
            starClass += " review-star-active";
        } else if (reviewFilter.length > 1) {
            if (i > reviewFilter[0] && i < reviewFilter[1]) {
                starClass += " review-star-active";
            }
        }
        return starClass;
    }

    function renderReviewFilter() {
        let starArr = [];
        for (let i = 1; i <= 5; i++) {
            starArr.push(
                <i
                    className={getStarClass(i)}
                    onClick={() => onStarClick(i)}
                    key={i}
                >
                    star
                </i>
            );
        }

        return starArr;
    }

    function submitSearch() {
        // Error check

        // Reroute to SearchResult page
        props.history.push("/search_result");
    }

    return (
        <div id="search">
            <div className="row">
                <div className="col s12">
                    <h2>Search</h2>
                </div>
            </div>
            <div className="row">
                <div className="col s12">
                    <h6>Include tags:</h6>
                    <TagSelect
                        creatable={false}
                        getAllTags={props.getAllTags}
                        getTagsFromSelect={getTagsFromSelect}
                        type="search_option_include"
                        skip={searchOptions.excludeTags}
                        tags={searchOptions.includeTags}
                    />
                </div>
            </div>
            {/* use only? */}
            <div className="row">
                <div className="col s12">
                    <h6>Exclude tags:</h6>
                    <TagSelect
                        creatable={false}
                        getAllTags={props.getAllTags}
                        getTagsFromSelect={getTagsFromSelect}
                        type="search_option_exclude"
                        skip={searchOptions.includeTags}
                        tags={searchOptions.excludeTags}
                    />
                </div>
            </div>
            {/* year slider */}
            {/* review slider */}
            <br />
            <div className="row">
                <div className="col l4 s12">
                    <h3>watched/unwatched only</h3>
                    <div
                        className="col checkbox-wrapper"
                        onClick={() => onUnwatchedOnlyChange()}
                    >
                        <input
                            type="checkbox"
                            checked={
                                props.searchOptions.unwatchedOnly ? true : false
                            }
                            onChange={() => onUnwatchedOnlyChange()}
                        />
                        <span>Unwatched only</span>
                    </div>
                    <div
                        className="col checkbox-wrapper"
                        onClick={() => onWatchedOnlyChange()}
                    >
                        <input
                            type="checkbox"
                            checked={
                                props.searchOptions.watchedOnly ? true : false
                            }
                            onChange={() => onWatchedOnlyChange()}
                        />
                        <span>Watched only</span>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col l4 s12">
                    <h3>filter by your reviews</h3>
                    {renderReviewFilter()}
                </div>
            </div>
            <div className="row">
                <div className="col s12">
                    <br />
                    <button
                        className="btn blue lighten-2"
                        onClick={() => submitSearch()}
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Search);
