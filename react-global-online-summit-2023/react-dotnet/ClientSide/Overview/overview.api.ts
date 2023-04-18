import { StoragePerson } from "../Home/home.state";

export const loadPeople = async (): Promise<StoragePerson[]> => {
  const response = await fetch("api/registration/all", {
    method: "GET"
  })
  var content = (await response.json()) as StoragePerson[]
  return content
}