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
                    />
                </div>
            </div>
            {/* year slider */}
            {/* review slider */}
            {/* only unwatched */}
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
