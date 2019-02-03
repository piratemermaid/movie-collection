import _ from "lodash";
import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import { titleFromTags } from "../utils";
import TableList from "./TableList";

const Result = props => {
    let title = "";
    let tags = props.match.params.tags;
    let tagsOption;
    let year = parseInt(props.match.params.year, 10);
    let yearOption;
    let fromYear;
    let excludeOption;
    let excludeTitle;
    let review = parseInt(props.match.params.review, 10);
    let reviewOption;

    if (tags) {
        let urlOptions = props.match.params.options;
        let options = urlOptions.split("=")[1];
        if (options.includes("all")) {
            tagsOption = "all";
        }
        if (options.includes("exclude")) {
            let excludes = urlOptions.split("exclude=")[1];
            excludeOption = excludes.split("&");
            excludeTitle = titleFromTags(excludes);
        }

        title = titleFromTags(tags);
    } else if (year) {
        let options = props.match.params.options.split("=")[1];
        title = year;

        if (options !== "none") {
            if (options.includes("range")) {
                fromYear = options.split("_")[2];
                title = `From ${fromYear} to ${title}`;
                yearOption = "range";
            }

            if (options === "before") {
                title = `Before ${title}`;
                yearOption = "before";
            }

            if (options === "after") {
                title = `After ${title}`;
                yearOption = "after";
            }
        }
    } else if (review) {
        reviewOption = props.match.params.option;
        switch (reviewOption) {
            case "exact":
                title = `${review} stars`;
                break;
            case "up":
                title = `${review} stars and up`;
                break;
            case "down":
                title = `${review} stars and down`;
                break;
            default:
                title = review;
                break;
        }
    } else {
        // unwatched
        title = String(props.match.path.substring(props.match.path.length, 8));
    }

    function getMatches() {
        let matches = [];

        if (tags) {
            let tagsArr = tags.split("&");
            let inArr, matched;

            for (let i in props.movies) {
                inArr = false;
                matched = false;
                for (let j in tagsArr) {
                    inArr = _.some(matches, { title: props.movies[i].title });
                    if (tagsOption === "all") {
                        if (!props.movies[i].tags.includes(tagsArr[j])) {
                            matched = false;
                            break;
                        }
                    }
                    if (props.movies[i].tags.includes(tagsArr[j]) && !inArr) {
                        matched = true;
                    }
                }
                if (matched) {
                    matches.push(props.movies[i]);
                }
            }
        } else if (year) {
            if (yearOption) {
                if (yearOption === "range") {
                    matches = props.movies.filter(movie => {
                        if (
                            parseInt(movie.year, 10) >=
                                parseInt(fromYear, 10) &&
                            parseInt(movie.year, 10) <= year
                        ) {
                            return movie.title;
                        } else return null;
                    });
                } else if (yearOption === "before") {
                    matches = props.movies.filter(movie => {
                        if (parseInt(movie.year, 10) <= year) {
                            return movie.title;
                        } else return null;
                    });
                } else {
                    matches = props.movies.filter(movie => {
                        if (parseInt(movie.year, 10) >= year) {
                            return movie.title;
                        } else return null;
                    });
                }
            } else {
                matches = props.movies.filter(movie => {
                    if (parseInt(movie.year, 10) === year) {
                        return movie.title;
                    } else return null;
                });
            }
        } else if (review) {
            switch (reviewOption) {
                case "up":
                    matches = props.movies.filter(movie => {
                        if (movie.review && movie.review >= review) {
                            return movie.title;
                        } else {
                            return null;
                        }
                    });
                    break;
                case "down":
                    matches = props.movies.filter(movie => {
                        if (movie.review && movie.review <= review) {
                            return movie.title;
                        } else {
                            return null;
                        }
                    });
                    break;
                default:
                    matches = props.movies.filter(movie => {
                        if (movie.review && movie.review === review) {
                            return movie.title;
                        } else {
                            return null;
                        }
                    });
                    break;
            }
            return matches;
        } else {
            // title = 'unwatched'
            matches = props.movies.filter(movie => {
                if (!movie.watched) {
                    return movie.title;
                } else return null;
            });
        }

        /**
         * If we have the option to exclude tags,
         * go through the matches and remove
         * matches with the excluded tag.
         */
        if (excludeOption) {
            let newMatches = [];
            let excluded = false;
            for (let i in matches) {
                for (let j in matches[i].tags) {
                    if (excludeOption.includes(matches[i].tags[j])) {
                        excluded = true;
                        break;
                    }
                }
                if (!excluded) {
                    newMatches.push(matches[i]);
                }
            }
            return newMatches;
        }

        return matches;
    }

    return (
        <div>
            <Link to="/">
                <i className="material-icons small icon-link">arrow_back</i>
            </Link>
            <br />
            <h5 className="result-title">Movies matching "{title}"</h5>
            {excludeTitle ? (
                <h5 className="result-title">
                    (Excluding "{excludeTitle}
                    ")
                </h5>
            ) : null}
            {getMatches().length > 0 ? (
                <TableList
                    movies={getMatches()}
                    tags={tags}
                    editable={false}
                    deletable={true}
                    sortOption={props.sortOption}
                    changeSortOption={props.changeSortOption}
                />
            ) : (
                <p>No matches...</p>
            )}
        </div>
    );
};

export default withRouter(Result);
