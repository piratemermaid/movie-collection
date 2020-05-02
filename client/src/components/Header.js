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
        <div id="header">
            <nav className="nav blue lighten-2">
                <div className="nav-wrapper">
                    <a className="brand-logo right">moviecola</a>
                    <ul className="left hide-on-med-and-down">
                        {getLink("/")}
                        {getLink("/collection")}
                        {getLink("/wishlist")}
                        {getLink("/imdb")}
                        {getLink("/account")}
                    </ul>
                    <a
                        data-target="mobile-demo"
                        className="sidenav-trigger hide-on-large"
                    >
                        <i className="material-icons">menu</i>
                    </a>
                </div>
            </nav>

            <ul className="sidenav hide-on-large" id="mobile-demo">
                {getLink("/")}
                {getLink("/collection")}
                {getLink("/wishlist")}
                {getLink("/imdb")}
                {getLink("/account")}
            </ul>
        </div>
    );
};

export default withRouter(Header);
