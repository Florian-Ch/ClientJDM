import React, { Component } from 'react'
import SearchBar from './SearchBar'
import Button from './Button'

export default class Home extends Component {
  render() {
    return (
      <div class="container">
        <div class="raw"> {/* ligne de titre */}
          <h1>Client Jeux de mots</h1>
        </div>
        <div class="raw"> {/* ligne des options */}
          {/*<Button name="test"/>*/}
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm">Nombre d'entrées à afficher</span>
            </div>
            <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" style={{maxWidth:"50px"}}/>
          </div>
        </div>
        <div class="raw"> {/* ligne de barre de recherche */}
          <SearchBar/>
        </div>
        <div class="raw"> {/* ligne de résultats */}
        </div>
      </div>
    )
  }
}
