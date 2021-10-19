module.exports = function Registration() {
    var plateReg = []

     function registrationNumber(number) {
        plateReg.push(number)
        
        return plateReg
        //  var plate = number;
        //     return plate;
    }
    return {
        registrationNumber
    }
}
