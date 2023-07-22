import React, { useEffect, useState } from "react";

export type Fun<i, o> = (_: i) => o;
export interface IComponent<o> {
  toJSX(k: Fun<o, void>): JSX.Element
  map<o2>(f: Fun<o, o2>): IComponent<o2>
  race<o2>(other:IComponent<o2>): IComponent<o | o2>
  all<o2>(other:IComponent<o2>): IComponent<[o,o2]>
}

export function root<s,>(initialState:s, app:Fun<s,IComponent<s>>) {
  const [s0,setState] = useState<s>(initialState)
  return app(s0).toJSX(s1 => setState(s1))
}

export const fromJSX = <o,>(jsx: (k: Fun<o, void>) => JSX.Element): IComponent<o> =>
  ({
    toJSX: k => jsx(k),
    map: <o2,>(f: Fun<o, o2>): IComponent<o2> => fromJSX(k2 => jsx(o => k2(f(o)))),
    race: function<o2,>(this:IComponent<o>, other:IComponent<o2>): IComponent<o | o2> { return race(this,other)},
    all: function<o2,>(this:IComponent<o>, other:IComponent<o2>): IComponent<[o,o2]> { return all(this,other)}
  })

export function race<o1,o2>(first:IComponent<o1>, second:IComponent<o2>) : IComponent<o1|o2> {
  const [[o1,o2],setState] = useState<[o1 | undefined,o2 | undefined]>([undefined,undefined])
  return fromJSX(k => {
    return <>
      {first.toJSX(newO1 => { 
        setState(([o1,o2]) => {
        if (o1 == undefined && o2 == undefined) { k(newO1); /*console.log("race over, 1", [o1,o2,newO1])*/ }; 
          return [newO1,o2]
        })        
      })}
      {second.toJSX(newO2 => { 
        setState(([o1,o2]) => {
          if (o1 == undefined && o2 == undefined) { k(newO2); /*console.log("race over, 2", [o1,o2,newO2])*/ }; 
          return [o1,newO2]
        })
      })}        
    </>
  })
}
  
export function all<o1,o2>(first:IComponent<o1>, second:IComponent<o2>) : IComponent<[o1,o2]> {
  const [[o1,o2],setState] = useState<[o1 | undefined,o2 | undefined]>([undefined,undefined])
   
  return fromJSX(k => {
    return <>
      {first.toJSX(newO1 => { setState(([o1,o2]) => { if (o1 == undefined && o2 != undefined) k([newO1,o2]); return [newO1,o2] }) })}
      {second.toJSX(newO2 => { setState(([o1,o2]) => { if (o1 != undefined && o2 == undefined) k([o1,newO2]); return [o1,newO2] }) })}
    </>
  })
}

function promiseToJSX<o>(p:Promise<o>,k:Fun<o | "failed",void>) : JSX.Element {   
  const [state,setState] = useState<"not invoked"|"invoked"|"completed"|"failed">("not invoked")
  useEffect(() => {
    if (state == "not invoked") {
      setState("invoked")
      p.then(o => {  k(o); setState("completed") }).catch(_ => { k("failed"); setState("failed") })
    }
  }, [state,p,k]);

  return <div key="promise-in-race">Promise {state}</div>
}

export const fromPromise = <o,>(p:Promise<o>): IComponent<o | "failed"> =>
  ({
    toJSX: k => promiseToJSX(p,k),
    map: <o2,>(f: Fun<o | "failed", o2>): IComponent<o2> => fromJSX(k2 => promiseToJSX(p,o => k2(f(o)))),
    race: function<o2,>(this:IComponent<o>, other:IComponent<o2>): IComponent<o | o2> { return race(this,other)},
    all: function<o2,>(this:IComponent<o>, other:IComponent<o2>): IComponent<[o,o2]> { return all(this,other)}
  })

