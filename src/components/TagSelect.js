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
            options.push({ value: tag, label: tag });
        }

        return options;
    }

    render() {
        console.log(this.props.collection);
        return (
            <Creatable
                options={this.getOptions()}
                isSearchable={true}
                isMulti={true}
            />
        );
    }
}

export default TagSelect;
