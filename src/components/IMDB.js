import _ from "lodash";
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
      search: "Happy Feet",
      data: [],
      display: "",
      chosenData: {}
    };

    this.getData = this.getData.bind(this);
    this.chooseMovie = this.chooseMovie.bind(this);
  }

  onSearchChange(e) {
    this.setState({ search: e.target.value, display: "" });
  }

  getData(e) {
    e.preventDefault();
    // TODO: add this back in after testing
    // axios
    //   .get(`${OMDB_API}type="movie"&s=${this.state.search}`)
    //   .then(res => {
    //     console.log(res.data.Search);
    //     this.setState({ data: res.data.Search, display: "options" });
    //     localStorage.setItem("movieSearch", JSON.stringify(res.data.Search));
    //   })
    //   .catch(function(err) {
    //     console.log(err);
    //   });
    this.setState({ display: "options" });
  }

  chooseMovie(title) {
    console.log(title);
    const chosenData = this.state.data.filter(movie => {
      return movie.Title === title;
    });
    this.setState({ chosenData, display: "result" });
  }

  componentWillMount() {
    // TODO: remove this, it is for testing
    // so we don't call the API a million times
    this.setState({ data: JSON.parse(localStorage.getItem("movieSearch")) });
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
          <IMDBOptions data={this.state.data} chooseMovie={this.chooseMovie} />
        ) : null}
        {this.state.display === "result" ? (
          <IMDBResult chosenData={this.state.chosenData} />
        ) : null}
      </div>
    );
  }
}

export default IMDB;
