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
            let starWarsCharacters = data.results.map(result => result.name)
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
            {characters.map(c => <CharacterCard name={c} />)}
        </div>
    )
}

