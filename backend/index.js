const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/user/:username/:id', (req, res) => {
    res.render('user', {
        username: req.params.username,
        id: req.params.id
    });
})

app.get('/about', (req, res) => {
    res.render('about');
})


const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server Started http:/localhost:${PORT}`)
})