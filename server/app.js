// general modules
import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'
import getResource from './utils/getResource.js'
import getResources from './utils/getResources.js'

const app = express()

// allow all cross origin requests
app.use(cors())

// parse incoming requests of content-type - application/json
app.use(express.json())

// parse incoming requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

export const BASE_URL = "https://swapi.dev/api"

// set node environment to development
process.env.NODE_ENV = "development"

//GET route for /person/:id
/*
    Note: the "name" search param in the route below is guaranteed to be the
    full name of a person from the SWAPI API. However, here we are assuming
    that each person can be uniquely identified with a name.
    For a more robust approach, each character could be mapped to an
    id and then the id could be referenced instead. This approach was
    take for ease of implementation.

    Additionally, the homeworld and films provided by SWAPI are URLs
    so when fetching a person we make additional requests to grab
    the necessary fields from homeworld and films.
*/
app.get("/api/person/:name", (req, res) => {
    const personName = req.params.name

    fetch(`${BASE_URL}/people/?search=${personName}`)
        .then(res => res.json())
        .then(async (data) => {
            if (data.count !== 1) {
                return res.status(400).json({
                    error: `Could not find a unique person with name ${personName}`
                })
            }
            const person = data.results[0]
            return res.status(200).json({
                name: person.name,
                gender: person.gender,
                eyeColor: person.eye_color,
                birthYear: person.birth_year,
                homeworld: await getResource(person.homeworld, ["name"]),
                films: await getResources(person.films, ["title", "episode_id"]),
            })
        })

        .catch(e => {
            console.log(e)
            return res.status(500).json({
                error: "Internal Server Error."
            })
        })
})

// GET route for /people
app.get("/api/people/:searchParams", (req, res) => {
    const params = new URLSearchParams(req.params.searchParams)
    const pageNumber = params.get("pageNumber")
    const name = params.get("name")

    fetch(`${BASE_URL}/people?search=${name}&page=${pageNumber}`)
        .then(res => res.json())
        .then(data => {
            if (data.count === 0) {
                return res.status(400).json({ error: "No search results matching your criterion.", count: 0, previous: null, next: null, results: []})
            }
            return res.status(200).json(data)
        })
        .catch(e => {
            console.log(e)
            return res.status(500).json({
                error: "Internal Server Error."
            })
        })

})

export default app