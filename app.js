const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const config = require('./config/database');
const bitcore = require('bitcore-lib');

const request = require("request");

//Database connection
mongoose.connect(config.database, { useNewUrlParser: true });
mongoose.connection.on('connected', () => {
    console.log('You are connected to ' + config.database);
});

//DB error
mongoose.connection.on('error', (err) => {
    console.log('Database error ' + err);
});

const app = express();

const users = require('./routes/users');

//Server Port
const port = 3000;

//CORS Middleware
app.use(cors());

//Static folder
app.use(express.static(path.join(__dirname, 'public')));

//URL encoder
app.use(bodyParser.urlencoded({
extended: true
}));

//Template engine
app.use("view engine", "ejs");

//Body-parser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// require('./config/passport')(passport);

app.use('/users', users);

function brainWallet(uniput, callback){
    let input = new Buffer(uniput);
    let hash = bitcore.crypto.Hash.sha256(input);
    let bn = bitcore.crypto.BN.fromBuffer(hash);
    let pk = new bitcore.PrivateKey(bn).toWIF();
    let address = new bitcore.PrivateKey(bn).toAddress();
    callback(pk, address);
};

function getPrice(returnPrice){
    request({
        url: "https://wex.nz/api/3/ticker/btc_usd",
        json: true
    }, function (err, res, body){
        returnPrice(body.btc_usd.last);
    });
};

//Index Route
app.get('/', (req, res) => {
    res.render("index");
});

app.get('/brain', (req, res) => {
    res.render("brain", {
        lastPrice: price
    });
});

app.get('/converter', (req, res) => {
    res.render("converter", {
        lastPrice: price
    });
}); 


// request({
//     url: "https://blockchain.info/stats?format=json",
//     json: true
// }, function(error, response, body) {
    // console.log(response);
    // btcPrice = body.market_price_usd;
    // btcBlocks = body.n_blocks_total;
// });


// route
app.get('/wallet', (req, res) => {
    let brainsrc = req.body.brainsrc;
    console.log(brainsrc);
    res.send("complete" +brainsrc);
});


//Run server
app.listen(port, () => {
    console.log('Server running on port ' + port);
});
