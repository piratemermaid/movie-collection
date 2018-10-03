import _ from "lodash";
import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import dotProp from "dot-prop";

import TableList from "./TableList";

const Result = props => {
  let title = "";
  const tags = dotProp.get(props.match, "params.tags");
  if (props.match.params.tags) {
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
  } else {
    title = String(props.match.path.substring(props.match.path.length, 8));
  }

  function getMatches() {
    let matches = [];
    if (props.match.params.tags) {
      let tagsArr = tags.split("&");
      let inArr;

      for (let i in props.movies) {
        inArr = false;
        for (let j in tagsArr) {
          inArr = _.some(matches, { title: props.movies[i].title });
          if (props.movies[i].tags.includes(tagsArr[j]) && !inArr) {
            matches.push(props.movies[i]);
          }
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
      <TableList movies={getMatches()} tags={tags} editable={false} />
    </div>
  );
};

export default withRouter(Result);
