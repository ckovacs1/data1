//Express Import/Instantiation 
const express = require('express');
const app = express();

//Mongo/Body-Parser Imports
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

//HBS Imports
const hbs = require('hbs');
app.set('view engine', hbs);

//bcrypt for password hashing
const bcrypt = require('bcrypt');

//github for user auth
const GitHubStrategy = require('passport-github').Strategy;
const passport = require('passport');
const session = require('express-session');

app.use(session({
    secret: 'test',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 24*60*60*1000,

    }
}));

//sessions and Passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, cb){
    cb(null, user.id);
});
passport.deserializeUser(function(id, cb) {
    cb(null, id);
});

//-----------------Github Auth--------------------
passport.use(new GitHubStrategy({
    clientID: 'c577ef640d02c249d85f',
    clientSecret: '9ab9628c73b9afc5cea531b654357c6c8fa35e11',
    callbackURL: "https://data1ait.herokuapp.com/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    cb(null, profile);
  }
));

const isAuth = (req,res,next) => {

    if(req.user){
        next();
    } else {
        res.redirect('/login');
    }
};

app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
});



//Atlas URL and Connection Parameters
const uri = "mongodb+srv://christian:ferrariPOLE33@data1.ixzll.mongodb.net/userInputs";
const connectionParams = {
    useNewUrlParser: true, 
    useUnifiedTopology: true
};

//Connect to Mongo Atlas using callbacks
mongoose.connect(uri, connectionParams).then(()=>{
    console.info("connected to atlas");
}).catch((e) => {
    console.log("Error:", e);
});

//Schema Tempate
const raceSchema = {
    name: String,
    circuit: String,
    position: Number,
    time: String
};

//Creates an instance of the Schema
const Race = mongoose.model("Race", raceSchema);

//Loads HTML/HBS index page as home page
app.get('/', isAuth, (req, res) => {
    res.render('index.hbs');
});

//Takes the Data from the form, and posts it to the MongoDb Atlas DB
app.post('/', (req,res) => {
    const newRace = new Race({
        name: req.body.name,
        circuit: req.body.circuit,
        position: req.body.position,
        time: req.body.time,
    });
    //Saves the Data and Refreshes the form
    newRace.save();
    res.redirect('/');
});

//Loads the results HTML/HBS page
app.get('/results', isAuth, (req, res) => {
    res.render('results.hbs');
});


//Takes the result from the circuit selector and displays the races based on the selection
app.post('/results', (req, res) => {

    //const topThree = [];
    //const t3 = topThree.filter(req.body.position <= 3);

    Race.find({circuit: req.body.circuit}, function(err, races) {
        res.render('results.hbs', {
            raceList: races,
            //topThree: t3
        });
    });




});


app.get('/login', (req, res) => {
    if(req.user) {
        return res.redirect('/');
    }
    res.render('login.hbs');
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

app.get('/register', (req, res) => {
    res.render('register.hbs');
});



const userSchema = {
    name: String,
    team: String,
    race: String,
    
};

const User = mongoose.model("Profile", userSchema);

app.get('/profile', isAuth, (req, res) =>{
    User.find({name: req.name}, function(err, users) {
        res.render('profile.hbs', {
            userList: users,
        });
    });
});

app.post('/register', async (req, res) => {
    try{
        //const hPass = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            name: req.body.name,
            team: req.body.team,
            race: req.body.track
        });
        //Saves the Data and Refreshes the form
        newUser.save();
        res.redirect('/profile');
    } catch{
        res.redirect('/register');
    }
});



//Listens for the Express App at Port and display message if successful
app.listen(process.env.PORT || 3001, ()=>{
    console.log("Express running on 3001");
});