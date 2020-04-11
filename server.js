const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const _ = require('lodash');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
var knex = require('knex');
const app = express();
var PORT = process.env.PORT || 9000;

var database = knex({
  client: 'mysql',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: true
  }
});

var corsOptions = {
  origin: 'http://localhost:3000/',
  optionsSuccessStatus: 200
}

// app.use(cors());
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000/"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('/', cors(corsOptions), (req, res) => res.send('server is working'));
app.post('/signin', cors(corsOptions), (req, res) => {signin.handlaSignin(req, res, database, bcrypt)});
app.post('/register', cors(corsOptions), (req, res) => {register.handleRegister(req, res, database, bcrypt)});
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res)});
// TODO get user liked images

app.listen(PORT, () => console.log(`server is working on port ${PORT}`));