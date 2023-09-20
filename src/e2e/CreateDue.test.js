const request = require('supertest');
const app = require('../index')
const { accToken, payerToken, panId } = require('./tokens');

describe('creating a tax due', () => {
    var taxObj = taxObj = {
        basicPay: 1908000,
        // hra: 2000,
        // lta: 5000,
        panId: panId
    };
    it('payer is not authorized for this role', (done) => {

        request(app)
            .post('/api/v1/tax')
            .send(taxObj)
            .set('Accept', 'application/json')
            .set('secret_token', payerToken)
            .expect(401, done)
        //401 for unauth access

    })
    it('new tax is created by accountant', (done) => {

        request(app)
            .post('/api/v1/tax')
            .send(taxObj)
            .set('Accept', 'application/json')
            .set('secret_token', accToken)
            .expect(200, done)
            .expect(function(res) {
                const data = res.body;
                console.log(data);
                expect(data).toHaveProperty('success')
                expect(data.success).toBe(true)
                expect(data.data).toHaveProperty('taxAmt')
            })
    })
})