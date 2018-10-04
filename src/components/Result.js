import _ from "lodash";
import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import dotProp from "dot-prop";

import TableList from "./TableList";

const Result = props => {
  let optionAll = false;
  let title = "";
  let tags = dotProp.get(props.match, "params.tags");
  let year = dotProp.get(props.match, "params.year");

  if (tags) {
    if (tags.includes("+optionAll")) {
      tags = tags.substring(0, tags.length - 10);
      optionAll = true;
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
    let options = dotProp.get(props.match, "params.options");
    title = year;

    if (options) {
      if (options.includes("range")) {
        let fromYear = options.split("_")[2];
        title = `From ${fromYear} to ${title}`;
      }

      if (options === "before") {
        title = `Before ${title}`;
      }

      if (options === "after") {
        title = `After ${title}`;
      }
    }
  } else {
    title = String(props.match.path.substring(props.match.path.length, 8));
  }

  function getMatches() {
    let matches = [];
    if (props.match.params.tags) {
      let tagsArr = tags.split("&");
      let inArr, matched;

      for (let i in props.movies) {
        inArr = false;
        matched = false;
        for (let j in tagsArr) {
          inArr = _.some(matches, { title: props.movies[i].title });
          if (optionAll) {
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
      <h5>Movies matching "{title}"</h5>
      <TableList
        movies={getMatches()}
        tags={tags}
        editable={false}
        deletable={true}
      />
    </div>
  );
};

export default withRouter(Result);
