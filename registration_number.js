module.exports = function regFactory(pool) {
    async function getReg() {
        var list = await pool.query('select * from regNumbers');
        return list.rows;
    }

    async function getValues(selectedTown) {
        const value = await pool.query('select id from towns where startsWith = $1', [selectedTown]); //CJ, CA, CY VALUE
        Console.log(value)
        return value;
    }

    async function insert(regInput) {
        const regPlate = regInput.substring(0, 2).trim();
        const townId = await pool.query('select id from towns where startsWith = $1', [regPlate]);
        const id = townId.rows[0].id
        var inserting = await pool.query('insert into regNumbers (reg, key_name) values ($1, $2)', [regInput, id])
        return inserting;
    }

    // async function display() {
    //     var displaying = await pool.query('select reg from regNumbers');
    //     return displaying;
    // }

    async function checkReg(check) {
        var myReg = await getReg(check);
        if (myReg.rows > 0) {
            await getReg(check);
        } else {
            await insert(ceck);
        }
        return myReg.rows;
    }

    // async function enter(theReg) {
    //     var myReg = await setReg(theReg);
    //     if (myReg.rowCount > 0) {
    //         await display(theReg);
    //     } else {
    //         await insert(theReg);
    //     }
    // }

    async function displayFilter(filter) {
        const regPlate = filter.substring(0, 2).trim();
        const townId = await pool.query('select id from towns where startsWith = $1', [regPlate]);
        const id = townId.rows[0].id
        const filtering = await pool.query('SELECT reg FROM regNumbers WHERE key_name = $1', [id]);
        return filtering.rows
    }

    async function reset() {
        var del = await pool.query('delete from regNumbers');
        return del;
    }

    return {
        getReg,
        insert,
        //  enter,
        // display,
        displayFilter,
        reset,
        getValues,
        checkReg
    }
}