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
    });

    it('should insert registration numbers in the db', async function () {
     //the Factory Function is called regFactory
        let registration_number = regFactory(pool);

        await registration_number.insert("CA 123");

        assert.deepEqual([{ reg: 'CA 123' }], await registration_number.selectReg());
    });

    it('should filter registration numbers from Cape Town', async function () {
         // //the Factory Function is called regFactory
        let registration_number = regFactory(pool);

         await registration_number.insert("CA 123");

         assert.deepEqual([{ reg: 'CA 123' }], await registration_number.displayFilter('CA'));
     });

    it('should filter registration numbers from Bellville', async function () {
        // //the Factory Function is called regFactory
       let registration_number = regFactory(pool);

        await registration_number.insert("CY 123");

        assert.deepEqual([{ reg: 'CY 123' }], await registration_number.displayFilter('CY'));
    });

    it('should filter registration numbers from  Paarl', async function () {
        // //the Factory Function is called regFactory
       let registration_number = regFactory(pool);

        await registration_number.insert("CJ 123");

        assert.deepEqual([{ reg: 'CJ 123' }], await registration_number.displayFilter('CJ'));
    });

    it('should insert multiple registration numbers to the db', async function () {
        // //the Factory Function is called regFactory
       let registration_number = regFactory(pool);

        await registration_number.insert("CA 123");
        await registration_number.insert("CJ 123");
        await registration_number.insert("CY 123");

        assert.deepEqual([ { reg: 'CA 123' }, { reg: 'CJ 123' }, { reg: 'CY 123' } ]
        , await registration_number.selectReg());
    });

    it('should be able to reset registration numbers from the database', async function () {
        // the Factory Function is called greetFactory
        let registration_number = regFactory(pool);


        await registration_number.reset("CA 158");
        await registration_number.reset("CJ 555 798");
        await registration_number.reset("CY 555-694");
        var number = await registration_number.getReg()
        assert.equal(0, number);
    });

    after(function () {
        pool.end();
    })
}); 