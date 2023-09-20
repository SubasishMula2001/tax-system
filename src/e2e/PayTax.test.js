
const request = require('supertest');
const app = require('../index')
const { accToken, payerToken, panId } = require('./tokens');

describe('payment of due taxes', () => {
    it('payment cannot be done by accountant', (done) => {
        request(app)
            .get('/api/v1/payer/getDue')
            .set('Accept', 'application/json')
            .set('secret_token', payerToken)
            .expect(200, done)
            .expect((res) => {
                expect(res.body.success).toBe(true)
                expect(res.body).toHaveProperty('data');
                const data = res.body.data;
                // console.log(data,'-------------------------------------------');
                const element = data.find(ele => {
                    return (ele.status !== 'PAID');
                })
                // console.log(element)
                // console.log(element._id, '-0-=0--==-0=-0=-0=-0=-0=-0')
                request(app)
                    .post('/api/v1/payer/pay')
                    .send({ taxId: element.id })
                    .set('Accept', 'application/json')
                    .set('secret_token', accToken)
                    .expect(401, done)
            })
            done()
    })
    it('payment done by payer', (done) => {
        request(app)
            .get('/api/v1/payer/getDue')
            .set('Accept', 'application/json')
            .set('secret_token', payerToken)
            .expect(200, done)
            .expect((res) => {
                expect(res.body.success).toBe(true)
                expect(res.body).toHaveProperty('data');
                const data = res.body.data;
                const element = data.find(ele => {
                    return (ele.status !== 'PAID');
                })
                console.log(element)
                console.log(element._id)
                request(app)
                    .post('/api/v1/payer/pay')
                    .send({ taxId: element._id })
                    .set('Accept', 'application/json')
                    .set('secret_token', payerToken)
                    .expect(200, done)
                    .expect((res) => {
                        expect(res.body.success).toBe(true)
                        expect(res.body.data.status).toBe('NEW')
                    })
            })
            done()
    })
})