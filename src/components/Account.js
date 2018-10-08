import React, { Component } from "react";

function exportData(e) {
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
    localStorage.setItem("movieState", this.state.importData);
    alert("Import successful. Please refresh the page.");
  }

  componentWillMount() {
    this.setState({ exportData: localStorage.getItem("movieState") });
  }

  render() {
    return (
      <div>
        <p>
          Since this app doesn't have a backend yet, your data is stored in
          localStorage, so it's not saved if you switch devices. You can copy
          your file and import a file here to save/move your data. Not the best
          way to do this but it's what I've got for now!
        </p>
        <div className="row">
          <div className="input-field col s6">
            <p className="form-label">Copy your data to save it somewhere</p>
            <button
              className="btn blue lighten-2"
              style={{ margin: "22px 0" }}
              onClick={e => exportData(e)}
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
          <div className="input-field col s6">
            <p className="form-label">
              Paste your data here to import it, then refresh the page
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
