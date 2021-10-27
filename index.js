// const flash = require('express-flash');
const session = require('express-session');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const Registration = require('./reg-stript'); 
// const router = require('./reg-routes/regi-route')
const pg = require("pg");
const Pool = pg.Pool;


let useSSL = false;
let local = process.env.LOCAL || false;
 if (process.env.DATABASE_URL && !local){
     useSSL = true;
 }

const app = express();

const handlebarSetup = exphbs({
    partialsDir: "./views/partials",
    viewPath: './views',
    layoutsDir: './views/layouts'
});

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/my_registration';
const pool = new Pool({
    connectionString,
    ssl :  {
    rejectUnauthorized: false
    }
  });

  const regPlate = Registration(pool)
app.use(session({
    secret: "<add a secret string here>",
    resave: false,
    saveUninitialized: true
}));

// app.use(flash())
app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('public'));

app.get('/' ,async function (req, res) {
    var code = await regPlate.getReg()

    res.render('index', {code})
})

app.post('/reg_number' ,async function (req, res){
    var number = req.body.registration
    await regPlate.numberPlate(number)
     await regPlate.getReg()
        // console.log(reg);
    
    res.redirect('/')
})

app.get('/reg_number', async function (req, res){
    
        var code = await regPlate.getReg()
        console.log(code);
        res.redirect('/')
})

 app.post('/reset', async function (req, res) {
    await regPlate.resetButton()
    //  req.flash('info', 'The app has successfully reset!')
/    res.redirect('/')
})



let PORT = process.env.PORT || 3111;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
})
