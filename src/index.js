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

// ROTAS ALTERNATIVAS
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));
app.use('/musics', express.static(path.resolve(__dirname, '..', 'uploads', 'musics')));

app.use(require('./routes'));

app.use(morgan('dev'))

app.use(express.urlencoded({
    extended: true
}))

io.on('connection', socket => {
    socket.on('subscribe', room => {
        console.log('joining room ', room)
        socket.join(room)
    })

    socket.on('send message', data => {
        console.log('sending room post', data.room)
        console.log(data.message)
        socket.broadcast.to(data.room).emit('conversation private post', {
            message: data.message
        })
    })
})

server.listen(3333);

console.log("server running");
