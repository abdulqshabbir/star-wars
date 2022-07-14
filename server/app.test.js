import supertest from "supertest"
import app from "./app"
import { jest } from '@jest/globals'

const testApp = supertest(app)

describe("GET /person/:name", () => {
    jest.setTimeout(20000)
    test('GET /person/:name should return 200 with correct fields if a single name perfectly matches', function(done) {
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
    test('GET /person/:name should return a 400 error for invalid names', function (done) {
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
    test('GET /person/:name should return a 400 error if :name matches more than one person', function (done) {
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

describe("GET /people", () => {
    jest.setTimeout(10000)
    test('GET /people/name=&pageNumber=1 should return a 200 with correct fields', function(done) {
        testApp 
            .get('/api/people/name=&pageNumber=1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                expect(res.body.count).toEqual(82)
                expect(res.body.next).toBeDefined()
                expect(res.body.previous).toBeNull()
                expect(res.body.results).toHaveLength(10)
                done()
            })
            .catch(e => done(e))
    });
    test('GET /people/name=Lu&pageNumber=1 should return a 200 with two matching people', function(done) {
        testApp 
            .get('/api/people/name=Lu&pageNumber=1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                expect(res.body.count).toEqual(2)
                expect(res.body.next).toBeNull()
                expect(res.body.previous).toBeNull()
                expect(res.body.results).toHaveLength(2)
                done()
            })
            .catch(e => done(e)) 
    })
    test('GET /people/name=abdul&pageNumber=1 should return a 400 error for invalid names', function(done) {
        testApp 
            .get('/api/people/name=abdul&pageNumber=1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then(res => {
                expect(res.body.error).toBeDefined()
                done()
            })
            .catch(e => done(e))
    }); 
})