import React, { Component } from 'react'

export default class Button extends Component{
  constructor(props){
    super(props)

    this.state = {
      name : props.name
    }
  }
  
  render(){
    return(
      <button class="btn btn-outline-secondary" type="button">{this.state.name}</button>
    )
  }
}