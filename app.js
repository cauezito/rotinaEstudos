const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const flash = require('flash');
const path = require("path");
const session = require('express-session');
const routeStudy = require('./routes/study');
const app = express();

app.use(session({
    secret: "nodejs",
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/srotina").then(() => {
    console.log("Connected!")
}).catch((err) => {
    console.log("Connection error: " + err)
});

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.get("/", (req, res) => {
    res.render('index', /*{date: Date.now}*/);
});

app.use('/study', routeStudy);

const port = 4002;
app.listen(port, () => {
    console.log("Server online!")
});