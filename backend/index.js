const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config()
const conn = require('./db/conn');
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/post', require('./routes/post'));

app.get('/', (req, res) => {
    res.send("hellow");
})

app.listen(PORT, () => {
    console.log(`Backend server is running on ${PORT}`);
})