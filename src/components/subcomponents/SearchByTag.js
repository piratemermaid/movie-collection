import React, { Component } from "react";
import { withRouter } from "react-router";

class SearchByTag extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTags: [],
      error: "",
      optionAll: false,
      optionExclude: false,
      exclude: []
    };
  }

  renderAllTags() {
    const tagList = this.props.getAllTags();
    let tagsRender = [];
    for (let i in tagList) {
      let tagClass = "search-tag col s2";
      if (this.state.exclude.includes(tagList[i])) {
        tagClass += " tag-exclude";
      } else {
        if (this.state.selectedTags.includes(tagList[i])) {
          tagClass += " tag-match";
        }
      }
      tagsRender.push(
        <div
          className={tagClass}
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
    let newExclude = this.state.exclude;

    if (this.state.exclude.includes(tag)) {
      newTagArr.push(tag);
      let index = newExclude.indexOf(tag);
      newExclude.splice(index, 1);
    } else if (!this.state.selectedTags.includes(tag)) {
      newTagArr.push(tag);
    } else {
      let index = newTagArr.indexOf(tag);
      newTagArr.splice(index, 1);
    }

    newTagArr = newTagArr.sort();

    this.setState({ selectedTags: newTagArr, exclude: newExclude, error: "" });
  }

  renderExcludeTags() {
    const tagList = this.props.getAllTags();
    let tagsRender = [];
    let tagClass = "search-tag col s2";
    for (let i in tagList) {
      if (!this.state.exclude.includes(tagList[i])) {
        tagsRender.push(
          <div
            className={tagClass}
            key={i}
            onClick={() => this.updateExcludedTags(tagList[i])}
          >
            {tagList[i]}
          </div>
        );
      }
    }

    return tagsRender;
  }

  updateExcludedTags(tag) {
    let newExclude = this.state.exclude;
    let newTagArr = this.state.selectedTags;

    newExclude.push(tag);

    if (this.state.selectedTags.includes(tag)) {
      let index = this.state.selectedTags.indexOf(tag);
      newTagArr.splice(index, 1);
    }

    this.setState({ selectedTags: newTagArr, exclude: newExclude });
  }

  handleSearch() {
    let options;
    this.state.optionAll || this.state.optionExclude
      ? (options = "")
      : (options = "none");

    if (this.state.selectedTags.length < 1) {
      this.setState({ error: "Please select at least 1 tag" });
      return;
    }

    let tagStr = this.state.selectedTags.toString();
    tagStr = tagStr.replace(/,/g, "&");

    let exclude = this.state.optionExclude && this.state.exclude.length > 0;

    if (this.state.optionAll) {
      options = "all";
      if (exclude) {
        options += "&";
      }
    }

    if (exclude) {
      const excludeStr = this.state.exclude.toString().replace(/,/g, "&");
      options += "exclude=" + excludeStr;
    }

    const url = `/search/tags/${tagStr}/options=${options}`;
    this.props.history.push(url);
  }

  onOptionAllChange(e) {
    this.setState({ optionAll: e.target.checked });
  }

  onOptionExcludeChange(e) {
    if (!e.target.checked) {
      this.setState({ exclude: [] });
    }
    this.setState({ optionExclude: e.target.checked });
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
        <div className="search-option row" style={{ marginLeft: "6px" }}>
          <div className="input-field">
            <input
              id="search-option-exclude"
              type="checkbox"
              onClick={e => this.onOptionExcludeChange(e)}
              className="checkbox-blue"
            />
            <label htmlFor="search-option-exclude">
              Exclude certain tags from search
            </label>
          </div>
        </div>
        {this.state.optionExclude ? this.renderExcludeTags() : null}
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
