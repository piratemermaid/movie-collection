import React from "react";

import TableList from "../components/TableList";

const SearchResult = props => {
    const { collection, searchOptions } = props;

    function getMatches() {
        let matches = [];

        for (let movie in collection) {
            const movieInfo = collection[movie];
            const { tags } = movieInfo;
            let hasIncludeTags = searchOptions.includeTags.some(
                tag => tags.indexOf(tag) >= 0
            );

            let hasExcludeTags = searchOptions.excludeTags.some(
                tag => tags.indexOf(tag) >= 0
            );

            if (hasIncludeTags && !hasExcludeTags) {
                matches.push(movieInfo);
            }
        }

        return matches;
    }

    return (
        <div>
            <h2>Search Result</h2>
            <TableList
                movies={getMatches()}
                editable={false}
                deletable={false}
                sortOption={props.sortOption}
                changeSortOption={props.changeSortOption}
                includeTags={searchOptions.includeTags}
            />
        </div>
    );
};

export default SearchResult;
