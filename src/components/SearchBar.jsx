import React, { Component } from "react";
import API from '../API'

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      word: "",
      relations: props.relations
    }
    this.updateInputValue = this.updateInputValue.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  async onClick() {
    // let date = new Date()
    // console.log(await API.getDefinitions(this.state.word), `${(new Date() - date) / 1000}s`)
    console.log(this.state.relations)
  }

  updateInputValue(event) {
    this.setState({word: event.target.value})
  }

  render() {
    return (
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Entrer la recherche ici..."
          aria-label="Search_bar"
          aria-describedby="basic-addon2"
          onChange={this.updateInputValue}
          value={this.state.word}
        />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary search_button" type="button" onClick={this.onClick}>
            Rechercher
          </button>
        </div>
      </div>
    );
  }
}
