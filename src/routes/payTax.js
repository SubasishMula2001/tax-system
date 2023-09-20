const express = require('express');
const router = express.Router();
const controllers = require('../controllers/PayTax')
const {authRole, ROLE} = require('../auth')
router
    .route('/getDue')
    .get(controllers.getDueTaxes)
router
    .route('/pay')
    .post(authRole(ROLE.PAYER),controllers.markTaxPaid)


module.exports = router;