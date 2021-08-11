const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

// Middlewares
app.use(cors()) 
app.use(express.json())

const citiesData = [
    {_id: 1, src: 'toronto.jpg', alt:'Toronto',name:'Toronto', country:'Canada'},
    {_id: 2, src: 'sydney.jpg', alt:'Sydney',name:'Sydney', country:'Australia'},
    {_id: 3, src: 'london.jpg',alt:'London',name:'London', country:'United Kingdom'},
    {_id: 4, src: 'venice.jpg',alt:'Venice',name:'Venice', country:'Italy'},
    {_id: 5, src: 'berlin.jpg',alt:'Berlin',name:'Berlin', country:'Germany'},
    {_id: 6, src: 'torresdelpaine.jpg',alt:'Torres del Paine',name:'Torres del Paine', country:'Chile'},
    {_id: 7, src: 'buenosaires.jpg',alt:'Buenos Aires',name:'Buenos Aires', country:'Argentina'},
    {_id: 8, src: 'madrid.jpg',alt:'Madrid',name:'Madrid', country:'Spain'},
    {_id: 9, src: 'parislouvre.jpg',alt:'Paris',name:'Paris', country:'France'},
    {_id: 10, src: 'rome.jpg',alt:'Rome',name:'Rome', country:'Italy'},
    {_id: 11, src: 'tokyo.jpg',alt:'Tokyo',name:'Tokyo', country:'Japan'},
    {_id: 12, src: 'newyork.jpg',alt:'New York',name:'New York', country:'United States'},
    {_id: 13, src: 'moscow.jpg',alt:'Moscow',name:'Moscow', country:'Russia'},
    {_id: 14, src: 'mexicocity.jpg',alt:'Mexico name',name:'Mexico City', country:'Mexico'},
    {_id: 15, src: 'stockholm.jpg',alt:'Stockholm',name:'Stockholm', country:'Sweden'},
]

app.get('/api/cities', (req, res) => {
    res.json({ response: citiesData })
})

app.get('/api/city/:id', (req, res) => {
    res.json({ response: citiesData.find(city => parseInt(req.params.id) === city._id) })
})

app.listen(4000, () => console.log('Escuchando en el puerto 4000'))