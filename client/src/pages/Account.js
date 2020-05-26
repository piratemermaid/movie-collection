import React, { Component } from "react";
import { fillMyMovies } from "../myMovies";
import PageHeading from "../components/PageHeading";

function copyExportData(e) {
    var copyData = document.getElementById("account-export");
    copyData.select();
    document.execCommand("copy");
    alert("Copy successful.");
}

class Account extends Component {
    constructor(props) {
        super(props);

        this.state = { exportData: "", importData: "" };
    }

    onExportDataChange(e) {
        this.setState({ exportData: e.target.value });
    }

    onImportDataChange(e) {
        this.setState({ importData: e.target.value });
    }

    importData(e) {
        const movies = JSON.parse(this.state.importData);
        this.props.updateLocalStorage(movies.collection, movies.wishlist);
        alert("Import successful.");
    }

    fillDevMovies(obj) {
        this.props.updateLocalStorage(obj.collection, obj.wishlist);
    }

    componentWillMount() {
        this.setState({ exportData: JSON.stringify(this.props.movies) });
    }

    render() {
        return (
            <div>
                <PageHeading heading="My Account" />
                <div className="row">
                    <div className="input-field col m6 s12 no-padding-left">
                        <p className="form-label">
                            <b>EXPORT DATA</b>
                            <br />
                            Copy your data and save it in a JSON file
                        </p>
                        <button
                            className="btn blue lighten-2"
                            style={{ margin: "22px 0" }}
                            onClick={(e) => copyExportData(e)}
                        >
                            Copy to Clipboard
                        </button>
                        <textarea
                            id="account-export"
                            className="materialize-textarea"
                            value={this.state.exportData}
                            onChange={(e) => this.onExportDataChange(e)}
                        />
                    </div>
                    <div className="input-field col m6 s12 no-padding-right">
                        <p className="form-label">
                            <b>IMPORT DATA</b>
                            <br />
                            Paste your data here and click "Import Data"
                        </p>
                        <button
                            className="btn blue lighten-2"
                            style={{ margin: "22px 0" }}
                            onClick={(e) => this.importData(e)}
                        >
                            Import Data
                        </button>
                        <textarea
                            id="account-import"
                            className="materialize-textarea"
                            value={this.state.importData}
                            onChange={(e) => this.onImportDataChange(e)}
                        />
                    </div>
                </div>
                <div className="dev-options">
                    <a
                        className="dev-option"
                        onClick={() => this.fillDevMovies(fillMyMovies())}
                    >
                        Fill dev movies
                    </a>
                </div>
            </div>
        );
    }
}

export default Account;
