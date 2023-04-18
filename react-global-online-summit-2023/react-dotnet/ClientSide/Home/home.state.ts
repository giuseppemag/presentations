import { List, Map } from "immutable"
import { initRegistrationState, RegistrationState } from "../RegistrationForm/registration.state"

export interface Person {
  name: string
  lastName: string
  age: number
}

export type StoragePerson = Person & {
  id: string
}

export type ViewState = 
  "home" | 
  "registration" |
  "overview"

export interface HomeState {
  currentId: number
  view: ViewState
  registrationState: RegistrationState
  updateRegistrationState: (updater: (registrationState: RegistrationState) => RegistrationState) => (state: HomeState) => HomeState,
  setViewState: (view: ViewState) => (state: HomeState) => HomeState
}

// const testPeople: PersonEntry[] = [
//   { id: 0, name: "Francesco", lastName: "Di Giacomo", age: 37 },
//   { id: 1, name: "John", lastName: "Doe", age: 45 },
//   { id: 2, name: "Jane", lastName: "Doe", age: 27 },
//   { id: 3, name: "Sandra", lastName: "Carraro", age: 65 },
// ]

export const initHomeState: HomeState = {
  currentId: 0,
  view: "home",
  registrationState: initRegistrationState,
  setViewState: (view: ViewState) => (state: HomeState): HomeState => ({
    ...state,
    view: view
  }),
  updateRegistrationState: (updater: (registrationState: RegistrationState) => RegistrationState) => (state: HomeState): HomeState => ({
    ...state,
    registrationState: updater(state.registrationState)
  })
}