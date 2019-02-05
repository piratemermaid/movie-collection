import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import TagSelect from "../components/TagSelect";
import { formatTodaysDate } from "../utils";

class AddMovie extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            titleErr: "",
            year: "",
            yearErr: "",
            tags: [],
            tagsErr: "",
            watched: false,
            added: "",
            addedErr: "",
            formErr: "",
            releaseDate: "",
            series: "",
            review: false
        };

        this.getTagsFromSelect = this.getTagsFromSelect.bind(this);
    }

    addMovie(e) {
        e.preventDefault();
        let errors = false;

        if (!this.state.title) {
            this.setState({ titleErr: "Please enter a title." });
            errors = true;
        }
        if (this.state.title.includes("#")) {
            this.setState({ titleErr: "Title cannot inclue a '#'" });
            errors = true;
        }
        if (this.state.year && this.state.year.length !== 4) {
            this.setState({ yearErr: "Please enter a valid year." });
            errors = true;
        }
        // Some rough error checking on the date.
        // Make sure it's 10 digits, has a slash,
        // month is < 12 and day is < 31.
        if (
            this.state.added.length !== 10 ||
            !this.state.added.includes("/") ||
            this.state.added.split("/")[0] > 12 ||
            this.state.added.split("/")[1] > 31
        ) {
            this.setState({
                addedErr: "Please enter a date in the format mm/dd/yyyy"
            });
            errors = true;
        }

        const type = this.props.match.params.type;
        const movies = this.props.movies[type];

        /**
         * If the movie title is already in the list,
         * and the year is different, add the year
         * to both movie titles (to differentiate remakes)
         */
        // let newAddTitle;
        for (let i in movies) {
            if (movies[i].title === this.state.title) {
                // if (movies[i].year !== this.state.year) {
                //     break;
                // } else {
                this.setState({
                    titleErr: `A movie with this title is already in your ${type}`
                });
                errors = true;
                // }
            }
        }

        if (!errors) {
            const info = {
                // title: newAddTitle || this.state.title,
                title: this.state.title,
                year: this.state.year,
                tags: this.state.tags.sort(),
                watched: this.state.watched,
                added: this.state.added,
                series: this.state.series,
                review: this.state.review
            };
            if (!this.state.added) {
                info.added = formatTodaysDate();
            }

            if (type === "wishlist") {
                info.releaseDate = this.state.releaseDate || "unknown";
            }
            this.props.addMovie(info, type);
            this.props.history.push(`/${type}`);
        }
    }

    // When an input field changes,
    // update state and remove any errors
    onInputChange(e, label) {
        const errLabel = label + "Err";
        this.setState({ [label]: e.target.value, formErr: "", [errLabel]: "" });
    }

    // Get the array of tags from the TagSelect component
    // and set it in the state
    getTagsFromSelect(tags) {
        this.setState({ tags });
    }

    onReviewChange(num) {
        if (num === this.state.review) {
            this.setState({ review: false });
        } else {
            this.setState({ review: num });
        }
    }

    getStarClass(num) {
        let starClass = "material-icons small icon-link review-star";
        if (this.state.review && this.state.review >= num) {
            starClass += " review-star-active";
        }
        return starClass;
    }

    componentWillMount() {
        const today = formatTodaysDate();
        this.setState({ added: today });
    }

    render() {
        const type = this.props.match.params.type;
        return (
            <div className="row">
                <div className="col s12">
                    <Link to={`/${type}`}>
                        <i className="material-icons small icon-link">
                            arrow_back
                        </i>
                    </Link>
                    <Link to={"/imdb"} className="right">
                        IMDB Search{" "}
                        <i className="material-icons tiny icon-link">search</i>
                    </Link>
                    <h5>
                        Add to{" "}
                        {type === "collection" ? "Collection" : "Wishlist"}
                    </h5>
                    <div className="row">
                        <form onSubmit={e => this.addMovie(e)}>
                            <div className="input-field col s12">
                                <p className="form-label">Title</p>
                                <input
                                    id="input-title"
                                    type="text"
                                    value={this.state.title}
                                    onChange={e =>
                                        this.onInputChange(e, "title")
                                    }
                                />
                                <div className="form-err">
                                    {this.state.titleErr}
                                </div>
                            </div>
                            <div className="input-field col s8">
                                <p className="form-label">Year</p>
                                <input
                                    id="input-year"
                                    type="number"
                                    value={this.state.year}
                                    onChange={e =>
                                        this.onInputChange(e, "year")
                                    }
                                />
                                <div className="form-err">
                                    {this.state.yearErr}
                                </div>
                            </div>
                            <div className="input-field col s4">
                                <input
                                    id="input-movie"
                                    type="checkbox"
                                    onClick={e =>
                                        this.onInputChange(e, "watched")
                                    }
                                    className="checkbox-blue"
                                />
                                <label htmlFor="input-movie">Watched?</label>
                            </div>
                            <div className="input-field col s12">
                                <p className="form-label">Tags</p>
                                <TagSelect
                                    getAllTags={this.props.getAllTags}
                                    getTagsFromSelect={this.getTagsFromSelect}
                                />
                            </div>
                            <div className="input-field col s12">
                                <p className="form-label">
                                    Added to {type} (defaults to today, format
                                    MM/DD/YYYY)
                                </p>
                                <input
                                    id="input-added"
                                    type="text"
                                    value={this.state.added}
                                    onChange={e =>
                                        this.onInputChange(e, "added")
                                    }
                                />
                                <div className="form-err">
                                    {this.state.addedErr}
                                </div>
                            </div>
                            <div className="input-field col s12">
                                <p className="form-label">
                                    Series if applicable (e.g. Harry Potter and
                                    the Half-Blood Prince is part of "Harry
                                    Potter")
                                </p>
                                <input
                                    id="input-series"
                                    type="text"
                                    value={this.state.series}
                                    onChange={e =>
                                        this.onInputChange(e, "series")
                                    }
                                />
                            </div>
                            {type === "collection" ? (
                                <div className="input-field col s12">
                                    <p className="form-label">Your review</p>
                                    <i
                                        className={this.getStarClass(1)}
                                        onClick={() => this.onReviewChange(1)}
                                    >
                                        star
                                    </i>
                                    <i
                                        className={this.getStarClass(2)}
                                        onClick={() => this.onReviewChange(2)}
                                    >
                                        star
                                    </i>
                                    <i
                                        className={this.getStarClass(3)}
                                        onClick={() => this.onReviewChange(3)}
                                    >
                                        star
                                    </i>
                                    <i
                                        className={this.getStarClass(4)}
                                        onClick={() => this.onReviewChange(4)}
                                    >
                                        star
                                    </i>
                                    <i
                                        className={this.getStarClass(5)}
                                        onClick={() => this.onReviewChange(5)}
                                    >
                                        star
                                    </i>
                                </div>
                            ) : null}
                            {type === "wishlist" ? (
                                <div className="input-field col s12">
                                    <p className="form-label">
                                        Release date if known, or can put
                                        "released" if already released
                                    </p>
                                    <input
                                        id="input-release"
                                        type="text"
                                        value={this.state.release}
                                        onChange={e =>
                                            this.onInputChange(e, "releaseDate")
                                        }
                                    />
                                </div>
                            ) : null}
                            <div className="input-field col s12">
                                <p className="form-err">{this.state.formErr}</p>{" "}
                                <button
                                    className="btn waves-effect waves-light blue lighten-2"
                                    onClick={e => this.addMovie(e)}
                                >
                                    Add
                                    <i className="material-icons right" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(AddMovie);
