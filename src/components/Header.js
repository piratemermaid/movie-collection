import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = { active: "search" };
  }

  getClassName(link) {
    const path = this.props.location.pathname;
    if (path === link) {
      return "active";
    } else {
      if (path.includes("/search") && link === "/") {
        return "active";
      }
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper blue lighten-2">
          <ul id="nav-mobile">
            <li className={this.getClassName("/")}>
              <Link to="/">Pick a Movie</Link>
            </li>
            <li className={this.getClassName("/collection")}>
              <Link to="/collection">My Collection</Link>
            </li>
            <li className={this.getClassName("/wishlist")}>
              <Link to="/wishlist">Wishlist</Link>
            </li>
            <li className={this.getClassName("/imdb")}>
              <Link to="/imdb">IMDB Search</Link>
            </li>
            <li className={this.getClassName("/account")}>
              <Link to="/account">Account</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default withRouter(Header);
