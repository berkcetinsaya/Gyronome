
// server initialization:
var express = require('express');		// include express.js
	io = require('socket.io'),				// include socket.io
	app = express(),									// make an instance of express.js
 	server = app.listen(8080),				// start a server with the express instance
	socketServer = io(server);	 			// make a socket server using the express server

// serial port initialization:
var serialport = require('serialport'),			// include the serialport library
	SerialPort  = serialport.SerialPort,			// make a local instance of serial
	portName = process.argv[2],								// get the port name from the command line
	portConfig = {
		baudRate: 115200,
		// call myPort.on('data') when a newline is received:
		parser: serialport.parsers.readline('\n')
	};

// open the serial port:
var myPort = new SerialPort(portName, portConfig);

//  set up server and socketServer listener functions:
app.use(express.static('public'));					// serve files from the public folder
app.get('/:name', serveFiles);							// listener for all static file requests
socketServer.on('connection', openSocket);	// listener for websocket data

function serveFiles(request, response) {
	var fileName = request.params.name;				// get the file name from the request
	response.sendFile(fileName);							// send the file
}

function openSocket(socket){
	console.log('new user address: ' + socket.handshake.address);
	// send something to the web client with the data:
	socket.emit('message', 'Hello, ' + socket.handshake.address);

	// this function runs if there's input from the client:
	socket.on('message', function(data) {
		myPort.write(data);							// send the data to the serial device
	});

	// this function runs if there's input from the serialport:
	myPort.on('data', function(data) {
		socket.emit('message', data);		// send the data to the client
	});
}
