import { BASE_URL } from "../config"
import extraCharacter from "../data/extra_character.json"

export default function getPerson(personName) {
    if (personName.toLowerCase() === extraCharacter.name.toLowerCase()) {
        extraCharacter.birthYear = extraCharacter.birth_year
        extraCharacter.eyeColor = extraCharacter.eye_color
        extraCharacter.homeworld = {name: "n/a"}
        return Promise.resolve(extraCharacter)
    }

    return fetch(`${BASE_URL}/person/${personName}`)
        .then(res => res.json())
        .then(data => {
            return data
        })
        .catch(e => {
            console.log(e)
            throw new Error("Something went wrong while we were grabbing the person.")
        })
}
