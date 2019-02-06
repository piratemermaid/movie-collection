import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import MovieForm from "../components/MovieForm";
import { formatTodaysDate } from "../utils";

class AddMovie extends Component {
    constructor(props) {
        super(props);

        this.addMovie = this.addMovie.bind(this);
    }

    addMovie(info, type) {
        if (!info.added) {
            info.added = formatTodaysDate();
        }
        if (type === "wishlist" && !info.releaseDate) {
            info.releaseDate = "unknown";
        }
        this.props.addMovie(info, type);
        this.props.history.push(`/${type}`);
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
                        <MovieForm
                            movieAction={this.addMovie}
                            type={type}
                            getAllTags={this.props.getAllTags}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(AddMovie);
