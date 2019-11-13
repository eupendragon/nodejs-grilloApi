const express = require('express');
const mongoose = require('mongoose'); // Importando biblioteca do mongoDB
const path = require('path');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect('mongodb+srv://dbGrilo:auxiwareAdmin@cluster0-aegts.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true,
}); // Conectando com o banco

app.use((req, res, next) => {
    req.io = io
    
    next();
})

app.use(cors());

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

app.use(require('./routes'));

server.listen(3333);

