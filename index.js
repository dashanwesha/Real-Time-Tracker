require('dotenv').config()
const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const socketio = require('socket.io'); // package

const server = http.createServer(app);
const io = socketio(server);
const port = process.env.PORT || 3000


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public'))); // Use app.use for serving static files

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('send-location', (data) => {
        io.emit('receive-location', { id: socket.id, ...data });
    });

    socket.on('disconnect', () => {
        io.emit('user-disconnected', socket.id);
        console.log('User disconnected:', socket.id);
    });
});

app.get('/', (req, res) => {
    res.render('index');
});

server.listen(port, () => {
    console.log('Server listening on port 3000');
});
