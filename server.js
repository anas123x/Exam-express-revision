const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const path = require('path');
const twig = require('twig');
const http = require('http');
const socketIo = require('socket.io');
// Set Twig as default view engine
app.set('view engine', 'twig');
app.set('views', path.join(__dirname, '/views'));
const server = http.createServer(app);
app.use(express.static('public'));

const io = socketIo(server);
io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => console.log('Client disconnected'));
});
io.on("partie",data=>{
    console.log(data)
})
app.get('/', (req, res) => {
    res.render('index', { title: 'Home Page' });
});
const routes = require('./routes/Routes')(io);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//mongoose.connect("mongodb+srv://anas:anas@cluster0.zodmaxz.mongodb.net/");
mongoose.connect("mongodb://127.0.0.1:27017/jeu");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});
app.use('/user', routes);
server.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});