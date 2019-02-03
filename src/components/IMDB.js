import React, { Component } from "react";
import axios from "axios";
import { OMDB_API } from "../utils";

// options: displays all matching movies
import IMDBOptions from "./subcomponents/IMDBOptions";
// results: shows only the movie the user selected
import IMDBResult from "./subcomponents/IMDBResult";

class IMDB extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            data: [],
            display: "",
            chosenData: {}
        };

        this.getData = this.getData.bind(this);
        this.chooseMovie = this.chooseMovie.bind(this);
        this.changeDisplay = this.changeDisplay.bind(this);
    }

    onSearchChange(e) {
        this.setState({ search: e.target.value, display: "" });
    }

    getData(e) {
        e.preventDefault();
        axios
            .get(`${OMDB_API}type="movie"&s=${this.state.search}`)
            .then(res => {
                this.setState({ data: res.data.Search, display: "options" });
            })
            .catch(function(err) {
                console.log(err);
            });
    }

    chooseMovie(title) {
        const chosenData = this.state.data.filter(movie => {
            return movie.Title === title;
        });
        this.setState({ chosenData, display: "result" });
    }

    changeDisplay(display) {
        this.setState({ display });
    }

    render() {
        return (
            <div>
                <h5>IMDB Search</h5>
                <br />
                <form onSubmit={e => this.getData(e)}>
                    <div className="input-field col s12">
                        <p className="form-label">Title</p>
                        <input
                            type="text"
                            value={this.state.search}
                            onChange={e => this.onSearchChange(e)}
                        />
                    </div>
                </form>
                {this.state.display === "options" ? (
                    <IMDBOptions
                        data={this.state.data}
                        chooseMovie={this.chooseMovie}
                    />
                ) : null}
                {this.state.display === "result" ? (
                    <IMDBResult
                        changeDisplay={this.changeDisplay}
                        chosenData={this.state.chosenData}
                        addMovie={this.props.addMovie}
                    />
                ) : null}
            </div>
        );
    }
}

export default IMDB;
