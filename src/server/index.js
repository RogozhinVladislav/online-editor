var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3333);
// WARNING: app.listen(80) will NOT work here!

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('connected!')
    
    socket.on('JOIN_ROOM', function (room) {
        console.log('room', room)
        socket.join(room)
    });
    socket.on('CHANGE_CLIENT', function (data) {
        console.log('data', data)
        socket.in(data.room).broadcast.emit('CHANGE_SERVER', data.code)
    });
});