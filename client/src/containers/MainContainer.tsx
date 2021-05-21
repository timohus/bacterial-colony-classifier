import React, {FunctionComponent} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import 'assets/style/main.css'
import HomePage from "containers/pages/HomePage"
import AboutPage from "containers/pages/AboutPage"
import SideBar from "components/layout/SideBar"


const MainContainer: FunctionComponent = () => {
  return (
    <div>
      <Router>
        <div className="flex">
          <aside className="h-screen sticky top-0">
            <SideBar/>
          </aside>

          <main className="flex-1">
            <Switch>
              <Route path="/about">
                <AboutPage data={{}} />
              </Route>
              <Route path="/">
                <HomePage data={{}} />
              </Route>
            </Switch>
          </main>
        </div>
      </Router>
    </div>
  )
}


export default MainContainer
