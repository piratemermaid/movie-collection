import _ from "lodash";
import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import Search from "./pages/Search";
import AddMovie from "./pages/AddMovie";
import EditMovie from "./pages/EditMovie";
import Collection from "./pages/Collection";
import Wishlist from "./pages/Wishlist";
import Account from "./pages/Account";
import IMDB from "./pages/IMDB";
import SearchResult from "./pages/SearchResult";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collection: [],
            wishlist: [],
            searchOptions: {
                includeTags: [],
                excludeTags: [],
                unwatchedOnly: false,
                watchedOnly: false,
                reviewFilter: [1, 5],
                includeUnreviewed: true,
                yearFilter: [null, null]
            },
            sortOption: { method: "dateAdded", ascending: true }
        };

        this.updateLocalStorage = this.updateLocalStorage.bind(this);
        this.updateState = this.updateState.bind(this);
        this.addMovie = this.addMovie.bind(this);
        this.editMovie = this.editMovie.bind(this);
        this.deleteMovie = this.deleteMovie.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
        this.getAllTags = this.getAllTags.bind(this);
        this.changeSearchOptions = this.changeSearchOptions.bind(this);
        this.getYearRange = this.getYearRange.bind(this);
        this.changeSortOption = this.changeSortOption.bind(this);
    }

    updateLocalStorage(collection, wishlist) {
        // Divide into 4 to prevent maxing out localStorage
        let coll_1 = [];
        let coll_2 = [];
        let coll_3 = [];
        let coll_4 = [];
        const coll = collection;

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
        localStorage.setItem("movieState_wishlist", JSON.stringify(wishlist));
    }

    updateState(coll_1, coll_2, coll_3, coll_4) {
        const coll = _.union(coll_1, coll_2, coll_3, coll_4);

        this.setState({
            collection: coll || [],
            wishlist:
                JSON.parse(localStorage.getItem("movieState_wishlist")) || []
        });
    }

    addMovie(movie, type) {
        let current = this.state[type];
        current.push(movie);

        this.setState({ [type]: current });

        this.updateYearRange(current);
    }

    editMovie(info, oldTitle, type) {
        let newMovies = this.state[type];

        for (let i in newMovies) {
            if (newMovies[i].title === oldTitle) {
                newMovies[i] = info;
            }
        }
        if (info.title !== oldTitle) {
            delete newMovies[oldTitle];
        }

        this.setState({ [type]: newMovies });

        this.updateYearRange(newMovies);
    }

    deleteMovie(title, type) {
        let newMovies = [];

        this.setState({ [type]: newMovies });

        this.updateYearRange(newMovies);
    }

    updateYearRange(coll) {
        let { searchOptions } = this.state;
        searchOptions.yearFilter = [
            this.getYearRange(coll).min,
            this.getYearRange(coll).max
        ];
        this.setState({ searchOptions });
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

    changeSearchOptions(key, value) {
        let searchOptions = this.state.searchOptions;
        searchOptions[key] = value;
        this.setState({ searchOptions });
        localStorage.setItem(
            "movieState_searchOptions",
            JSON.stringify(searchOptions)
        );
    }

    getYearRange(coll) {
        if (!coll) {
            coll = this.state.collection;
        }
        let minYear = null;
        let maxYear = null;

        for (let i in coll) {
            const year = parseInt(coll[i].year, 10);
            if (year !== "?") {
                if (!minYear) {
                    minYear = year;
                }
                if (!maxYear) {
                    maxYear = year;
                }

                if (year < minYear) {
                    minYear = year;
                }

                if (year > maxYear) {
                    maxYear = year;
                }
            }
        }

        return { min: minYear, max: maxYear };
    }

    changeSortOption(sortOption) {
        this.setState({ sortOption });
    }

    componentDidUpdate() {
        this.updateLocalStorage(this.state.collection, this.state.wishlist);
    }

    componentWillMount() {
        const coll_1 = JSON.parse(
            localStorage.getItem("movieState_collection_1")
        );
        const coll_2 = JSON.parse(
            localStorage.getItem("movieState_collection_2")
        );
        const coll_3 = JSON.parse(
            localStorage.getItem("movieState_collection_3")
        );
        const coll_4 = JSON.parse(
            localStorage.getItem("movieState_collection_4")
        );
        this.updateState(coll_1, coll_2, coll_3, coll_4);

        const searchOptions = JSON.parse(
            localStorage.getItem("movieState_searchOptions")
        );

        if (searchOptions) {
            this.setState({ searchOptions });
        }
    }

    render() {
        const { collection, wishlist, searchOptions, sortOption } = this.state;
        return (
            <div className="App">
                <BrowserRouter>
                    <div>
                        <Header props={this.context} />
                        <div
                            className="container"
                            style={{ marginTop: "20px" }}
                        >
                            <Switch>
                                <Route
                                    exact
                                    path="/"
                                    render={() => (
                                        <Search
                                            movies={collection}
                                            getAllTags={this.getAllTags}
                                            searchOptions={searchOptions}
                                            changeSearchOptions={
                                                this.changeSearchOptions
                                            }
                                            getYearRange={this.getYearRange}
                                        />
                                    )}
                                />
                                <Route
                                    path="/search_result"
                                    render={() => (
                                        <SearchResult
                                            collection={collection}
                                            searchOptions={searchOptions}
                                            sortOption={sortOption}
                                            changeSortOption={
                                                this.changeSortOption
                                            }
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
                                    path="/edit/:type/:title"
                                    render={() => (
                                        <EditMovie
                                            movies={this.state}
                                            addMovie={this.addMovie}
                                            getAllTags={this.getAllTags}
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
                                            changeSortOption={
                                                this.changeSortOption
                                            }
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
                                            changeSortOption={
                                                this.changeSortOption
                                            }
                                        />
                                    )}
                                />
                                <Route
                                    path="/account"
                                    render={() => (
                                        <Account
                                            updateLocalStorage={
                                                this.updateLocalStorage
                                            }
                                            updateState={this.updateState}
                                            movies={this.state}
                                        />
                                    )}
                                />
                                <Route
                                    path="/imdb"
                                    render={() => (
                                        <IMDB addMovie={this.addMovie} />
                                    )}
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
