import React from "react";
import { Person } from "../Home/home.state";
import { RegistrationState, initRegistrationState, RegistrationLoader } from "./registration.state";

export interface RegistrationProps {
  insertPerson: (person: Person) => void
  backToHome: () => void
  registrationState: RegistrationState
  updateName: (name: string) => void
  updateLastName: (lastName: string) => void
  updateAge: (age: number) => void
}

export class RegistrationForm extends React.Component<RegistrationProps, {}> {
  constructor(props: RegistrationProps) {
    super(props)
  }

  render(){
    return (
      <div>
        <div key={`registration-form-name`}>
          First Name:
          <input
            value={this.props.registrationState.name}
            onChange={e => this.props.updateName(e.currentTarget.value)}
          />
        </div>
        <div key={`registration-form-last-name`}>
          Last Name:
          <input
            value={this.props.registrationState.lastName}
            onChange={e => this.props.updateLastName(e.currentTarget.value)}
          />
        </div>
        <div key={`registration-form-age`}>
          Age:
          <input
            value={this.props.registrationState.age}
            type={"number"}
            onChange={e => this.props.updateAge(e.currentTarget.valueAsNumber)}
          />
        </div>
        {
          this.props.registrationState.loader == "loading" ?
          <div>
            Saving...
          </div> :
          null
        }
        <div>
          <button
            disabled={this.props.registrationState.loader == "loading"}
            onClick={_ => this.props.insertPerson({
              age: this.props.registrationState.age,
              lastName: this.props.registrationState.lastName,
              name: this.props.registrationState.name
            })}
          >
              Submit
          </button>
        </div>
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
