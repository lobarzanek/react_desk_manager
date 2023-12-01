import React, { Component } from "react";
import { Route, NavLink, Routes, HashRouter } from "react-router-dom";

//import styles
import "./assets/reset.scss";
import "./assets/fonts.scss";
import "./assets/app.scss";

//import Components
import Home from "./pages/home/Home";
import History from "./pages/history/History";
import Issue from "./pages/issue/Issue";
import Navbar from "./components/navbar/Navbar";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <Navbar/>
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
