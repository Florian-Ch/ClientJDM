import React, { Component } from "react";

import Relation from "./Relation";

export default class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sort_weight: false,
      limits: '',
      handle_limit: props.handle_limit,
      handle_sort: props.handle_sort,
      handle_updateRelation: props.handle_updateRelation,
      relations: props.relations
    };

    // References
    this.switch_sort = React.createRef();
    this.relation_list = React.createRef();
    // Bind
    this.switch = this.switch.bind(this);
    this.onChangeLimit = this.onChangeLimit.bind(this);
  }

  componentDidMount() {
    this.relation_list.current.style.height = `${window.innerHeight -
      (this.relation_list.current.offsetTop + 100)}px`;
    window.addEventListener("resize", () => {
      this.relation_list.current.style.height = `${window.innerHeight -
        (this.relation_list.current.offsetTop + 100)}px`;
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize");
  }

  switch() {
    let { sort_weight } = this.state;

    if (!sort_weight) {
      this.switch_sort.current.textContent = "Tri alphabétique";
      this.switch_sort.current.classList.add("active")
    } else {
      this.switch_sort.current.textContent = "Tri par poids";
      this.switch_sort.current.classList.remove("active")
    }

    this.setState({ sort_weight: !sort_weight });
    this.state.handle_sort(!sort_weight);
  }

  onChangeLimit(event) {
    let { value } = event.target;
    this.setState({limits: value})
    this.state.handle_limit(value);
  }

  render() {
    return (
      <div className="sidebar">
        <h3>Options :</h3>
        <div className="options">

          <div className="limits">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="limits-input">
                  Nombre d'entrées à afficher
                </span>
              </div>
              <input
                type="number"
                className="form-control"
                value={this.state.limits}
                onChange={this.onChangeLimit}
              />
            </div>
          </div>

          <div className="sorts">
            <div className="btn-group-toggle">
              <label
                className="btn btn-secondary"
                onClick={this.switch}
                ref={this.switch_sort}
              >
                <input type="checkbox" /> Tri par poids
              </label>
            </div>
          </div>

          <div className="relations">
            <h4 className="relations-title">Relations à afficher</h4>
            <div className="relations-list" ref={this.relation_list}>
              {this.state.relations.map((r, i) => (
                <Relation
                  key={i}
                  name={r.name}
                  title={r.title}
                  checked={r.checked}
                  handler={this.state.handle_updateRelation}
                  index={i}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
