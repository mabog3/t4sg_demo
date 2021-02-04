import './App.css'
import React from 'react'
import Home from './home'
import UserProvider from './providers/UserProvider'
import {Switch, Route, Redirect, BrowserRouter} from 'react-router-dom'

function App() {
  return (
    <div className="App">
        <UserProvider>
          <Home/>
        </UserProvider>
    </div>
  );
}

export default App;
