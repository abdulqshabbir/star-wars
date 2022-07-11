import { BASE_URL } from "../config"

export default function getPerson(name) {
    return fetch(`${BASE_URL}/person/${name}`)
        .then(res => res.json())
        .then(data => {
            return data
        })
        .catch(e => {
            console.log(e)
            throw new Error("Something went wrong while we were grabbing the person.")
        })
}
