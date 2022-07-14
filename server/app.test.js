import supertest from "supertest"
import app from "./app"
import { jest } from '@jest/globals'

const testApp = supertest(app)

describe("GET /person/:name", () => {
    jest.setTimeout(10000)
    test('GET /person/:name with one valid name (Luke Skywalker) responds correctly', function(done) {
        testApp 
            .get('/api/person/Luke Skywalker')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                expect(res.body.name).toEqual("Luke Skywalker")
                expect(res.body.birthYear).toEqual("19BBY")
                expect(res.body.eyeColor).toEqual("blue")
                expect(res.body.homeworld.name).toEqual("Tatooine")
                expect(res.body.films).toEqual([{"episode_id": 4, "title": "A New Hope"}, {"episode_id": 5, "title": "The Empire Strikes Back"}, {"episode_id": 6, "title": "Return of the Jedi"}, {"episode_id": 3, "title": "Revenge of the Sith"}])
                done()
            })
            .catch(e => done(e))
    });
    test('GET /person/:name with invalid name (abdul) responds correctly', function (done) {
        testApp 
            .get('/api/person/abdul')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then(res => {
                expect(res.body.error).toBeDefined()
                done()
            })
            .catch(e => done(e)) 
    })
    test('GET /person/:name with more than one valid name (Lu) responds correctly', function (done) {
        testApp 
            .get('/api/person/Lu')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then(res => {
                expect(res.body.error).toBeDefined()
                done()
            })
            .catch(e => done(e)) 
    })
})
