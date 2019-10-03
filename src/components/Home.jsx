import React, { Component } from 'react'
import SearchBar from './SearchBar'
import Button from './Button'

export default class Home extends Component {
  constructor(props){
    super(props)

    var switch_sort = React.createRef()

  }

  onClickButton(){
    console.log()
  }

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
          <div class="btn-group-toggle" data-toggle="buttons">
            <label class="btn btn-secondary active">
              <input type="checkbox" checked autocomplete="off"/> Tri par poids
            </label>
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