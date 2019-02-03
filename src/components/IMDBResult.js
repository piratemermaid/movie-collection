import React from "react";
import { withRouter } from "react-router";

const IMDBResult = props => {
    function addMovie(data, type) {
        props.addMovie({ title: data.Title, year: data.Year || "" }, type);
        props.history.push(`/edit/${data.Title}`);
    }

    const data = props.chosenData[0];
    return (
        <div className="row">
            <div className="col s12 link">
                <a onClick={() => props.changeDisplay("options")}>
                    {" "}
                    <i className="material-icons tiny icon-link">
                        arrow_back
                    </i>{" "}
                    Back to view all results
                </a>
            </div>
            <div className="col m6 s12">
                <p className="imdb-title">
                    {data.Title} ({data.Year})
                </p>
                <img
                    className="movie-poster-lg"
                    src={data.Poster}
                    alt={data.Title}
                />
            </div>
            <div className="col m6 s12">
                <br />
                <p
                    className="imdb-action"
                    onClick={() => addMovie(data, "collection")}
                >
                    Move to collection{" "}
                    <i
                        className="material-icons small icon-link"
                        title="Move to collection"
                        style={{ marginRight: "10px" }}
                    >
                        move_to_inbox
                    </i>
                </p>
                <p
                    className="imdb-action"
                    onClick={() => addMovie(data, "wishlist")}
                >
                    Move to wishlist{" "}
                    <i
                        className="material-icons small icon-link"
                        title="Move to wishlist"
                        style={{ marginRight: "10px" }}
                    >
                        filter_vintage
                    </i>
                </p>
            </div>
        </div>
    );
};

export default withRouter(IMDBResult);
