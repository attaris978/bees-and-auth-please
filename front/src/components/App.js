import React from 'react'
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom'
import Wheel from './Wheel'
import Message from './Message'
import LoginApp from './login/LoginApp';


import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from '../state/reducer'

let store
export const resetStore = () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))
}
resetStore()

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Message />
        <h1>Interview Demo</h1>
        <nav>
          <NavLink id="wheelLink" to="/">Wheel</NavLink>
          <NavLink id="login" to="/login">Login-App</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<Wheel />} />
          <Route path="login" element={<LoginApp />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
