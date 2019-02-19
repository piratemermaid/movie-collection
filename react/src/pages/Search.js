import React from "react";
import { withRouter } from "react-router";

import TagSelect from "../components/TagSelect";

// TODO: error check include & exclude same tag
const Search = props => {
    const { searchOptions } = props;

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
                <div className="col s12">
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
                </div>
            </div>
            <div className="row">
                <div className="col s12">
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
