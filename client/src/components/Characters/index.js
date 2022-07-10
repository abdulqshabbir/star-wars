import { useEffect, useState } from "react"
import CharacterCard from "../CharacterCard"
import getPeople from "../../services/getPeople"

import styles from "./characters.module.css"
const { container } = styles

export default function StarWarsCharacters() {
    const [starWarsData, setStarWarsData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        getPeople()
            .then(data => {
                setStarWarsData(data)
                setLoading(false)
            })
            .catch(e => {
                setError("Sorry we could not load the data. Please try refreshing your page.")
                console.log(e)
            })
    }, [])

    if (loading | !starWarsData) {
        return "Loading data... hang on a sec..."
    }

    else if (error.length > 0) {
        return <p>{error}</p>
    }

    return (
        <div className={container}>
            {starWarsData.results.map((starWarsCharacter, idx) => 
                <CharacterCard
                    name={starWarsCharacter.name}
                    key={idx}
                />)
            }
        </div>
    )
}

