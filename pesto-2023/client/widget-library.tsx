import React, { useEffect, useState } from "react";

export type Fun<i, o> = (_: i) => o;

export type ControlledComponent<o> = {
    underlyingReactComponent:(props:{ onChange:Fun<o,void> }) => JSX.Element,
    map:<o2>(f:Fun<o,o2>) => ControlledComponent<o2>
  }
export type ControlledComponentIO<i,s> = Fun<i, Fun<s,ControlledComponent<s>>>

export const fromJSX = <o,>(reactComponent:(props:{ onChange:Fun<o,void> }) => JSX.Element) : ControlledComponent<o> => {
  return {
      underlyingReactComponent:reactComponent,
      map:<o2,>(f:Fun<o,o2>) : ControlledComponent<o2> => 
        fromJSX((props:{ onChange:Fun<o2,void> }) : JSX.Element => 
          reactComponent({ onChange:originalOutput => 
            props.onChange(f(originalOutput)) }))
    }
}

export type CheckboxInput = string
export type CheckboxState = boolean // { value:boolean, kind:"changed" } | { kind:"onFocusEvent", action:"enter"|"leave" }
export const initialCheckboxState:CheckboxState = false
export const checkbox:ControlledComponentIO<CheckboxInput, CheckboxState> = label => checked => fromJSX(
props => 
  <label>
    {label}
    <input 
    checked={checked} 
    onChange={e => props.onChange(!checkbox) } //{ kind:"changed", value:!i.value }) } 
    // onFocus={e => props.onChange({ kind:"onFocusEvent", action:"enter" })}
    // onBlur={e => props.onChange({ kind:"onFocusEvent", action:"leave" })}
    type="checkbox">
    </input>
  </label>
)

export const rootComponent = <s,>(props:{ initialState:s, app:Fun<s,ControlledComponent<s>> }) : JSX.Element => {
  const [state, setState] = useState(props.initialState)
  return props.app(state).underlyingReactComponent({ onChange:newState => setState(newState) })
}

