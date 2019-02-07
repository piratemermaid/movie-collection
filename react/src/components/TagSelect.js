import React, { Component } from "react";
import Select from "react-select";
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
            if (!this.props.skip || !this.props.skip.includes(tag)) {
                options.push({ value: tag, label: tag });
            }
        }

        return options;
    }

    handleChange(e) {
        this.setState({ selected: e });

        let tags = [];
        for (let i in e) {
            tags.push(e[i].value);
        }
        this.props.getTagsFromSelect(tags, this.props.type);
    }

    componentWillMount() {
        // Start out with tags selected if need be
        if (this.props.tags) {
            let selected = [];
            const tags = this.props.tags;
            for (let i in tags) {
                selected.push({
                    value: tags[i],
                    label: tags[i]
                });
            }
            this.setState({ selected });
        }
    }

    render() {
        if (this.props.creatable) {
            return (
                <Creatable
                    options={this.getOptions()}
                    isSearchable={true}
                    isMulti={true}
                    value={this.state.selected}
                    onChange={e => this.handleChange(e)}
                />
            );
        } else {
            return (
                <Select
                    options={this.getOptions()}
                    isSearchable={true}
                    isMulti={true}
                    value={this.state.selected}
                    onChange={e => this.handleChange(e)}
                />
            );
        }
    }
}

export default TagSelect;
