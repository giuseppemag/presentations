import React from "react";
import { RegistrationForm } from "../RegistrationForm/registration";
import { HomeState, initHomeState, Person } from "./home.state";
import { Overview } from "../Overview/overview";
import { RegistrationState } from "../RegistrationForm/registration.state";
import { register } from "../RegistrationForm/registration.api";

export class Home extends React.Component<{}, HomeState> {
  constructor(props: {}) {
    super(props)
    this.state = initHomeState
  }

  render(): JSX.Element {
    switch (this.state.view) {
      case "home":
        return (
          <div>
            <div>
              Welcome to the Awesome Person Management System!
              <div>
                <button
                  onClick={_ => this.setState(this.state.setViewState("registration"))}
                >
                  Registration
                </button>
              </div>
              <div>
                <button
                  onClick={_ => this.setState(this.state.setViewState("overview"))}
                >
                  Overview
                </button>
              </div>
            </div>
          </div>
        )
    
      case "registration":
        return (
          <RegistrationForm
            insertPerson={(person: Person) => this.setState(this.state.updateRegistrationState(this.state.registrationState.updateLoader("loading")), () => {
              register(person)
              .then(_ => this.setState(this.state.updateRegistrationState(this.state.registrationState.updateLoader("loaded"))))
              .catch(_ => ":(")
            })}
            backToHome={() => this.setState(this.state.setViewState("home"))}
            registrationState={this.state.registrationState}
            updateName={(name: string) => this.setState(this.state.updateRegistrationState(this.state.registrationState.updateName(name)))}
            updateLastName={(lastName: string) => this.setState(this.state.updateRegistrationState(this.state.registrationState.updateLastName(lastName)))}
            updateAge={(age: number) => this.setState(this.state.updateRegistrationState(this.state.registrationState.updateAge(age)))}
          />
        )

      case "overview":
        return (
          <Overview
            backToHome={() => this.setState(this.state.setViewState("home"))}
          />
        )
    }
  }
}