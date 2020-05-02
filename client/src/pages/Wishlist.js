import React from "react";
import { Link } from "react-router-dom";
import TableList from "../components/TableList";

const Wishlist = props => {
    const wishlist = props.wishlist;
    for (let i in wishlist) {
        if (typeof wishlist[i].tags === "string") {
            let tags;
            if (wishlist[i].tags.length > 0) {
                tags = wishlist[i].tags.split(" ");
                tags = tags.filter(val => val); // get rid of empty values
            } else {
                tags = [];
            }
            wishlist[i].tags = tags;
        }
    }

    return (
        <div>
            <div className="col s12">
                <h2>Wishlist</h2>
            </div>
            <Link to="/add/wishlist">
                <i className="material-icons small icon-link float-right">
                    add_circle
                </i>
            </Link>
            <TableList
                movies={wishlist}
                type="wishlist"
                editable={true}
                deletable={false}
                sortOption={props.sortOption}
                changeSortOption={props.changeSortOption}
            />
            <div className="dev-options">
                <a
                    className="dev-option"
                    onClick={() => props.deleteAll("wishlist")}
                >
                    Delete wishlist
                </a>
            </div>
        </div>
    );
};

export default Wishlist;
