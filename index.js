const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');
const io = require('socket.io')(http);

io.on('connection', (socket)=>{

    socket.on('roll', (msg)=>{
        io.emit('roll', msg);
    })
    socket.on('gchalf', (msg)=>{
        io.emit('gchalf', msg);
    })
    socket.on('gchals', (msg)=>{
        io.emit('gchals', msg);
    })
    socket.on('ychalf', (msg)=>{
        io.emit('ychalf', msg);
    })
    socket.on('ychals', (msg)=>{
        io.emit('ychals', msg);
    })
    socket.on('bchalf', (msg)=>{
        io.emit('bchalf', msg);
    })
    socket.on('bchals', (msg)=>{
        io.emit('bchals', msg);
    })
    socket.on('rchalf', (msg)=>{
        io.emit('rchalf', msg);
    })
    socket.on('rchals', (msg)=>{
        io.emit('rchals', msg);
    })
})
app.use('/', express.static(path.join(__dirname, './public/')));
const portNumber = process.env.PORT||3002;
http.listen(portNumber, ()=>{
    console.log("server connected");
})
