const http = require('http');
const port = 8080;
const Twitter = require('twitter');
const fs = require('fs');

const client = new Twitter(JSON.parse(fs.readFileSync('./config/config.json', 'utf8')));

const params = {screen_name: 'RiseVision'};

const requestHandler = (request, response) => {

  client.get('statuses/user_timeline', params, function(error, tweets, resp) {
    if (!error) {
      response.writeHead(200, {"Content-Type": "application/json"});
      response.end(JSON.stringify(tweets));
    }
  });
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  };

  console.log(`server is listening on ${port}`);
})