var http = require('http'),
    httpServ = http.createServer(),
    mosca = require('mosca'),
    mqttServ = new mosca.Server({});

mqttServ.attachHttpServer(httpServ);

mqttServ.on('clientConnected', function(client) {
    console.log('client connected', client.id);
});

// fired when a message is received
mqttServ.on('published', function(packet, client) {
  console.log('Published', packet.payload);
});

mqttServ.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
  console.log('Mosca server is up and running on '+process.env.PORT);
}

httpServ.listen(process.env.PORT || 8080);
