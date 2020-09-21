import React from "react"
import LoginComponent from "../components/LoginComponent/LoginComponent"
import HomeComponent from "../components/HomeComponent/HomeComponent"
import {createBrowserHistory} from "history"
import {BrowserRouter as Router, Route} from "react-router-dom"
import "./App.sass"

const history = createBrowserHistory()

function App() {
  return (
    <div className="app-container">
      <Router history={history}>
        <Route exact path="/" component={LoginComponent} />
        <Route path="/home" component={HomeComponent} />
      </Router>
    </div>
  )
}

export default App
