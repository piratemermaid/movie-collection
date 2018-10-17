import _ from "lodash";
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
      wishlist: [],
      searchDisplay: "tags",
      sortOption: { method: "dateAdded", ascending: true }
    };

    this.addMovie = this.addMovie.bind(this);
    this.editMovie = this.editMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.deleteAll = this.deleteAll.bind(this);
    this.getAllTags = this.getAllTags.bind(this);
    this.changeSearchDisplay = this.changeSearchDisplay.bind(this);
    this.changeSortOption = this.changeSortOption.bind(this);
  }

  updateLocalStorage() {
    // Divide into 4 to prevent maxing out localStorage
    let coll_1 = [];
    let coll_2 = [];
    let coll_3 = [];
    let coll_4 = [];
    const coll = this.state.collection;

    for (let i in coll) {
      switch (i % 4) {
        case 0:
          coll_1.push(coll[i]);
          break;
        case 1:
          coll_2.push(coll[i]);
          break;
        case 2:
          coll_3.push(coll[i]);
          break;
        case 3:
          coll_4.push(coll[i]);
          break;
        default:
          coll_1.push(coll[i]);
          break;
      }
    }

    localStorage.setItem("movieState_collection_1", JSON.stringify(coll_1));
    localStorage.setItem("movieState_collection_2", JSON.stringify(coll_2));
    localStorage.setItem("movieState_collection_3", JSON.stringify(coll_3));
    localStorage.setItem("movieState_collection_4", JSON.stringify(coll_4));
    localStorage.setItem(
      "movieState_wishlist",
      JSON.stringify(this.state.wishlist)
    );
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

  changeSearchDisplay(searchDisplay) {
    this.setState({ searchDisplay });
  }

  changeSortOption(sortOption) {
    this.setState({ sortOption });
  }

  componentDidUpdate() {
    this.updateLocalStorage();
  }

  componentWillMount() {
    const coll_1 = JSON.parse(localStorage.getItem("movieState_collection_1"));
    const coll_2 = JSON.parse(localStorage.getItem("movieState_collection_2"));
    const coll_3 = JSON.parse(localStorage.getItem("movieState_collection_3"));
    const coll_4 = JSON.parse(localStorage.getItem("movieState_collection_4"));
    const coll = _.union(coll_1, coll_2, coll_3, coll_4);

    this.setState({
      collection: coll || [],
      wishlist: JSON.parse(localStorage.getItem("movieState_wishlist")) || []
    });
  }

  render() {
    const { collection, wishlist, searchDisplay, sortOption } = this.state;
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
                    <Search
                      movies={collection}
                      getAllTags={this.getAllTags}
                      display={searchDisplay}
                      changeSearchDisplay={this.changeSearchDisplay}
                    />
                  )}
                />
                <Route
                  path="/search/unwatched"
                  render={() => (
                    <Result
                      movies={collection}
                      sortOption={sortOption}
                      changeSortOption={this.changeSortOption}
                    />
                  )}
                />
                <Route
                  path="/search/tags/:tags/:options"
                  render={() => (
                    <Result
                      movies={collection}
                      sortOption={sortOption}
                      changeSortOption={this.changeSortOption}
                    />
                  )}
                />
                <Route
                  path="/search/year/:year/:options"
                  render={() => (
                    <Result
                      movies={collection}
                      sortOption={sortOption}
                      changeSortOption={this.changeSortOption}
                    />
                  )}
                />
                <Route
                  path="/search/review/:review/:option"
                  render={() => (
                    <Result
                      movies={collection}
                      sortOption={sortOption}
                      changeSortOption={this.changeSortOption}
                    />
                  )}
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
                      sortOption={sortOption}
                      changeSortOption={this.changeSortOption}
                    />
                  )}
                />
                <Route
                  path="/wishlist"
                  render={() => (
                    <Wishlist
                      wishlist={wishlist}
                      deleteAll={this.deleteAll}
                      sortOption={sortOption}
                      changeSortOption={this.changeSortOption}
                    />
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
