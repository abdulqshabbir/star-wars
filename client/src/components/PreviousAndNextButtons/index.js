import React from "react";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr"
import { usePeople } from "../../context/People"
import getPeople from "../../services/getPeople";

import styles from "./previous-and-next-buttons.module.css"
const { container, nextButton, prevButton } = styles

export default function PreviousAndNextButtons() {
    const [ people, setPeople, loading, setLoading, , setError ] = usePeople()

    function handleClick(isNext = true) {
        setLoading(true)
        const link = isNext === true ? people.next : people.previous
        let { name, page } = extractNameAndPageFromLink(link)

        getPeople(name, page)
            .then(data => setPeople(data))
            .catch(e => {
                console.log(e)
                setError(e)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    if (loading) {
        return null
    }
    return (
        <div className={container}>
            {
                people.previous === null ?
                /*
                    Note: empty div is needed since parent is a flex container which
                    expects two children to correctly justify items.
                */
                <div></div> :
                <GrLinkPrevious
                    size="80px"
                    className={prevButton}
                    onClick={() => handleClick(false)}
                />
            }

            {
                people.next === null ? 
                <div></div> :
                <GrLinkNext
                    size="80px"
                    className={nextButton}
                    onClick={() => handleClick(true)}
                />
            }
        </div>
    )
}

function extractNameAndPageFromLink(swapiLink) {
    const indexOfPageNumber = swapiLink.lastIndexOf("page")
    const indexOfSearch = swapiLink.lastIndexOf("search")

    let name = ""
    let page = ""

    if (indexOfPageNumber !== -1) {
        page = swapiLink.slice(indexOfPageNumber + "page=".length)
    } 
    if (indexOfSearch !== -1) {
        name = swapiLink.slice(indexOfSearch + "search=".length, indexOfPageNumber -1)
    }

    return {
        name,
        page
    }
}
