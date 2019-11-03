import React, { Component } from "react";
import API from "../API";

export default class Navigation extends Component {
  lastCall;
  lastCallTimer;
  constructor(props) {
    super(props);

    this.lastCall = 0;
    this.state = {
      word: "",
      handler: props.handler,
      suggestions: []
    };

    this.updateInputValue = this.updateInputValue.bind(this);
    this.onClick = this.onClick.bind(this);
    this.debounce = this.debounce.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keyup", event => {
      if (this.state.word !== "" && event.key === "Enter") {
        this.onClick();
      }
    });
  }

  componentWillUnmount() {
    document.removeEventListener("keyup");
  }

  async onClick() {
    // Clear suggestions
    this.setState({ suggestions: [] });
    // Get definitions
    this.state.handler(await API.getDefinitions(this.state.word));
    // Get relations
    for (let i = 0; i < this.props.relations.length; i++) {
      const rel = this.props.relations[i];
      if (rel.checked) {
        let data = await API.getRelations(
          this.state.word,
          rel.id,
          this.props.limits
        );
        this.state.handler(data);
      }
    }
  }

  async updateInputValue(event) {
    let { value } = event.target;

    if (value === 0) value = event.target.innerText;
    this.setState({ word: value });
    if (value.length >= 3) {
      // Debounce function (wait 200ms between calls)
      this.debounce(async () => {
        let data = await API.getAutocomplete(value);
        this.setState({ suggestions: data });
      }, 200)();
      this.setState({ last_update: Date.now() });
    } else {
      this.setState({ suggestions: [] });
    }
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="brand" href="/">
          <img src="/diko_logo.png" alt="Diko" id="logo" />
        </a>

        <div className="collapse navbar-collapse show" id="div-search">
          <div className="form-search">
            <div className="input-search">
              <input
                className="btn btn-search"
                type="search"
                placeholder="Rechercher un mot..."
                onChange={this.updateInputValue}
                value={this.state.word}
              />
              <ul id="suggestions">
                {this.state.suggestions.map((el, i) => (
                  <li key={i} onClick={this.updateInputValue}>
                    {el}
                  </li>
                ))}
              </ul>
            </div>

            <button
              className="btn btn-valid-search"
              type="submit"
              onClick={this.onClick}
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </nav>
    );
  }

  debounce(f, t) {
    let self = this;
    return function(args) {
      let previousCall = self.lastCall;
      self.lastCall = Date.now();
      if (previousCall && self.lastCall - previousCall <= t) {
        clearTimeout(self.lastCallTimer);
      }
      self.lastCallTimer = setTimeout(() => f(args), t);
    };
  }
}
