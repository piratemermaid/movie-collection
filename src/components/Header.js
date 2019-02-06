import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

const Header = props => {
    function getClassName(url) {
        const path = props.location.pathname;
        if (path === url) {
            return "active";
        } else {
            return "";
        }
    }

    function getText(url) {
        switch (url) {
            case "/collection":
                return "My Collection";
            case "/wishlist":
                return "Wishlist";
            case "/imdb":
                return "IMDB";
            case "/account":
                return "Account";
            default:
                return "Pick a Movie";
        }
    }

    function getLink(url) {
        return (
            <li className={getClassName(url)}>
                <Link to={url}>{getText(url)}</Link>
            </li>
        );
    }

    return (
        <nav>
            <div className="nav-wrapper blue lighten-2">
                <ul id="nav-mobile">
                    {getLink("/")}
                    {getLink("/collection")}
                    {getLink("/wishlist")}
                    {getLink("/imdb")}
                    {getLink("/account")}
                </ul>
            </div>
        </nav>
    );
};

export default withRouter(Header);
