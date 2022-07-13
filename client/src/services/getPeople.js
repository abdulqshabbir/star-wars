import { BASE_URL } from "../config"
import extraCharacter from "../data/extra_character.json"

export default function getPeople(searchString, pageNumber) {
    pageNumber = pageNumber ?? 1
    searchString = searchString ?? ""

    return fetch(`${BASE_URL}/people/name=${searchString}&pageNumber=${pageNumber}`)
        .then(res => res.json())
        .then(data => {
            addExtraCharacterToData(data, searchString)
            return data
        })
        .catch(e => {
            console.log(e)
            throw new Error(`Could not retrieve people with search string ${searchString} and page number ${pageNumber}.`, e)
        })
}

function addExtraCharacterToData(data, searchString) {
    const isFinalPage = data.next === null
    const searchStringMatchesName = extraCharacter.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1

    if (isFinalPage && searchStringMatchesName) {
        data.results.push(extraCharacter)
        data.count++
    }
}
