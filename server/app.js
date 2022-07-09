// general modules
import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'

const app = express()

// allow all cross origin requests
app.use(cors())

// parse incoming requests of content-type - application/json
app.use(express.json())

// parse incoming requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

const BASE_URL = "https://swapi.dev/api/"

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
            return res.status(500).json({
                error: "Internal Server Error."
            })
        })
})

export default app