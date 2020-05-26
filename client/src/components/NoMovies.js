import React from "react";
import { Link } from "react-router-dom";
import { fillMyMovies } from "../myMovies";

const NoMovies = (props) => {
    function fillDevMovies(obj) {
        props.updateLocalStorage(obj.collection, obj.wishlist);
        window.location.reload();
    }

    return (
        <div>
            <p>You have no movies in your collection.</p>
            <Link to="/add/collection" style={{ marginRight: "10px" }}>
                <a class="waves-effect waves-light btn blue lighten-2">
                    Add a Movie
                </a>
            </Link>
            <a
                class="waves-effect waves-light btn blue lighten-2"
                onClick={() => fillDevMovies(fillMyMovies())}
            >
                Use Demo Movies
            </a>
        </div>
    );
};

export default NoMovies;
