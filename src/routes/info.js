const controllers = require('../controllers/Payer')
const express = require('express')
const router = express.Router();
const {authRole, ROLE} = require('../auth')

router
    .route('/verifyPan')
    .get(authRole(ROLE.ACCOUNTANT), controllers.getPayerInfo)
    
module.exports = router;