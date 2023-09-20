const express = require('express')
const router = express.Router();
const controllers = require('../controllers/NewTax')
const { authRole, ROLE } = require('../auth')
router
    .route('/')
    .post(authRole(ROLE.ACCOUNTANT), controllers.newTaxDue)

module.exports = router;