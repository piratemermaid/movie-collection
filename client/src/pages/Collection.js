import React from "react";
import { Link } from "react-router-dom";
import TableList from "../components/TableList";
import NoMovies from "../components/NoMovies";
import PageHeading from "../components/PageHeading";

const Collection = (props) => {
    // fix for tags becoming strings for no reason??? wtf
    // let myProps = props.movies;
    // for (let i in props.movies) {
    //     if (typeof props.movies[i].tags === "string") {
    //         let tags;
    //         if (props.movies[i].tags.length > 0) {
    //             tags = props.movies[i].tags.split(" ");
    //             tags = tags.filter(val => val); // get rid of empty values
    //         } else {
    //             tags = [];
    //         }
    //         myProps[i].tags = tags;
    //     }
    // }

    return (
        <div>
            <PageHeading heading="Collection" />
            {props.movies.length > 1 ? (
                <div>
                    <Link to="/add/collection">
                        <i className="material-icons small icon-link float-right">
                            add_circle
                        </i>
                    </Link>
                    <TableList
                        movies={props.movies}
                        type="collection"
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
            ) : (
                <NoMovies updateLocalStorage={props.updateLocalStorage} />
            )}
        </div>
    );
};

export default Collection;
