import React from "react";

const SearchResult = props => {
    const { collection, searchOptions } = props;

    function getMatches() {
        let matchTestArr = [];
        for (let movie in collection) {
            const { tags, title } = collection[movie];
            let hasIncludeTags = searchOptions.includeTags.some(
                tag => tags.indexOf(tag) >= 0
            );

            let hasExcludeTags = searchOptions.excludeTags.some(
                tag => tags.indexOf(tag) >= 0
            );

            if (hasIncludeTags && !hasExcludeTags) {
                matchTestArr.push(<li key={title}>{title}</li>);
            }
        }

        return matchTestArr;
    }

    return (
        <div>
            <h2>Search Result</h2>
            <ul>{getMatches()}</ul>
        </div>
    );
};

export default SearchResult;
