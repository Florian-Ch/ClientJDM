import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './components/Home'

export default class Routes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      routes: [
        {
          path: '/',
          component: Home,
          exact: true
        }
      ]
    }
  }

  render() {
    return (
      <Switch>
        {this.state.routes.map((route, i) => (
          <Route
            key={i}
            exact={route.exact}
            path={route.pat}
            render={props => (
              <route.component {...props} routes={route.routes} />
            )}
          />
        ))}
        <Route component={Home} /> {/* Default route */}
      </Switch>
    )
  }
}
