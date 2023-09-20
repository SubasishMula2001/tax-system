const { NewTax, Payer, Accountant, TaxDue } = require('../models')


// @GET api/v1/payer/getDue
exports.getDueTaxes = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const dueTaxes = await TaxDue.find({ payerId: userId });
        return res.status(200).json({
            success: true,
            data: dueTaxes
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Server error'
        })
    }
}

// @GET api/v1/payer/pay
// access to payer 
exports.markTaxPaid = async (req, res, next) => {
    try {
        const taxId = req.body.taxId;
        const taxObj = await TaxDue.findById(taxId);

        taxObj.status = 'PAID';
        taxObj.paidAt = Date.now();

        await taxObj.save();
        return res.status(200).json({
            success: true,
            data: taxObj
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            msg: 'Server error'
        })
    }
}

