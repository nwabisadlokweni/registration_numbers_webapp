module.exports = function regFactory(pool) {

    async function setReg(regList) {
        var check = await pool.query('select reg from regNumbers where reg = $1', [regList]);
        return check;
    }

    async function getReg() {
        var list = await pool.query('select * from regNumbers');
        return list.rows;
    }

    async function insert(regInput) {
        const regPlate = regInput.substring(0, 2).trim();
        const townId = await pool.query('select id from towns where startsWith = $1', [regPlate]);
        const id = townId.rows[0].id
        var inserting = await pool.query('insert into regNumbers (reg, key_name) values ($1, $2)', [regInput, id])
        return inserting;
    }

    async function display() {
        var displaying = await pool.query('select reg from regNumbers');
        return displaying;
    }

    async function enter(theReg) {
        var myReg = await setReg(theReg);
        if (myReg.rowCount > 0) {
            await display(theReg);
        } else {
            await insert(theReg);
        }

        // if (place === 'Select All') {
        //     return "Select All, " + theReg;
        // }

        // if (place === 'Cape Town') {
        //     return "CA, " + theReg;
        // }

        // if (place === 'Bellville') {
        //     return "CY, " + theReg;
        // }
        // if (place === 'Paarl') {
        //     return "CJ, " + theReg;
        // }
    }

    async function reset() {
        var del = await pool.query('delete from regNumbers');
        return del;
    }

    return {
        setReg,
        getReg,
        insert,
        enter,
        display,
        reset
    }
}
//when you want to filter the towns...
//SELECT * FROM regNumber WHERE reg = '1'; -------- then we know its Cape Town



