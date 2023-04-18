import React from 'react';
import ReactDOM from 'react-dom'
import { Home } from './Home/home';

export const main = () => {
  let rootElement = document.querySelector('#root')

  ReactDOM.render(
      <Home />,
    rootElement
  )
}