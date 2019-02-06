import React, { Component } from "react";
import { withRouter } from "react-router";

import TagSelect from "./TagSelect";

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

        this.getTagsFromSelect = this.getTagsFromSelect.bind(this);
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

    getTagsFromSelect(tags) {
        this.setState({ selectedTags: tags });
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
                <div className="row">
                    <div className="col s12">
                        <TagSelect
                            getAllTags={this.props.getAllTags}
                            getTagsFromSelect={this.getTagsFromSelect}
                            creatable={false}
                        />
                    </div>
                </div>
                <div
                    className="search-option row"
                    style={{ marginLeft: "6px" }}
                >
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
                <div
                    className="search-option row"
                    style={{ marginLeft: "6px" }}
                >
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
