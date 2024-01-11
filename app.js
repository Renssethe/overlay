const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/admin', (req, res) => {
    res.sendFile(__dirname + '/views/admin.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('videoFrame', (data) => {
        io.emit('videoFrame', data);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
