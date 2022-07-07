import { GiMagicPortal } from "react-icons/gi"
import { BsSearch } from "react-icons/bs"
import { useEffect, useRef, useState } from "react"

import styles from "./header.module.css"
const { container, logoContainer, logoText, searchBarContainer, searchText } = styles

export default function Header() {
    const [searchString, setSearchString] = useState("")
    const inputRef = useRef()

    useEffect(() => inputRef.current.focus(), [])

    return (
        <header className={container}>
            <div className={logoContainer}>
                <GiMagicPortal size="35px" />
                <span className={logoText}>Star Wars Portal</span>
            </div>
            <div className={searchBarContainer}>
                <BsSearch size="25px"/>
                <input
                    ref={inputRef}
                    className={searchText}
                    type="text"
                    value={searchString}
                    onChange={e => setSearchString(e.target.value)}
                />
            </div>
        </header>
    )
}