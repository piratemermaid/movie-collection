import React, { Component } from "react";

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

  componentWillMount() {
    this.setState({ exportData: JSON.stringify(this.props.movies) });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="input-field col m6 s12">
            <p className="form-label">
              <b>EXPORT DATA</b>
              <br />
              Copy your data and save it in a JSON file
            </p>
            <button
              className="btn blue lighten-2"
              style={{ margin: "22px 0" }}
              onClick={e => copyExportData(e)}
            >
              Copy to Clipboard
            </button>
            <textarea
              id="account-export"
              className="materialize-textarea"
              value={this.state.exportData}
              onChange={e => this.onExportDataChange(e)}
            />
          </div>
          <div className="input-field col m6 s12">
            <p className="form-label">
              <b>IMPORT DATA</b>
              <br />
              Paste your data here and click "Import Data"
            </p>
            <button
              className="btn blue lighten-2"
              style={{ margin: "22px 0" }}
              onClick={e => this.importData(e)}
            >
              Import Data
            </button>
            <textarea
              id="account-import"
              className="materialize-textarea"
              value={this.state.importData}
              onChange={e => this.onImportDataChange(e)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Account;
