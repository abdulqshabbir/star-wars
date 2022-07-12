import React, { useEffect, useState } from "react"
import getPeople from "../services/getPeople"

const People = React.createContext()

export function usePeople() {
    return React.useContext(People)
}

export default function PeopleProvider({ children }) {
    const [people, setPeople] = useState(null)
    useEffect(() => {
        getPeople()
            .then(data => {
                setPeople(data)
            })
            .catch(e => {
                console.log(e)
                setPeople(null)
            })
    }, [])
    return(
        <People.Provider value={[people, setPeople]}>
            {children}
        </People.Provider>
    )
}
