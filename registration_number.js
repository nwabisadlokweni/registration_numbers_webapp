module.exports = function regFactory(pool) {

    async function setReg(regList) {
        var check = await pool.query('select reg from regNumbers where reg = $1', [regList]);
        return check;
    }

    async function getReg() {
        var list = await pool.query('select * from regNumbers');
        return list.rows;
    }

    async function insert(reg) {
        var inserting = await pool.query('insert into regNumbers (reg, startsWith) values ($1, $2)', [reg, 1])
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
}

    async function reset() {
        var del = await pool.query('delete from reg_Number');
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

//
//SELECT FirstName, UPPER(startsWith) AS startsWith FROM regNnmber;
