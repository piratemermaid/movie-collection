import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

const Header = props => {
    function getClassName(link) {
        const path = props.location.pathname;
        if (path === link) {
            return "active";
        } else {
            if (path.includes("/search") && link === "/") {
                return "active";
            }
        }
    }

    return (
        <nav>
            <div className="nav-wrapper blue lighten-2">
                <ul id="nav-mobile">
                    <li className={getClassName("/")}>
                        <Link to="/">Pick a Movie</Link>
                    </li>
                    <li className={getClassName("/collection")}>
                        <Link to="/collection">My Collection</Link>
                    </li>
                    <li className={getClassName("/wishlist")}>
                        <Link to="/wishlist">Wishlist</Link>
                    </li>
                    <li className={getClassName("/imdb")}>
                        <Link to="/imdb">IMDB Search</Link>
                    </li>
                    <li className={getClassName("/account")}>
                        <Link to="/account">Account</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default withRouter(Header);
