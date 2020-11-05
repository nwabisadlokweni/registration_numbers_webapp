const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const regFactory = require('./registration_number');
const pg = require("pg");
const Pool = pg.Pool;
const _ = require("lodash");


const app = express();

// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/reg_number';

const pool = new Pool({
    connectionString
});

const registration = regFactory(pool);
//const routesInstance = routeFactory(greetings)

app.engine('handlebars', exphbs({ layoutsDir: './views/layouts' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
    secret: "fcsss",
    resave: false,
    saveUninitialized: true
}))
// initialise the flash middleware
app.use(flash());


app.get('/', async function (req, res) {
    const theNumbers = await registration.getReg();

    res.render('index', {
        numbers: theNumbers
    });
});

app.post('/reg_numbers', async function (req, res, next) {
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
})

app.post('/filter', async function (req, res, next) {
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
})

app.get('/reset', async function (req, res) {
    req.flash('resetSucceded', 'You have successfully cleared your registrations');
    await registration.reset()
    res.render('index');
})

const PORT = process.env.PORT || 2040;

app.listen(PORT, function () {
    console.log("App started at port", PORT)
});
