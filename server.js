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
      host : 'postgresql-octagonal-54490', 
      user : 'postgres',
      password : 'home',
      database : 'facerecognition'
     }
  });

const app = express();

app.use(bodyParser.json());
app.use(cors())

app.get('/',(req, res) => {res.send('it is working!')})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

app.put('/image', (req, res) => { image.handleImage(req, res, db) })

app.post('/imageUrl', (req, res) => { image.handleApiCall(req, res,) })
  
app.listen(process.env.PORT || 3000, ()=> {
console.log(`app runing on port ${process.env.PORT}`);
})




    

    
