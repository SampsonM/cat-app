import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css'
import { NavBar } from '../components/navBar'
import { Upload } from '../views/upload'

interface AppProps {}

const App: React.FC<AppProps> = ({}: AppProps) => {
  return (
    <Router>
      <div className="cat-container">
        <NavBar />

        <Switch>
          <Route path="/upload">
            <Upload />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
