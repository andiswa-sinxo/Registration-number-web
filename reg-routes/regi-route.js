module.exports = function regNumber(regPlate) {

    async function home(req, res) {
        try {
            var code = await regPlate.getReg()

            res.render('index', { code })
        } catch (error) {
            console.error(error)
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
        var code = await regPlate.filterId(filter)

        if (!filter) {
            req.flash('error', "Please select a town")
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
            req.flash('error', 'Please enter a registration number and select a town')
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