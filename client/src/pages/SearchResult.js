import React from "react";

import TableList from "../components/TableList";

const SearchResult = props => {
    const { collection, searchOptions } = props;
    const {
        includeTags,
        excludeTags,
        unwatchedOnly,
        reviewFilter,
        includeUnreviewed,
        yearFilter,
        includeNoYear
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
            let matchesYearFilter = false;

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

            // Check if movie review is within the specified range.
            // If there's no review, check if user wants non-reviewed
            // movies to come up.
            const { review } = movieInfo;
            if (!review) {
                if (includeUnreviewed) {
                    matchesReviewFilter = true;
                } else {
                    matchesReviewFilter = false;
                }
            } else {
                if (review >= reviewFilter[0] && review <= reviewFilter[1]) {
                    matchesReviewFilter = true;
                } else {
                    matchesReviewFilter = false;
                }
            }

            // Check if movie year is within the specified range.
            // If there's no year entered, check if user
            // wants it to come up.
            const { year } = movieInfo;
            if (!year || year === "?") {
                if (includeNoYear) {
                    matchesYearFilter = true;
                } else {
                    matchesYearFilter = false;
                }
            } else {
                if (year >= yearFilter[0] && year <= yearFilter[1]) {
                    matchesYearFilter = true;
                } else {
                    matchesYearFilter = false;
                }
            }

            // Make sure this movie entirely matches the user's search
            // and add it to the matches if so.
            if (
                matchesIncludeTags &&
                matchesExcludeTags &&
                matchesUnwatchedOnly &&
                matchesReviewFilter &&
                matchesYearFilter
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
