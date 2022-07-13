import { GiMagicPortal } from "react-icons/gi"
import { BsSearch } from "react-icons/bs"
import React, { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { usePeople } from "../../context/People"
import getPeople from "../../services/getPeople"

import styles from "./header.module.css"
const { container, logoContainer, logoText, searchBarContainer, searchText, searchButton } = styles

export default function Header() {
    return (
        <header className={container}>
            <Link to="/" style={{textDecoration: "none"}} className={logoContainer}>
                <GiMagicPortal size="35px" />
                <span className={logoText}>Star Wars Portal</span>
            </Link>
            <div className={searchBarContainer}>
                <BsSearch size="25px"/>
                <SearchBar /> 
            </div>
        </header>
    )
}

function SearchBar() {
    const [searchString, setSearchString] = useState("")
    const [ , setPeople, , setLoading] = usePeople()
    const inputRef = useRef()

    // focuses cursor onto input field when component mounts
    useEffect(() => inputRef.current.focus(), [])

    function handleKeyPress(e) {
        if (e.key === "Enter") {
            findMatchingPeople()
        }
    }

    useEffect(() => {
        window.addEventListener("keypress", handleKeyPress)
        return () => {
            window.removeEventListener("keypress", handleKeyPress)
        }
    })

    function findMatchingPeople() {
        setLoading(true)
        getPeople(searchString)
            .then(data => {
                setPeople(data)
            })
            .catch(e => {
                console.log(e)
                setPeople(null)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return(
        <React.Fragment>
            <input
                ref={inputRef}
                className={searchText}
                type="text"
                value={searchString}
                onChange={e => setSearchString(e.target.value)}
            />
            <button
                className={searchButton}
                onClick={findMatchingPeople}
            >
                Submit
            </button>
        </React.Fragment>
    )
}