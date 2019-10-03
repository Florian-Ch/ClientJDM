import React, { Component } from 'react'

export default class Home extends Component {
  render() {
    return (
      <div>
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button">Rechercher</button>
          </div>
        </div>
      </div>
    )
  }
}
