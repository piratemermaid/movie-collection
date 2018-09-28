import React from "react";
import { withRouter } from "react-router";

const AddMovie = props => {
  const type = props.match.params.type;

  function addMovie(e) {
    e.preventDefault();

    const title = document.getElementById("movie-title").value;
    const year = document.getElementById("movie-year").value;
    const tags = document.getElementById("movie-tags").value;
    const watched = document.getElementById("movie-watched").value;

    const info = { title, year, tags, watched };

    props.addMovie(info, type);
  }

  return (
    <div className="row">
      <div className="col s12">
        <div className="row">
          <form onSubmit={() => addMovie()}>
            <div className="input-field col s12">
              <input id="movie-title" type="text" />
              <label htmlFor="movie-title">Movie Title</label>
            </div>
            <div className="input-field col s12">
              <input id="movie-year" type="text" />
              <label htmlFor="movie-year">Year</label>
            </div>
            <div className="input-field col s12">
              <input id="movie-tags" type="text" />
              <label htmlFor="movie-tags">Tags</label>
            </div>
            <div className="input-field col s12">
              <input id="movie-watched" type="text" />
              <label htmlFor="movie-watched">Watched?</label>
            </div>
            <div className="input-field col s12">
              <button
                className="btn waves-effect waves-light blue lighten-2"
                onClick={e => addMovie(e)}
              >
                Add
                <i className="material-icons right" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(AddMovie);
