const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const _ = require('lodash');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const knex = require('knex');
const app = express();
const PORT = process.env.PORT || 5432;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var database = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: true
    // host : 'localhost',
    // user : 'postgres',
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