module.exports = function routes(registration) {
    const _ = require("lodash");

    async function index(req, res) {
        const theNumbers = await registration.getReg();

        res.render('index', {
            numbers: theNumbers
        })
    }

    async function insertReg(req, res, next) {
        const reg = _.upperCase(req.body.regNumber);
        var exists = await registration.enter(reg);
        try {
            if (reg !== '') {
                if (exists.rowCount === 0) {
                    if (/C[AYJ] \d{3,6}$/.test(reg) || /C[AYJ] \d+\s|-d+$/.test(reg)) {
                        await registration.insert(reg);
                        req.flash('success', "You have successfully added a new registration number!");
                    }
                    else {
                        req.flash('error', "Invalid registration number, please try again");
                    }
                }
                else {
                    req.flash('error', "This registration number already exist");
                }
            }
            else {
                req.flash('error', "Please enter your registration number");
            }
            var theNumbers = await registration.getReg();
            res.render('index', {
                numbers: theNumbers
            })
        } catch (err) {
            next(err)
        }
    }

    async function filteringReg(req, res, next) {
        var towns = req.body.town
        try {
            if (!towns) {
                req.flash('error', 'Please select a town');
            }
            else {
                var filteredTown = await registration.displayFilter(towns)
            }
        } catch (err) {
            next(err)
        }
        res.render('index', {
            numbers: filteredTown
        })
    }

    async function resetDb(req, res) {
        req.flash('resetSucceded', 'You have successfully cleared your registrations');
        await registration.reset()
        res.render('index');
    }

    return {
        index,
        insertReg,
        filteringReg,
        resetDb
    }
}