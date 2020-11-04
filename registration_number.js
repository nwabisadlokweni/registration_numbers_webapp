module.exports = function regFactory(pool) {
    async function getReg() {
        var list = await pool.query('select * from regNumbers');
        return list.rows;
    }

    async function getValues(selectedTown) {
        const value = await pool.query('select id from towns where startsWith = $1', [selectedTown]); //CJ, CA, CY VALUE
       // Console.log(value)
        return value;
    }

    async function insert(regInput) {
        const regPlate = regInput.substring(0, 2).trim();
        var check = await checkReg(regInput);

        if(check === 0){
            const townId = await pool.query('select id from towns where startsWith = $1', [regPlate]);
            const id = townId.rows[0].id
            var inserting = await pool.query('insert into regNumbers (reg, key_name) values ($1, $2)', [regInput, id])
            
        }
        return inserting;
    }

    // async function display() {
    //     var displaying = await pool.query('select reg from regNumbers');
    //     return displaying;
    // }

    async function checkReg(check) {
     
        // await getReg(check);
        // if (myReg.rows > 0) {
        //     await getReg(check);
        // } else {
        //     await insert(ceck);
        // }

        var myReg = await pool.query('select id from towns where startsWith = $1', [check])
        return myReg.rows.length;
    }

    async function enter(theReg) {
        var dublicate = await pool.query('select reg from regNumbers where reg = $1', [theReg]);
        return dublicate;
    }

    async function displayFilter(filter) {
        if(filter === "Select All"){
            var all = await pool.query('select * from regNumbers');
            return all.rows;
        }
        const regPlate = filter.substring(0, 2).trim();
        const townId = await pool.query('select id from towns where startsWith = $1', [regPlate]);
        const id = townId.rows[0].id
        const filtering = await pool.query('SELECT reg FROM regNumbers WHERE key_name = $1', [id]);
        return filtering.rows
    }


    async function selectReg() {
        var select = await pool.query('select reg from regNumbers');
        return select.rows;
    }

    async function reset() {
        var del = await pool.query('delete from regNumbers');
        return del;
    }

    return {
        getReg,
        insert,
       selectReg,
       enter,
        displayFilter,
        reset,
        getValues,
        checkReg
    }
}