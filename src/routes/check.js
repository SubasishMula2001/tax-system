const express = require('express');
const { NewTax } = require('../models')
const router = express.Router();
router.get('/', async (req, res, next) => {
    console.log(NewTax)
    const checkObj = await NewTax.prototype.newTax({ payerId: '11111', accountantId: '12222', basicPay: 10000, hra: 2000 });
    console.log(typeof checkObj.basicPay)
    const amt = NewTax.prototype.getGrossIncome(checkObj);
    console.log(checkObj);
    console.log(amt);
    res.send({
        msg: "use /api/v1/{resource} where resource can be market, cmdty, report"
    })
})
module.exports = router;
