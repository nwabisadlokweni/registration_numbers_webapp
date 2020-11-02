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

app.get('/', function (req, res) {
    res.render('index')
})

app.post('/reg_numbers', async function (req, res) {
    const reg = _.upperCase(req.body.regNumber);
    //const theNuMbers = await registration.enter(reg);
    // console.log(theNuMbers)
    if (!reg) {
        req.flash('error', "Please enter your registration number");
    }
    // else if (theNuMbers) {
    //      req.flash('error', "You have already entered this registration number");
    //  }
    else {
        var regInsert = await registration.insert(reg);
    }
    const theNumbers = await registration.getReg();

    res.render('index', {
        regInsert,
        numbers: theNumbers
    })

})

app.post('/filter', async function (req, res) {
    // console.log(getNumbers)
    // const numberPlate = req.params.numberPlate;
    var towns = req.body.town
    //console.log(towns)
    if (!towns && "") {
        req.flash('error', 'Please select a town');
    }
    else {
        var filteredTown = await registration.displayFilter(towns)
        // console.log(filteredTown)
    }
    res.render('index', {
        //  message : filteredTown,
        numbers: filteredTown
    })
})

app.get('/reset', async function (req, res) {
    await registration.reset()
    res.render('index');
})

const PORT = process.env.PORT || 2040;

app.listen(PORT, function () {
    console.log("App started at port", PORT)
});
