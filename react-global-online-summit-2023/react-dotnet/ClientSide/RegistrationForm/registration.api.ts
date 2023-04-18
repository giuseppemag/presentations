import { Person } from "../Home/home.state";

export const register = async (person: Person): Promise<void> => {
  await fetch("api/registration", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(person)
  }
  )
}