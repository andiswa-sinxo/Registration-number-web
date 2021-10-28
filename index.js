const flash = require('express-flash');
const session = require('express-session');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const Registration = require('./reg-stript'); 
const router = require('./reg-routes/regi-route')
const pg = require("pg");
const Pool = pg.Pool;


// let useSSL = false;
// let local = process.env.LOCAL || false;
//  if (process.env.DATABASE_URL && !local){
//      useSSL = {rejectUnauthorized: false}
//  }

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

  const regRoute = router(regPlate)

app.use(session({
    secret: "<add a secret string here>",
    resave: false,
    saveUninitialized: true
}));

app.use(flash())
app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('public'));

app.get('/', regRoute.home);

app.post('/reg_number', regRoute.number);
    
app.get('/reg_number', regRoute.code);

app.post('/towns', regRoute.filter);

 app.post('/reset', regRoute.reset);

app.get('/all', regRoute.view);



let PORT = process.env.PORT || 3111;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
})
