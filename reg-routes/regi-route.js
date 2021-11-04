module.exports = function regNumber(regPlate) {

    async function home(req, res) {
        try {
            // console.log('in home')
            var code = await regPlate.getReg()

            res.render('index', { code });

        } catch (error) {
            console.error(error);
            // return res.send(error);
        }

    }

    async function number(req, res) {
        try {
            var number = req.body.registration
            await regPlate.numberPlate(number)
            await regPlate.getReg()

            if (!number) {
                req.flash('error', 'Please enter a registration number')
            }
            // console.log(reg);

            res.redirect('/')
        } catch (error) {
            console.log(error)
        }
    }

    async function code(req, res) {
        try {
            var code = await regPlate.getReg()
            console.log(code);
            res.redirect('/')
        } catch (error) {
            console.log(error)
        }

    }

    async function filter(req, res) {
        var filter = req.body.plate
        

        if (!filter) {
            req.flash('error', "Please select a town")
        }else{
            var code = await regPlate.filterId(filter)
        }

        res.render("index", { code })
    }
    async function reset(req, res) {
        try {
            await regPlate.resetButton()
            req.flash('info', 'The app has successfully reset!')
            res.redirect('/')
        } catch (error) {
            console.log(error)
        }

    }

    async function view(req, res) {
        try {
            res.redirect('/')
        } catch (error) {
            console.log(error)
        }

    }

    return {
        home,
        number,
        code,
        filter,
        reset,
        view
    }
}