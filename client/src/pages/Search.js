import React from "react";
import { withRouter } from "react-router";
import TagSelect from "../components/TagSelect";
import NoMovies from "../components/NoMovies";
import PageHeading from "../components/PageHeading";

// TODO: error check include & exclude same tag
const Search = (props) => {
    const { searchOptions } = props;
    const { reviewFilter, yearFilter } = searchOptions;

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

    function getStarClass(i) {
        let starClass = "material-icons small icon-link review-star no-hover";
        // If this number is in the reviewFilter,
        // or between 2 reviewFilter numbers, add active class
        if (reviewFilter.includes(i)) {
            starClass += " review-star-active";
        } else if (reviewFilter.length > 1) {
            if (i >= reviewFilter[0] && i <= reviewFilter[1]) {
                starClass += " review-star-active";
            }
        }
        return starClass;
    }

    function getReviewMinMax(type) {
        if (type === "min") {
            // Get the minimum value for the max input.
            // 1 if there's no set min,
            // otherwise it will be the min + 1.
            if (!reviewFilter[0]) {
                return 1;
            } else {
                return reviewFilter[0] + 1;
            }
        } else {
            // Get the maximum value for the min input.
            // 5 if there's no set max,
            // otherwise it will be the max - 1.
            if (!reviewFilter[1]) {
                return 5;
            } else {
                return reviewFilter[1] - 1;
            }
        }
    }

    function renderReviewFilter() {
        let starArr = [];
        for (let i = 1; i <= 5; i++) {
            starArr.push(
                <i className={getStarClass(i)} key={i}>
                    star
                </i>
            );
        }

        return starArr;
    }

    function onReviewFilterChange(e, type) {
        const review = parseInt(e.target.value, 10);

        if (type === "min") {
            props.changeSearchOptions("reviewFilter", [
                review,
                reviewFilter[1]
            ]);
        } else {
            props.changeSearchOptions("reviewFilter", [
                reviewFilter[0],
                review
            ]);
        }
    }

    function onYearFilterChange(e, type) {
        const year = parseInt(e.target.value, 10);

        if (type === "min") {
            props.changeSearchOptions("yearFilter", [year, yearFilter[1]]);
        } else {
            props.changeSearchOptions("yearFilter", [yearFilter[0], year]);
        }
    }

    function submitSearch() {
        // TODO: Error checks
        // e.g. make sure min & max reviews are valid

        // Reroute to SearchResult page
        props.history.push("/search_result");
    }

    return (
        <div id="search">
            <PageHeading heading="Search" />
            {props.movies.length > 0 ? (
                <div>
                    <div className="row">
                        <div className="col s12 no-padding-left  no-padding-right">
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
                    {/* TODO: add use only */}
                    <div className="row">
                        <div className="col s12  no-padding-left  no-padding-right">
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
                                        props.searchOptions.unwatchedOnly
                                            ? true
                                            : false
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
                                        props.searchOptions.watchedOnly
                                            ? true
                                            : false
                                    }
                                    onChange={() => onWatchedOnlyChange()}
                                />
                                <span>Watched only</span>
                            </div>
                        </div>
                        <div className="col l4 s12">
                            <h3>filter by your reviews</h3>
                            {renderReviewFilter()}
                            <br />
                            Min:{" "}
                            <input
                                type="number"
                                className="review-search-input"
                                value={reviewFilter[0]}
                                min="1"
                                max={getReviewMinMax("max")}
                                onChange={(e) => onReviewFilterChange(e, "min")}
                            />
                            Max:{" "}
                            <input
                                type="number"
                                className="review-search-input"
                                value={reviewFilter[1]}
                                min={getReviewMinMax("min")}
                                max="5"
                                onChange={(e) => onReviewFilterChange(e, "max")}
                            />
                            <a
                                onClick={() =>
                                    props.changeSearchOptions("reviewFilter", [
                                        1,
                                        5
                                    ])
                                }
                                className="reset-filter"
                            >
                                Reset
                            </a>
                            <br />
                            <br />
                            <div
                                className="col checkbox-wrapper"
                                onClick={() =>
                                    props.changeSearchOptions(
                                        "includeUnreviewed",
                                        !props.searchOptions.includeUnreviewed
                                    )
                                }
                            >
                                <input
                                    type="checkbox"
                                    checked={
                                        props.searchOptions.includeUnreviewed
                                            ? true
                                            : false
                                    }
                                    onChange={() =>
                                        props.changeSearchOptions(
                                            "includeUnreviewed",
                                            !props.searchOptions
                                                .includeUnreviewed
                                        )
                                    }
                                />
                                <span>Include unreviewed movies</span>
                            </div>
                        </div>
                        <div className="col l4 s12">
                            <h3>filter by year</h3>
                            Min:{" "}
                            <input
                                type="number"
                                className="review-search-input"
                                value={yearFilter[0]}
                                min={props.getYearRange().min}
                                max={props.getYearRange().max - 1}
                                onChange={(e) => onYearFilterChange(e, "min")}
                            />
                            Max:{" "}
                            <input
                                type="number"
                                className="review-search-input"
                                value={yearFilter[1]}
                                min={props.getYearRange().min + 1}
                                max={props.getYearRange().max}
                                onChange={(e) => onYearFilterChange(e, "max")}
                            />
                            <a
                                onClick={() =>
                                    props.changeSearchOptions("yearFilter", [
                                        props.getYearRange().min,
                                        props.getYearRange().max
                                    ])
                                }
                                className="reset-filter"
                            >
                                Reset
                            </a>
                            <br />
                            <br />
                            <div
                                className="col checkbox-wrapper"
                                onClick={() =>
                                    props.changeSearchOptions(
                                        "includeNoYear",
                                        !props.searchOptions.includeNoYear
                                    )
                                }
                            >
                                <input
                                    type="checkbox"
                                    checked={
                                        props.searchOptions.includeNoYear
                                            ? true
                                            : false
                                    }
                                    onChange={() =>
                                        props.changeSearchOptions(
                                            "includeNoYear",
                                            !props.searchOptions.includeNoYear
                                        )
                                    }
                                />
                                <span>Include movies with no year entered</span>
                            </div>
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
            ) : (
                <NoMovies updateLocalStorage={props.updateLocalStorage} />
            )}
        </div>
    );
};

export default withRouter(Search);
