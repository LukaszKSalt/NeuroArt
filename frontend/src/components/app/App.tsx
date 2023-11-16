import React from 'react';
import './App.css'
import {BrowserRouter} from 'react-router-dom'
import AppContainer from "../appContainer/AppContainer";

function App() {
    return (
        <BrowserRouter>
            <AppContainer/>
        </BrowserRouter>
    );
}

export default App;
