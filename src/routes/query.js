const router = require('express').Router();
const controllers = require('../controllers/Queries')
const {authRole, ROLE} = require('../auth')

router
    .route('/')
    .get(controllers.findByQuery)
router
    .route('/usePan')
    .get(authRole(ROLE.ACCOUNTANT),controllers.findByPAN)

router
    .route('/useStatus')
    .get(controllers.findByStatus)

module.exports = router