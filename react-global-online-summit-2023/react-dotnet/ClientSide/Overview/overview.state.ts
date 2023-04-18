import { Map } from "immutable"
import { Person, StoragePerson } from "../Home/home.state"

export type OverviewState = ({
  kind: "loading"
} | {
  kind: "loaded",
  value: StoragePerson[]
}) & {
  storeValue: (value: StoragePerson[]) => (state: OverviewState) => OverviewState
}

export const initOverviewState: OverviewState = {
  kind: "loading",
  storeValue: (value: StoragePerson[]) => (state: OverviewState): OverviewState => ({
    ...state,
    kind: "loaded",
    value: value
  })
}