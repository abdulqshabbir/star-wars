import { useEffect, useState } from "react"
import CharacterCard from "../CharacterCard"
import getPeople from "../../services/getPeople"
import { usePeople } from "../../context/People"
import { ImSpinner8 } from "react-icons/im"

import styles from "./characters.module.css"
const { container, spinnerContainer, rotate } = styles

export default function StarWarsCharacters() {
    const [people, setPeople, loading, setLoading, error, setError] = usePeople()

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
        return (
            <div className={spinnerContainer}>
                <ImSpinner8 className={rotate} size="50px" fontWeight="100"/>
            </div>
        )
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

