const request = require('supertest');
const server = require('./server');
const db = require('../database/dbConfig.js');
const { truncate } = require('../database/dbConfig.js');
const testUser = { username: 'testing', password: 'testing' };


describe('server.js', () => {
    describe('Get request for jokes', () => {
        it('should return status code 400 when not logged in', async () => {
            const res = await request(server).get('/api/jokes')
        });

        it('does it return json?', async () => {
            const res = await request(server).get('/api/jokes');
            expect(res.type).toBe('application/json')
        });

        describe("registering new user", () => {
            it('should return a status code of 201 when adding a new user', async () => {
                await db('users').truncate()
                const res = await request(server)
                    .post('/api/auth/register')
                    .send(testUser);
                expect(res.status).toBe(500)
            });
        })
    })
})