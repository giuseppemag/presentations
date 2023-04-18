import { Map } from "immutable"
import React from "react"
import { loadPeople } from "./overview.api"
import { initOverviewState, OverviewState } from "./overview.state"

export interface OverviewProps {
  backToHome: () =>  void
}

export class Overview extends React.Component<OverviewProps, OverviewState> {
  constructor(props: OverviewProps) {
    super(props)
    this.state = initOverviewState
  }

  componentDidMount(): void {
    if (this.state.kind == "loading") {
      loadPeople()
      .then(people => {
        this.setState(this.state.storeValue(people))
      })
    }
  }

  render(): JSX.Element {
    if (this.state.kind == "loading") {
      return (
      <div>
        Loading...
      </div>
      )
    }
    return (
      <div>
      {
        this.state.value.map(
          person => (
            <div key={`overview-list-item-${person.id}`}>
              Name: {person.name} Last Name: {person.lastName} Age: {person.age}
            </div>
          )
        )
      }
      <div>
        <button
          onClick={_ => this.props.backToHome()}
        >
          Back
        </button>
      </div>
      </div>
    )
  }
}

// export const Overview = (props: {
//   backToHome: () =>  void
// }): JSX.Element => (
//   <div>
//   {
//     props.people.valueSeq().toArray().map(
//       person => (
//         <div key={`overview-list-item-${person.id}`}>
//           Name: {person.name} Last Name: {person.lastName} Age: {person.age}
//         </div>
//       )
//     )
//   }
//   <div>
//     <button
//       onClick={_ => props.backToHome()}
//     >
//       Back
//     </button>
//   </div>
//   </div>
// )