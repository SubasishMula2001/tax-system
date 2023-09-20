const { NewTax, Payer, Accountant, TaxDue } = require('../models')

//util function to create new object

async function createTaxDue(accountantId, taxObj) {
    const { panId, dueDate } = taxObj;
    //create a tax calculation object
    const newTax = await NewTax.prototype.newTax({ ...taxObj, accountantId })
    //get taxable income and tax amount
    const taxIncome = await NewTax.prototype.getGrossIncome(newTax);
    const taxAmt = await NewTax.prototype.getTaxAmt(taxIncome);
    //find payer using panId
    const payer = await Payer.findOne({ panId });
    
    if (!payer) return;
    //use panId, dueDate, income and tax to create tax due object

    const taxDue = await TaxDue.create({
        panId, accountantId, taxIncome, taxAmt, payerId: payer.userId, dueDate
    });

    //add payer to accountants managing payer id list
    const acc = await Accountant.findOne({ userId: accountantId });
    acc.payerIds.push(payer.userId);
    await acc.save();

    return taxDue;
}

//@ POST api/v1/tax
// acess to accountant
newTaxDue = async (req, res, next) => {
    try {
        const taxDue = await createTaxDue(req.user.userId, req.body)
        if (taxDue) {
            return res.status(200).json({
                success: true,
                data: taxDue
            })
        } else {
            return res.status(200).json({
                success: false,
                msg: 'Unable to create tax due'
            })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            masg: 'Server error'
        })
    }
}
module.exports = { createTaxDue, newTaxDue }



