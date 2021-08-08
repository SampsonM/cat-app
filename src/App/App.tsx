import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { NavBar } from '../components/navBar'
import { Home, Upload } from '../views'
import './App.css'

interface AppProps {}

const App: React.FC<AppProps> = ({}: AppProps) => {
  return (
    <Router>
      <div className="cat-app">
        <NavBar />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/upload">
            <Upload />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
