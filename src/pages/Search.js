import React from "react";
// import { withRouter } from "react-router";

import TagSelect from "../components/TagSelect";

// TODO: error check include & exclude same tag
const Search = props => {
    const { searchOptions } = props;
    // console.log(searchOptions);

    function getTagsFromSelect(tags, type) {
        if (type === "search_option_include") {
            props.changeSearchOptions("includeTags", tags);
        } else {
            props.changeSearchOptions("excludeTags", tags);
        }
    }

    return (
        <div id="search">
            search
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
        </div>
    );
};

// export default withRouter(Search);
export default Search;
