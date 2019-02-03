import React from "react";
import { Link } from "react-router-dom";
import TableList from "./TableList";

const Collection = props => {
    // fix for tags becoming strings for no reason??? wtf
    let myProps = props.movies;
    for (let i in props.movies) {
        if (typeof props.movies[i].tags === "string") {
            let tags;
            if (props.movies[i].tags.length > 0) {
                tags = props.movies[i].tags.split(" ");
                tags = tags.filter(val => val); // get rid of empty values
            } else {
                tags = [];
            }
            myProps[i].tags = tags;
        }
    }

    return (
        <div>
            <Link to="/add/collection">
                <i className="material-icons small icon-link float-right">
                    add_circle
                </i>
            </Link>
            <TableList
                movies={props.movies}
                editable={true}
                deletable={false}
                sortOption={props.sortOption}
                changeSortOption={props.changeSortOption}
            />
            <div className="dev-options">
                <a
                    className="dev-option"
                    onClick={() => props.deleteAll("collection")}
                >
                    Delete collection
                </a>
            </div>
        </div>
    );
};

export default Collection;
