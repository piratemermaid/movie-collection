import React from "react";

import TableList from "../components/TableList";

const SearchResult = props => {
    const { collection, searchOptions } = props;
    const {
        includeTags,
        excludeTags,
        unwatchedOnly,
        reviewFilter
    } = searchOptions;

    function getMatches() {
        let matches = [];

        for (let movie in collection) {
            const movieInfo = collection[movie];
            const { tags } = movieInfo;

            let matchesIncludeTags = false;
            let matchesExcludeTags = false;
            let matchesUnwatchedOnly = false;
            let matchesReviewFilter = false;

            // If there's no includeTags option, it matches.
            // If there is, and it has matching tag(s), it matches.
            if (includeTags.length > 0) {
                let hasIncludeTags = includeTags.some(
                    tag => tags.indexOf(tag) >= 0
                );
                matchesIncludeTags = hasIncludeTags;
            } else {
                matchesIncludeTags = true;
            }

            // If there's no excludeTags option, it matches.
            // If there is, and it does not have matching tag(s), it matches.
            if (excludeTags.length > 0) {
                let hasExcludeTags = excludeTags.some(
                    tag => tags.indexOf(tag) >= 0
                );
                matchesExcludeTags = !hasExcludeTags;
            } else {
                matchesExcludeTags = true;
            }

            // If there's no unwatchedOnly option, it matches.
            // If there is, and it is unwatched, it matches.
            if (!unwatchedOnly) {
                matchesUnwatchedOnly = true;
            } else {
                if (!movieInfo.watched) {
                    matchesUnwatchedOnly = true;
                } else {
                    matchesUnwatchedOnly = false;
                }
            }

            const { review } = movieInfo;
            if (!review) {
                // TODO: maybe add checkbox for including
                // unreviewed movies?
                // For now just don't include them
                matchesReviewFilter = true;
            } else {
                if (review >= reviewFilter[0] && review <= reviewFilter[1]) {
                    matchesReviewFilter = true;
                } else {
                    matchesReviewFilter = false;
                }
            }

            if (
                matchesIncludeTags &&
                matchesExcludeTags &&
                matchesUnwatchedOnly &&
                matchesReviewFilter
            ) {
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
