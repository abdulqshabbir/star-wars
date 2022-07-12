import { useEffect, useState } from "react"
import CharacterCard from "../CharacterCard"
import getPeople from "../../services/getPeople"
import { usePeople } from "../../context/People"

import styles from "./characters.module.css"
const { container } = styles

export default function StarWarsCharacters() {
    const [people, setPeople] = usePeople()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        getPeople()
            .then(data => {
                setPeople(data)
            })
            .catch(e => {
                setError("Sorry we could not load the data. Please try refreshing your page.")
                console.log(e)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    if (loading || people === null) {
        return "Loading data... hang on a sec..."
    }

    else if (error.length > 0) {
        return <p>{error}</p>
    }

    else if (people.count === 0) {
        return "Sorry your search does not match any star wars characters."
    }

    return (
        <div className={container}>
            {people.results.map((person, idx) => 
                <CharacterCard
                    name={person.name}
                    key={idx}
                />)
            }
        </div>
    )
}

