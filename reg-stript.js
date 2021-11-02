module.exports = function Registration(pool) {

    async function numberPlate(regNo){
        try {
            if ( regNo.length < 7 || regNo.length > 10 ){
                return null
             } 
             if(regNo.startsWith('CA') || regNo.startsWith('CJ') || regNo.startsWith('CY')){
                 return await registrationNumber(regNo)
             }
        } catch (error) {
            console.error(error)
        }
    }

    async function getId(reg) {
        try {
            let str = reg.substring(0, 2);
        let result = await pool.query('SELECT id FROM town WHERE code = $1', [str]);
        return result.rows[0].id
        } catch (error) {
            console.log(error);
        }
        
    }

    async function registrationNumber(plate) {
        try {
        var loc = plate.substring(0, 2);
        var townID = await getId(loc);
        var availReg = await pool.query('SELECT reg_no FROM reg WHERE reg_no = $1', [plate]);
        if(availReg.rowCount === 0){
           await pool.query('INSERT INTO reg(reg_no, code_id) VALUES($1, $2)', [plate, townID])
        }
        } catch (error) {
            console.log(error);
            
        }
        
    }

    async function getReg(){
        try {
            console.log("in getReg")
            var allReg = await pool.query('SELECT reg_no FROM reg')
            
            console.log('---');
            console.log(allReg);
            console.log(allReg.rows);

            return allReg.rows
        }
        catch (error) {
            console.log(error);
        }
        
    }

    async function resetButton(){
        try {
            await pool.query('delete from reg')
        } catch (error) {
            console.log(error);
        }
    }

    async function filterId(id){
        var codeId = await getId(id)
        let filtering = await pool.query('SELECT reg_no FROM reg WHERE code_id = $1', [codeId]);
        return filtering.rows
    }
    
    return {
        getId,
        registrationNumber,
        numberPlate,
        getReg,
        resetButton,
        filterId
        
    }
}