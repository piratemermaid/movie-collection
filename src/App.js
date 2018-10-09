import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import Search from "./components/Search";
import Result from "./components/Result";
import AddMovie from "./components/AddMovie";
import EditMovie from "./components/EditMovie";
import Collection from "./components/Collection";
import Wishlist from "./components/Wishlist";
import Account from "./components/Account";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collection: [],
      wishlist: []
    };

    this.addMovie = this.addMovie.bind(this);
    this.editMovie = this.editMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.deleteAll = this.deleteAll.bind(this);
    this.getAllTags = this.getAllTags.bind(this);
  }

  updateLocalStorage() {
    localStorage.setItem("movieState", JSON.stringify(this.state));
  }

  addMovie(movie, type) {
    let current = this.state[type];
    current.push(movie);
    this.setState({ [type]: current });
  }

  editMovie(updatedMovie, oldTitle, type) {
    let newMovies = this.state[type];

    for (let i in newMovies) {
      if (newMovies[i].title === oldTitle) {
        newMovies[i] = updatedMovie;
      }
    }
    if (updatedMovie.title !== oldTitle) {
      delete newMovies[oldTitle];
    }

    this.setState({ [type]: newMovies });
  }

  deleteMovie(title, type) {
    let newMovies = [];

    for (let i in this.state[type]) {
      if (this.state[type][i].title !== title) {
        newMovies.push(this.state[type][i]);
      }
    }

    this.setState({ [type]: newMovies });
  }

  deleteAll(type) {
    this.setState({ [type]: [] });
  }

  getAllTags() {
    let tagList = [];

    for (let i in this.state.collection) {
      for (let j in this.state.collection[i].tags) {
        if (!tagList.includes(this.state.collection[i].tags[j])) {
          tagList.push(this.state.collection[i].tags[j]);
        }
      }
    }

    tagList = tagList.sort();
    return tagList;
  }

  componentDidUpdate() {
    this.updateLocalStorage();
  }

  componentWillMount() {
    const state = JSON.parse(localStorage.getItem("movieState")) || {};
    this.setState({ collection: state.collection, wishlist: state.wishlist });
  }

  render() {
    const { collection, wishlist } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Header props={this.context} />
            <div className="container" style={{ marginTop: "20px" }}>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => (
                    <Search movies={collection} getAllTags={this.getAllTags} />
                  )}
                />
                <Route
                  path="/search/unwatched"
                  render={() => <Result movies={collection} />}
                />
                <Route
                  path="/search/tags/:tags/:options"
                  render={() => <Result movies={collection} />}
                />
                <Route
                  path="/search/year/:year/:options"
                  render={() => <Result movies={collection} />}
                />
                <Route
                  path="/search/review/:review/:option"
                  render={() => <Result movies={collection} />}
                />
                <Route
                  path="/add/:type"
                  render={() => (
                    <AddMovie
                      addMovie={this.addMovie}
                      editMovie={this.editMovie}
                      getAllTags={this.getAllTags}
                      movies={this.state}
                    />
                  )}
                />
                <Route
                  path="/edit/:title"
                  render={() => (
                    <EditMovie
                      movies={this.state}
                      addMovie={this.addMovie}
                      editMovie={this.editMovie}
                      deleteMovie={this.deleteMovie}
                    />
                  )}
                />
                <Route
                  path="/collection"
                  render={() => (
                    <Collection
                      movies={collection}
                      deleteAll={this.deleteAll}
                    />
                  )}
                />
                <Route
                  path="/wishlist"
                  render={() => (
                    <Wishlist wishlist={wishlist} deleteAll={this.deleteAll} />
                  )}
                />
                <Route
                  path="/account"
                  render={() => <Account movies={this.state} />}
                />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
