

const { getTestUser } = require('../utils/data');
const payerUser = {}
const accUser = {}
const prefix = '/api/v1'

const acc = getTestUser('Accountant');
const payer = getTestUser('Payer');
const request = require('supertest');
const app = require('../index')

describe('signing up 1 accountant and 1 payer', () => {
    // afterAll(() => {
    //     app.close()
    // })
    it('should create a new accountant',(done) => {
        request(app)
            .post('/api/v1/auth/new')
            .send(acc)
            .set('Accept', 'application/json')
            .expect(200, done)
            .expect(function(res) {
                // console.log(res.body)
                const data = res.body;
                console.log(data);
                expect(data).toHaveProperty('success')
                expect(data.success).toBe(true)
                expect(data.data).toHaveProperty('role')
                expect(data.data.role).toBe('Accountant')
            })

    })
    it('should create a new payer', (done) => {
        request(app)
        .post('/api/v1/auth/new')
        .send(payer)
        .set('Accept', 'application/json')
        .expect(200, done)
        .expect(function(res) {
            // console.log(res.body)
            const data = res.body;
            console.log(data);
            expect(data).toHaveProperty('success')
            expect(data.success).toBe(true)
            expect(data.data).toHaveProperty('role')
            expect(data.data.role).toBe('Payer')
        })
    })
    it('should return a token on login', (done) => {
        request(app)
            .post('/api/v1/auth/login')
            .send({username : payer.username, password : payer.password})
            .set('Accept', 'application/json')
            .expect(200, done)
            .expect(function(res) {
                // console.log(res.body)
                const data = res.body;
                console.log(data);
                expect(data).toHaveProperty('success')
                expect(data.success).toBe(true)
                expect(data.data).toHaveProperty('role')
                expect(data.data).toHaveProperty('token')
                expect(data.data.role).toBe('Payer')
            })

    })
})
