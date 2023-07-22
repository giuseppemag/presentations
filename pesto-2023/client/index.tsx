import React, { ReactNode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom'
import { List } from 'immutable';
 
// Want to learn more with me? Head over to my academy:
// 
//           http://dev-academy.uscreen.io
//
// Use coupon --> PESTO2023 <-- valid only today

type Fun<i,o> = (_:i) => o

interface IComponent<o> {
  toJSX(k:(newValue:o) => void) : JSX.Element,
  map<o2>(f:Fun<o,o2>) : IComponent<o2>,
  race<o2>(other:IComponent<o2>) : IComponent<o | o2>
} 

const fromJSX = <o,>(jsx:(k:Fun<o,void>) => JSX.Element) : IComponent<o> => ({
  toJSX:k => jsx(k),
  map:<o2,>(f:Fun<o,o2>) : IComponent<o2> => fromJSX(k2 => jsx(o => k2(f(o)))),
  race: function<o2,>(this:IComponent<o>, other:IComponent<o2>) : IComponent<o | o2> { return race(this, other) }
})

function race<o1,o2>(first:IComponent<o1>, second:IComponent<o2>) : IComponent<o1 | o2> {
  const [[o1,o2], setState] = useState<[o1 | undefined, o2 | undefined]>([undefined, undefined])
  return fromJSX(k => {
    return <>
      {first.toJSX(newO1 => {
        setState(([o1,o2]) => {
          if (o1 == undefined && o2 == undefined) { k(newO1) }
          return [newO1,o2]
        })
      })}
      {second.toJSX(newO2 => {
        setState(([o1,o2]) => {
          if (o1 == undefined && o2 == undefined) { k(newO2) }
          return [o1,newO2]
        })
      })}
    </>
  })
}

function root<s,>(initialState:s, app:Fun<s,IComponent<s>>) {
  const [s0,setState] = useState<s>(initialState)
  return app(s0).toJSX(setState)
}

const myCounter = (currentState:number) => fromJSX<number>(setState => 
    <div>
      <div>The current count is {currentState}</div>
      <button onClick={_ => setState(currentState+1)}>+1</button>
    </div>
  )

type MyCountersState = {
  counter1:number
  counter2:number
  counter3:number
}
const initialMyCountersState:MyCountersState = { counter1:0, counter2:0, counter3:0 }
const myCountersStateUpdaters = {
  setCounter1:(currentState:MyCountersState) => (newValue:number) : MyCountersState =>
    ({...currentState, counter1:newValue}),
  setCounter2:(currentState:MyCountersState) => (newValue:number) : MyCountersState =>
    ({...currentState, counter2:newValue}),
  setCounter3:(currentState:MyCountersState) => (newValue:number) : MyCountersState =>
    ({...currentState, counter3:newValue}),
}

export const main = () => {
  return createRoot(document.getElementById('root')!).render(
    root<MyCountersState>(initialMyCountersState, 
        currentState => 
          myCounter(currentState.counter1).map(myCountersStateUpdaters.setCounter1(currentState)).race(
          myCounter(currentState.counter2).map(myCountersStateUpdaters.setCounter2(currentState)).race(
          myCounter(currentState.counter3).map(myCountersStateUpdaters.setCounter3(currentState))
          )))
  )
}
