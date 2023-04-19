import React, { useState } from 'react';
import ReactDOM from 'react-dom'
import { fromJSX, root, Fun, IComponent, fromPromise } from './icomponent';

export const first = fromJSX<"first">(k => 
  <div>
    <button onClick={_ => k("first")}>{"first"}</button>
  </div>)

export const second = fromJSX<"second">(k => 
  <div>
    <button onClick={_ => k("second")}>{"second"}</button>
  </div>)

export const third = fromPromise<"third">(new Promise((res,rej) => setTimeout(() => res("third"), 5000)))

export const counter = (n0:number) => fromJSX<number>(k => 
  <div>
    <button onClick={_ => k(n0+1)}>{n0}</button>
  </div>)


export const App = (props:{}) => {
  return(
    <>
        {
          // root({ counter:0 },s0 => counter(s0.counter).map(newCounter => ({ counter:newCounter})))
          first.all(second).race(third).toJSX(output => console.log("done", output))
        }
    </>
  )
}

export const main = () => {
  let rootElement = document.querySelector('#root')
  ReactDOM.render(
      <App />,
    rootElement
  )
}

