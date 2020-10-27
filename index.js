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
    if (!reg) {
        req.flash('error', "Please enter your registration number");
    }
    else if (!reg) {
        req.flash('error', "You have already entered this registration number");
    }
    else{
        var regInsert = await registration.enter(reg); 
    }
    const theNumbers = await registration.getReg();

    res.render('index', {
        message: regInsert,
        theNumbers
    })

})

app.get('registrations', async function (req, res) {
    console.log(getNumbers)
    res.render('registration', { });
})




app.get(async function reset(req, res) {
    await registration.reset()
    res.redirect('/');
})

const PORT = process.env.PORT || 2040;

app.listen(PORT, function () {
    console.log("App started at port", PORT)
});
