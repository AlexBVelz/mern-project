const express = require('express')
const bodyParser =require('body-parser')  
const userRoutes = require('./routes/user.routes');
require('dotenv').config({path: './config/.env'})
require('./config/db');
const app = express()


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/user', userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Le serveur démarre sur le port ${process.env.PORT}`)
})