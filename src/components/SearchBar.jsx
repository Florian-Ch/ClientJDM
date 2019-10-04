import React, { Component } from "react";

export default class Home extends Component {
  render() {
    return (
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Entrer la recherche ici..."
          aria-label="Search_bar"
          aria-describedby="basic-addon2"
        />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary search_button" type="button">
            Rechercher
          </button>
        </div>
      </div>
    );
  }
}
