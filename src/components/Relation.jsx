import React, { Component } from "react";

export default class Relation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: props.index,
      name: props.name,
      title: props.title,
      checked: props.checked,
      handler: props.handler
    };
    // Bind
    this.check = this.check.bind(this);

  }

  check() {
    let { checked } = this.state;

    this.setState({ checked: !checked });
    this.state.handler(this.state.index, !checked);
  }

  render() {
    return (
      <div
        className="btn-group-toggle relation"
        data-toggle="buttons"
        title={this.state.title}
      >
        <label
          className="btn btn-secondary"
          onClick={this.check}
        >
          <input type="checkbox"/> {this.state.name.slice(2)}
        </label>
      </div>
    );
  }
}
