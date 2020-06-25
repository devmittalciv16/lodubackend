const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');
const io = require('socket.io')(http);
const lobbyRouter = require('./Routers/lobbyRouter');
const cors = require('cors');

io.on('connection', (socket)=>{
    socket.on('joinroom', (msg)=>{
        socket.join(msg);
    })
    socket.on('join', (msg)=>{
        io.sockets.in(msg.link).emit('join', msg);
    })

    socket.on('start', (msg)=>{
        io.sockets.in(msg).emit('start', msg);
    })

    socket.on('chat', (msg)=>{
        io.sockets.in(msg.pathname).emit('chat', msg);
    })
    socket.on('roll', (msg)=>{
        io.sockets.in(msg.link).emit('roll', msg);
    })
    socket.on('gchalf', (msg)=>{
        io.sockets.in(msg[3]).emit('gchalf', msg);
    })
    socket.on('gchals', (msg)=>{
        io.sockets.in(msg[3]).emit('gchals', msg);
    })
    socket.on('ychalf', (msg)=>{
        io.sockets.in(msg[3]).emit('ychalf', msg);
    })
    socket.on('ychals', (msg)=>{
        io.sockets.in(msg[3]).emit('ychals', msg);
    })
    socket.on('bchalf', (msg)=>{
        io.sockets.in(msg[3]).emit('bchalf', msg);
    })
    socket.on('bchals', (msg)=>{
        io.sockets.in(msg[3]).emit('bchals', msg);
    })
    socket.on('rchalf', (msg)=>{
        io.sockets.in(msg[3]).emit('rchalf', msg);
    })
    socket.on('rchals', (msg)=>{
        io.sockets.in(msg[3]).emit('rchals', msg);
    })
})

app.use(cors());
app.get('/', (req, res)=>{
    res.send("Bhai kyu backhodi kar rha hai");
});
app.use('/', lobbyRouter);

const portNumber = process.env.PORT||3002;

http.listen(portNumber, ()=>{
    console.log("server connected");
})
