import React, { Component } from 'react'
import SearchBar from './SearchBar'
import Button from './Button'

export default class Home extends Component {
  constructor(props){
    super(props)

    this.switch_sort = React.createRef()
    this.switch = this.switch.bind(this)

    this.state = {toggle : false}
  }

  switch(){
    if(!this.state.toggle)
      this.switch_sort.current.textContent = "Tri alphabétique"
    else
      this.switch_sort.current.textContent = "Tri par poids"
    this.setState({toggle : !this.state.toggle})
  }

  render() {
    return (
      <div className="container">
        <div className="row"> {/* ligne de titre */}
          <h1>Client Jeux de mots</h1>
        </div>

        <div className="row"> {/* ligne des options */}
          {/*<Button name="test"/>*/}
          <div className="col">
            <div className="input-group input-group-sm mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-sm">Nombre d'entrées à afficher</span>
              </div>
              <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" style={{maxWidth:"50px"}}/>
            </div>
          </div>
          <div className="col">
            <div className="btn-group-toggle" data-toggle="buttons">
              <label className="btn btn-secondary active" onClick={this.switch} ref={this.switch_sort}>
                <input type="checkbox"/> Tri par poids
              </label>
            </div>
          </div>
        </div>

        <div className="row"> {/* ligne de barre de recherche */}
          <SearchBar/>
        </div>
        <div className="row"> {/* ligne de résultats */}
        </div>
      </div>
    )
  }
}