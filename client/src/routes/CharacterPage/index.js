import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Container from "../../components/Container"
import Header from "../../components/Header"
import getPerson from "../../services/getPerson"

import styles from "./character-page.module.css"
const { header, text, listItem, container, leftContainer, image } = styles

export default function CharacterPage() {
    const params = useParams()
    const [character, setCharacter] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        setLoading(true)
        getPerson(params.name)
            .then(data => {
                setCharacter(data)
            })
            .catch(e => {
                setError("Sorry something went wrong. Please try refreshing your page.")
                console.log(e)
            })
            .finally(() => {
                setLoading(false)
            })

    }, [params.name])

    if (character === null || loading) {
        return "Please wait as we load your Star Wars character..."
    } else if (error.length > 0) {
        return error
    } else {
        return (
            <React.Fragment>
                <Container>
                    <Header />
                    <div className={container}>
                        <div className={leftContainer}>
                            <h1 className={header}>{character.name}</h1>
                            <p className={text}>Gender: {character.gender}</p>
                            <p className={text}>Birth Year: {character.birthYear}</p>
                            <p className={text}>Eye Color: {character.eyeColor}</p>
                            <p className={text}>Homeworld: {character.homeworld.name}</p>
                            <p className={text}>{character.name} Appeared in the following films:</p>
                            <ul>
                                {character.films.map((film, idx) => <li className={listItem} key={idx}>{film.title}</li>)}
                            </ul>
                        </div>
                        <img className={image} src={`${process.env.PUBLIC_URL}/${character.name}.jpg`} alt="Sorry no image available" />
                    </div>
                </Container>
            </React.Fragment>
        )
    }
}