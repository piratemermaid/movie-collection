import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import Search from "./components/Search";
import Result from "./components/Result";
import AddMovie from "./components/AddMovie";
import Collection from "./components/Collection";
import Wishlist from "./components/Wishlist";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collection: [
        {
          title: "Harry Potter",
          year: 2000,
          tags: ["fantasy", "nerdy", "magic"],
          watched: true
        },
        {
          title: "Zootopia",
          year: 2014,
          tags: ["zoo", "animals", "animated"],
          watched: false
        }
      ],
      wishlist: [
        {
          title: "Solo: A Star Wars Story",
          year: 2017,
          tags: ["fantasy", "nerdy"],
          watched: false
        },
        {
          title: "Avengers",
          year: 2012,
          tags: ["superhero", "nerdy"],
          watched: false
        }
      ]
    };

    this.addMovie = this.addMovie.bind(this);
    this.getAllTags = this.getAllTags.bind(this);
  }

  addMovie(movie, type) {
    let current = this.state[type];
    current.push(movie);
    this.setState({ [type]: current });
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

  componentWillMount() {
    if (!this.state) {
      const state = localStorage.getItem(JSON.parse("movieState"));
      // TODO: set state from localStorage
      this.setState({
        movies: state.movies || null,
        wishlist: state.wishlist || null
      });
    }
  }

  render() {
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
                      movies={this.state.collection}
                      getAllTags={this.getAllTags}
                    />
                  )}
                />
                <Route
                  path="/search/:tag"
                  render={() => <Result movies={this.state.collection} />}
                />
                <Route
                  path="/add/:type"
                  render={() => (
                    <AddMovie
                      addMovie={this.addMovie}
                      getAllTags={this.getAllTags}
                    />
                  )}
                />
                <Route
                  path="/collection"
                  render={() => <Collection movies={this.state.collection} />}
                />
                <Route
                  path="/wishlist"
                  render={() => <Wishlist wishlist={this.state.wishlist} />}
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
