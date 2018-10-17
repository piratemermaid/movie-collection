import React from "react";

const IMDBOptions = props => {
  function displayOptions() {
    let i = -1;
    return props.data.map(movie => {
      i++;
      return (
        <div
          className="col l3 m4 s12 imdb-result"
          key={movie.Title}
          onClick={() => props.chooseMovie(movie.Title)}
        >
          {movie.Poster !== "N/A" ? (
            <div>
              <img
                src={movie.Poster}
                alt={movie.Title}
                title={movie.Title}
                className="movie-poster"
              />
              <br />
              {movie.Title} {movie.Year ? `(${movie.Year})` : null}
            </div>
          ) : null}
        </div>
      );
    });
  }

  return <div className="row">{displayOptions()}</div>;
};

export default IMDBOptions;
