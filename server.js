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
console.log(process.env.DATABASE_URL)
var database = knex({
  client: 'mysql',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: true
    // host : '127.0.0.1',
    // user : 'root',
    // password : 'root',
    // database : 'mapicture'
  }
});

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('server is working'));
app.post('/signin', (req, res) => {signin.handlaSignin(req, res, database, bcrypt)});
app.post('/register', (req, res) => {register.handleRegister(req, res, database, bcrypt)});
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res)});
// TODO get user liked images

app.listen(PORT, () => console.log(`server is working on port ${PORT}`));