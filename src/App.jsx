import React, { Component } from "react";
import { Route, NavLink, Routes, HashRouter } from "react-router-dom";

//import styles
import "./assets/reset.scss";
import "./assets/fonts.scss";

//import Components
import Home from "./pages/home/Home";
import History from "./pages/history/History";
import Issue from "./pages/issue/Issue";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <NavLink to="/">home</NavLink>
          <NavLink to="/history">history</NavLink>
          <NavLink to="/issue">issue</NavLink>
          <div className="content">
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/history" element={<History />}></Route>
              <Route exact path="/issue" element={<Issue />}></Route>
            </Routes>
          </div>
        </div>
      </HashRouter>
    );
  }
}
export default App;
