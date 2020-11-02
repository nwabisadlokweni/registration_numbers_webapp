const assert = require('assert');
const regFactory = require('../registration_number');

const pg = require("pg");
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/reg_test';

const pool = new Pool({
    connectionString
});

describe('The basic database web app', function () {

    beforeEach(async function () {
        // clean the tables before each test run
        await pool.query("delete from regNumbers;");
        //await pool.query("delete from towns;");
    });

    it('should insert registration numbers in the db test', async function () {
        // //the Factory Function is called regFactory
        let registration_number = regFactory(pool);
var regNumber = await registration_number.display();
        await registration_number.insert("CA 123");
        // await registration_number.insert("Zola");
        // await registration_number.insert("Unalo");
        // await registration_number.insert("Sino");
        // await registration_number.insert("Makho");
        // await registration_number.insert("Andre");

        

        assert.equal("CA 123", regNumber);
    });

    after(function () {
        pool.end();
    })
}); 