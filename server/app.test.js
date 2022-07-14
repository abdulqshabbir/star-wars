import supertest from "supertest"
import app from "./app"

const testApp = supertest(app)

describe("GET /person/:name", () => {
    describe("returns 200 for Luke Skywalker", () => {
        test("returns a 200 for /api/person/Luke Skywalker", () => {
            testApp.get("/api/person/Luke Skywalker").then(res => {
                expect(res.statusCode).toEqual(200)
            })
        })

    })
})
