import React, { Component } from "react";
import Creatable from "react-select/lib/Creatable";

class TagSelect extends Component {
    constructor(props) {
        super(props);

        this.state = { selected: [] };
    }

    getOptions() {
        let options = [];
        const tags = this.props.getAllTags();

        for (let i in tags) {
            const tag = tags[i];
            options.push({ value: tag, label: tag });
        }

        return options;
    }

    handleChange(e) {
        let tags = [];
        for (let i in e) {
            tags.push(e[i].value);
        }
        this.props.getTagsFromSelect(tags);
    }

    render() {
        return (
            <Creatable
                options={this.getOptions()}
                isSearchable={true}
                isMulti={true}
                onChange={e => this.handleChange(e)}
            />
        );
    }
}

export default TagSelect;
