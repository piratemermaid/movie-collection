import React, { Component } from "react";

import TagSelect from "./TagSelect";

class MovieForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            info: {
                title: "",
                year: "",
                watched: "",
                added: "",
                series: "",
                releaseDate: ""
            },
            err: {
                title: "",
                year: "",
                watched: "",
                added: "",
                series: "",
                releaseDate: ""
            }
        };

        this.getTagsFromSelect = this.getTagsFromSelect.bind(this);
    }

    onInputChange(e, label) {
        let { info, err } = this.state;
        info[label] = e.target.value;
        err[label] = "";
        this.setState({ info, err });
    }

    getStarClass(num) {
        let starClass = "material-icons small icon-link review-star";
        if (this.state.review && this.state.review >= num) {
            starClass += " review-star-active";
        }
        return starClass;
    }

    onReviewChange(num) {
        if (num === this.state.review) {
            this.setState({ review: false });
        } else {
            this.setState({ review: num });
        }
    }

    getTagsFromSelect(tags) {
        let info = this.state.info;
        info.tags = tags;
        this.setState({ info });
    }

    submit(e) {
        // TODO: check for more form errors (movie already exists, year, releaseDate)
        // (copied old error checking from AddMovie)
        e.preventDefault();

        let formErrors = false;

        if (!this.state.info.title) {
            formErrors = true;
            let err = { title: "Please add a title" };
            this.setState({ err });
        }

        // let errors = false;
        // if (!this.state.title) {
        //     this.setState({ titleErr: "Please enter a title." });
        //     errors = true;
        // }
        // if (this.state.title.includes("#")) {
        //     this.setState({ titleErr: "Title cannot inclue a '#'" });
        //     errors = true;
        // }
        // if (this.state.year && this.state.year.length !== 4) {
        //     this.setState({ yearErr: "Please enter a valid year." });
        //     errors = true;
        // }
        // // Some rough error checking on the date.
        // // Make sure it's 10 digits, has a slash,
        // // month is < 12 and day is < 31.
        // if (
        //     this.state.added.length !== 10 ||
        //     !this.state.added.includes("/") ||
        //     this.state.added.split("/")[0] > 12 ||
        //     this.state.added.split("/")[1] > 31
        // ) {
        //     this.setState({
        //         addedErr: "Please enter a date in the format mm/dd/yyyy"
        //     });
        //     errors = true;
        // }

        if (!formErrors) {
            this.props.movieAction(this.state.info, this.props.type);
        }
    }

    render() {
        const { type } = this.props;
        const { info, err } = this.state;
        return (
            <form onSubmit={e => this.submit(e)}>
                <div className="input-field col s12">
                    <p className="form-label">Title</p>
                    <input
                        id="input-title"
                        type="text"
                        value={info.title}
                        onChange={e => this.onInputChange(e, "title")}
                    />
                    <div className="form-err">{err.title}</div>
                </div>
                <div className="input-field col s8">
                    <p className="form-label">Year</p>
                    <input
                        id="input-year"
                        type="number"
                        value={info.year}
                        onChange={e => this.onInputChange(e, "year")}
                    />
                    <div className="form-err">{this.state.yearErr}</div>
                </div>
                <div className="input-field col s4">
                    <input
                        id="input-movie"
                        type="checkbox"
                        onClick={e => this.onInputChange(e, "watched")}
                        className="checkbox-blue"
                    />
                    <label htmlFor="input-movie">Watched?</label>
                </div>
                <div className="input-field col s12">
                    <p className="form-label">Tags</p>
                    <TagSelect
                        getAllTags={this.props.getAllTags}
                        getTagsFromSelect={this.getTagsFromSelect}
                        creatable={true}
                    />
                </div>
                <div className="input-field col s12">
                    <p className="form-label">
                        Added to {type} (defaults to today, format MM/DD/YYYY)
                    </p>
                    <input
                        id="input-added"
                        type="text"
                        value={info.added}
                        onChange={e => this.onInputChange(e, "added")}
                    />
                    <div className="form-err">{this.state.addedErr}</div>
                </div>
                <div className="input-field col s12">
                    <p className="form-label">
                        Series if applicable (e.g. Harry Potter and the
                        Half-Blood Prince is part of "Harry Potter")
                    </p>
                    <input
                        id="input-series"
                        type="text"
                        value={info.series}
                        onChange={e => this.onInputChange(e, "series")}
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
                            Release date if known, or can put "released" if
                            already released
                        </p>
                        <input
                            id="input-release"
                            type="text"
                            value={info.release}
                            onChange={e => this.onInputChange(e, "releaseDate")}
                        />
                    </div>
                ) : null}
                <div className="input-field col s12">
                    <p className="form-err">{this.state.formErr}</p>{" "}
                    <button
                        className="btn waves-effect waves-light blue lighten-2"
                        onClick={e => this.submit(e)}
                    >
                        Add
                        <i className="material-icons right" />
                    </button>
                </div>
            </form>
        );
    }
}

export default MovieForm;
