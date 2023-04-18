import { Person } from "../Home/home.state"

export type RegistrationLoader =
"unloaded" |
"loading" |
"loaded"

export type RegistrationState = Person & {
  loader: RegistrationLoader,
  updateName: (name: string) => (state: RegistrationState) => RegistrationState
  updateLastName: (lastName: string) => (state: RegistrationState) => RegistrationState
  updateAge: (age: number) => (state: RegistrationState) => RegistrationState
  updateLoader: (state: RegistrationLoader) => (state: RegistrationState) => RegistrationState
}
export const initRegistrationState: RegistrationState = {
  name: "",
  lastName: "",
  age: 18,
  loader: "unloaded",
  // storage: Map(),
  // currentId: 0,
  updateName: (name: string) => (state: RegistrationState): RegistrationState =>   
    ({
      ...state,
      name: name
    }),
  updateLastName: (lastName: string) => (state: RegistrationState): RegistrationState =>
    ({
      ...state,
      lastName: lastName
    }),
  updateAge: (age: number) => (state: RegistrationState): RegistrationState =>
    ({
      ...state,
      age: age
    }),
  updateLoader: (loaderState: RegistrationLoader) => (state: RegistrationState): RegistrationState => ({
    ...state,
    loader: loaderState
  })
}