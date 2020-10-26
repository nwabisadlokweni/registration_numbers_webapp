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
        await pool.query("delete from regNumber;");
        await pool.query("delete from towns;");
    });

    it('should insert names in the db test', async function () {
        // //the Factory Function is called regFactory
        // let registration_number = regFactory(pool);

        // await registration_number.insert("Nwabisa");
        // await registration_number.insert("Zola");
        // await registration_number.insert("Unalo");
        // await registration_number.insert("Sino");
        // await registration_number.insert("Makho");
        // await registration_number.insert("Andre");

        // var name = await registration_number.counter();

        // assert.equal(6, name);
    });

    after(function () {
        pool.end();
    })
}); 