const request = require('supertest');
const app = require('../index');

    describe('GET /', () => {
        it('should return "Hello World!"', () => {
            return request(app)
                .get('/')
                .expect('<h1>Hello World!</h1>')
        });

        it('should return error 404, if /nonexistentpath is requested', () => {
            return request(app)
                .get('/non/existent/path')
                .expect(404)
        });
    });

    describe('POST /api/notes', () => {
        it('should return json {"error":"content missing"}, if request body is missing', () => {
            return request(app)
                .post('/api/notes')
                .expect('{"error":"content missing"}')
        });
        let query = {
              content: "my super cool note",
              important: true
        }
        it('should return 200, if json was requested with content and important fields', () => {
            return request(app)
                .post('/api/notes')
                .set('Content-type', 'application/json')
                .send( query )
                .expect(200);
        });
    });

    describe('GET /api/notes', () => {
        it('should return 200 and Content-Type: application/json', () => {
            return request(app)
                .get('/api/notes')
                .expect(200)
                .expect('Content-Type',/json/)
        });
    });

    describe('GET /api/notes/:id', () => {
        it('should return 200 and known data, if existing item with id 1 is requested', () => {
            return request(app)
                .get('/api/notes/1')
                .expect(200)
                .expect('Content-Type',/json/)
                .expect('{"id":1,"content":"HTML is easy","date":"2022-01-10T17:30:31.098Z","important":true}')
        });
    });
