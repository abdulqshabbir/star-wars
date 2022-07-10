import { BASE_URL } from "../config"

export default function getPeople(name, pageNumber) {
    pageNumber = pageNumber ?? 1
    name = name ?? ""

    return fetch(`${BASE_URL}/people/name=${name}&pageNumber=${pageNumber}`)
        .then(res => res.json())
        .then(data => {
            return data
        })
        .catch(e => {
            return null
        })
}
