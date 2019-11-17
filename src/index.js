<<<<<<< HEAD
const mongoose = require('mongoose'); // Importando biblioteca do mongoDB
const path = require('path');
const cors = require('cors');
const morgan = require('morgan')

const express = require('express');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect('mongodb+srv://dbGrilo:auxiwareAdmin@cluster0-aegts.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true,
}); // Conectando com o banco

app.use(express.json())

app.use((req, res, next) => {
    req.io = io
    next();
})

app.use(cors());

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

app.use(require('./routes'));

app.use(morgan('dev'))

app.use(express.urlencoded({
    extended: true
}))

server.listen(3333);

console.log("server running");
=======
const express = require('express');
const mongoose = require('mongoose'); // Importando biblioteca do mongoDB
const path = require('path');
const cors = require('cors');
const morgan = require('morgan')

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect('mongodb+srv://dbGrilo:auxiwareAdmin@cluster0-aegts.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true,
}); // Conectando com o banco

app.use(express.json())

app.use((req, res, next) => {
    req.io = io
    
    next();
})

app.use(cors());

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

app.use(require('./routes'));

app.use(morgan('dev'))

app.use(express.urlencoded({
    extended: true
}))

server.listen(3333);

console.log("server running");
>>>>>>> a8401e8e78b538174712bb806d7179d546386e5f
