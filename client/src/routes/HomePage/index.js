import React from "react"
import Container from "../../components/Container"
import Header from "../../components/Header"
import HeroText from "../../components/HeroText"
import StarWarsCharacters from "../../components/Characters"
import PreviousAndNextButtons from "../../components/PreviousAndNextButtons"

export default function Home() {

    return(
        <Container>
            <Header />
            <HeroText />
            <StarWarsCharacters />
            <PreviousAndNextButtons />
        </Container>
    )
}