import { useEffect, useState } from "react"
import CharacterCard from "../CharacterCard"
import styles from "./characters.module.css"
const { container } = styles

export default function StarWarsCharacters() {
    const [characters, setCharacters] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        setLoading(true)
        fetch("https://swapi.dev/api/people")
        .then(res => res.json())
        .then(data => {
            /* 
                Note: The SWAPI API does not have an id field for each character.
                it implicitly assigns an id to each character by the rule 
                id = idx + 1, where idx is the zero-indexed location of the character.
                
                e.g.
                results = [{"name": "Luke Skywalker"}, {"name": "C-3PO"}]
                So Luke has an id of 1 and C-3PO has an id of 2. 
            */

            let starWarsCharacters = data.results.map((result, idx) => ({name: result.name, id: idx + 1}))
            setCharacters(starWarsCharacters)
        })
        .catch(() => {
            setError("Sorry something went wrong when trying to fetch the Star Wars characters.")
        })
        .finally(() => {
            setLoading(false)
        })
    }, [])

    if (loading) {
        return "Loading data... hang on a sec..."
    }

    else if (error.length > 0) {
        return <p>{error}</p>
    }

    return (
        <div className={container}>
            {characters.map(c => <CharacterCard name={c.name} id={c.id} key={c.id} />)}
        </div>
    )
}

