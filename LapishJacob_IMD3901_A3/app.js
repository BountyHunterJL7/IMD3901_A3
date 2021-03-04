const express   = require('express');
const app       = express();
const http      = require('http');
const server    = require('http').createServer(app);  
const io        = require('socket.io')(server);

const LISTEN_PORT   = 8080;

server.listen(LISTEN_PORT);
app.use(express.static(__dirname + '/public')); //set root path of server ...
console.log("Listening on port: " + LISTEN_PORT );

//our routes
app.get( '/', function( req, res ){ 
    res.sendFile( __dirname + '/public/index.html' );
});

app.get( '/colab_player1', function( req, res ){ 
    res.sendFile( __dirname + '/public/colab_player1.html' );
});

app.get( '/colab_player2', function( req, res ){ 
    res.sendFile( __dirname + '/public/colab_player2.html' );
});

app.get( '/competative', function( req, res ){ 
    res.sendFile( __dirname + '/public/competative.html' );
});

//websocket
io.on('connection', (socket) => {
    console.log(socket.id + ' is connected');
    

    socket.on('disconnect', () => {
        console.log(socket.id + ' has disconnected');
    });

    //custom events
    socket.on('red', (data) =>{
        console.log('red button pushed');
        io.sockets.emit('color_change', {r:255,g:0,b:0}); //send data to all sockets
    });

    socket.on('blue', (data) =>{
        console.log('blue button pushed');
        io.sockets.emit('color_change', {r:0,g:0,b:255});
    });
    socket.on('green', (data) =>{
        console.log('green button pushed');
        io.sockets.emit('color_change', {r:0,g:255,b:0}); //send data to all sockets
    });

    socket.on('yellow', (data) =>{
        console.log('yellow button pushed');
        io.sockets.emit('color_change', {r:255,g:255,b:0});
    });
    socket.on('win', (data) =>{
        console.log('A player has won');
        io.sockets.emit('color_change', {r:255,g:255,b:255}); //send data to all sockets
    });

    socket.on('end', (data) =>{
        console.log("Player2 has reached the end");
        io.sockets.emit('color_change', {r:255,g:255,b:255}); //send data to all sockets
    });

    //setIntervalFunc -> create interval function that will be called every set amount of seconds
    //for avatar data, or 
});