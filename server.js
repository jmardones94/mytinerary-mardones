const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const router = require('./routes/index')
// Middlewares
app.use(cors()) 
app.use(express.json())

app.use('/api', router)

app.listen(4000, () => console.log('Escuchando en el puerto 4000'))