import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import MovieForm from "../components/MovieForm";
import { formatTodaysDate } from "../utils";

class EditMovie extends Component {
    constructor(props) {
        super(props);

        this.state = { type: "", addedErr: "" };

        this.editMovie = this.editMovie.bind(this);
    }

    onTitleChange(e) {
        this.setState({ title: e.target.value });
    }

    onYearChange(e) {
        this.setState({ year: e.target.value });
    }

    onWatchedChange(e) {
        this.setState({ watched: e.target.checked });
    }

    onTagsChange(e) {
        // TODO: better way to input than separating by spaces
        this.setState({ tags: e.target.value, tagsErr: "" });
    }

    onAddedChange(e) {
        this.setState({ added: e.target.value, addedErr: "" });
    }

    onReleaseDateChange(e) {
        this.setState({ releaseDate: e.target.value });
    }

    onSeriesChange(e) {
        this.setState({ series: e.target.value });
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

    updateMovie(e) {
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

        if (!errors) {
            let tags;

            if (String(this.state.tags.length) > 0) {
                tags = this.state.tags.split(" ");
                tags = tags.filter(val => val); // get rid of empty values
                tags = tags.sort();
            } else {
                tags = [];
            }

            const info = {
                title: this.state.title,
                year: this.state.year,
                tags,
                watched: this.state.watched,
                added: this.state.added,
                series: this.state.series,
                review: this.state.review
            };

            if (this.state.type === "wishlist") {
                info.releaseDate = this.state.releaseDate || "Unknown";
            }

            this.props.editMovie(
                info,
                this.props.match.params.title,
                this.state.type
            );
            this.props.history.push(`/${this.state.type}`);
        }
    }

    editMovie(info, type) {
        this.props.editMovie(info, this.props.match.params.title, type);
    }

    componentWillMount() {
        const title = this.props.match.params.title;
        let obj;
        const findInCollection = this.props.movies.collection.filter(movie => {
            return movie.title === title;
        });
        if (findInCollection.length > 0) {
            this.setState({ type: "collection" });
            obj = this.props.movies.collection;
        } else {
            this.setState({ type: "wishlist" });
            obj = this.props.movies.wishlist;
        }

        const info = obj.filter(movie => {
            return movie.title === title;
        })[0];

        // if (typeof info.tags !== "string") {
        //     let tagStr = "";
        //     for (let i in info.tags) {
        //         tagStr += info.tags[i];
        //         if (i < info.tags.length - 1) {
        //             tagStr += " ";
        //         }
        //     }
        //     info.tags = tagStr;
        // }

        if (!info.added) {
            info.added = formatTodaysDate();
        }

        this.setState(info);
    }

    moveToCollection() {
        // add to collection
        const wishlist = this.props.movies.wishlist;
        let info;
        for (let i in wishlist) {
            if (wishlist[i].title === this.state.title) {
                info = wishlist[i];
            }
        }
        if (typeof info.tags === "string") {
            let tags = info.tags.split(" ");
            info.tags = tags;
        }
        delete info["releaseDate"];
        info.added = formatTodaysDate();
        this.props.addMovie(info, "collection");

        // delete from wishlist
        this.props.deleteMovie(this.state.title, "wishlist");
    }

    render() {
        const { type, title } = this.props.match.params;
        return (
            <div>
                <Link to={`/${this.state.type}`}>
                    <i className="material-icons small icon-link">arrow_back</i>
                </Link>
                <Link to={`/${this.state.type}`}>
                    <i
                        className="material-icons small icon-link float-right"
                        onClick={() =>
                            this.props.deleteMovie(
                                this.state.title,
                                this.state.type
                            )
                        }
                        title={`Remove from ${this.state.type}`}
                    >
                        delete
                    </i>
                </Link>
                {this.state.type === "wishlist" ? (
                    <Link to="/collection">
                        <i
                            className="material-icons small icon-link float-right"
                            title="Move to collection"
                            style={{ marginRight: "10px" }}
                            onClick={() => this.moveToCollection()}
                        >
                            move_to_inbox
                        </i>
                    </Link>
                ) : null}
                <h5>edit {this.state.title}</h5>
                <div className="row">
                    <MovieForm
                        movieAction={this.editMovie}
                        actionVar="edit"
                        type={type}
                        title={title}
                        getAllTags={this.props.getAllTags}
                        movies={this.props.movies}
                    />
                </div>
            </div>
        );
    }
}

export default withRouter(EditMovie);
