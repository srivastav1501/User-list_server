require('dotenv').config();
const express = require("express");
require('./db/conn.js')
const router = require('./routes/router')
const path = require('path')
const app = express();

app.use(express.json()); 
app.use(express.urlencoded({extended: true}));
app.use(router);

// static files

app.use(express.static(path.join(__dirname,'./client/build')));

app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
});

const port = 8005;

app.listen(port,()=>{
    console.log(`Server is runing on port number ${port}`);
})