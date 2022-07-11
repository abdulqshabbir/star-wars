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

// GET route /planets/:id
app.get("/api/planets/:id", (req, res) => {
    const planetId = req.params.id

    fetch(`${BASE_URL}/planets/${planetId}`)
        .then(res => res.json())
        .then(result => {
            if (!("name" in result)) {
                return res.status(400).json({
                    error: "Please provide a valid planet id."
                })
            }
            return res.status(200).json({
                name: result.name
            })
        })
        .catch(e => {
            console.log(e)
            return res.status(500).json({
                error: "Internal Server Error."
            })
        })
})

// GET route /films/:id
app.get("/api/films/:id", (req, res) => {
    const filmId = req.params.id

    fetch(`${BASE_URL}/films/${filmId}`)
        .then(res => res.json())
        .then(result => {
            if (!("title" in result)) {
                return res.status(400).json({
                    error: "Please provide a valid film id."
                })
            }
            return res.status(200).json({
                title: result.title
            })
        })
        .catch(e => {
            console.log(e)
            return res.status(500).json({
                error: "Internal Server Error."
            })
        })
})

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
            if (!("results" in data)) {
                return res.status(400).json({
                    error: "Please provide a valid person id."
                })
            }
            const person = data.results[0]
            return res.status(200).json({
                name: person.name,
                gender: person.gender,
                eyeColor: person.eye_color,
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
            if (!("results" in data)) {
                return res.status(400).json({ error: "No search results matching your criterion."})
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