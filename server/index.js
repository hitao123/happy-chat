const express = require('express');
const app = express();


const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = 4000;

const users = [];
const userInfo = [];

app.all('*', function(req, res, next) {

    const header = req.headers['origin']
    res.header("Access-Control-Allow-Origin", header);
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");

    if (req.method == "OPTIONS") {
        res.send(200);
    } else  {
        next();
    }
});


io.on('connect', (socket) => {
    io.emit('onlineUser', users);
    socket.on('sendMessage', (data) => {

    });
});


io.on('disconnect', (socket) => {

});





http.listen(PORT, () => {
    console.log(`listening port ${PORT}....`)
});