const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

// Middlewares
app.use(cors()) 
app.use(express.json())

const citiesData = [
    {_id: 1, src: 'https://i.imgur.com/54XjPnl.jpg', alt:'Toronto',name:'Toronto', country:'Canada'},
    {_id: 2, src: 'https://i.imgur.com/mziAutA.jpg', alt:'Sydney',name:'Sydney', country:'Australia'},
    {_id: 3, src: 'https://i.imgur.com/1gbTBDx.jpg',alt:'London',name:'London', country:'United Kingdom'},
    {_id: 4, src: 'https://i.imgur.com/L8XMHCW.jpg',alt:'Venice',name:'Venice', country:'Italy'},
    {_id: 5, src: 'https://i.imgur.com/4Gtex6s.jpg',alt:'Berlin',name:'Berlin', country:'Germany'},
    {_id: 6, src: 'https://i.imgur.com/jbo4DcY.jpg',alt:'Torres del Paine',name:'Torres del Paine', country:'Chile'},
    {_id: 7, src: 'https://i.imgur.com/Se01OXK.jpg',alt:'Buenos Aires',name:'Buenos Aires', country:'Argentina'},
    {_id: 8, src: 'https://i.imgur.com/VrTjY22.jpg',alt:'Madrid',name:'Madrid', country:'Spain'},
    {_id: 9, src: 'https://i.imgur.com/fngOdh7.jpg',alt:'Paris',name:'Paris', country:'France'},
    {_id: 10, src: 'https://i.imgur.com/0Lz2Jh3.jpg',alt:'Rome',name:'Rome', country:'Italy'},
    {_id: 11, src: 'https://i.imgur.com/8jTDhPb.jpg',alt:'Tokyo',name:'Tokyo', country:'Japan'},
    {_id: 12, src: 'https://i.imgur.com/wFPKEXt.jpg',alt:'New York',name:'New York', country:'United States'},
    {_id: 13, src: 'https://i.imgur.com/WTdI3cl.jpg',alt:'Moscow',name:'Moscow', country:'Russia'},
    {_id: 14, src: 'https://i.imgur.com/R52oOga.jpg',alt:'Mexico name',name:'Mexico City', country:'Mexico'},
    {_id: 15, src: 'https://i.imgur.com/KDMfwFY.jpg',alt:'Stockholm',name:'Stockholm', country:'Sweden'},
]

app.get('/api/cities', (req, res) => {
    res.json({ response: citiesData })
})

app.get('/api/city/:id', (req, res) => {
    res.json({ response: citiesData.find(city => parseInt(req.params.id) === city._id) })
})

app.listen(4000, () => console.log('Escuchando en el puerto 4000'))