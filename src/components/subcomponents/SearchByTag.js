import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { withRouter } from "react-router";

class SearchByTag extends Component {
  constructor(props) {
    super(props);

    this.state = { selectedTags: [] };
  }

  renderAllTags() {
    const tagList = this.props.getAllTags();
    let tagsRender = [];
    let tagClass = "search-tag col s2";
    for (let i in tagList) {
      tagsRender.push(
        <div
          className={
            this.state.selectedTags.includes(tagList[i])
              ? tagClass + " tag-match"
              : tagClass
          }
          key={i}
          onClick={() => this.updateSelectedTags(tagList[i])}
        >
          {tagList[i]}
        </div>
      );
    }

    return tagsRender;
  }

  updateSelectedTags(tag) {
    let newTagArr = this.state.selectedTags;
    if (!this.state.selectedTags.includes(tag)) {
      newTagArr.push(tag);
    } else {
      let index = newTagArr.indexOf(tag);
      newTagArr.splice(index, 1);
    }

    newTagArr = newTagArr.sort();

    this.setState({ selectedTags: newTagArr });
  }

  render() {
    return (
      <div>
        <p>Click 1 or more tags you want to search for and hit "Search"</p>
        {this.renderAllTags()}
      </div>
    );
  }
}

export default withRouter(SearchByTag);
