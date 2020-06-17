

var sock = io("localhost:3002/");


sock.on('roll', (msg)=>{
    rollProcess(msg);
})

sock.on('gchalf', (msg)=>{
    console.log(msg);
    gchalfProcess(msg[0], msg[1], msg[2]);
})
sock.on('gchals', (msg)=>{
    console.log(msg);
    gchalsProcess(msg[0], msg[1], msg[2]);
})
sock.on('bchalf', (msg)=>{
    bchalfProcess(msg[0], msg[1], msg[2]);
})
sock.on('bchals', (msg)=>{
    bchalsProcess(msg[0], msg[1], msg[2]);
})
sock.on('ychalf', (msg)=>{
    ychalfProcess(msg[0], msg[1], msg[2]);
})
sock.on('ychals', (msg)=>{
    ychalsProcess(msg[0], msg[1], msg[2]);
})
sock.on('rchalf', (msg)=>{
    rchalfProcess(msg[0], msg[1], msg[2]);
})
sock.on('rchals', (msg)=>{
    rchalsProcess(msg[0], msg[1], msg[2]);
})
