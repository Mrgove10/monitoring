const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on("connection", (socket) => {
    console.info(`Client connected [id=${socket.id}]`);

    socket.on('data', function (msg) {
        io.emit('data', msg);
        console.log(msg);
        console.log();

        //from now on msg is a json
        msg = JSON.parse(msg);


    });

    socket.on("disconnect", () => {
        console.info(`Client gone [id=${socket.id}]`);
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});