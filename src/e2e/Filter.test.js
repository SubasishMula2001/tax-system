const request = require('supertest');
const app = require('../index')
const { accToken, payerToken, panId, otherPanId } = require('./tokens');

describe('filter tax dues', () => {

    it('payer views tax due based on status', (done) => {

        request(app)
            .get(`/api/v1/filter/useStatus?status=PAID`)
            .set('Accept', 'application/json')
            .set('secret_token', payerToken)
            .expect(200, done)
            .expect(res => {
                console.log(res.body)
                expect(res.body.success).toBe(true)
                expect(res.body.data[0].status).toBe('PAID')
            })

    })
    it("payer cannot view other payer's tax due using panId", (done) => {

        request(app)
            .get(`/api/v1/filter/usePan?panId=${otherPanId}&&status=NEW`)
            .set('Accept', 'application/json')
            .set('secret_token', payerToken)
            .expect(401, done)
            .expect(res => {
                expect(res.text).toBe('Access not allowed')
            })
        //401 for unauth access

    })
    it("payer cannot view other payer's tax due using panId", (done) => {

        request(app)
            .get(`/api/v1/filter/usePan?panId=${otherPanId}&&status=NEW`)
            .set('Accept', 'application/json')
            .set('secret_token', accToken)
            .expect(200, done)
            .expect(res => {
                expect(res.body.success).toBe(true)
            })

    })

})