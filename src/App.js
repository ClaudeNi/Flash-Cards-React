import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import HomePage from "./components/Pages/HomePage.jsx";
import ManagerPage from "./components/Pages/ManagerPage.jsx";
import "./App.css";
import "./components/Pages/pages.css";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Header />
                    <Route path="/" exact component={HomePage} />
                    <Route path="/manager" exact component={ManagerPage} />
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
