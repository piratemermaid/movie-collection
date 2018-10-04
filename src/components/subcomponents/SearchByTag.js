import React, { Component } from "react";
import { withRouter } from "react-router";

class SearchByTag extends Component {
  constructor(props) {
    super(props);

    this.state = { selectedTags: [], error: "", optionAll: false };
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

    this.setState({ selectedTags: newTagArr, error: "" });
  }

  handleSearch() {
    let options = "none";

    if (this.state.selectedTags.length < 1) {
      this.setState({ error: "Please select at least 1 tag" });
      return;
    }

    let tagStr = this.state.selectedTags.toString();
    tagStr = tagStr.replace(/,/g, "&");

    if (this.state.optionAll) {
      options = "all";
    }
    this.props.history.push(`/search/tags/${tagStr}/options=${options}`);
  }

  onOptionAllChange(e) {
    this.setState({ optionAll: e.target.checked });
  }

  render() {
    return (
      <div>
        <p className="info">
          Click 1 or more tags you want to search for, add options if you want
          and hit "Search"
        </p>
        <div className="row">{this.renderAllTags()}</div>
        <div className="search-option row" style={{ marginLeft: "6px" }}>
          <div className="input-field">
            <input
              id="search-option-all"
              type="checkbox"
              onClick={e => this.onOptionAllChange(e)}
              className="checkbox-blue"
            />
            <label htmlFor="search-option-all">
              Display movies that contain ALL selected tags
            </label>
          </div>
        </div>
        <div className="row error">
          <div className="col s12">{this.state.error}</div>
        </div>
        <div className="row">
          <div className="col s12">
            <button
              className="btn waves-effect waves-light blue lighten-2"
              onClick={() => this.handleSearch()}
            >
              Search
              <i className="material-icons right">search</i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SearchByTag);
