import React from 'react';
import {Provider} from 'react-redux'
import login from './store/store'
import LoginHandler from "./components/LoginHandler";

export default function App() {
  return (
      <Provider store={login}>
        <LoginHandler/>
      </Provider>
  )
}

