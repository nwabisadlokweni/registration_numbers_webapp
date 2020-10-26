module.exports = function regFactory(pool) {

    async function setReg(regList) {
        var check = await pool.query('select registration from regNumber where registration = $1', [regList]);
        return check;
    }

    async function getReg() {
        var list = await pool.query('select * from regNumber');
        return list.rows;
    }

    async function insert(reg) {
        var inserting = await pool.query('insert into regNumber (registration, towns) values ($1, $2)', [reg, 1])
        return inserting;
    }

    // async function update(updated) {
    //     var updating = await pool.query('update regNumber set counter=counter+1 where name=$1', [updated]);
    //     return updating.rowCount;
    // }

async function enter(theReg) {
    var myReg = await setReg(theReg);
    if (myReg.rowCount > 0) {
        await update(theReg);
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
        reset
    }
}

//
//SELECT FirstName, UPPER(startsWith) AS startsWith FROM regNnmber;
