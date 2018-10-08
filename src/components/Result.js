import _ from "lodash";
import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import dotProp from "dot-prop";

import TableList from "./TableList";

const Result = props => {
  let title = "";
  let tags = dotProp.get(props.match, "params.tags");
  let tagsOption;
  let year = parseInt(dotProp.get(props.match, "params.year"), 10);
  let yearOption;
  let fromYear;

  if (tags) {
    let options = dotProp.get(props.match, "params.options").split("=")[1];
    if (options === "all") {
      tagsOption = "all";
    }
    let titleArr = tags.split("&");
    if (titleArr.length === 1) {
      title = titleArr[0];
    } else if (titleArr.length === 2) {
      title = titleArr[0] + " & " + titleArr[1];
    } else {
      for (let i in titleArr) {
        if (i < titleArr.length - 1) {
          title += titleArr[i] + ", ";
        } else {
          title += " & " + titleArr[i];
        }
      }
    }
  } else if (year) {
    let options = dotProp.get(props.match, "params.options").split("=")[1];
    title = year;

    if (options !== "none") {
      if (options.includes("range")) {
        fromYear = options.split("_")[2];
        title = `From ${fromYear} to ${title}`;
        yearOption = "range";
      }

      if (options === "before") {
        title = `Before ${title}`;
        yearOption = "before";
      }

      if (options === "after") {
        title = `After ${title}`;
        yearOption = "after";
      }
    }
  } else {
    title = String(props.match.path.substring(props.match.path.length, 8));
  }

  function getMatches() {
    let matches = [];

    if (tags) {
      let tagsArr = tags.split("&");
      let inArr, matched;

      for (let i in props.movies) {
        inArr = false;
        matched = false;
        for (let j in tagsArr) {
          inArr = _.some(matches, { title: props.movies[i].title });
          if (tagsOption === "all") {
            if (!props.movies[i].tags.includes(tagsArr[j])) {
              matched = false;
              break;
            }
          }
          if (props.movies[i].tags.includes(tagsArr[j]) && !inArr) {
            matched = true;
          }
        }
        if (matched) {
          matches.push(props.movies[i]);
        }
      }
    } else if (year) {
      if (yearOption) {
        if (yearOption === "range") {
          matches = props.movies.filter(movie => {
            if (
              parseInt(movie.year, 10) >= parseInt(fromYear, 10) &&
              parseInt(movie.year, 10) <= year
            ) {
              return movie.title;
            } else return null;
          });
        } else if (yearOption === "before") {
          matches = props.movies.filter(movie => {
            if (parseInt(movie.year, 10) <= year) {
              return movie.title;
            } else return null;
          });
        } else {
          matches = props.movies.filter(movie => {
            if (parseInt(movie.year, 10) >= year) {
              return movie.title;
            } else return null;
          });
        }
      } else {
        matches = props.movies.filter(movie => {
          if (parseInt(movie.year, 10) === year) {
            return movie.title;
          } else return null;
        });
      }
    } else {
      // title = 'unwatched'
      matches = props.movies.filter(movie => {
        if (!movie.watched) {
          return movie.title;
        } else return null;
      });
    }

    return matches;
  }

  return (
    <div>
      <Link to="/">
        <i className="material-icons small icon-link">arrow_back</i>
      </Link>
      <br />
      <h5 className="result-title">Movies matching "{title}"</h5>
      {getMatches().length > 0 ? (
        <TableList
          movies={getMatches()}
          tags={tags}
          editable={false}
          deletable={true}
        />
      ) : (
        <p>No matches...</p>
      )}
    </div>
  );
};

export default withRouter(Result);
