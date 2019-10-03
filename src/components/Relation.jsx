import React, { Component } from "react";

export default class Relation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name,
      title : props.title
    };

    this.checkbox = React.createRef()
    this.check = this.check.bind(this)
  }

  check(p){
    if(p.target.tagName != "INPUT"){
      this.checkbox.current.checked = !this.checkbox.current.checked
    }
  }

  render() {
    return (
      <div className="row">
        <div className="input-group mb-1" title={this.state.title} onClick={this.check} >
          <div className="input-group-prepend">
            <div className="input-group-text">
              <input type="checkbox" aria-label="relation_checkbox" defaultChecked ref={this.checkbox} />
            </div>
          </div>
          <label className="form-control" >{this.state.name}</label>
        </div>
      </div>
    );
  }
}
