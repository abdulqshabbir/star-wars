import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Container from "../../components/Container"
import Header from "../../components/Header"
import styles from "./character-page.module.css"
const { header, text } = styles

export default function CharacterPage() {
    const params = useParams()
    const [character, setCharacter] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        setLoading(true)
        fetch(`https://swapi.dev/api/people/${params.id}`)
        .then(res => res.json())
        .then(data => {
            let currentCharacter = {
                name: data.name,
                gender: data.gender,
                birthYear: data.birth_year,
                eyeColor: data.eye_color,
                homeworldURL: data.homeworld,
                filmsURL: data.films
            }
            setCharacter(currentCharacter) 
        })
        .catch(() => {
            setError("Sorry something went wrong when trying to fetch this Star Wars character from our servers. Try refreshing your page.")
        })
        .finally(() => {
            setLoading(false)
        })
    }, [params.id])

    if (character === null || loading) {
        return "Please wait as we load your Star Wars character..."
    } else if (error.length > 0) {
        return error
    } else {
        return (
            <React.Fragment>
                <Container>
                    <Header />
                    <div>
                        <h1 className={header}>{character.name}</h1>
                        <p className={text}>Gender: {character.gender}</p>
                        <p className={text}>Birth Year: {character.birthYear}</p>
                        <p className={text}>Eye Color: {character.eyeColor}</p>
                        <p className={text}>Homeworld: {character.homeworldURL}</p>
                        <p className={text}>Appeared in: {character.filmsURL}</p>
                    </div>
                </Container>
            </React.Fragment>
        )
    }
}