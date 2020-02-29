const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./monitors/register');
const signin = require('./monitors/signin');
const profile = require('./monitors/profile');
const image = require('./monitors/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1', 
      user : 'postgres',
      password : 'home',
      database : 'facerecognition'
     }
  });

const app = express();

app.use(bodyParser.json());
app.use(cors())

app.get('/',(req,res) => {res.send(database.users)})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

app.put('/image', (req, res) => { image.handleImage(req, res, db) })

app.post('/imageUrl', (req, res) => { image.handleApiCall(req, res,) })
  
app.listen(3000, ()=> {
    console.log('app listening on port 3000!');
})




    

    
