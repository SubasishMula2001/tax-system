const { TaxDue, NewTax, Payer, Accountant } = require('../models');
//@ GET api/v1/filter/usePan?panId=
// access to accountant
async function findByPAN(req, res, next) {
    const dues = await TaxDue.find({
        panId: req.query.panId,
        accountantId: req.user.userId
    });
    return res.status(200).json({
        success: true,
        data: dues
    })
}

//@ GET api/v1/filter/useStatus?status=
async function findByStatus(req, res, next) {
    const ref = req.user.role === 'Payer' ? { payerId: req.user.userId } : { accountantId: req.user.userId }
    
    var dues = await TaxDue.find({
        ...ref,
        status: req.query.status
    });
    return res.status(200).json({
        success: true,
        data: dues
    })
}

//@ GET api/v1/filter?panId=&&status=
async function findByQuery(req, res, next) {
    try {
        const query = req.query;
        console.log(query)
        if (req.user.role === 'Payer') {
            if(req.user.role === 'Payer') {
                const payer = await Payer.find({userId : req.user.userId})
                if(payer.panId !== query.panId){
                    return res.status(403).json({
                        msg: "Access not allowed"
                    })
                }
            }
            const dues = await TaxDue.find({ ...query, payerId: req.user.userId })

            return res.status(200).json({
                success: false,
                data: dues
            })
        }
        if (req.user.role === 'Accountant') {
            const dues = await TaxDue.find(query);
            return res.status(200).json({
                success: false,
                data: dues
            })
        }
    } catch (error) {
        return res.status(500).json({
            success : false,
            msg: 'Internal server error'
        })
    }

}
module.exports = { findByPAN, findByStatus, findByQuery }
