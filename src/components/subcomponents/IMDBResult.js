import React from "react";

const IMDBResult = props => {
  console.log(props.chosenData);
  const data = props.chosenData[0];
  return (
    <div>
      <div className="col m6 s12">
        <p className="imdb-title">
          {data.Title} ({data.Year})
        </p>
        <img className="movie-poster-lg" src={data.Poster} alt={data.Title} />
      </div>
    </div>
  );
};

export default IMDBResult;
