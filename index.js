// imports
require('dotenv').config()
const express = require('express')
const app = express()
const session = require('express-session')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')

const MONGO_URI = process.env.MONGO_URI

// mongo
mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, ()=> console.log('connected to mongo'))

// express middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(session({
    store: MongoStore.create(({mongoUrl: MONGO_URI})),
    resave: false,
    saveUninitialized: true,
    secret: process.env.SSEC,
    cookie: {
        maxAge: 10000
    }
}))

// express routes
app.get('/', (req, res)=>{
    res.send('hello')
})

// goooooooo
app.listen(4200, ()=>{
    console.log('listening on http://localhost:4200');
})