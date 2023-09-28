const {Payer, TaxDue, NewTax, Accountant} = require('../models')

// GET @api/v1/info/verifyPan
exports.getPayerInfo = async (req, res, next) => {
    const panId = req.query.panId

    const payer = await Payer.findOne({panId: panId});
    if(payer){
        return res.status(200).json({
            success: true,
            data: payer
        })
    } else {
        return res.status(200).json({
            success: true,
            msg: 'Payer not found'
        })
    }
}
